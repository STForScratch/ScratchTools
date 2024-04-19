// BASED ON EXTENSION: IDEA GENERATOR

if (window.location.href.includes("https://scratch.mit.edu/ideas")) {
  var div = document.createElement("div");
  div.className = "tips-getting-started scratchtools gpt generator";
  div.innerHTML =
    '<div class="inner"><section class="flex-row tips-info-section tips-left"><div class="ideas-image"></div><div><h2><span>GPT Idea Generator</span></h2><p><span>Dont know what to make? Use our ChatGPT idea generator!</span></p><a><button class="button ideas-button"><span>Generate!</span></button></a></div></section></div>';
  if (document.querySelector("div.scratchtools.generator") === null) {
    document.querySelector("main#view").firstChild.prepend(div);
    document
.querySelector("main#view")
.prepend(document.querySelector("div.banner-wrapper"));
    document.querySelector("div.scratchtools.generator").onclick = function () {
      generategpt();
    };
  }
}

function generategpt() {
  const prompt = "make me 1 idea for scratch game... WITHOUT ANY CONTEXT! JUST IDEA AND NOTHING ELSE. AND DO NOT USE SWEAR WORDS OR BAD THEMES!";
  const api_url = "https://reverse.mubi.tech/v1/chat/completions"

  let loading;
  const display = async () => {
    if (!loading) {
      loading = document.createElement("div");
      loading.className = "gpt-loading";
      loading.innerHTML = `
        <div class="gpt-loading-icon"></div>
        <div class="gpt-loading-text">Generating idea...</div>
      `;
      document.querySelector("div.scratchtools.generator").insertAdjacentElement(
        "beforebegin",
        loading
      );
    }

    const response = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://gptcall.net/',
        'Referer': 'https://gptcall.net/'
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{
          role: "user",
          content: prompt
        }]
      }),
    });
    const data = await response.json();
    const botResponse = data.choices[0].message.content;
    ScratchTools.modals.create({
      title: "Idea",
      description: botResponse,
    });

    setTimeout(() => {
      if (loading) {
        loading.remove();
        loading = undefined;
      }
    }, 1000);
  };

  display();
}

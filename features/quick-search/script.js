export default async function ({ feature, console }) {
  document.querySelector(".ste-quick-search")?.remove();

  let search = createQuickSearch();

  function aiResponse(text, loading) {
    document.querySelector(".ai-response")?.remove();
    let div = document.createElement("div");
    div.className = "ai-response";
    div.innerHTML = "<div></div><div></div>";
    div.lastChild.textContent = text;

    let img = document.createElement("img");
    img.src = feature.self.getResource("scatt");
    div.firstChild.appendChild(img);

    if (search.div.dataset.mode === "ai") {
      search.div.firstChild.querySelector("div").appendChild(div);
    }

    return div;
  }

  document.addEventListener("keydown", async function (e) {
    if (e.which === 75 && e.metaKey) {
      e.preventDefault();
      search.div.style.display = null;
      search.input.focus();
      search.input.value = "";
      search.div.dataset.mode = "normal";
      search.setResults(getDefaultResults());
      getAdditionalResults(search.input);
    }
    if (
      e.which === 13 &&
      document.activeElement === search.input &&
      !search.div.style.display
    ) {
      if (search.div.dataset.mode === "ai") {
        let query = search.input.value;
        aiResponse("AI is currently responding to your request...", true);
        let username = (await feature.auth.fetch())?.user?.username || "";
        let data = await (
          await fetch("https://data.scratchtools.app/ai-query/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              search: search.input.value.replace("Scatt", ""),
            }),
          })
        ).json();
        if (query === search.input.value) {
          search.input.value = "Scatt ";
          if (typeof data.response === "string") {
            aiResponse(data.response, false);
          } else if (data.success) {
            if (data.response.length) {
              let div = aiResponse(
                "Here are some projects I've found for you:",
                false
              );

              div.lastChild.appendChild(document.createElement("div"));

              for (var i in data.response) {
                let a = document.createElement("a");
                a.textContent = data.response[i].name;
                a.href = data.response[i].url;
                div.lastChild.lastChild.appendChild(a);
              }
            } else {
              aiResponse(
                "Sorry, I couldn't find any projects like that.",
                false
              );
            }
          } else {
            aiResponse("Sorry, something went wrong with your request.", false);
          }
        }
      } else {
        if (search.div.querySelector("a")) {
          search.div.querySelector("a")?.click();
        }
      }
    }
    if (e.which === 27) {
      search.div.style.display = "none";
    }
  });

  search.input.addEventListener("input", inputResults);

  function inputResults() {
    document.querySelector(".qs-ai-instructions")?.remove();
    if (search.input.value.startsWith("Scatt")) {
      document.querySelector(".qs-escape-instructions").style.display = "none";
      let span = document.createElement("span");
      span.className = "qs-ai-instructions";
      span.innerHTML = `<span class='qs-key'>Beta</span> Scatt AI`;
      span.firstChild.style.borderColor = "#4fb1fc";
      span.style.color = "#4fb1fc";
      search.div.firstChild.appendChild(span);
      search.div.dataset.mode = "ai";
    } else {
      search.div.dataset.mode = "qs";
      document.querySelector(".qs-escape-instructions").style.display = null;
      search.setResults(getDefaultResults(search.input.value.toLowerCase()));

      getAdditionalResults(search.input);
    }
  }

  async function getAdditionalResults(input) {
    let query = input.value;
    let results = [];

    let projects = await getProjects(query);
    for (var i in projects) {
      results.push({
        text:
          (projects[i].title.length > 15
            ? projects[i].title.slice(0, 15) + "..."
            : projects[i].title) +
          " by @" +
          (projects[i].author.username.length > 15
            ? projects[i].author.username.slice(0, 15)
            : projects[i].author.username),
        url: `/projects/${projects[i].id.toString()}/`,
        type: "Project",
      });
    }

    try {
      let user = await (
        await fetch(
          `https://api.scratch.mit.edu/users/${query.replaceAll("@", "")}/`
        )
      ).json();
      if (user?.username) {
        results.push({
          text: "@" + user.username,
          url: `/users/${user.username}/`,
          type: "User",
        });
      }
    } catch (err) {}

    try {
      let session = await feature.auth.fetch();
      if (session?.user?.username && "my profile".includes(query)) {
        results.push({
          text: "My Profile",
          url: `/users/${session.user.username}/`,
        });
      }
    } catch (err) {}

    if ("scatt".includes(input.value.toLowerCase())) {
      results.push({
        text: "Scatt",
        type: "AI",
        page: "AI",
      });
    }

    if (input.value === query) {
      for (var i in results) {
        let a = document.createElement("a");
        if (results[i].type === "AI") {
          a.addEventListener("click", function () {
            search.input.value = "Scatt ";
            search.div.firstChild.querySelector("div").innerHTML = "";
            inputResults();
          });
        } else {
          a.href = results[i].url;
        }
        a.textContent = results[i].text;

        if (results[i].type) {
          let span = document.createElement("span");
          span.textContent = results[i].type;
          span.className = "qs-type";
          a.appendChild(span);
        }

        input.parentNode.querySelector("div").prepend(a);
      }

      if (
        [...input.parentNode.querySelectorAll("a")].find(
          (a) => a.textContent.toLowerCase() === query.toLowerCase()
        )
      ) {
        input.parentNode
          .querySelector("div")
          .prepend(
            [...input.parentNode.querySelectorAll("a")].find(
              (a) => a.textContent.toLowerCase() === query.toLowerCase()
            )
          );
      }
    }
  }

  async function getProjects(query) {
    let data = await (
      await fetch(
        `https://api.scratch.mit.edu/search/projects?limit=16&offset=0&language=en&mode=popular&q=${query
          .replaceAll("&", "")
          .replaceAll("?", "")
          .replaceAll("/", "")}`
      )
    ).json();
    data.length = 2;
    return data;
  }

  function createQuickSearch() {
    let div = document.createElement("div");
    div.className = "ste-quick-search qs-outer";
    div.style.display = "none";

    let inner = document.createElement("div");
    inner.className = "qs-inner";
    div.appendChild(inner);

    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search for something...";
    inner.appendChild(input);

    let span = document.createElement("span");
    span.className = "qs-escape-instructions";
    span.innerHTML = `<span class='qs-key'>esc</span> to close quick search.`;
    inner.appendChild(span);

    let results = document.createElement("div");
    inner.appendChild(results);

    function setResults(options) {
      results.innerHTML = "";

      for (var i in options) {
        let a = document.createElement("a");
        if (options[i].page === "settings") {
          a.addEventListener("click", function () {
            chrome.runtime.sendMessage(ScratchTools.id, "openSettings");
          });
        } else {
          a.href = options[i].url;
        }
        a.textContent = options[i].text;
        results.appendChild(a);
      }
    }

    setResults(getDefaultResults());
    getAdditionalResults(input);

    document.body.appendChild(div);

    return {
      input,
      div,
      setResults,
    };
  }

  function getDefaultResults(query) {
    let results = [
      {
        text: "New Project",
        url: "/projects/editor/",
      },
      {
        text: "Trending Projects",
        url: "/explore/projects/all/",
      },
      {
        text: "Recent Messages",
        url: "/messages/",
      },
      {
        text: "My Projects",
        url: "/mystuff/",
      },
      {
        text: "Discussion Forums",
        url: "/discuss/",
      },
      {
        text: "Account Settings",
        url: "/accounts/settings/",
      },
      {
        text: "Ideas",
        url: "/ideas",
      },
      {
        text: "ScratchTools",
        page: "settings",
      },
    ]
      .filter((result) => window.location.pathname !== result.url)
      .filter((result) => result.text.toLowerCase().includes(query || ""));
    results.length = 5;
    return results;
  }
}

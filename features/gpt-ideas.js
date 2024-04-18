if (window.location.href.includes("https://scratch.mit.edu/ideas")) {
  var div = document.createElement("div");
  div.className = "tips-getting-started scratchtools generator";
  div.innerHTML =
    '<div class="inner"><section class="flex-row tips-info-section tips-left"><div class="ideas-image"></div><div><h2><span>Idea Generator</span></h2><p><span>If you need project ideas, use the ScratchTools idea generator!</span></p><a><button class="button ideas-button"><span>Generate</span></button></a></div></section></div>';
  if (document.querySelector("div.scratchtools.generator") === null) {
    document.querySelector("main#view").firstChild.prepend(div);
    document
      .querySelector("main#view")
      .prepend(document.querySelector("div.banner-wrapper"));
    document.querySelector("div.scratchtools.generator").onclick = function () {
      generateIdea();
    };
  }
}

function generategpt() {
  e
}

  ScratchTools.modals.create({
    title: "Idea",
    description:
      test,
  });
}

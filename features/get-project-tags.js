function addTags() {
  if (document.querySelector(".scratchtoolsTagMain") === null) {
    var allTags = [];
    document.querySelectorAll(".project-description").forEach(function (e) {
      e.querySelectorAll("a").forEach(function (el) {
        if (
          el.href.startsWith("https://scratch.mit.edu/search/projects?q=") &&
          el.textContent.startsWith("#")
        ) {
          if (!allTags.includes(el.textContent.toLowerCase())) {
            allTags.push(el);
          }
        }
      });
    });
    console.log(allTags.length);
    if (allTags.length !== 0) {
      var div = document.createElement("div");
      div.className = "description-block scratchtoolsTagMain";
      var divTop = document.createElement("div");
      divTop.className = "project-textlabel";
      var span = document.createElement("span");
      span.textContent = "Tags";
      div.appendChild(divTop);
      divTop.appendChild(span);
      var divBottom = document.createElement("div");
      divBottom.style.textAlign = "left";
      divBottom.className = "project-description";
      divBottom.style.overflowWrap = "anywhere";
      div.appendChild(divBottom);
      document.querySelector(".flex-row.project-notes").appendChild(div);
      allTags.forEach(function (el) {
        var miniDiv = document.createElement("a");
        miniDiv.className = "scratchtoolsTag";
        miniDiv.textContent = el.textContent.toLowerCase();
        miniDiv.href = el.href;
        miniDiv.style.color = "white";
        miniDiv.style.padding = "0.1rem";
        miniDiv.style.backgroundColor = "#855cd6";
        miniDiv.style.margin = "0.3rem";
        miniDiv.style.borderRadius = "0.3rem";
        divBottom.appendChild(miniDiv);
      });
    }
  }
}
ScratchTools.waitForElements(".flex-row.project-notes", addTags, "tags", false);

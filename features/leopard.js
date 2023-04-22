ScratchTools.waitForElements(
  '[class^="menu_menu_"]',
  function (el) {
    if (allowOpenAsJavascript) {
      if (el.firstChild.firstChild.textContent === "New") {
        var li = document.createElement("li");
        li.className = el.lastChild.className + " scratchtoolsOpenJs";
        li.innerHTML = "<span>Open as JavaScript</span>";
        li.addEventListener("click", async function () {
          if (confirm("Are you sure? Make sure you save your project first!")) {
            ScratchTools.modals.create({
              title: "Loading project...",
              description: "It may take a minute to load. When it's done, you'll be taken to the page."
            })
            var response = await fetch(
              `https://scratchtools.app/leopard/${window.location.href
                .toLowerCase()
                .replace("https://scratch.mit.edu/projects/", "")
                .replaceAll("/", "")
                .replace("editor", "")}/`
            );
            var data = await response.json();
            if (data.url !== undefined) {
              window.location.href = data.url;
            }
          }
        });
        el.appendChild(li);
      }
    }
  },
  "open as javascript",
  false
);
var allowOpenAsJavascript = true;
ScratchTools.setDisable("leopard", function () {
  allowOpenAsJavascript = false;
  if (document.querySelector(".scratchtoolsOpenJs")) {
    document.querySelector(".scratchtoolsOpenJs").remove();
  }
});

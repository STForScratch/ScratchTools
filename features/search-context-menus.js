var loadContextMenuSearch = true;

ScratchTools.waitForElements(
  ".blocklyContextMenu",
  function (el) {
    if (
      !el.querySelector(".scratchtools-search-contextmenu") &&
      loadContextMenuSearch
    ) {
      el.style.maxHeight = "none";
      var input = document.createElement("input");
      input.type = "search";
      input.placeholder = "Search menu";
      input.className = "scratchtools-search-contextmenu";
      el.prepend(input);
      el.style.minWidth = el.offsetWidth.toString() + "px";
      el.querySelectorAll(".goog-menuitem").forEach(function (option) {
        option.classList.add("scratchtools-contextmenu-shown");
      });
      input.addEventListener("keydown", function (e) {
        if (document.activeElement === input) {
          if (e.which === 13) {
            var mouseUpStart = document.createEvent("MouseEvents");
            mouseUpStart.initEvent("mouseup", true, true);
            el.querySelector(
              ".goog-menuitem.scratchtools-contextmenu-shown"
            ).dispatchEvent(mouseUpStart);
          }
        }
      });
      input.addEventListener("input", function () {
        if (input.value === "") {
          el.querySelectorAll(".goog-menuitem").forEach(function (option) {
            option.style.display = null;
            option.classList.add("scratchtools-contextmenu-shown");
            option.classList.remove("scratchtools-contextmenu-hidden");
          });
        } else {
          el.querySelectorAll(".goog-menuitem").forEach(function (option) {
            if (
              option.innerText
                .replaceAll(" ", "")
                .toLowerCase()
                .includes(input.value.replaceAll(" ", "").toLowerCase())
            ) {
              option.style.display = null;
              option.classList.add("scratchtools-contextmenu-shown");
              option.classList.remove("scratchtools-contextmenu-hidden");
            } else {
              option.style.display = "none";
              option.classList.add("scratchtools-contextmenu-hidden");
              option.classList.remove("scratchtools-contextmenu-shown");
            }
          });
        }
      });
      document.addEventListener("mouseup", focusOnInput);
      function focusOnInput() {
        input.focus();
        document.removeEventListener("mouseup", focusOnInput);
      }
    }
  },
  "search-context-menus",
  false
);

var style = ScratchTools.styles.add(`
      .scratchtools-search-contextmenu {
              font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      width: calc(100% - 28px);
      outline: 0px;
      border: 0px;
      padding-left: 28px;
      margin-bottom: 5px;
      }
  `);

ScratchTools.setDisable("search-context-menus", function () {
  style.remove();
  document.querySelectorAll(".goog-menuitem").forEach(function (option) {
    option.classList.remove("scratchtools-contextmenu-shown");
    option.classList.remove("scratchtools-contextmenu-hidden");
    option.style.display = null;
  });
  if (document.querySelector(".scratchtools-search-contextmenu")) {
    document.querySelector(".scratchtools-search-contextmenu").remove();
  }
  loadContextMenuSearch = false;
});

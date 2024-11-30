function checkForContextMenu() {
  if (
    document.querySelector(".scratchtools.deleteall") === null &&
    document.querySelector(
      "nav.react-contextmenu.react-contextmenu--visible"
    ) !== null
  ) {
    var div = document.createElement("div");
    div.className =
      `react-contextmenu-item ${scratchClass("context-menu_menu-item_")} ${scratchClass("context-menu_menu-item-bordered_")} ${scratchClass("context-menu_menu-item-danger_")} scratchtools deleteall`;
    div.role = "menuitem";
    div.tabindex = "-1";
    div.arialDisabled = "false";
    div.innerHTML = `<span>delete all</span>`;
    document
      .querySelector("nav.react-contextmenu.react-contextmenu--visible")
      .appendChild(div);
    div.onclick = function () {
      var shouldI = confirm(
        "Are you sure you want to delete all sprites in the project?"
      );
      if (shouldI) {
        deleteAllSprites();
      }
    };
  } else {
  }
  setTimeout(checkForContextMenu, 200);
}
checkForContextMenu();

function deleteAllSprites() {
  ScratchTools.Scratch.vm.runtime.targets.forEach(function (el) {
    if (!el.isStage) {
      ScratchTools.Scratch.vm.deleteSprite(el.id);
    }
  });
}
if (
  window.location.href.includes("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  checkForContextMenu();
}

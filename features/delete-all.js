function checkForContextMenu() {
  if (
    document.querySelector(".scratchtools.deleteall") === null &&
    document.querySelector(
      "nav.react-contextmenu.react-contextmenu--visible"
    ) !== null
  ) {
    var div = document.createElement("div");
    div.className =
      "react-contextmenu-item context-menu_menu-item_3cioN context-menu_menu-item-bordered_29CJG context-menu_menu-item-danger_1tJg0 scratchtools deleteall";
    div.role = "menuitem";
    div.tabindex = "-1";
    div.arialDisabled = "false";
    div.textContent = "delete all";
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

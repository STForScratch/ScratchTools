if (
  window.location.href.startsWith("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  function checkForNavForTurbowarp() {
    if (document.querySelector("div.scratchtoolsTurbowarp") === null) {
      if (document.querySelector(".menu-bar_main-menu_3wjWH") !== null) {
        waitForNavForTurbowarp.disconnect();
        var outerDiv = document.createElement("div");
        outerDiv.className =
          "menu-bar_menu-bar-item_oLDa- scratchtoolsTurbowarp";
        var a = document.createElement("a");
        a.href = window.location.href.replace(
          "https://scratch.mit.edu/projects/",
          "https://turbowarp.org/"
        );
        var outerSpan = document.createElement("span");
        outerSpan.className =
          "button_outlined-button_1bS__ menu-bar_menu-bar-button_3IDN0 community-button_community-button_2Lo_g";
        outerSpan.role = "button";
        var img = document.createElement("img");
        img.draggable = false;
        img.src =
          "https://dashboard.snapcraft.io/site_media/appmedia/2021/02/512x512_Q3PveGU.png";
        img.className =
          "community-button_community-button-icon_1IFvv button_icon_77d8G";
        outerSpan.appendChild(img);
        var innerDiv = document.createElement("div");
        innerDiv.className = "button_content_3jdgj";
        var innerSpan = document.createElement("span");
        innerSpan.style.color = "white";
        innerSpan.textContent = "Open in TurboWarp";
        innerDiv.appendChild(innerSpan);
        outerSpan.appendChild(innerDiv);
        a.appendChild(outerSpan);
        outerDiv.appendChild(a);
        document
          .querySelector(".menu-bar_main-menu_3wjWH")
          .appendChild(outerDiv);
      }
    }
  }
  var waitForNavForTurbowarp = new MutationObserver(checkForNavForTurbowarp);
  waitForNavForTurbowarp.observe(document.querySelector("body"), {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

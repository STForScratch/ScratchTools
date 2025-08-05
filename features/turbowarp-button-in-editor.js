if (
  window.location.href.startsWith("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  function checkForNavForTurbowarp() {
    if (document.querySelector("div.scratchtoolsTurbowarp") === null) {
      if (document.querySelector("[class^='menu-bar_main-menu_']") !== null) {
        waitForNavForTurbowarp.disconnect();
        var outerDiv = document.createElement("div");
        outerDiv.className =
          scratchClass("menu-bar_menu-bar-item_") + " scratchtoolsTurbowarp";
        var a = document.createElement("a");
        a.addEventListener("click", async function () {
          let projectToken = (
            await (
              await fetch(
                `https://api.scratch.mit.edu/projects/${
                  window.location.pathname.split("/")[2]
                }?avoid_cache=${Date.now()}`,
                {
                  headers: {
                    "x-token": ScratchTools.Auth.user.token,
                  },
                }
              )
            ).json()
          ).project_token;
          window.location.href =
            window.location.href.replace(
              "https://scratch.mit.edu/projects/",
              "https://turbowarp.org/"
            ) +
            "?token=" +
            projectToken;
        });
        var outerSpan = document.createElement("span");
        outerSpan.className =
          `${scratchClass("button_outlined-button_")} ${scratchClass("menu-bar_menu-bar-button_")} ${scratchClass("community-button_community-button_")}`;
        outerSpan.role = "button";
        var img = document.createElement("img");
        img.draggable = false;
        img.src =
          "https://dashboard.snapcraft.io/site_media/appmedia/2021/02/512x512_Q3PveGU.png";
        img.className =
          `${scratchClass("community-button_community-button-icon_")} ${scratchClass("button_icon_")}`;
        outerSpan.appendChild(img);
        var innerDiv = document.createElement("div");
        innerDiv.className = scratchClass("button_content_");
        var innerSpan = document.createElement("span");
        innerSpan.style.color = "white";
        innerSpan.textContent = "Open in TurboWarp";
        innerDiv.appendChild(innerSpan);
        outerSpan.appendChild(innerDiv);
        a.appendChild(outerSpan);
        outerDiv.appendChild(a);
        document
          .querySelector("[class^='menu-bar_main-menu_']")
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

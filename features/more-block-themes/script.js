export default async function ({ feature, console }) {
  let CIRCLE = await (await fetch(feature.self.getResource("circle"))).text();

  let COLORS = document.createElement("link")
  COLORS.rel = "stylesheet"
  COLORS.href = feature.self.getResource("colors")
  COLORS.disabled = true

  ScratchTools.waitForElements("head", function() {
    document.head.appendChild(COLORS)
  })

  let THEMES = [
    {
      name: feature.msg("theme-dark"),
      id: "dark",
    },
    {
      name: feature.msg("theme-transparent"),
      id: "transparent",
    },
    {
      name: feature.msg("theme-ultradark"),
      id: "ultradark",
    },
  ];

  let firstTheme = await ScratchTools.storage.get("currentBlockTheme");
  if (firstTheme) {
    let css = await (await fetch(feature.self.getResource(firstTheme))).text();

    feature.traps.gui().theme.theme = "default";
    feature.traps.vm.emitWorkspaceUpdate();

    let style = document.createElement("style");
    style.className = "ste-custom-block-style";
    style.textContent = css;
    document.body.appendChild(style);
    COLORS.disabled = false
  }

  let OTHER_CATEGORIES = [
    "Music",
    "Pen",
    "Makey Makey",
    "Video Sensing",
    "Translate",
    "Text to Speech",
    "micro:bit",
    "LEGO MINDSTORMS EV3",
    "LEGO BOOST",
    "LEGO Education WeDo 2.0",
    "Go Direct Force & Acceleration",
  ];

  ScratchTools.waitForElements("g.blocklyDraggable", function (block) {
    if (
      Blockly.getMainWorkspace().getBlockById(block.dataset.id)?.type ===
      "sensing_of"
    ) {
      block.dataset.category = "sensing";
    } else if (
      block.dataset.category &&
      OTHER_CATEGORIES.includes(block.dataset.category)
    ) {
      block.dataset.type = "other";
    } else if (
      Blockly.getMainWorkspace().getBlockById(block.dataset.id)?.category_
    ) {
      block.dataset.category = Blockly.getMainWorkspace().getBlockById(
        block.dataset.id
      ).category_;
    } else if (
      (block.dataset.category =
        Blockly.getMainWorkspace().getBlockById(block.dataset.id).type ===
        "event_whenbackdropswitchesto")
    ) {
      block.dataset.category = "events";
    }
  });

  ScratchTools.waitForElements(
    "ul[class*='menu_menu_'][class*='menu_right_']",
    async function (ul) {
      if (
        ul.parentNode?.previousSibling?.previousSibling?.className.startsWith(
          "settings-menu_dropdown-label_"
        )
      ) {
        let list = ul.children[1].lastChild.firstChild;

        if (list.querySelector(".ste-custom")) return;

        let selected = list.querySelector(
          "img[class*='settings-menu_selected_']"
        );
        let SELECTED_CLASS = [...selected.classList].find((el) =>
          el.startsWith("settings-menu_selected_")
        );

        list.querySelectorAll("li").forEach(function (el) {
          el.addEventListener("click", async function () {
            await ScratchTools.storage.set({
              key: "currentBlockTheme",
              value: null,
            });
            document.querySelector(".ste-custom-block-style")?.remove();
            COLORS.disabled = true
          });
        });

        let current = await ScratchTools.storage.get("currentBlockTheme");

        for (var i in THEMES) {
          let css = await (
            await fetch(feature.self.getResource(THEMES[i].id))
          ).text();

          let li = document.createElement("li");
          li.dataset.id = THEMES[i].id;
          li.className = "menu_menu-item_3EwYA menu_hoverable_3u9dt ste-custom";

          let div = document.createElement("div");
          div.className = "settings-menu_option_3rMur";

          let check = document.createElement("img");
          check.className = "settings-menu_check_3ssaq";
          check.src = feature.self.getResource("check");

          let img = document.createElement("span");
          img.innerHTML = CIRCLE.replaceAll("-fill", "-circle-fill" + THEMES[i].id).replaceAll("-stroke", "-circle-stroke-" + THEMES[i].id);
          img.className = "settings-menu_icon_3QaRk";

          let circleCSS = document.createElement("style");
          circleCSS.textContent = css.replaceAll("-fill", "-circle-fill" + THEMES[i].id).replaceAll("-stroke", "-circle-stroke-" + THEMES[i].id)
          img.firstChild.prepend(circleCSS);

          if (current === THEMES[i].id) {
            list
              .querySelector("." + SELECTED_CLASS)
              .classList?.remove(SELECTED_CLASS);
            check.classList.add(SELECTED_CLASS);
          }

          let span = document.createElement("span");
          span.textContent = THEMES[i].name;

          div.append(check, img, span);
          li.appendChild(div);
          list.appendChild(li);

          li.addEventListener("click", async function () {
            list
              .querySelector("." + SELECTED_CLASS)
              .classList?.remove(SELECTED_CLASS);
            this.querySelector("img").classList.add(SELECTED_CLASS);

            feature.traps.gui().theme.theme = "default";
            feature.traps.vm.emitWorkspaceUpdate();
            feature.traps.gui().menus.settingsMenu = false;

            await ScratchTools.storage.set({
              key: "currentBlockTheme",
              value: this.dataset.id,
            });

            let style = document.createElement("style");
            style.className = "ste-custom-block-style";
            style.textContent = css;
            document.body.appendChild(style);

            COLORS.disabled = false
          });
        }
      }
    }
  );
}

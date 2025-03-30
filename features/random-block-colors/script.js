export default async function ({ feature, console }) {
  const COLORS = [
    {
      name: "motion",
      primary: "#4C97FF",
      secondary: "#4280D7",
      quaternary: "#3373CC",
      tertiary: "#3373CC",
    },
    {
      name: "looks",
      primary: "#9966FF",
      secondary: "#855CD6",
      quaternary: "#774DCB",
      tertiary: "#774DCB",
    },
    {
      name: "sounds",
      primary: "#CF63CF",
      secondary: "#C94FC9",
      quaternary: "#BD42BD",
      tertiary: "#BD42BD",
    },
    {
      name: "control",
      primary: "#FFAB19",
      secondary: "#EC9C13",
      quaternary: "#CF8B17",
      tertiary: "#CF8B17",
    },
    {
      name: "event",
      primary: "#FFBF00",
      secondary: "#E6AC00",
      quaternary: "#CC9900",
      tertiary: "#CC9900",
    },
    {
      name: "sensing",
      primary: "#5CB1D6",
      secondary: "#47A8D1",
      quaternary: "#2E8EB8",
      tertiary: "#2E8EB8",
    },
    {
      name: "pen",
      primary: "#0fBD8C",
      secondary: "#0DA57A",
      quaternary: "#0B8E69",
      tertiary: "#0B8E69",
    },
    {
      name: "operators",
      primary: "#59C059",
      secondary: "#46B946",
      quaternary: "#389438",
      tertiary: "#389438",
    },
    {
      name: "data",
      primary: "#FF8C1A",
      secondary: "#FF8000",
      quaternary: "#DB6E00",
      tertiary: "#DB6E00",
    },
    {
      name: "data_lists",
      primary: "#FF661A",
      secondary: "#FF5500",
      quaternary: "#E64D00",
      tertiary: "#E64D00",
    },
    {
      name: "more",
      primary: "#FF6680",
      secondary: "#FF4D6A",
      quaternary: "#FF3355",
      tertiary: "#FF3355",
    },
  ];

  let activeColors = COLORS;

  function updateColors() {
    let newBlockColors = JSON.parse(JSON.stringify(COLORS));
    randomizeArray(newBlockColors);

    for (var i in newBlockColors) {
      delete newBlockColors[i].name;
    }

    for (var i in COLORS) {
      let newColors = newBlockColors[i];
      Object.keys(newColors).forEach(function (colorType) {
        ScratchTools.traps.getScratchBlocks().Colours[COLORS[i].name][
          colorType
        ] = newColors[colorType];
      });
      newBlockColors[i].name = COLORS[i].name;
    }

    activeColors = newBlockColors;

    updateBlocks();
    updateToolbar();
  }

  ScratchTools.waitForElements(
    "img[class^='green-flag_green-flag_']",
    function (flag) {
      flag.addEventListener("click", updateColors);
    }
  );

  function updateToolbar() {
    for (var i in activeColors) {
      let newCategoryName = activeColors[i].name
        .replaceAll("data", "variables")
        .replaceAll("event", "events")
        .replaceAll("sounds", "sound")
        .replaceAll("more", "myBlocks");
      if (
        document.querySelector(
          `div.scratchCategoryId-${newCategoryName} .scratchCategoryItemBubble`
        )
      ) {
        document.querySelector(
          `div.scratchCategoryId-${newCategoryName} .scratchCategoryItemBubble`
        ).style.backgroundColor = activeColors[i].primary;
        document.querySelector(
          `div.scratchCategoryId-${newCategoryName} .scratchCategoryItemBubble`
        ).style.borderColor = activeColors[i].secondary;
      }
    }
  }

  ScratchTools.waitForElements(".scratchCategoryMenuItem", function (item) {
    let colorValues = activeColors.find(
      (el) =>
        el.name ===
        item.className
          .split("scratchCategoryId-")[1]
          .split(" ")[0]
          .replaceAll("variables", "data")
          .replaceAll("events", "event")
          .replaceAll("myBlocks", "more")
          .replaceAll("sound", "sounds")
    );
    if (colorValues && item.querySelector(".scratchCategoryItemBubble")) {
      item.querySelector(".scratchCategoryItemBubble").style.backgroundColor =
        colorValues.primary;
      item.querySelector(".scratchCategoryItemBubble").style.borderColor =
        colorValues.secondary;
    }
  });

  window.updateColors = updateColors;

  function randomizeArray(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  function updateBlocks() {
    let blocks = feature.traps.blocks();
    let workspace = Blockly.getMainWorkspace();

    let toolbox = workspace.getToolbox();
    let flyout = workspace.getFlyout();

    blocks.Events.disable();
    blocks.Xml.clearWorkspaceAndLoadFromXml(
      blocks.Xml.workspaceToDom(workspace),
      workspace
    );

    if (flyout) {
      let flyoutWorkspace = flyout.getWorkspace();
      blocks.Xml.clearWorkspaceAndLoadFromXml(
        blocks.Xml.workspaceToDom(flyoutWorkspace),
        flyoutWorkspace
      );
    }

    let selectedItemId = toolbox.getSelectedItem().id_;
    if (blocks.registry) {
      toolbox.render(workspace.options.languageTree);
      toolbox.selectItem_(null, toolbox.contents.get(selectedItemId));
    } else {
      toolbox.categoryMenu_.populate(workspace.options.languageTree);
      toolbox.selectCategoryById(selectedItemId, false);
    }
    toolbox.refreshSelection();
    workspace.toolboxRefreshEnabled_ = true;

    blocks.Events.enable();
  }

  ScratchTools.waitForElements(
    "ul[class*='menu_menu_'][class*='menu_right_']",
    async function (ul) {
      if (
        ul.parentNode?.previousSibling?.previousSibling?.className.startsWith(
          "settings-menu_dropdown-label_"
        )
      ) {
        let CIRCLE = await (
          await fetch(feature.self.getResource("circle"))
        ).text();
        let css = await (
          await fetch(feature.self.getResource("colors"))
        ).text();
        let list = ul.children[1].lastChild.firstChild;

        if (list.querySelector(".ste-custom-april")) return;

        let selected = list.querySelector(
          "img[class*='settings-menu_selected_']"
        );
        let SELECTED_CLASS = [...selected.classList].find((el) =>
          el.startsWith("settings-menu_selected_")
        );

        list.querySelectorAll("li:not(.ste-custom)").forEach(function (el) {
          el.remove();
        });

        let li = document.createElement("li");
        li.dataset.id = "ste-custom-april";
        li.className = `${scratchClass("menu_menu-item_")} ${scratchClass(
          "menu_hoverable_"
        )} ste-custom-april`;

        let div = document.createElement("div");
        div.className = scratchClass("settings-menu_option_");

        let check = document.createElement("img");
        check.className = scratchClass("settings-menu_check_");
        check.src = feature.self.getResource("check");

        let img = document.createElement("span");
        img.innerHTML = CIRCLE.replaceAll(
          "-fill",
          "-circle-fill" + "ste-custom-april"
        ).replaceAll("-stroke", "-circle-stroke-" + "ste-custom-april");
        img.className = scratchClass("settings-menu_icon_");

        let circleCSS = document.createElement("style");
        circleCSS.textContent = css
          .replaceAll("-fill", "-circle-fill" + "ste-custom-april")
          .replaceAll("-stroke", "-circle-stroke-" + "ste-custom-april");
        img.firstChild.prepend(circleCSS);

        check.classList.add(SELECTED_CLASS);

        let span = document.createElement("span");
        span.textContent = "Random Colors";

        div.append(check, img, span);
        li.appendChild(div);
        list.appendChild(li);
      }
    }
  );
}

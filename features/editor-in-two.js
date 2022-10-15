if (
  window.location.href.startsWith("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  var style = document.createElement("style");
  style.innerHTML = `
.gui_flex-wrapper_uXHkj {
  flex-direction: row-reverse !important;
}
.target-pane_target-pane_3S5E6 {
  flex-direction: row-reverse !important;
}
[dir="ltr"] .sprite-selector_sprite-selector_2KgCX {
  margin-left: calc(0.5rem / 2) !important;
  margin-right: 0 !important;
}
.target-pane_stage-selector-wrapper_qekSW {
  margin-left: 0 !important;
  margin-right: calc(0.5rem / 2) !important;
}

.stage-header_stage-menu-wrapper_15JJt {
  flex-direction: row-reverse !important;
}

.blocklyMainBackground {
    fill: #dddede !important;
}
.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp {
background-color: #9c9ea2;
}

.delete-button_delete-button_2Nzko.sprite-selector-item_delete-button_1rkFW {
left: -.625rem;
right: inherit !important;
}

.sprite-selector-item_sprite-info_-I0i_ {
background: none !important;
color: hsla(225, 15%, 40%, 1) !important;
}

.react-contextmenu-wrapper.sprite-selector_sprite_21WnR.sprite-selector-item_sprite-selector-item_kQm-i.sprite-selector-item_is-selected_24tQj {
box-shadow: none;
-webkit-box-shadow: none;
}

.stage_stage_1fD7k.box_box_2jjDp {
    border-radius: 0px;
}

.stage-header_stage-menu-wrapper_15JJt.box_box_2jjDp {
    background-color: #eaecec;
}

.gui_body-wrapper_-N0sA, .sprite-selector_sprite-selector_2KgCX.box_box_2jjDp {
    background-color: #e6e8e8;
}

.sprite-info_sprite-info_3EyZh.box_box_2jjDp {
display: none;
}

.input_input-form_l9eYg.project-title-input_title-field_en5Gd.menu-bar_title-field-growable_3qr4G:placeholder {
color: hsla(225, 15%, 40%, 1) !important;
}

.input_input-form_l9eYg.project-title-input_title-field_en5Gd.menu-bar_title-field-growable_3qr4G {
color: hsla(225, 15%, 40%, 1) !important;
}
`;
  document.querySelector("html").appendChild(style);

  function GM_addStyle(text) {
    var style = document.createElement("style");
    style.innerHTML = text;
    document.body.appendChild(style);
  }
  //Procedures
  GM_addStyle(
    " path.blocklyBlockBackground[stroke='#FF3355'], .blocklyBlockBackground[stroke='#FF3355']{fill:#6d30a4 !important; stroke: #8a55d7 !important; stroke-width: 1px;} g[data-shapes='argument round'] > path.blocklyPath[fill='#FF6680']{fill: #6d30a4 !important;} path.blocklyPath[fill='#FF3355'][data-argument-type='boolean']{fill: #8357AC !important;}"
  );
  //Motion
  GM_addStyle(
    "g[data-category=motion] > path.blocklyBlockBackground{fill:#4a6cd4;}.blocklyDropDownDiv[data-category=motion]{background:#4a6cd4 !important;}"
  );
  //Looks
  GM_addStyle(
    "g[data-category=looks] > path.blocklyBlockBackground{fill:#8a55d7;}.blocklyDropDownDiv[data-category=looks]{background:#8a55d7 !important;}"
  );
  //Sound & Music
  GM_addStyle(
    "g[data-category=sounds] > path.blocklyBlockBackground,g[data-category=Music] > path.blocklyBlockBackground, g[data-category=Music] > g[data-shapes=round] > path.blocklyPath.blocklyBlockBackground {fill:#bb42c3; stroke:#99489e !important;}.blocklyDropDownDiv[data-category=sounds], .blocklyDropDownDiv[data-category=Music]{background:#bb42c3 !important; border-color: #99489e !important;} line[stroke='#0DA57A'] {stroke: white !important;} path[stroke='#0B8E69']:not(g[data-category='Pen'] > path.blocklyBlockBackground){stroke: #99489e !important;}"
  );
  //Events
  GM_addStyle(
    "g[data-category=events] > path.blocklyBlockBackground, .blocklyPath[fill='#FFBF00']{fill:#c88330;}.blocklyDropDownDiv[data-category=events], .blocklyPath[fill='#FFBF00'].blocklyDropDownDiv[data-category=events] /*Commented out for now, as this causes some issues ,.blocklyDropDownDiv[data-category=null]*/{background:#c88330 !important;}"
  );
  //Control
  GM_addStyle(
    "g[data-category=control] > path.blocklyBlockBackground{fill:#e1a91a;}.blocklyDropDownDiv[data-category=control]{background:#e1a91a !important;}"
  );
  //Sensing
  GM_addStyle(
    "g[data-category=sensing] > path.blocklyBlockBackground, .blocklyPath[fill='#5CB1D6'] {fill:#2ca5e2;}.blocklyDropDownDiv[data-category=sensing]{background:#2ca5e2 !important;}"
  );
  //Operators
  GM_addStyle(
    "g[data-category=operators] > path.blocklyBlockBackground{fill:#5cb712;}.blocklyDropDownDiv[data-category=operators]{background:#5cb712 !important;}"
  );
  //Pen
  GM_addStyle(
    "g[data-category=Pen] > path.blocklyBlockBackground{fill:#00a375; stroke: #009365}.blocklyDropDownDiv[data-category=Pen]{background:#00a375 !important;}"
  );
  //Data
  GM_addStyle(
    "g[data-category=data] > path.blocklyBlockBackground{fill:#ee7d16;}.blocklyDropDownDiv[data-category=data]{background:#ee7d16 !important;}"
  );
  //Lists
  GM_addStyle(
    "g[data-category=data-lists] > path.blocklyBlockBackground{fill:#d36518;}.blocklyDropDownDiv[data-category=data-lists]{background:#d36518 !important;}"
  );
  //Text Inputs
  GM_addStyle(
    "g[data-shapes='argument round']path.blocklyBlockBackground, path[fill='#ffffff']{fill: white; stroke-width: 1px;}"
  );
  //Make dropdowns stand out
  GM_addStyle(
    "g[data-argument-type='dropdown'] path.blocklyBlockBackground, g[data-argument-type='variable'] path.blocklyBlockBackground, rect.blocklyBlockBackground{fill: #55555555;}"
  );
  //Make color previews continue to work
  GM_addStyle(
    "g[data-argument-type='colour']path.blocklyBlockBackground{fill: initial;}"
  );
  //Make category colors match the block colors
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(1) > div:nth-child(1) > div:nth-child(1) {background: #4a6cd4 !important; border-color: #4e64aa !important;}"
  );
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(2) > div:nth-child(1) > div:nth-child(1) {background: #8a55d7 !important;}"
  );
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(3) > div:nth-child(1) > div:nth-child(1) {background: #bb42c3 !important;}"
  );
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(4) > div:nth-child(1) > div:nth-child(1) {background: #c88330 !important;}"
  );
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(5) > div:nth-child(1) > div:nth-child(1) {background: #e1a91a !important;}"
  );
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(6) > div:nth-child(1) > div:nth-child(1) {background: #2ca5e2 !important;}"
  );
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(7) > div:nth-child(1) > div:nth-child(1) {background: #5cb712 !important;}"
  );
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(8) > div:nth-child(1) > div:nth-child(1) {background: #ee7d16 !important;}"
  );
  GM_addStyle(
    "div.scratchCategoryMenuRow:nth-child(9) > div:nth-child(1) > div:nth-child(1) {background: #6d30a4 !important; border-color: #a249f3 !important;}"
  );
  //Various fixes
  GM_addStyle(
    ".removableTextInput, .blocklyWidgetDiv, .fieldTextInput {border-color: #ffffff66;"
  );
  GM_addStyle(".valueReportBox{color: #bfbfbf;}");
  GM_addStyle(
    ".blocklyWidgetDiv .fieldTextInput {border-color: #55555555;} g[data-shapes='argument round'] > .blocklyPath[stroke='#FF3355']{fill: white !important;}"
  );
  GM_addStyle(
    "g[data-argument-type='dropdown'] path.blocklyBlockBackground, g[data-shapes='argument round'] > .blocklyPath.blocklyBlockBackground {stroke: #55555555;} "
  );

  function rgb2hsl(rgb) {
    const r = ((rgb >> 16) & 0xff) / 0xff;
    const g = ((rgb >> 8) & 0xff) / 0xff;
    const b = (rgb & 0xff) / 0xff;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (min === max) {
      return [0, 0, r * 100];
    }

    const c = max - min;
    const l = (min + max) / 2;
    const s = c / (1 - Math.abs(2 * l - 1));

    var h;
    switch (max) {
      case r:
        h = ((g - b) / c + 6) % 6;
        break;
      case g:
        h = (b - r) / c + 2;
        break;
      case b:
        h = (r - g) / c + 4;
        break;
    }
    h *= 60;

    return [h, s * 100, l * 100];
  }

  document.body.addEventListener(
    "mousedown",
    function (e) {
      if (e.button !== 2) {
        return;
      }

      const widgetDiv = document.querySelector(".blocklyWidgetDiv");
      if (!widgetDiv) {
        return;
      }

      if (
        e.target.closest(".blocklyMainBackground") ||
        e.target.closest(".blocklyBubbleCanvas")
      ) {
        widgetDiv.classList.remove("u-contextmenu-colored");
        return;
      }

      const block = e.target.closest(".blocklyDraggable");
      if (!block) {
        return;
      }

      const background = block.querySelector(".blocklyBlockBackground");
      if (!background) {
        return;
      }

      const fill = background.getAttribute("fill");
      if (!fill) {
        return;
      }

      const fillHex = fill.substr(1);
      const rgb = parseInt(fillHex, 16);
      const hsl = rgb2hsl(rgb);
      hsl[2] = Math.max(hsl[2] - 15, 0);
      const border = "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)";

      widgetDiv.classList.add("u-contextmenu-colored");
      widgetDiv.style.setProperty("--u-contextmenu-bg", fill);
      widgetDiv.style.setProperty("--u-contextmenu-border", border);
    },
    true
  );

  GM_addStyle(`
.u-contextmenu-colored .blocklyContextMenu {
  background-color: var(--u-contextmenu-bg);
  border-color: var(--u-contextmenu-border);
}
.u-contextmenu-colored .blocklyContextMenu .goog-menuitem {
  color: white;
}
.u-contextmenu-colored .blocklyContextMenu .goog-menuitem:hover.goog-menuitem-highlight {
  border-color: transparent;
}
.u-contextmenu-colored .blocklyContextMenu .goog-menuitem:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.sound-editor_waveform-container_1x_b1 {
    background: none;
}

.waveform_waveform-path_TskyB {
    fill: #282929;
    stroke: none;
}

.icon-button_container_278u5.sound-editor_effect-button_2zuzT > img {
    filter: brightness(0%);
}

.sprite-selector-item_number_AnXUk {
    right: 0.15rem;
left: inherit !important;
}
`);
  function addOtherAttributes() {
    if (
      document.querySelector(
        ".menu-bar_menu-bar-item_oLDa-.menu-bar_growable_1sHWN"
      ) !== null &&
      document.querySelector(
        ".stage-header_stage-menu-wrapper_15JJt.box_box_2jjDp"
      ) !== null &&
      document.querySelector(
        ".input_input-form_l9eYg.project-title-input_title-field_en5Gd.menu-bar_title-field-growable_3qr4G"
      ) !== null
    ) {
      waitForEditorNavBarForTwo.disconnect();
      try {
        document
          .querySelector(".stage-header_stage-menu-wrapper_15JJt.box_box_2jjDp")
          .insertBefore(
            document.querySelector(
              ".input_input-form_l9eYg.project-title-input_title-field_en5Gd.menu-bar_title-field-growable_3qr4G"
            ),
            document.querySelector(".stage-header_stage-size-row_14N65")
          );
        document.querySelector(
          ".input_input-form_l9eYg.project-title-input_title-field_en5Gd.menu-bar_title-field-growable_3qr4G"
        ).style.marginLeft = "0.2rem";
        document.querySelector(
          ".input_input-form_l9eYg.project-title-input_title-field_en5Gd.menu-bar_title-field-growable_3qr4G"
        ).style.marginRight = "0.2rem";
        document.querySelector(
          ".input_input-form_l9eYg.project-title-input_title-field_en5Gd.menu-bar_title-field-growable_3qr4G"
        ).style.color = "hsla(225, 15%, 40%, 1) !important";
        document.querySelector(".blocklyFlyout").width = "300";

        document.querySelector(".blocklyFlyout").transform = null;

        document.querySelector(
          ".menu-bar_scratch-logo_2uReV.menu-bar_clickable_1g3uo"
        ).src =
          "https://raw.githubusercontent.com/LLK/scratch-flash/develop/src/assets/UI/topbar/scratchlogoOff.png";
        document.querySelector(
          ".menu-bar_menu-bar-item_oLDa-.menu-bar_growable_1sHWN"
        ).style.display = "none";
      } catch (err) {}
    }
  }
  var waitForEditorNavBarForTwo = new MutationObserver(addOtherAttributes);
  waitForEditorNavBarForTwo.observe(document.querySelector("body"), {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

const fonts = ["Arial", "Helvetica", "Verdana", "Impact", "Monospace"];

function addFonts() {
  if (
    document.querySelector(".font-dropdown_" + fonts[0] + "_2fPOh") === null &&
    document.querySelector(
      "body > div.Popover.Popover-below.font-dropdown_mod-unselect_33YJN.font-dropdown_font-dropdown_3XyMU > div > div"
    ) !== null
  ) {
    function addNewFont(font) {
      var span = document.createElement("span");
      span.className = "button_button_u6SE2 font-dropdown_mod-menu-item_1wXq5";
      span.role = "button";
      var span2 = document.createElement("span");
      span2.className = "font-dropdown_" + font + "_2fPOh";
      span2.textContent = font;
      span2.style.fontFamily = font;
      span.appendChild(span2);
      span.onclick = function () {
        ScratchTools.Scratch.scratchPaint().selectedItems[0]?.setFont(font);
        document
          .querySelector(
            "#react-tabs-3 > div > div.asset-panel_detail-area_2KQhH.box_box_2jjDp > div > div.paint-editor_editor-container-top_2wxS3 > div:nth-child(2) > div.paint-editor_mod-mode-tools_2Ihob.input-group_input-group_plJaJ > div > div > div"
          )
          .click();
        document.querySelector(
          ".font-dropdown_font-dropdown_3XyMU"
        ).firstChild.textContent = font;
      };
      document
        .querySelector(
          "body > div.Popover.Popover-below.font-dropdown_mod-unselect_33YJN.font-dropdown_font-dropdown_3XyMU > div > div"
        )
        .appendChild(span);
    }
    fonts.forEach(function (el) {
      addNewFont(el);
    });
  }
}
var configure = {
  attributes: true,
  childList: true,
  subtree: true,
};
var waitForSpecialFontsSection = new MutationObserver(addFonts);
waitForSpecialFontsSection.observe(document.querySelector("body"), configure);

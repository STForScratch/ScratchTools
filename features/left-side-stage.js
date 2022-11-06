// ==UserScript==
// @name Left Side Stage for Scratch 3
// @version 0.1
// @namespace https://github.com/forkphorus/cat-plus
// @homepageURL https://github.com/forkphorus/cat-plus#readme
// @match https://scratch.mit.edu/projects/*
// @grant GM_addStyle
// ==/UserScript==

if (!document.querySelector(".scratchtoolsLeftSideStage")) {
  var style = GM_addStyle(`
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
.injectionDiv {
    border-top-right-radius: 0px !important;
    border-bottom-left-radius: .5rem !important;
    border-bottom-right-radius: 0px !important;
}

div[class^="gui_extension-button-container_"] {
    border-bottom-left-radius: .5rem !important;
}

[class^="backpack_backpack-header_"] {
    border-top-right-radius: 0px !important;
    border-top-left-radius: .5rem !important;
}
    `);
  style.className = "scratchtoolsLeftSideStage";

  ScratchTools.setDisable("left-side-stage", function () {
    document.querySelector(".scratchtoolsLeftSideStage").remove();
  });
}

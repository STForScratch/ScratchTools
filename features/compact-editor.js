// ==UserScript==
// @name Compact Editor for Scratch 3
// @description Makes the Scratch 3 editor ever so slighlty more compact.
// @version 0.1
// @namespace https://github.com/forkphorus/cat-plus
// @homepageURL https://github.com/forkphorus/cat-plus#readme
// @match https://scratch.mit.edu/projects/*
// @grant GM_addStyle
// @run-at document-end
// ==/UserScript==

var style = document.createElement("style");
style.innerHTML = `
.gui_target-wrapper_36Gbz {
  padding-top: 0.25rem !important;
}
.sprite-info_row-primary_10JrS {
  margin-bottom: 0 !important;
}
.sprite-info_sprite-input_17wjb {
  width: 5rem !important;
}
.sprite-info_larger-input_1UEs0 input {
  width: 3rem !important;
}
.sprite-info_icon-wrapper_3Wbqq {
  width: calc(1.4rem + 2px) !important;
  height: calc(1.4rem + 2px) !important;
  padding: 0.2rem !important;
}
.sprite-info_sprite-info_3EyZh {
  padding: 0.4rem !important;
  padding-bottom: 0.2rem !important;
}
div.sprite-info_row_1om5V:nth-child(1) > div:nth-child(1) > label:nth-child(1) > span:nth-child(1),
div.sprite-info_row_1om5V:nth-child(1) > div:nth-child(2) > div:nth-child(1),
div.sprite-info_row_1om5V:nth-child(1) > div:nth-child(3) > div:nth-child(1),
div.sprite-info_row_1om5V:nth-child(2) > div:nth-child(1) > label:nth-child(1),
div.sprite-info_larger-input_1UEs0:nth-child(3) > label:nth-child(1) > span:nth-child(1),
div.sprite-info_larger-input_1UEs0:nth-child(2) > label:nth-child(1) > span:nth-child(1),
div.sprite-info_row_1om5V:nth-child(1) > div:nth-child(2) > label:nth-child(2) > span:nth-child(1),
div.sprite-info_row_1om5V:nth-child(1) > div:nth-child(3) > label:nth-child(2) > span:nth-child(1),
.label_input-label_3KjCa,
.label_input-label_3KjCa {
  display: none !important;
}
div.sprite-info_row_1om5V:nth-child(2),
div.sprite-info_row_1om5V:nth-child(1) {
  display: inline-flex !important;
}
div.sprite-info_row_1om5V:nth-child(1) {
  transform: translateY(-4px) !important;
}
.sprite-selector_scroll-wrapper_3NNnc {
  height: 100% !important;
}
`;
document.body.appendChild(style);

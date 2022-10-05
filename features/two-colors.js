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

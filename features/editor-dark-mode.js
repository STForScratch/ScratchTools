if (
  window.location.href.includes("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  var style = document.createElement("style");
  style.id = "scratchtoolseditor";
  style.innerHTML = `
/* 3.Darker CSS.
Built by infinitytec. 
Version 1.8.
*/


/*3.0 Theme Userscript Framework by infinitytec. Released under the MIT license.*/
/*Set colors for the editor. Names should explain what they are. They will automatically be applied to different parts of the editor. For the purpose of simplification, the red cancel button and the hover/active/focus effects are hard-coded. The effects use filters so they should be good-to-go in most cases.*/
:root {
  --main-bg: #111111;
  --secondary-bg: #151515;
  --accent: #202020;
  --text: #bfbfbf;
  --editorDarkMode-primary-text: #ffffff;
}

/*Main UI bar, similar bars, and dropdown menu*/
.menu-bar_main-menu_3wjWH,
.modal_header_1h7ps,
.menu-bar_account-info-group_MeJZP,
.menu_menu_3k7QT,
.project-title-input_title-field_en5Gd:focus {
  background: var(--accent);
}

/*Main background*/
.gui_body-wrapper_-N0sA,
.blocklySvg {
  background: var(--main-bg);
}

/*Scripting area background*/
.blocklyMainBackground {
  fill: var(--secondary-bg) !important;
}

/*Right-click & pop-ups*/
.context-menu_context-menu_2SJM-,
.blocklyWidgetDiv .goog-menu,
.Popover-body {
  background: var(--accent) !important;
  color: var(--text) !important;
  border: 1px solid white;
}

.goog-menuitem-content,
.color-picker_row-header_173LQ {
  color: var(--text);
}

/*Highlight*/
.blocklyWidgetDiv .goog-menuitem-highlight,
.blocklyWidgetDiv .goog-menuitem-hover,
.context-menu_menu-item_3cioN:hover {
  background-color: #ffffff33 !important;
}

/*Palette*/
.blocklyFlyoutBackground {
  fill: var(--accent) !important;
}

/*Palette text*/
.blocklyFlyoutLabelText {
  fill: var(--text) !important;
}

/*Toolbox, extension connection box*/
.connection-modal_bottom-area_AHeQ3,
.connection-modal_body_3YO9j,
.blocklyToolboxDiv,
.scratchCategoryMenu {
  background: var(--accent);
  color: var(--text);
}

/*Selected category*/
.scratchCategoryMenuItem.categorySelected {
  background: #ffffff22;
}

/*Sprite and stage selection area*/
.sprite-selector_sprite-selector_2KgCX,
.stage-selector_stage-selector_3oWOr,
.stage-selector_label_1MCfr,
.stage-selector_count_2QK7D {
  background: var(--accent);
  color: var(--text);
}

.sprite-info_sprite-info_3EyZh,
.stage-selector_header_2GVr1,
.stage-selector_header-title_33xCt,
.stage-selector_header-title_33xCt,
.sprite-selector-item_sprite-selector-item_kQm-i:hover {
  background: var(--secondary-bg);
  color: var(--text);
}

/*Palette Buttons*/
.blocklyFlyoutButtonBackground {
  fill: var(--accent) !important;
}

.blocklyFlyoutButtonBackground:hover,
.blocklyFlyoutButton:hover {
  fill: var(--accent) !important;
  filter: brightness(110%) !important;
}

blocklyFlyoutButton>text.blocklyText {
  fill: var(--text) !important;
}

/*Text fill of "Make A" buttons*/
.blocklyFlyoutButton .blocklyText {
  fill: var(--text) !important;
}

/*Backpack header*/
.backpack_backpack-header_6ltCS {
  background: var(--accent);
  color: var(--text);
}

/*Backpack*/
.backpack_backpack-list-inner_10a2A {
  background: var(--secondary-bg);
}

.backpack_backpack-item_hwqzQ,
.sprite-selector-item_sprite-image-outer_Xs0wN,
.backpack_backpack-item_hwqzQ>div {
  background: var(--main-bg);
}

.backpack_backpack-item_hwqzQ img {
  mix-blend-mode: normal;
}

/*Paint & sound editor sidebar*/
.selector_list-area_1Xbj_ {
  background: var(--accent);
}

.selector_new-buttons_2qHDd::before {
  background: none;
}

/*Paint & sound editor main*/
.asset-panel_wrapper_366X0 {
  background: var(--secondary-bg);
  color: var(--text);
}

.sound-editor_effect-button_2zuzT,
.sound-editor_trim-button_lSENI {
  color: var(--text);
}

/*Paint and sound editor buttons*/
img.tool-select-base_tool-select-icon_tJ-rr,
.sound-editor_trim-button_lSENI {
  filter: brightness(2);
}

/*Sprite costume selector text*/
.selector_list-item_3N_u7,
.sprite-selector-item_sprite-name_1PXjh,
.sprite-selector-item_sprite-details_2UVpA {
  color: var(--text);
}

/*Tabs*/
.gui_tab_27Unf.gui_is-selected_sHAiu {
  background: var(--accent);
  color: var(--text);
}

.gui_tab_27Unf {
  background: var(--secondary-bg);
  color: var(--text);
}

.gui_tab_27Unf:hover {
  background: var(--accent);
  filter: brightness(90%);
  color: var(--text);
}

/*New variable/list/custom block*/
.prompt_body_18Z-I,
.custom-procedures_body_SQBv6,
div.custom-procedures_option-card_BtHt3 {
  background: var(--accent);
  color: var(--text);
}

.custom-procedures_button-row_2jBu3>button:nth-child(1),
.prompt_button-row_3Wc5Z>button:nth-child(1),
.prompt_button-row_3Wc5Z>button:nth-child(1) {
  background: #ff3a5b;
}

/*Fullscreen view*/
.stage_stage-wrapper-overlay_fmZuD,
.stage-header_stage-header-wrapper-overlay_5vfJa {
  background: black;
}

.stage_stage-overlay-content_ePv_6 {
  border: none;
}

/*Library and card backgrounds*/
.library_library-scroll-grid_1jyXm,
.modal_modal-content_1h3ll.modal_full-screen_FA4cr,
.card_step-body_2bFkf,
.card_left-card_1KpEh,
.card_right-card_3IrbD {
  background: var(--accent);
  color: var(--text);
}

/*Library items & filter bar*/
.library-item_library-item-extension_3xus9,
.library-item_library-item_1DcMO,
.library_filter-bar_1W0DW {
  background: var(--accent);
}

.library-item_library-item-extension_3xus9 span,
.library-item_featured-extension-metadata_3D8E8,
.library-item_library-item-name_2qMXu {
  color: var(--text) !important;
}

/*Text input*/
input[type=text],
.input_input-form_1Y0wX,
.prompt_variable-name-text-input_1iu8- {
  background: var(--accent);
  color: var(--text) !important;
}

input[type=text]:hover,
input[type=text]:focus {
  background: var(--accent);
  filter: brightness(90%);
}

/*Buttons (inverted for dark theme)*/
.blocklyZoom,
.stage-header_stage-button_hkl9B,
.sound-editor_round-button_3NLcW,
.sound-editor_button-group_SFPoV {
  filter: invert(100) hue-rotate(180deg);
}

/*Set the selected costume/backdrop to have a transparent background as default*/
.sprite-selector-item_is-selected_24tQj {
  background: transparent !important;
}

/*Fixing white area around the paint editor*/
.paint-editor_canvas-container_x2D0a {
  border: 1px solid var(--accent);
  overflow: hidden;
}

/*Tweaks for updated paint editor*/
.paper-canvas_paper-canvas_1y588 {
  background-color: var(--secondary-bg);
  border-radius: .4rem;
}

.paint-editor_canvas-container_x2D0a {
  border: 2px solid var(--accent);
  border-radius: .4rem;
}

/*Tweaks for users not signed in*/
.card_card_3GG7C,
.card_left-card_1KpEh,
.card_right-card_3IrbD {
  border: 1px solid hsla(216, 49%, 90%, 0.14);
}

/*Scrollbar*/
.blocklyScrollbarHandle {
  fill: #CECDCE55;
}
`;
  document.body.appendChild(style);
} else {
  if (document.querySelector("style#scratchtoolseditor") !== null) {
    document.querySelector("style#scratchtoolseditor").remove();
  }
}

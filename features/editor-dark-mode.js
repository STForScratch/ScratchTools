if (
    window.location.href.includes("https://scratch.mit.edu/projects/") &&
    window.location.href.includes("/editor")
  ) {
    var style = document.createElement("style");
    style.id = "scratchtoolseditor";
    style.innerHTML = `
    /* 3.Darker CSS.
    Built by infinitytec. 
    Version 1.8. */
  
    /*3.0 Theme Userscript Framework by infinitytec. Released under the MIT license.*/
    /*Set colors for the editor. Names should explain what they are. They will automatically be applied to different parts of the editor. 
    For the purpose of simplification, the red cancel button and the hover/active/focus effects are hard-coded. The effects use filters so they should be good-to-go in most cases.*/
    
    :root {
      --main-bg: #111111;
      --secondary-bg: #151515;
      --accent: #202020;
      --text: #bfbfbf;
      --editorDarkMode-primary-text: #ffffff;
    }
  
    /*Main UI bar, similar bars, and dropdown menu*/
    [class^="menu-bar_main-menu_"],
    [class^="modal_header_"],
    [class^="menu-bar_account-info-group_"],
    [class^="menu_menu_"],
    [class^="project-title-input_title-field_"]:focus {
      background: var(--accent);
    }
  
    /*Main background*/
    [class^="gui_body-wrapper_"],
    [class^="blocklySvg"] {
      background: var(--main-bg);
    }
  
    /*Scripting area background*/
    [class^="blocklyMainBackground"] {
      fill: var(--secondary-bg) !important;
    }
  
    /*Right-click & pop-ups*/
    [class^="context-menu_context-menu_"],
    [class^="blocklyWidgetDiv .goog-menu"],
    [class^="Popover-body"] {
      background: var(--accent) !important;
      color: var(--text) !important;
      border: 1px solid white;
    }
  
    [class^="goog-menuitem-content"],
    [class^="color-picker_row-header_"] {
      color: var(--text);
    }
  
    /*Highlight*/
    [class^="blocklyWidgetDiv .goog-menuitem-highlight"],
    [class^="blocklyWidgetDiv .goog-menuitem-hover"],
    [class^="context-menu_menu-item_"]:hover {
      background-color: #ffffff33 !important;
    }
  
    /*Palette*/
    [class^="blocklyFlyoutBackground"] {
      fill: var(--accent) !important;
    }
  
    /*Palette text*/
    [class^="blocklyFlyoutLabelText"] {
      fill: var(--text) !important;
    }
  
    /*Toolbox, extension connection box*/
    [class^="connection-modal_bottom-area_"],
    [class^="connection-modal_body_"],
    [class^="blocklyToolboxDiv"],
    [class*="scratchCategoryMenuItem"][class*="categorySelected"],
    [class^="scratchCategoryMenu"] {
      background: var(--accent);
      color: var(--text);
    }
  
    /*Selected category*/
    [class^="scratchCategoryMenuItem.categorySelected"] {
      background: #ffffff22;
    }
  
    /*Sprite and stage selection area*/
    [class^="sprite-selector_sprite-selector_"],
    [class^="stage-selector_stage-selector_"],
    [class^="stage-selector_label_"],
    [class^="stage-selector_count_"] {
      background: var(--accent);
      color: var(--text);
    }
  
    [class^="sprite-info_sprite-info_"],
    [class^="stage-selector_header_"],
    [class^="stage-selector_header-title_"],
    [class^="sprite-selector-item_sprite-selector-item_"]:hover {
      background: var(--secondary-bg);
      color: var(--text);
    }
  
    /*Palette Buttons*/
    [class^="blocklyFlyoutButtonBackground"] {
      fill: var(--accent) !important;
    }
  
    [class^="blocklyFlyoutButtonBackground"]:hover,
    [class^="blocklyFlyoutButton"]:hover {
      fill: var(--accent) !important;
      filter: brightness(110%) !important;
    }
  
    [class^="blocklyFlyoutButton"] > text[class^="blocklyText"] {
      fill: var(--text) !important;
    }
  
    /*Text fill of "Make A" buttons*/
    [class^="blocklyFlyoutButton"] .blocklyText {
      fill: var(--text) !important;
    }
  
    /*Backpack header*/
    [class^="backpack_backpack-header_"] {
      background: var(--accent);
      color: var(--text);
    }
  
    /*Backpack*/
    [class^="backpack_backpack-list-inner_"] {
      background: var(--secondary-bg);
    }
  
    [class^="backpack_backpack-item_"],
    [class^="sprite-selector-item_sprite-image-outer_"],
    [class^="backpack_backpack-item_"] > div {
      background: var(--main-bg);
    }
  
    [class^="backpack_backpack-item_"] img {
      mix-blend-mode: normal;
    }
  
    /*Paint & sound editor sidebar*/
    [class^="selector_list-area_"] {
      background: var(--accent);
    }
  
    [class^="selector_new-buttons_"]::before {
      background: none;
    }
  
    /*Paint & sound editor main*/
    [class^="asset-panel_wrapper_"] {
      background: var(--secondary-bg);
      color: var(--text);
    }
  
    [class^="sound-editor_effect-button_"],
    [class^="sound-editor_trim-button_"] {
      color: var(--text);
    }
  
    /*Paint and sound editor buttons*/
    [class^="img.tool-select-base_tool-select-icon_"],
    [class^="sound-editor_trim-button_"] {
      filter: brightness(2);
    }
  
    /*Sprite costume selector text*/
    [class^="selector_list-item_"],
    [class^="sprite-selector-item_sprite-name_"],
    [class^="sprite-selector-item_sprite-details_"] {
      color: var(--text);
    }
  
    /*Tabs*/
    [class^="react-tabs_react-tabs__tab_"] {
      background: var(--accent);
      color: var(--text);
    }
  
    [class~="gui_tab_cxXL7"][class~="gui_is-selected_XzCUQ"] {
      background: var(--accent);
      color: var(--text);
    }
  
    [class*="gui_tab_"]:hover {
      background: var(--accent);
      filter: brightness(90%);
      color: var(--text);
    }
  
    [class^="gui_tab_"] {
      background: var(--secondary-bg);
      color: var(--text);
    }
  
    /*New variable/list/custom block*/
    [class^="prompt_body_"],
    [class^="custom-procedures_body_"],
    [class^="div.custom-procedures_option-card_"] {
      background: var(--accent);
      color: var(--text);
    }
  
    [class^="custom-procedures_button-row_"] > button:nth-child(1),
    [class^="prompt_button-row_"] > button:nth-child(1) {
      background: #ff3a5b;
    }
  
    /*Fullscreen view*/
    [class^="stage_stage-wrapper-overlay_"],
    [class^="stage-header_stage-header-wrapper-overlay_"] {
      background: black;
    }
  
    [class^="stage_stage-overlay-content_"] {
      border: none;
    }
  
    /*Library and card backgrounds*/
    [class^="library_library-scroll-grid_"],
    [class^="modal_modal-content_"].modal_full-screen_,
    [class^="card_step-body_"],
    [class^="card_left-card_"],
    [class^="card_right-card_"] {
      background: var(--accent);
      color: var(--text);
    }
  
    /*Library items & filter bar*/
    [class^="library-item_library-item-extension_"],
    [class^="library-item_library-item_"],
    [class^="library_filter-bar_"] {
      background: var(--accent);
    }
  
    [class^="library-item_library-item-extension_"] span,
    [class^="library-item_featured-extension-metadata_"],
    [class^="library-item_library-item-name_"] {
      color: var(--text) !important;
    }
  
    /*Text input*/
    input[type="text"],
    [class^="input_input-form_"],
    [class^="prompt_variable-name-text-input_"] {
      background: var(--accent);
      color: var(--text) !important;
    }
  
    input[type="text"]:hover,
    input[type="text"]:focus {
      background: var(--accent);
      filter: brightness(90%);
    }
  
    /*Buttons (inverted for dark theme)*/
    [class^="blocklyZoom"],
    [class^="stage-header_stage-button_"],
    [class^="sound-editor_round-button_"],
    [class^="sound-editor_button-group_"] {
      filter: invert(100) hue-rotate(180deg);
    }
  
    /*Set the selected costume/backdrop to have a transparent background as default*/
    [class^="sprite-selector-item_is-selected_"] {
      background: transparent !important;
    }
  
    /*Fixing white area around the paint editor*/
    [class^="paint-editor_canvas-container_"] {
      border: 1px solid var(--accent);
      overflow: hidden;
    }
  
    /*Tweaks for updated paint editor*/
    [class^="paper-canvas_paper-canvas_"] {
      background-color: var(--secondary-bg);
      border-radius: .4rem;
    }
  
    [class^="paint-editor_canvas-container_"] {
      border: 2px solid var(--accent);
      border-radius: .4rem;
    }
  
    /*Tweaks for users not signed in*/
    [class^="card_card_"],
    [class^="card_left-card_"],
    [class^="card_right-card_"] {
      border: 1px solid hsla(216, 49%, 90%, 0.14);
    }
  
    /*Scrollbar*/
    [class^="blocklyScrollbarHandle"] {
      fill: #CECDCE55;
    }
    `;
  
    document.body.appendChild(style);
  } else {
    if (document.querySelector("style#scratchtoolseditor") !== null) {
      document.querySelector("style#scratchtoolseditor").remove();
    }
  }
  

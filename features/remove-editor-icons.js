var removeEditorIcons = ScratchTools.styles.add(`
[class^="react-tabs_react-tabs__tab_"] > img[draggable="false"] {
  display: none !important;
}
`, "remove-editor-icons")

ScratchTools.setDisable("remove-editor-icons", function() {
  ScratchTools.styles.removeStyleById("remove-editor-icons")
})
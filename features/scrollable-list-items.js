ScratchTools.styles.add(`
[class^="monitor_value-inner_"] {
    overflow-x: scroll;
    text-overflow: clip;
}
`, "scrollable-lists")

ScratchTools.setDisable("scrollable-list-items", function() {
  document.querySelectorAll('[class^="monitor_value-inner_"]').forEach(function(el) {
    el.scrollLeft = 0
  })
  ScratchTools.styles.removeStyleById("scrollable-lists")
})
var style = ScratchTools.styles.add("* { font-weight: normal !important; }");

ScratchTools.setDisable("unbold-site-text", function () {
  style.remove();
});

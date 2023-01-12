var scratchtoolsPlainBackground = ScratchTools.styles.add(".blocklyMainBackground { fill: none !important; }", "plain-background")

ScratchTools.setDisable("plain-background", function() {
  ScratchTools.styles.removeStyleById("plain-background")
})
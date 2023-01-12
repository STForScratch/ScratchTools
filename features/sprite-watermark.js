ScratchTools.styles.add("[class^='gui_watermark_'] > [class^='watermark_sprite-image_'] { display: none !important; }", "sprite-watermark")

ScratchTools.setDisable("sprite-watermark", function() {
  ScratchTools.styles.removeStyleById("sprite-watermark")
})
export default async function ({ feature, console }) {
    ScratchTools.waitForElements(".paint-editor_bitmap-button_OEHDO", (bitmapButton) => {
      if (feature.self.enabled) {
        bitmapButton.click();
      }
    });
  }
  
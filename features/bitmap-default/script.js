export default async function ({ feature }) {
  ScratchTools.waitForElements("body", () => {
    const observer = new MutationObserver(() => {
      const bitmapButton = document.querySelector(".paint-editor_bitmap-button_OEHDO");
      if (bitmapButton && feature.self.enabled) {
        bitmapButton.click();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

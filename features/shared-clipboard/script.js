async function loadSharedClipboard() {
  await ScratchTools.waitForElement(
    "div[class^='paint-editor_mode-selector_']"
  );
  let preLoadedClipboard = await ScratchTools.storage.get("sharedClipboard");
  let lastClipboard = ScratchTools.Scratch.scratchPaint().clipboard.items;
  if (preLoadedClipboard) {
    lastClipboard = preLoadedClipboard;
    ScratchTools.Scratch.scratchPaint().clipboard = {
      items: preLoadedClipboard,
      pasteOffset: 0,
    };
  }
  fetchClipboardData();
  async function fetchClipboardData() {
    if (ScratchTools.Scratch.scratchPaint()) {
      let loadedClipboard = await ScratchTools.storage.get("sharedClipboard");
      let currentClipboard =
        ScratchTools.Scratch.scratchPaint().clipboard.items;
      if (JSON.stringify(lastClipboard) !== JSON.stringify(currentClipboard)) {
        await ScratchTools.storage.set({
          key: "sharedClipboard",
          value: currentClipboard,
        });
        lastClipboard = currentClipboard;
      } else if (
        JSON.stringify(lastClipboard) !== JSON.stringify(loadedClipboard)
      ) {
        ScratchTools.Scratch.scratchPaint().clipboard.items = loadedClipboard;
        lastClipboard = loadedClipboard;
      }
    }
    setTimeout(fetchClipboardData, 500);
  }
}
loadSharedClipboard();

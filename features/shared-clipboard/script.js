var interval;

async function loadSharedClipboard() {
  await ScratchTools.waitForElement(
    "div[class^='paint-editor_mode-selector_']"
  );
  var preLoadedClipboard = await ScratchTools.storage.get("sharedClipboard");
  var lastClipboard = ScratchTools.Scratch.scratchPaint().clipboard.items;
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
      var loadedClipboard = await ScratchTools.storage.get("sharedClipboard");
      var currentClipboard =
        ScratchTools.Scratch.scratchPaint().clipboard.items;
      if (JSON.stringify(lastClipboard) !== JSON.stringify(loadedClipboard)) {
        ScratchTools.Scratch.scratchPaint().clipboard.items = loadedClipboard;
        lastClipboard = loadedClipboard;
      } else if (
        JSON.stringify(lastClipboard) !== JSON.stringify(currentClipboard)
      ) {
        await ScratchTools.storage.set({
          key: "sharedClipboard",
          value: currentClipboard,
        });
        lastClipboard = currentClipboard;
      }
    }
    setTimeout(fetchClipboardData, 500);
  }
}
loadSharedClipboard();

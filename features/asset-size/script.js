export default async function ({ feature, console }) {
  ScratchTools.waitForElements(
    "div[class*='asset-panel_wrapper_'] div[class*='selector_list-area_'] > div",
    function (asset) {
      if (asset.dataset.ste === "ste-file-size") return;
      asset.dataset.ste = "ste-file-size";

      let content = asset.querySelector(
        "div[class*='sprite-selector-item_sprite-info_-'] div[class*='sprite-selector-item_sprite-details_']"
      );

      asset.firstChild.addEventListener("mouseover", function () {
        if (!feature.self.enabled) return;
        
        let scratchAsset = ScratchTools.Scratch.vm.editingTarget;
        let targetAssets =
          feature.traps.gui().editorTab?.activeTabIndex === 1
            ? scratchAsset.getCostumes()
            : scratchAsset.getSounds();
        let data = targetAssets[getElementIndex(asset)].asset.data.byteLength;

        content.dataset.previousContent = content.textContent;
        content.textContent = formatBytes(data);
      });

      asset.firstChild.addEventListener("mouseout", function () {
        if (content.dataset.previousContent) {
          content.textContent = content.dataset.previousContent;
        }
      });
    }
  );

  function getElementIndex(element) {
    const parent = element.parentElement;

    const children = parent.children;

    for (let i = 0; i < children.length; i++) {
      if (children[i] === element) {
        return i;
      }
    }

    return -1;
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const sizeInUnits = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

    return `${sizeInUnits} ${sizes[i]}`;
  }
}

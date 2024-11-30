var showSearchBar = true;

if (document.querySelector('[class^="asset-panel_wrapper_"]')) {
  if (!document.querySelector(".scratchtoolsAssetSearch") && showSearchBar) {
    var input = document.createElement("input");
    var assetBox = document.querySelector('[class^="asset-panel_wrapper_"]');
    var assetRow = assetBox.firstChild.firstChild;
    input.className = "scratchtoolsAssetSearch " + scratchClass("input_input-form_l9eYg");
    input.placeholder = "Search";
    input.type = "search";
    input.autocomplete = "off";
    input.addEventListener("input", function () {
      assetRow.childNodes.forEach(function (el) {
        if (el.parentNode === assetRow) {
          if (input.value !== "") {
            if (
              el
                .querySelector('[class^="sprite-selector-item_sprite-name_"]')
                .textContent.toLowerCase()
                .includes(input.value)
            ) {
              el.style.display = null;
            } else {
              el.style.display = "none";
            }
          } else {
            el.style.display = null;
          }
        }
      });
    });
    input.style.margin = ".3rem";
    assetBox.firstChild.prepend(input);
  }
}

ScratchTools.waitForElements(
  '[class^="asset-panel_wrapper_"]',
  function (assetBox) {
    if (!document.querySelector(".scratchtoolsAssetSearch") && showSearchBar) {
      var input = document.createElement("input");
      var assetRow = assetBox.firstChild.firstChild;
      input.className = "scratchtoolsAssetSearch " + scratchClass("input_input-form_");
      input.placeholder = "Search";
      input.type = "search";
      input.autocomplete = "off";
      input.addEventListener("input", function () {
        assetRow.childNodes.forEach(function (el) {
          if (el.parentNode === assetRow) {
            if (input.value !== "") {
              if (
                el
                  .querySelector('[class^="sprite-selector-item_sprite-name_"]')
                  .textContent.toLowerCase()
                  .includes(input.value)
              ) {
                el.style.display = null;
              } else {
                el.style.display = "none";
              }
            } else {
              el.style.display = null;
            }
          }
        });
      });
      input.style.margin = ".3rem";
      assetBox.firstChild.prepend(input);
    }
  },
  "searchAssets",
  false
);

ScratchTools.setDisable("search-assets", function () {
  if (document.querySelector(".scratchtoolsAssetSearch")) {
    document.querySelector(".scratchtoolsAssetSearch").remove();
  }
  showSearchBar = false;
});

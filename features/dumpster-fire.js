var enabledDumpsterFire = true;

ScratchTools.waitForElements(
  "div.inner.mod-splash > div.box > div.box-header > h4",
  function (element) {
    if (enabledDumpsterFire) {
      element.textContent = "Dumpster Fire";
    }
  },
  "dumpster fire",
  false
);

ScratchTools.setDisable("dumpster-fire", function () {
  enabledDumpsterFire = false;
  if (
    document.querySelector(
      "div.inner.mod-splash > div.box > div.box-header > h4"
    )
  ) {
    document.querySelector(
      "div.inner.mod-splash > div.box > div.box-header > h4"
    ).textContent = "Featured Projects";
  }
});

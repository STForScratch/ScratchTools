if (
  window.location.href.startsWith("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  function addCustomBlockCode() {
    try {
      Object.keys(
        ScratchTools.Scratch.blockly.getMainWorkspace().blockDB_
      ).forEach(function (el) {
        var block = ScratchTools.Scratch.blockly
          .getMainWorkspace()
          .getBlockById(el);
        if (block.type === "procedures_prototype") {
          var callback = function (el) {
            var deleteCustomBlocks = { enabled: true, text: "Delete All Uses" };
            deleteCustomBlocks.callback = function () {
              if (
                confirm(
                  "Are you sure you want do do this? It will delete all instances of this block, along with the blocks below it in some cases."
                )
              ) {
                Object.keys(
                  ScratchTools.Scratch.blockly.getMainWorkspace().blockDB_
                ).forEach(function (newBlockId) {
                  var newBlock = ScratchTools.Scratch.blockly
                    .getMainWorkspace()
                    .getBlockById(newBlockId);
                  if (newBlock.type === "procedures_call") {
                    if (newBlock.getProcCode() === block.getProcCode()) {
                      newBlock.dispose();
                    }
                  }
                });
                alert(
                  "Deleted all instances of the " +
                    block.getProcCode() +
                    " custom block."
                );
              } else {
                alert("Canceled.");
              }
            };
            el.push(deleteCustomBlocks);
          };
          ScratchTools.Scratch.waitForContextMenu({
            block: block.parentBlock_.id,
            id: "delete-custom-blocks",
            callback: callback,
          });
        }
      });
    } catch (err) {}
  }

  var waitForNewCustomBlocks = new MutationObserver(addCustomBlockCode);
  waitForNewCustomBlocks.observe(document.querySelector("body"), {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

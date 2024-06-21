export default async function ({ feature, console }) {
  const NEW_ITEMS = ["enter", "-", "[", "]", "\\", ".", ",", "'", ";", "`"];

  ScratchTools.waitForElements(
    "g.blocklyDraggable[data-shapes='reporter boolean']",
    function (block) {
      if (!feature.self.enabled) return;
      if (!Blockly) return;

      block = Blockly.getMainWorkspace().getBlockById(block.dataset.id);
      if (!block) return;

      if (block.type === "sensing_keypressed") {
        let child = block.childBlocks_[0];
        if (child.type === "sensing_keyoptions") {
          let menu = child.inputList[0].fieldRow[0].menuGenerator_;

          for (var i in NEW_ITEMS) {
            if (!menu.find((item) => item[0] === NEW_ITEMS[i])) {
              menu.push([NEW_ITEMS[i], NEW_ITEMS[i]]);
            }
          }
        }
      }
    }
  );

  ScratchTools.waitForElements(
    "g.blocklyDraggable[data-shapes='hat']",
    function (block) {
      if (!feature.self.enabled) return;
      if (!Blockly) return;

      block = Blockly.getMainWorkspace().getBlockById(block.dataset.id);
      if (!block) return;

      if (block.type === "event_whenkeypressed") {
        let menu = block.inputList[0].fieldRow[1].menuGenerator_;

        for (var i in NEW_ITEMS) {
          if (!menu.find((item) => item[0] === NEW_ITEMS[i])) {
            menu.push([NEW_ITEMS[i], NEW_ITEMS[i]]);
          }
        }
      }
    }
  );
}

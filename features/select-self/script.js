export default async function ({ feature, console }) {
  let MENU_TYPES = [
    "motion_glideto_menu",
    "motion_goto_menu",
    "motion_pointtowards_menu",
    "sensing_touchingobjectmenu",
    "sensing_of_object_menu",
    "sensing_distancetomenu",
  ];
  let ORIGINAL_DATA = {
    motion_glideto_menu: [
      ["random position", "_random_"],
      ["mouse-pointer", "_mouse_"],
    ],
    motion_goto_menu: [
      ["random position", "_random_"],
      ["mouse-pointer", "_mouse_"],
    ],
    motion_pointtowards_menu: [["random position", "_random_"]],
    sensing_touchingobjectmenu: [
      ["mouse-pointer", "_mouse_"],
      ["edge", "_edge_"],
    ],
    sensing_of_object_menu: [["Stage", "_stage_"]],
    sensing_distancetomenu: [["mouse-pointer", "_mouse_"]],
  };

  let blocks = [];

  ScratchTools.waitForElements(
    "g.blocklyDraggable > g[data-shapes='argument round']",
    function (block) {
      if (!Blockly) return;

      block = Blockly.getMainWorkspace().getBlockById(block.dataset.id);
      if (!block) return;

      if (MENU_TYPES.includes(block.type)) {
        let menu = block.inputList[0].fieldRow[0].menuGenerator_;

        if (!blocks.includes(block.id)) {
          blocks.push(block.id);
        }

        updateMenu(block.id);
      }
    }
  );

  feature.traps.vm.on("targetsUpdate", function (el) {
    for (var i in blocks) {
      updateMenu(blocks[i]);
    }
  });

  feature.addEventListener("disabled", function () {
    for (var i in blocks) {
      updateMenu(blocks[i]);
    }
  });

  feature.addEventListener("enabled", function () {
    for (var i in blocks) {
      updateMenu(blocks[i]);
    }
  });

  function updateMenu(blockId) {
    let SPRITES = [];

    let targets = feature.traps.vm.runtime.targets.filter(
      (target) => !target.isStage && target.isOriginal
    );

    for (var i in targets) {
      SPRITES.push(targets[i].sprite.name);
    }

    let block = Blockly.getMainWorkspace().getBlockById(blockId);

    if (!block) return;

    block.inputList[0].fieldRow[0].menuGenerator_ = function () {
      let data = ORIGINAL_DATA[block.type];

      for (var i in SPRITES) {
        if (
          feature.self.enabled ||
          feature.traps.vm.runtime._editingTarget?.sprite?.name !== SPRITES[i]
        ) {
          if (!data.find((el) => el[0] === SPRITES[i])) {
            data.push([SPRITES[i], SPRITES[i]]);
          }
        }
      }

      return data;
    };
  }
}

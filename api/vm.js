ScratchTools.Scratch = {
  vm: null,
  blockly: null,
};
try {
  ScratchTools.Scratch.vm =
    window.vm ||
    (() => {
      const app = document.querySelector("#app");
      return app[
        Object.keys(app).find((key) => key.startsWith("__reactContainer"))
      ].child.stateNode.store.getState().scratchGui.vm;
    })();
  ste.console.log("Able to load Virtual Machine.", "ste-traps");
} catch (err) {
  ste.console.warn("Unable to load Virtual Machine.", "ste-traps");
}
try {
  if (Blockly !== undefined) {
    ScratchTools.Scratch.blockly = Blockly;
    ste.console.log("Able to load Blockly.", "ste-traps");
  } else {
    ste.console.warn("Unable to load Blockly.", "ste-traps");
  }
} catch (err) {
  ste.console.warn("Unable to load Blockly.", "ste-traps");
}

ScratchTools.Scratch.scratchSound = function () {
  try {
    return document.querySelector("div.sound-editor_editor-container_iUSW-")[
      Object.keys(
        document.querySelector("div.sound-editor_editor-container_iUSW-")
      ).find((key) => key.startsWith("__reactInternalInstance"))
    ].return.return.return.stateNode;
  } catch (err) {
    return null;
  }
};

ScratchTools.Scratch.scratchGui = function () {
  try {
    const app = document.querySelector("#app");
    return app[
      Object.keys(app).find((key) => key.startsWith("__reactContainer"))
    ].child.stateNode.store.getState().scratchGui;
  } catch (err) {
    return null;
  }
};

ScratchTools.traps = {
  scratchGui: ScratchTools.Scratch.scratchGui,
  scratchPaint: ScratchTools.Scratch.scratchPaint,
  scratchSound: ScratchTools.Scratch.scratchSound,
  getVm: function () {
    return vm;
  },
  getBlockly: function () {
    return Blockly;
  },
  getScratchBlocks,
};

let openContextMenus = [];

const waitForContextMenu = function ({ id, callback, block, disabled, label }) {
  var insertion = openContextMenus.push({
    id,
    block,
    callback,
    enabled: !disabled,
    label,
  });
  return {
    delete: function() {
      delete openContextMenus[openContextMenus.indexOf(insertion)]
    }
  }
};

let handledProcedures = {};
ScratchTools.waitForElements(
  ".blocklyDraggable",
  function (el) {
    if (el.dataset.id) {
      var block = ScratchTools.traps
        .getBlockly()
        .getMainWorkspace()
        .getBlockById(el.dataset.id);
      if (block) {
        if (block.type === "procedures_definition") {
          if (!handledProcedures[block.id]) {
            handledProcedures[block.id] = block.customContextMenu;
          }
          block.customContextMenu = function (menu) {
            handledProcedures[block.id](menu);
            openContextMenus.forEach(function (option) {
              if (option.block === block.id) {
                menu.push({
                  enabled: option.enabled,
                  text: option.label,
                  callback: function (e) {
                    option.callback(e);
                  },
                });
              }
            });
          };
        } else {
          if (!block.customContextMenu) {
            block.customContextMenu = function (menu) {
              openContextMenus.forEach(function (option) {
                if (option.block === block.id) {
                  menu.push({
                    enabled: option.enabled,
                    text: option.label,
                    callback: function (e) {
                      option.callback(e);
                    },
                  });
                }
              });
            };
          }
        }
      }
    }
  },
  "custom-menu-manager",
  false
);

ScratchTools.traps.createContextMenu = waitForContextMenu;

ScratchTools.Scratch.contextMenus = {};
ScratchTools.Scratch.waitForContextMenu = function (info) {
  if (ScratchTools.Scratch.contextMenus[info.block] !== undefined) {
    ScratchTools.Scratch.contextMenus[info.block][info.id] = info.callback;
    if (
      ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block)
        .type === "procedures_definition" &&
      info.id !== "original-custom-block-function"
    ) {
      ScratchTools.Scratch.contextMenus[info.block][
        "original-custom-block-function"
      ] = ScratchTools.Scratch.blockly
        .getMainWorkspace()
        .getBlockById(info.block).customContextMenu;
    }
  } else {
    ScratchTools.Scratch.contextMenus[info.block] = {};
    ScratchTools.Scratch.contextMenus[info.block][info.id] = info.callback;
    if (
      ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block)
        .type === "procedures_definition" &&
      info.id !== "original-custom-block-function"
    ) {
      ScratchTools.Scratch.contextMenus[info.block][
        "original-custom-block-function"
      ] = ScratchTools.Scratch.blockly
        .getMainWorkspace()
        .getBlockById(info.block).customContextMenu;
    }
  }
  ScratchTools.Scratch.blockly
    .getMainWorkspace()
    .getBlockById(info.block).customContextMenu = function (menu) {
    Object.keys(ScratchTools.Scratch.contextMenus[info.block]).forEach(
      function (el) {
        ScratchTools.Scratch.contextMenus[info.block][el](menu);
      }
    );
  };
};

ScratchTools.Scratch.scratchPaint = function () {
  var app = document.querySelector(".paint-editor_mode-selector_28iiQ");
  if (app !== null) {
    return app[
      Object.keys(app).find((key) => key.startsWith("__reactInternalInstance"))
    ].child.stateNode.store.getState().scratchPaint;
  } else {
    return null;
  }
};

async function alertForUpdates() {
  if (ScratchTools.Scratch.scratchGui().mode.hasEverEnteredEditor) {
    var purple = await (
      await fetch(
        "https://raw.githubusercontent.com/STForScratch/data/main/purple.json"
      )
    ).json();
    if (purple.purple) {
      var alertedForPurple =
        (await ScratchTools.storage.get("purpleAlert")) || false;
      if (!alertedForPurple) {
        await ScratchTools.storage.set({ key: "purpleAlert", value: true });
        ScratchTools.modals.create({
          title: "Important ScratchTools Update",
          description:
            "Due to the new Scratch editor update, some ScratchTools features might not work as planned. Don't worry- they should all be fixed within the next few days, our developers are hard at work!",
        });
      }
    }
  }
}

function getScratchBlocks() {
  var blocksWrapper = document.querySelector(
    'div[class^="gui_blocks-wrapper"]'
  );
  var key = Object.keys(blocksWrapper).find((key) =>
    key.startsWith("__reactInternalInstance$")
  );
  const internal = blocksWrapper[key];
  var recent = internal.child;
  while (!recent.stateNode?.ScratchBlocks) {
    recent = recent.child;
  }
  return recent.stateNode.ScratchBlocks || null;
}

ScratchTools.waitForElements(
  "div[class^='gui_menu-bar-position_']",
  alertForUpdates,
  "purple-notification",
  false
);

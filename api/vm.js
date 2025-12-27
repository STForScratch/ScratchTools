ScratchTools.Scratch = {
  vm: null,
  blockly: null,
};
try {
  ScratchTools.Scratch.vm = window.vm || window.__steTraps._onceMap.vm;
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
    let rI = document.querySelector("[class^=sound-editor_editor-container]")[
      Object.keys(
        document.querySelector("[class^=sound-editor_editor-container]")
      ).find((key) => key.startsWith("__reactFiber"))
    ];

    while (!rI.stateNode?.audioBufferPlayer) {
      rI = rI.return;
    }
    return rI.stateNode;
  } catch (err) {
    return null;
  }
};

ScratchTools.Scratch.scratchGui = function () {
  try {
    return window.__steRedux.state.scratchGui;
  } catch (err) {
    return null;
  }
};

ScratchTools.traps = {
  scratchGui: ScratchTools.Scratch.scratchGui || null,
  scratchPaint: ScratchTools.Scratch.scratchPaint || null,
  scratchSound: ScratchTools.Scratch.scratchSound || null,
  paper: ScratchTools.Scratch.getPaper || null,
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
    delete: function () {
      delete openContextMenus[openContextMenus.indexOf(insertion)];
    },
  };
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
  try {
    return __steRedux.state.scratchPaint;
  } catch (err) {
    return null;
  }
};

window.__paperCache = null

async function getPaper() {
  const modeSelector = document.querySelector("[class*='paint-editor_mode-selector']");
  const internalState = modeSelector[Object.keys(modeSelector).find((el) => el.startsWith("__reactFiber"))].child;
  let toolState = internalState;
  let tool;
  while (toolState) {
    const toolInstance = toolState.child.child.stateNode;
    if (toolInstance.tool) {
      tool = toolInstance.tool;
      break;
    }
    if (toolInstance.blob && toolInstance.blob.tool) {
      tool = toolInstance.blob.tool;
      break;
    }
    toolState = toolState.sibling;
  }
  if (tool) {
    const paperScope = tool._scope;
    window.__paperCache = paperScope
    return paperScope;
  }
  return null
}

ScratchTools.Scratch.getPaper = async function () {
  return await getPaper()
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

window.__steScratchBlocks = null

async function _getBlocksWrapperComponent() {
  const BLOCKS_CLASS = '[class^="gui_blocks-wrapper"]';
  let elem = document.querySelector(BLOCKS_CLASS);
  if (!elem) {
    elem = document.querySelector(BLOCKS_CLASS);
  }
  return _getBlocksComponent(elem);
}

function _getBlocksComponent(wrapper) {
  const internal = wrapper[getInternalKey(wrapper)];
  let childable = internal;
  while (((childable = childable.child), !childable || !childable.stateNode || !childable.stateNode.ScratchBlocks)) {}
  return childable;
}

function getInternalKey(elem) {
  return Object.keys(elem).find((key) => key.startsWith("__react"))
}

function _getBlocksComponent(wrapper) {
  const internal = wrapper[getInternalKey(wrapper)];
  let childable = internal;
  while (((childable = childable.child), !childable || !childable.stateNode || !childable.stateNode.ScratchBlocks)) {}
  return childable;
}

async function getBlockly() {
  const childable = await _getBlocksWrapperComponent();
  return childable.stateNode.ScratchBlocks
}

window.__steRedux.target.addEventListener("statechanged", async function() {
  try {
    let blockly = await getBlockly()
    if (blockly) {
      window.__steScratchBlocks = blockly
    }
  } catch(err) {}
})

function getScratchBlocks() {
  return window.__steScratchBlocks
}

ScratchTools.waitForElements(
  "div[class^='gui_menu-bar-position_']",
  alertForUpdates,
  "purple-notification",
  false
);

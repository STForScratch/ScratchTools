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
  ScratchTools.console.log("Able to load Virtual Machine.");
} catch (err) {
  ScratchTools.console.warn("Unable to load Virtual Machine.");
}
try {
  if (Blockly !== undefined) {
    ScratchTools.Scratch.blockly = Blockly;
    ScratchTools.console.log("Able to load Blockly.");
  } else {
    ScratchTools.console.warn("Unable to load Blockly.");
  }
} catch (err) {
  ScratchTools.console.warn("Unable to load Blockly.");
}

ScratchTools.Scratch.contextMenus = {};

ScratchTools.Scratch.waitForContextMenu = function (info) {
  if (ScratchTools.Scratch.contextMenus[info.block] !== undefined) {
    ScratchTools.Scratch.contextMenus[info.block][info.id] = info.callback;
    if (ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).type === "procedures_definition" && info.id !== "original-custom-block-function") {
      ScratchTools.Scratch.contextMenus[info.block]["original-custom-block-function"] = ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).customContextMenu;
    }
  } else {
    ScratchTools.Scratch.contextMenus[info.block] = {};
    ScratchTools.Scratch.contextMenus[info.block][info.id] = info.callback;
    if (ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).type === "procedures_definition" && info.id !== "original-custom-block-function") {
      ScratchTools.Scratch.contextMenus[info.block]["original-custom-block-function"] = ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).customContextMenu;
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

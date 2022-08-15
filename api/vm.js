ScratchTools.Scratch = {
    "vm": null,
    "blockly": null
}
try {
    ScratchTools.Scratch.vm = window.vm || (() => {
        const app = document.querySelector("#app");
        return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
    })();
    ScratchTools.console.log("Able to load Virtual Machine.")
} catch (err) {
    ScratchTools.console.warn("Unable to load Virtual Machine.")
}
try {
    if (Blockly !== undefined) {
        ScratchTools.Scratch.blockly = Blockly
        ScratchTools.console.log("Able to load Blockly.")
    } else {
        ScratchTools.console.warn("Unable to load Blockly.")
    }
} catch (err) {
    ScratchTools.console.warn("Unable to load Blockly.")
}

ScratchTools.Scratch.contextMenus = {}

ScratchTools.Scratch.addContextMenu = function(info) {
    if (ScratchTools.Scratch.contextMenus[info.block] !== undefined) {
        ScratchTools.Scratch.contextMenus[info.block][info.id] = info.callback
    } else {
        ScratchTools.Scratch.contextMenus[info.block] = {}
        ScratchTools.Scratch.contextMenus[info.block][info.id] = info.callback
    }
    ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).customContextMenu = function(menu) {
        Object.keys(ScratchTools.Scratch.contextMenus[info.block]).forEach(function(el) {
            ScratchTools.Scratch.contextMenus[info.block][el](menu)
        })
    }
}
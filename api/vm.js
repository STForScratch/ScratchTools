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

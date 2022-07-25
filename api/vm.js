try {
var vm = window.vm || (() => {
    const app = document.querySelector("#app");
    return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
})();
ScratchTools.console.log("Loaded VM.")
    if (Blockly !== undefined) {
        ScratchTools.console.log("Loaded Blockly.")
    } else {
        ScratchTools.console.warn("Could not load Blockly.")
    }
} catch(err) {
    ScratchTools.console.warn("Could not load VM.")
    try {
    if (Blockly === undefined) {
        ScratchTools.console.log("Loaded Blockly.")
    } else {
        ScratchTools.console.warn("Could not load Blockly.")
    }
} catch(err) {
    ScratchTools.console.warn("Could not load Blockly.")
}
}
ScratchTools.Scratch = {}
try {
if (Blockly !== undefined) {
    ScratchTools.Scratch.blockly = Blockly   
}
} catch(err) {
    ScratchTools.console.warn("Tried to load Blockly but failed.")   
}
if (vm !== undefined) {
    ScratchTools.Scratch.vm = vm   
}

try {
var vm = window.vm || (() => {
    const app = document.querySelector("#app");
    return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
})();
logTool("Loaded VM.")
    if (Blockly !== undefined) {
        logTool("Loaded Blockly.")
    } else {
        warnTool("Could not load Blockly.")
    }
} catch(err) {
    warnTool("Could not load VM.")
    try {
    if (Blockly === undefined) {
        logTool("Loaded Blockly.")
    } else {
        warnTool("Could not load Blockly.")
    }
} catch(err) {
    warnTool("Could not load Blockly.")
}
}
ScratchTools.Scratch = {}
try {
if (Blockly !== undefined) {
    ScratchTools.Scratch.blockly = Blockly   
}
} catch(err) {
    warnTool("Tried to load Blockly but failed.")   
}
if (vm !== undefined) {
    ScratchTools.Scratch.vm = vm   
}

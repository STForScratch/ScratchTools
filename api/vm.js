try {
var vm = window.vm || (() => {
    const app = document.querySelector("#app");
    return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
})();
logTool("Loaded VM.")
    if (Blockly === undefined) {
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
var vm = window.vm || (() => {
        const app = document.querySelector("#app");
        return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
    })();

ScratchTools.Scratch = {"vm":vm, "blockly":Blockly}

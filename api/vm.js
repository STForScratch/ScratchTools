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
function ScratchTools() {
    var vm = window.vm || (() => {
        const app = document.querySelector("#app");
        return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
    })();
    return({"vm":vm, "blockly":Blockly.getMainWorkspace()})
}

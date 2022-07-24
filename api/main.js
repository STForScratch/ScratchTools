var ScratchTools = {}
console.log("ScratchTools API Created")
var editor = window.vm || (() => {
    const app = document.querySelector("#app");
    return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
})();
if (editor === undefined) {
  ScratchTools.type = 'Website'
} else {
 ScratchTools.type = 'Editor' 
}

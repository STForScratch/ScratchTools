function startProjectOnLoad() {
  if (window.location.href.includes('https://scratch.mit.edu/projects/')) {
    if (document.querySelector('div.stage_green-flag-overlay_gNXnv') === null) {
      window.setTimeout(startProjectOnLoad, 50)
    } else {
      const vm = window.vm || (() => {
    const app = document.querySelector("#app");
    return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
})();
vm.start()
vm.greenFlag()
    }
  }
}

  startProjectOnLoad()


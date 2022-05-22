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

if (getCookie('ST Features').includes('start-project-on-load')) {
  startProjectOnLoad()
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

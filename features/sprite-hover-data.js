function getCounts() {
const vm = window.vm || (() => {
    const app = document.querySelector("#app");
    return app[Object.keys(app).find(key => key.startsWith("__reactContainer"))].child.stateNode.store.getState().scratchGui.vm;
})();
document.querySelector('li#react-tabs-2').title = ``
document.querySelector('li#react-tabs-0').title = ``
document.querySelector('li#react-tabs-4').title = ``
document.querySelector('div.sprite-selector_items-wrapper_4bcOj.box_box_2jjDp').childNodes.forEach(function(el) {
    if (el.firstChild.className.includes('item_is')) {
        var selectName = el.firstChild.childNodes[1].firstChild.textContent
document.querySelector('li#react-tabs-2').title = `${vm.runtime.getSpriteTargetByName(selectName).sprite.costumes_.length} Costumes`
document.querySelector('li#react-tabs-0').title = `${vm.runtime.getSpriteTargetByName(selectName).sprite.blocks._scripts.length} Scripts`
document.querySelector('li#react-tabs-4').title = `${vm.runtime.getSpriteTargetByName(selectName).sprite.sounds.length} Sounds`
}
})
    setTimeout(getCounts, 100)
}
if (getCookie('ST Features').includes('sprite-hover-data')) {
getCounts()
}
  
  function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

if (window.location.href.includes('/editor') && window.location.href.startsWith('https://scratch.mit.edu/projects/')) {
    if (Window.collapsed === undefined) {
        Window.collapsed = []
    }
var gui = document.querySelector('body');

var observe = new MutationObserver(addCollapse);

// Start observing the target node for configured mutations
observe.observe(gui, { attributes: true, childList: true, subtree: true });
function addCollapse() {
try {
Object.keys(ScratchTools.Scratch.blockly.getMainWorkspace().blockDB_).forEach(function(id) {
    var block = ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(id)
    if (block.outputShape_ === null) {
    if (Window.collapsed.includes(id)) {
        block.setCollapsed(true)
    } else {
        block.setCollapsed(false)
    }
var test = function(el) {
    if (block.collapsed_ === false) {
    var collapse = {"enabled":true, "text":"Collapse"}
    collapse.callback = function() {
        Window.collapsed.push(block.id)
        block.setCollapsed(true)
    }
    } else {
var collapse = {"enabled":true, "text":"Uncollapse"}
    collapse.callback = function() {
        delete Window.collapsed[Window.collapsed.indexOf(block.id)]
        block.setCollapsed(false)
    }
    }
    el.push(collapse)
}
ScratchTools.Scratch.addContextMenu({"block":block.id,"id":"collapse-blocks","callback":test})
    }
})
} catch(err) {
    ScratchTools.console.error(err)
}
}
}

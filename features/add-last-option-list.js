if (window.location.href.startsWith('https://scratch.mit.edu/projects/') && window.location.href.includes('/editor')) {
  var showLastItemOption = true
  function addLastOptionToBlock() {
    Object.keys(Blockly.getMainWorkspace().blockDB_).forEach(function(el) {
        var block = Blockly.getMainWorkspace().getBlockById(el)
        if (block.type === "data_itemoflist") {
            function addLastItem(el) {
              if (showLastItemOption) {
                var last = {"enabled":true, "text":"Select Last"}
        last.callback = function() {
            block.childBlocks_[0].inputList[0].fieldRow[0].setText('last')
        }
                el.push(last)
      }
            }
            ScratchTools.Scratch.waitForContextMenu({"block":block.id,"id":"set last item","callback":addLastItem})
        }
    })
  }
  ScratchTools.waitForElements('.blocklyDraggable', addLastOptionToBlock, 'addLastOptionToBlock', false)
  ScratchTools.setDisable('add-last-option-list', function() {
    showLastItemOption = false
  })
}
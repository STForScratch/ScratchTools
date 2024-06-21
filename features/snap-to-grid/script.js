export default async function ({ feature, console }) {
    await ScratchTools.waitForElement("div.gui")
    update()
    
    feature.traps.vm.on("workspaceUpdate", function() {
        update()
    })

    function update() {
        Blockly.getMainWorkspace().grid_.snapToGrid_ = feature.self.enabled
    }
}
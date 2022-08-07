if (window.location.href.startsWith('https://scratch.mit.edu/projects/') && window.location.href.includes('/editor')) {
function setCloneCountForSprite() {
if (document.querySelector('span.scratchtoolsSpriteCloneCounter') !== null) {
document.querySelector('span.scratchtoolsSpriteCloneCounter').textContent = `${(ScratchTools.Scratch.vm.editingTarget.sprite.clones.length-1).toString()} clones`
} else {
var foundIt = false
document.querySelectorAll('div').forEach(function(el) {
if (foundIt === false) {
    if (el.className.startsWith('sprite-info_row_')) {
        console.log('foundIt')
        foundIt = true
        var div = document.createElement('div')
        div.className = 'sprite-info_group_14-B_'
        div.innerHTML = `<label class="label_input-group_2vTky"><span style="font-size: 0.625rem; font-weight: bold;" class="scratchtoolsSpriteCloneCounter">${(ScratchTools.Scratch.vm.editingTarget.sprite.clones.length-1).toString()} clones</span></label>`
        el.appendChild(div)
        el.firstChild.lastChild.style.width = '7rem'
    }
}
})
}
}
setInterval(setCloneCountForSprite, 300)
}
document.addEventListener('keydown', function(event) {
    keydown(event)
    function keydown(e) {
    if (e.ctrlKey && e.keyCode == 82) {
        expandEditor()

        if (e.preventDefault) {
            e.preventDefault();
        }
        else {
            return false;
        }
    }
}
})

function expandEditor() {
if (document.querySelector('div#app').firstChild.lastChild.firstChild.lastChild.style.display === 'none') {
document.querySelector('div#app').firstChild.lastChild.firstChild.lastChild.style.display = 'flex'
document.querySelector('svg.blocklySvg').style.width = '75vw'
            document.querySelector('g.blocklyZoom').childNodes.forEach(function(el) {
                el.style.display = 'block'
            })
        } else {
document.querySelector('div#app').firstChild.lastChild.firstChild.lastChild.style.display = 'none'
document.querySelector('svg.blocklySvg').style.width = '100vw'
            document.querySelector('svg.blocklyScrollbarVertical').style.display = 'none'
            document.querySelector('g.blocklyZoom').childNodes.forEach(function(el) {
                el.style.display = 'inline-block'
            })
        }
}

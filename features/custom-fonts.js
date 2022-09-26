var name = ScratchTools.Storage.font
var style = document.createElement('style')
style.className = 'scratchtoolsCustomFont'
style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=${name.replaceAll(')', '').replaceAll("'", '').replaceAll('}', '').replaceAll(' ', '+')}:wght@200;300;400;500;600;700&display=swap');

* {
    font-family: '${name}', sans-serif;
}
`
document.body.appendChild(style)

ScratchTools.setDisable('custom-fonts', function() {
    document.querySelectorAll('.scratchtoolsCustomFont').forEach(function(el) {
        el.remove()
    })
})
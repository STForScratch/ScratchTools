update("v2.13.0", "This new version includes a lot of new features! We've added a sprite-specific clone counter, the ability to scroll through individual list items, a block logger, an FPS counter, and more! We've even added in some easter eggs- maybe you can find them!")
function update(updateVersion, updateDescription) {
    if (document.querySelector('.scratchtoolsUpdateInfo') === null) {
        var box = document.createElement('div')
        box.className = 'box scratchtoolsUpdateInfo'
        var boxHeader = document.createElement('div')
        boxHeader.className = 'box-header'
        var boxContent = document.createElement('div')
        boxContent.className = 'box-content'
        box.appendChild(boxHeader)
        box.appendChild(boxContent)
        var title = document.createElement('h4')
        title.textContent = "What's New in ScratchTools "+updateVersion
        var p = document.createElement('p')
        p.innerHTML = updateDescription
        boxContent.appendChild(p)
        boxHeader.appendChild(title)
        box.style.position = 'fixed'
        box.style.left = '2rem'
        box.style.bottom = '2rem'
        boxContent.style.padding = '8px 20px'
        boxHeader.style.padding = '8px 20px'
        var button = document.createElement('button')
        button.className = 'button'
        button.onclick = function() {
            box.remove()
        }
        button.textContent = 'Close'
        boxContent.appendChild(button)
        box.style.width = '40vw'
        document.body.appendChild(box)
    }
}
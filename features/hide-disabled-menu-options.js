var style = document.createElement('style')
style.textContent = `
.blocklyContextMenu > [aria-disabled='true'] {
display: none !important;
}
`
style.className = 'scratchtoolsHideDisabledOptions'
if (!document.querySelector('.scratchtoolsHideDisabledOptions')) {
document.body.appendChild(style)
}

ScratchTools.setDisable('hide-disabled-menu-options', function() {
    if (document.querySelector('.scratchtoolsHideDisabledOptions')) {
        document.querySelector('.scratchtoolsHideDisabledOptions').remove()
    }
})
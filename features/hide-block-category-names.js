var style = document.createElement('style')
style.textContent = `
.scratchCategoryItemBubble {
    border-radius: .2rem !important;
    width: 2rem !important;
}

.scratchCategoryMenuItemLabel {
    display: none !important;
}
`
document.body.appendChild(style)
ScratchTools.setDisable('hide-block-category-names', function() {
    style.remove()
})
var infiniteBackpackScrolling = true
ScratchTools.waitForElements("[class^='backpack_more_']", function() {
    var btn = document.querySelector("[class^='backpack_more_']")
    var el = document.querySelector("div[class^='backpack_backpack-list-inner_']")

el.addEventListener('scroll', function () {
    if (isInViewport(el.lastChild)) {
        if (infiniteBackpackScrolling) {
            btn.style.display = 'none'
            btn.click()
        } else {
            btn.style.display = null
        }
    }
});

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}
}, "infinite scrolling backpack", false)

ScratchTools.setDisable('infinite-backpack-scrolling', function() {
    infiniteBackpackScrolling = false
})
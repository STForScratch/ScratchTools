function setProposeLink() {
document.querySelectorAll('div.box-header').forEach(function(el) {
    if (el.textContent === 'Featured Projects') {
        el.parentNode.querySelector('a').href = 'https://scratch.mit.edu/studios/28715018'
        el.parentNode.querySelector('a').textContent = 'Learn More'
    }
})
}
ScratchTools.waitForElements('div.box-header', setProposeLink, 'set propose link', false)
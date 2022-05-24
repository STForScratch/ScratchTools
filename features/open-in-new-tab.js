
if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
    waitforit()
    function waitforit() {
if (document.querySelector('#view > div > div.inner > div:nth-child(2) > div.flex-row.project-notes') === null) {
window.setTimeout(waitforit, 50)
} else {
    var openlink = document.querySelectorAll('a')
    openlink.forEach(function(link) {
        if (link.parentNode.parentNode === document.querySelector('#navigation > div > ul')) {
        } else {
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
        }
    })
    }
}
}

// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
// get cookie
if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
if (getCookie('ST Features').includes('open-new-tab')) {
    waitforit()
    function waitforit() {
if (document.querySelector('#view > div > div.inner > div:nth-child(2) > div.flex-row.project-notes') === null) {
window.setTimeout(waitforit, 100)
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
}
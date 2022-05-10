function unbold() {
    if (window.location.href.includes('https://scratch.mit.edu/')) {
document.querySelectorAll('*').forEach(function(el) {
    el.style.fontWeight = 'normal'
})
        window.setTimeout(unbold, 100)
}
}
if (getCookie('ST Features').includes('unbold-forum-topics')) {
unbold()
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // get cookie

      if (getCookie('ST Features').includes('unbold-forum-topics')) {
if (window.location.href.includes('https://scratch.mit.edu/discuss/')) {
    if (!window.location.href.includes('topic')) {
document.querySelectorAll('a').forEach(function(el) {
    if (el.href !== null) {
        if (el.href.includes('https://scratch.mit.edu/discuss/topic/')) {
            el.style.fontWeight = 'normal'
        }
    }
})
}
}
}

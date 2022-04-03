// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // get cookie

if (window.location.href.includes("https://scratch.mit.edu/search/")) {
if (window.location.href.includes('%23')) {
} else {
    if (getCookie('ST Features').includes('nfe')) {
var btn = document.createElement('button')
btn.className = 'button showAll'
btn.textContent = 'Show All'
btn.onclick = function() {
    str = window.location.href
var apple = str.split('https://scratch.mit.edu/search/projects?q=')[1];
    window.location.href = `https://scratch.mit.edu/search/projects?q=%23${apple.replaceAll('%20', "%20%23")}`
}
document.querySelector('#view > div > div > div.sort-controls').appendChild(btn)
}
}
}
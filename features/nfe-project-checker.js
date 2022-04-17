// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // get cookie
    if (getCookie('ST Features').includes('feprojectcheck')) {
function check() {
    if (document.querySelector('div.share-date') === null) {
window.setTimeout(check, 100)
    } else {
async function checkforNfe() {
var response = await fetch(`https://tools.scratchstatus.org/nfe/${window.location.href.split('/projects/')[1].split('/')[0]}/`)
var data = await response.json()
var date = document.querySelector('div.share-date').lastChild
if (data['status'] === 'notreviewed') {
    date.textContent = `${date.textContent} · 🤔 Not Rated`
}
if (data['status'] === 'safe') {
    date.textContent = `${date.textContent} · ✅ Rated FE`
}
if (data['status'] === 'notsafe') {
    date.textContent = `${date.textContent} · ⛔ Rated NFE`
}
}
checkforNfe()
}
}
check()
}

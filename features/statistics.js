// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // get cookie
  if (window.location.href.includes("https://scratch.mit.edu/mystuff")) {
function stuff() {
    if (getCookie('ST Features').includes('stats')) {
el = document.querySelector('#tabs > li:nth-child(5)')
var clone = el.cloneNode(true);
document.querySelector('#tabs').appendChild(clone);
document.querySelector('#tabs > li:nth-child(6) > a').textContent = 'Statistics'
document.querySelector('#tabs > li:nth-child(6)').className = 'last'
document.querySelector('#tabs > li:nth-child(6)').dataTab = 'stats'
document.querySelector('#tabs > li:nth-child(6) > a').href = `https://scratchstats.com/${document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > div > ul > li:nth-child(1) > a').href.split('/users/')[1]}`
}
}
setTimeout(() => { stuff() }, 50);
  }

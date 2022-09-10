var style = document.createElement('style')
style.textContent = `
.profile-name {
    display: none !important;
}
`
document.body.appendChild(style)
ScratchTools.waitForElements('.dropdown.production.open', removeThree, 'compact 3.0', false)
ScratchTools.waitForElements('.user-nav', removeTwo, 'compact 2.0', false)
function removeThree(el) {
    el.querySelector('span').textContent = document.querySelector('.profile-name').textContent
}
function removeTwo(el) {
    el.querySelector('a').textContent = document.querySelector('.user-name.dropdown-toggle').textContent
    document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span').innerHTML = document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span').innerHTML.replace(document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span').textContent, '')
}
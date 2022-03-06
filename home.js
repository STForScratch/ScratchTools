function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  function checkversion() {
if (getCookie('ScratchToolsVersion') !== '1.5') {
    document.cookie = "ScratchToolsVersion=1.5; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/";
    createExplanation()
}
  }

function createExplanation() {
  var parent2 = document.createElement('center')
  document.querySelector('#view > div').prepend(parent2)
  var parentstuff = document.querySelector('#view > div > center')
var el = document.createElement('br')
var el3 = document.createElement('br')
var el4 = document.createElement('a')
var el5 = document.createElement('br')
var el6 = document.createElement('br')
var element = document.createElement('div')
el3.style.marginLeft = 'auto'
el4.style.marginLeft = 'auto'
el5.style.marginLeft = 'auto'
el6.style.marginLeft = 'auto'
element.style.marginLeft = 'auto'
el3.style.marginRight = 'auto'
el4.style.marginRight = 'auto'
el5.style.marginRight = 'auto'
el6.style.marginRight = 'auto'
element.style.marginRight = 'auto'
el4.href = 'https://github.com/rgantzosonscratch/ScratchTools'
element.style.backgroundColor = 'white'
element.style.color = 'Orange'
element.className = 'box'
element.style.borderColor = 'black'
element.style.borderRadius = '20px'
element.style.height = 'auto'
el4.textContent = 'GitHub Repository'
parentstuff.appendChild(element)
parentstuff.prepend(el3)
var h1 = document.createElement('h1')
h1.textContent = "What's New in ScratchTools"
element.appendChild(el)
element.appendChild(h1)
var stuff = document.createElement('br')
element.appendChild(stuff)
var el2 = document.createElement('p')
el2.textContent = "Welcome to ScratchTools v1.5! We have added a lot of new features, so take a look around!"
el2.style.color = 'black'
el2.style.padding = '20px'
element.appendChild(el2)
element.appendChild(el4)
element.appendChild(el5)
element.appendChild(el6)
}






if (1 === 2) {
el = document.querySelector('#view > div > div:nth-child(1) > div:nth-child(2)')
var clone = el.cloneNode(true);
document.querySelector('#view > div > div:nth-child(1)').insertBefore(clone, document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3)'));
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > button.slick-arrow.slick-next').remove()
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > button.slick-arrow.slick-prev.slick-disabled').remove()
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-header > h4').textContent = 'Projects Featured by ScratchTools'

document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(1) > a > img').src = 'https://uploads.scratch.mit.edu/projects/thumbnails/584015480.png'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(1) > div > div > a').href = "https://scratch.mit.edu/projects/584015480/"
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(1) > div > div > a').textContent = 'Pixel Challenge Remake #All #Games #Art #Music #Stories #Animations '
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(1) > div > div > div > a').src = 'https://scratch.mit.edu/users/Nethula_manumitha/'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(1) > div > div > div > a').textContent = 'Nethula_manumitha'

document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(2) > a > img').src = 'https://uploads.scratch.mit.edu/projects/thumbnails/577749282.png'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(2) > div > div > a').href = "https://scratch.mit.edu/projects/577749282/"
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(2) > div > div > a').textContent = 'Double Rush #All #Games #Art #Music #Stories #Animations #Tutorials'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(2) > div > div > div > a').src = 'https://scratch.mit.edu/users/Nethula_manumitha/'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(2) > div > div > div > a').textContent = 'Nethula_manumitha'

document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(3) > a > img').src = 'https://uploads.scratch.mit.edu/projects/thumbnails/582159901.png'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(3) > div > div > a').href = "https://scratch.mit.edu/projects/582159901/"
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(3) > div > div > a').textContent = '300+ Game Contest Results'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(3) > div > div > div > a').src = 'https://scratch.mit.edu/users/Nethula_manumitha/'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(3) > div > div > div > a').textContent = 'Nethula_manumitha'

document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(4) > a > img').src = 'https://uploads.scratch.mit.edu/projects/thumbnails/573896702.png'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(4) > div > div > a').href = "https://scratch.mit.edu/projects/573896702/"
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(4) > div > div > a').textContent = 'Royal Runner #All #Games #Art #Music #Stories #Animations #Tutorials'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(4) > div > div > div > a').src = 'https://scratch.mit.edu/users/Nethula_manumitha/'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(4) > div > div > div > a').textContent = 'Nethula_manumitha'

document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(5) > a > img').src = 'https://uploads.scratch.mit.edu/projects/thumbnails/592654320.png'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(5) > div > div > a').href = "https://scratch.mit.edu/projects/592654320/"
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(5) > div > div > a').textContent = '1000 Followers!! Thank You soo Much! #All '
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(5) > div > div > div > a').src = 'https://scratch.mit.edu/users/Nethula_manumitha/'
document.querySelector('#view > div > div:nth-child(1) > div:nth-child(3) > div.box-content > div > div > div > div:nth-child(5) > div > div > div > a').textContent = 'Nethula_manumitha'
}
setTimeout(() => { checkversion() }, 1000);
setTimeout(() => { showpasswrd() }, 1000);
// new stuff
function showpasswrd() {
var elem = document.createElement('label')
elem.textContent = 'Show Password'
var el = document.createElement('input')
el.type = 'checkbox'
el.style.fontColor = 'white'
el.label = 'Show Password'
el.onclick = function(event) {
var checkedinfo = document.querySelector('#navigation > div > ul > li.link.right.login-item > div > div > label:nth-child(2) > input[type=checkbox]:nth-child(1)').checked
if (checkedinfo === true) {
document.querySelector('#frc-password-1088').type = 'text'
document.querySelector('#navigation > div > ul > li.link.right.login-item > div > div > label').textContent = 'Hide Password'
document.querySelector('#navigation > div > ul > li.link.right.login-item > div > div > label').appendChild(el)
} else {
document.querySelector('#frc-password-1088').type = 'password'
document.querySelector('#navigation > div > ul > li.link.right.login-item > div > div > label').textContent = 'Show Password'
document.querySelector('#navigation > div > ul > li.link.right.login-item > div > div > label').appendChild(el)
}
}
document.querySelector('#navigation > div > ul > li.link.right.login-item > div > div').appendChild(elem)
document.querySelector('#navigation > div > ul > li.link.right.login-item > div > div > label').appendChild(el)
}

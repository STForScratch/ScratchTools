// get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
// get cookie

if (getCookie('ST Features') === undefined) {
  document.cookie = `ST Features=${getCookie('ST Features') + 'ST '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
}

if (window.location.href === "https://scratch.mit.edu/") {
if (getCookie('ST Features').includes('scratch-news-recent')) {
titles()
}
function titles() {
  if (document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news') !== null) {
    getprojects(document.querySelector('#navigation > div > ul > li.link.right.account-nav > div > ul > li:nth-child(1) > a').href.split('/users/')[1].split('/')[0])
  } else {
    window.setTimeout(titles, 50)
  }
}

async function getprojects(item) {
    
  // Storing response
  const response5 = await fetch(`https://api.scratch.mit.edu/users/${item}/projects/`);

  document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-header > p > a').href = `https://scratch.mit.edu/users/${item}/projects/`
  
  // Storing data in form of JSON
  var data = await response5.json();
  console.log(data);
if(data.hasOwnProperty(0)){
  document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-header > h4').textContent = 'Recent Projects'
  var titleofproject = data[0]["title"]
  var descriptionofproject = data[0]["instructions"]
  if (descriptionofproject === '') {
    var descriptionofproject = data[0]["credits"]
  }
  if (titleofproject.length > 30) {
    var titleofproject = `${titleofproject.slice(0, 30)}...`
  }
  if (descriptionofproject.length > 120) {
    var descriptionofproject = `${descriptionofproject.slice(0, 120)}...`
  }
  var linktoproject = `projects/${data[0]['id']}/`
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(1) > a > div > h4').textContent = titleofproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(1) > a > div > p').textContent = descriptionofproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(1) > a').href = linktoproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(1) > a > img').src = 'https://64.media.tumblr.com/9a68a4b4b0a7d129dfa331eaf0b1f6c7/4b73a84798c588fd-78/s540x810/2054110f1aaca473920ea40aea70a6f57159ab94.png'
}

if(data.hasOwnProperty(1)){
  var titleofproject = data[1]["title"]
  var descriptionofproject = data[1]["instructions"]
  if (descriptionofproject === '') {
    var descriptionofproject = data[1]["credits"]
  }
  if (titleofproject.length > 30) {
    var titleofproject = `${titleofproject.slice(0, 30)}...`
  }
  if (descriptionofproject.length > 120) {
    var descriptionofproject = `${descriptionofproject.slice(0, 120)}...`
  }
  var linktoproject = `projects/${data[1]['id']}/`
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(2) > a > div > h4').textContent = titleofproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(2) > a > div > p').textContent = descriptionofproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(2) > a').href = linktoproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(2) > a > img').src = 'https://64.media.tumblr.com/9a68a4b4b0a7d129dfa331eaf0b1f6c7/4b73a84798c588fd-78/s540x810/2054110f1aaca473920ea40aea70a6f57159ab94.png'
}

if(data.hasOwnProperty(2)){
  var titleofproject = data[2]["title"]
  var descriptionofproject = data[2]["instructions"]
  if (descriptionofproject === '') {
    var descriptionofproject = data[2]["credits"]
  }
  if (titleofproject.length > 30) {
    var titleofproject = `${titleofproject.slice(0, 30)}...`
  }
  if (descriptionofproject.length > 120) {
    var descriptionofproject = `${descriptionofproject.slice(0, 120)}...`
  }
  var linktoproject = `projects/${data[2]['id']}/`
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(3) > a > div > h4').textContent = titleofproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(3) > a > div > p').textContent = descriptionofproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(3) > a').href = linktoproject
document.querySelector('#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(3) > a > img').src = 'https://64.media.tumblr.com/9a68a4b4b0a7d129dfa331eaf0b1f6c7/4b73a84798c588fd-78/s540x810/2054110f1aaca473920ea40aea70a6f57159ab94.png'
}
  }


// set patrick's day start
const d = new Date();
console.log(d.getDate())
if (d.getDate() === 17) {
document.querySelector('#navigation').style.backgroundColor = '#009a49'

const highlightedItems5 = document.querySelectorAll("a");

highlightedItems5.forEach(function(item) {
    if (item.parentNode.parentNode.parentNode.parentNode.id !== 'navigation') {
        if (item.className !== 'ignore-react-onclickoutside user-info') {
item.style.color = '#009a49'
        }
    }
})
}
// st patrick's day end

// settings button
if (getCookie('ST Features').includes('settings-footer')) {
} else {
var centered = document.createElement('center')
var a = document.createElement('a')
a.textContent = 'ScratchTools Settings'
centered.style.marginTop = '20px'
a.href = "https://scratch.mit.edu/ScratchTools/"
centered.appendChild(a)
document.querySelector('#view').prepend(centered)
}
// end settings button
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  function checkversion() {
if (getCookie('ScratchToolsVersion') !== '2.1.2') {
    document.cookie = "ScratchToolsVersion=2.1.2; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/";
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
el4.href = 'https://tools.scratchstatus.org'
element.style.backgroundColor = 'black'
element.style.color = 'Orange'
element.className = 'box'
element.style.borderColor = 'black'
element.style.borderRadius = '20px'
element.style.height = 'auto'
el4.textContent = 'Official Website'
el4.style.fontFamily = 'sans-serif'
parentstuff.appendChild(element)
parentstuff.prepend(el3)
var h1 = document.createElement('h1')
h1.textContent = "What's New in ScratchTools"
h1.style.fontFamily = 'sans-serif'
element.appendChild(el)
element.appendChild(h1)
var stuff = document.createElement('br')
element.appendChild(stuff)
var el2 = document.createElement('p')
el2.textContent = "This is ScratchTools v2.1.2! Yes, our versions are getting more specific! Anyways, this version includes a lot more important features that might not always be visible to you. We added three new ones that definitely will, and you can check them out by going to the ScratchTools settings page!"
h1.style.color = 'white'
el2.style.color = '#ebebeb'
el2.style.padding = '20px'
el2.style.fontFamily = 'sans-serif'
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
setTimeout(() => { checkversion() }, 50);
setTimeout(() => { showpasswrd() }, 50);
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
}

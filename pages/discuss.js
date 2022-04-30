if (window.location.href.includes("https://scratch.mit.edu/discuss")) {
if (getCookie('forum') === undefined) {
  document.cookie = `forum=${text2Binary('No draft saved. Start writing and you can save a draft if necessary.')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
}


// get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
// get cookie
function replacealllinks() {
const highlightedItems2 = document.querySelectorAll("a");

highlightedItems2.forEach(function(item) {
  if (item.href.includes('https://scratch.mit.edu/users/')) {
if (item.className === 'black username') {
  if (getCookie('ST Features').includes('ocular-link')) {
  var test = item.parentNode.cloneNode(true)
test.firstChild.textContent = 'Open in Ocular'
test.firstChild.href = `https://ocular.jeffalo.net/users/${item.textContent}/`
item.parentNode.parentNode.appendChild(test)
  }
    console.log('hi')
    if (getCookie('ST Features').includes('forum-asterisk')) {
replacelinks(item)
    }
}
  }
})
    async function replacelinks(item) {
    
    // Storing response
    const response = await fetch(`https://api.${item.href.replace('https://', '')}`);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
if(data.hasOwnProperty('scratchteam')){
    if (data['scratchteam'] === true) {
item.textContent = `${item.textContent}*`
}
    }
}
}
replacealllinks()

if (getCookie('ST Features').includes('forum-draft')) {

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift()
}


checkforspace()
function checkforspace() {
    if (document.querySelector('#id_body') !== null) {
        setCodeForText()
    } else {
        window.setTimeout(checkforspace(), 50)
    }
}

function setCodeForText() {
    var thebutton = document.createElement('button')
    thebutton.textContent = 'Open Draft'
    thebutton.className = 'grey button'
    var thebutton2 = document.createElement('button')
    thebutton2.textContent = 'Save Draft'
    thebutton2.className = 'grey button'
    thebutton.onclick = function() {
      document.querySelector('#id_body').value = binaryToText(getCookie('forum'))
    }
    document.querySelector('#reply > div.box-content').appendChild(thebutton)
    thebutton2.onclick = function() {
      document.cookie = `forum=${text2Binary(document.querySelector('#id_body').value)}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
    document.querySelector('#reply > div.box-content').appendChild(thebutton2)
  }
}
function text2Binary(string) {
  return string.split('').map(function (char) {
      return char.charCodeAt(0).toString(2);
  }).join(' ');
}

function binaryToText(binary) {
binary = binary.split(' ');
return binary.map(elem => String.fromCharCode(parseInt(elem, 2))).join("");
}
}

if (getCookie('ST Features').includes('new-forums-page')) {
if (window.location.href.includes('https://scratch.mit.edu/discuss/m/topic/')) {
    window.location.href = window.location.href.replace('https://scratch.mit.edu/discuss/m/topic/', 'https://scratch.mit.edu/discuss/topic/')
}
}

var idk = []
document.querySelectorAll('div').forEach(function(item) {
    if (item.textContent.includes('save code') || item.textContent.includes('level code')) {
        idk.push('found')
    }
})
if (idk.includes('found')) {
    var l1 = document.createElement('link')
l1.rel = 'preconnect'
l1.href = 'https://fonts.googleapis.com'
document.head.appendChild(l1)
var l2 = document.createElement('link')
l2.rel = 'preconnect'
l2.href = 'https://fonts.gstatic.com'
document.head.appendChild(l2)
var l3 = document.createElement('link')
l3.href = 'https://fonts.googleapis.com/css2?family=DM+Sans&display=swap'
l3.rel = 'stylesheet'
document.head.appendChild(l3)
    var thingy = document.querySelector('div.confirm-email.banner').cloneNode(true)
    thingy.querySelector('span').textContent = 'Save your game codes with Zedexi instead of posting it in a game code topic to help Scratchers in need. Find out how to help '
    document.querySelector('div#pagewrapper').prepend(thingy)
    document.querySelector('div#pagewrapper').prepend(document.querySelector('div#topnav'))
    thingy.style.display = ''
    thingy.dataset.cue = ''
    var thingy2 = document.createElement('a')
    thingy2.textContent = 'here.'
    thingy2.href = 'https://scratch.mit.edu/discuss/topic/596390/?page=1#post-6209353'
    thingy2.target = '_blank'
    thingy2.rel = 'noopener noreferrer'
    thingy.querySelector('span').appendChild(thingy2)
    thingy.style.backgroundColor = '#fcac38'
    thingy.style.fontFamily = 'DM Sans'
    thingy.querySelector('div.close').onclick = function() {
        thingy.style.display = 'none'
    }
}


if (window.location.href.toLowerCase().includes('https://scratch.mit.edu/discuss/topic/')) {
var idk = []
document.querySelectorAll('div').forEach(function(item) {
    if (item.textContent.toLowerCase().includes('save code') || item.textContent.toLowerCase().includes('level code') || item.textContent.toLowerCase().includes('player code') || item.textContent.toLowerCase().includes('game code')) {
        console.log('found')
        idk.push('found')
    }
})
if (idk.includes('found')) {
    var l1 = document.createElement('link')
l1.rel = 'preconnect'
l1.href = 'https://fonts.googleapis.com'
document.head.appendChild(l1)
var l2 = document.createElement('link')
l2.rel = 'preconnect'
l2.href = 'https://fonts.gstatic.com'
document.head.appendChild(l2)
var l3 = document.createElement('link')
l3.href = 'https://fonts.googleapis.com/css2?family=DM+Sans&display=swap'
l3.rel = 'stylesheet'
document.head.appendChild(l3)
    var thingy = document.querySelector('div.confirm-email.banner').cloneNode(true)
    thingy.querySelector('span').textContent = 'Save your game codes with Zedexi instead of posting it in a game code topic to help Scratchers in need. Find out how to help '
    document.querySelector('div#pagewrapper').prepend(thingy)
    document.querySelector('div#pagewrapper').prepend(document.querySelector('div#topnav'))
    thingy.style.display = ''
    thingy.dataset.cue = ''
    var thingy2 = document.createElement('a')
    thingy2.textContent = 'here.'
    thingy2.href = 'https://scratch.mit.edu/discuss/topic/596390/?page=1#post-6209353'
    thingy2.target = '_blank'
    thingy2.rel = 'noopener noreferrer'
    thingy.querySelector('span').appendChild(thingy2)
    thingy.style.backgroundColor = '#fcac38'
    thingy.style.fontFamily = 'DM Sans'
    thingy.querySelector('div.close').onclick = function() {
        thingy.style.display = 'none'
    }
}
}

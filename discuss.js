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
        window.setTimeout(checkforspace(), 200)
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

document.querySelector('#page-404 > div.box-content').remove()
document.querySelector('title').textContent = 'ScratchTools'

var centered = document.createElement('center')
var titleofpage = document.createElement('h1')
titleofpage.textContent = 'ScratchTools Settings'
titleofpage.style.fontSize = '65px'
centered.appendChild(titleofpage)
document.querySelector('#page-404 > div').appendChild(centered)

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // show profile comment project titles

  var div1 = document.createElement('div')
var h1 = document.createElement('h1')
h1.textContent = 'Show Profile Comment Project Titles'
var label1 = document.createElement('label')
label1.className = "switch"
var switch1 = document.createElement('input')
switch1.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('show-profile-titles')) {
    switch1.checked = true
}
switch1.onclick = function() {
    myFunction1()
  }
label1.appendChild(switch1)
var span1 = document.createElement('span')
span1.className = "slider round"
label1.appendChild(span1)
div1.appendChild(h1)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'In the comments of profiles, project links will switch to their titles.'
div1.appendChild(description)
div1.appendChild(label1)
document.querySelector('#page-404 > div').appendChild(div1)
function myFunction1() {
    if (switch1.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'show-profile-titles '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('show-profile-titles', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// hover over user
var div2 = document.createElement('div')
var h2 = document.createElement('h1')
h2.textContent = 'Hover Over Username to Show Bio'
var label2 = document.createElement('label')
label2.className = "switch"
var switch2 = document.createElement('input')
switch2.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('hover-over-user')) {
    switch2.checked = true
}
switch2.onclick = function() {
    myFunction2()
  }
label2.appendChild(switch2)
var span2 = document.createElement('span')
span2.className = "slider round"
label2.appendChild(span2)
div2.appendChild(h2)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'In the comments of profiles, hover over any user to view their bio.'
div2.appendChild(description)
div2.appendChild(label2)
document.querySelector('#page-404 > div').appendChild(div2)
function myFunction2() {
    if (switch2.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'hover-over-user '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('hover-over-user', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// follower count on projects
var div3 = document.createElement('div')
var h3 = document.createElement('h1')
h3.textContent = 'Show Follower Count on Projects'
var label3 = document.createElement('label')
label3.className = "switch"
var switch3 = document.createElement('input')
switch3.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('follower-count')) {
    switch3.checked = true
}
switch3.onclick = function() {
    myFunction3()
  }
label3.appendChild(switch3)
var span3 = document.createElement('span')
span3.className = "slider round"
label3.appendChild(span3)
div3.appendChild(h3)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'View the follower count of any user on their project, right next to their username.'
div3.appendChild(description)
div3.appendChild(label3)
document.querySelector('#page-404 > div').appendChild(div3)
function myFunction3() {
    if (switch3.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'follower-count '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('follower-count', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// show message count
var div4 = document.createElement('div')
var h4 = document.createElement('h1')
h4.textContent = 'Show Message Count on Profiles'
var label4 = document.createElement('label')
label4.className = "switch"
var switch4 = document.createElement('input')
switch4.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('message-count')) {
    switch4.checked = true
}
switch4.onclick = function() {
    myFunction4()
  }
label4.appendChild(switch4)
var span4 = document.createElement('span')
span4.className = "slider round"
label4.appendChild(span4)
div4.appendChild(h4)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = "Any user's message count will be displayed on their profile."
div4.appendChild(description)
div4.appendChild(label4)
document.querySelector('#page-404 > div').appendChild(div4)
function myFunction4() {
    if (switch4.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'message-count '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('message-count', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// more tutorials
var div5 = document.createElement('div')
var h5 = document.createElement('h1')
h5.textContent = 'Show More Tutorials'
var label5 = document.createElement('label')
label5.className = "switch"
var switch5 = document.createElement('input')
switch5.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('tutorials')) {
    switch5.checked = true
}
switch5.onclick = function() {
    myFunction5()
  }
label5.appendChild(switch5)
var span5 = document.createElement('span')
span5.className = "slider round"
label5.appendChild(span5)
div5.appendChild(h5)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Extra tutorials are added to the Ideas page.'
div5.appendChild(description)
div5.appendChild(label5)
document.querySelector('#page-404 > div').appendChild(div5)
function myFunction5() {
    if (switch5.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'tutorials '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('tutorials', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// pptbf
var div6 = document.createElement('div')
var h6 = document.createElement('h1')
h6.textContent = 'Add Propose Button to Projects'
var label6 = document.createElement('label')
label6.className = "switch"
var switch6 = document.createElement('input')
switch6.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('pptbf')) {
    switch6.checked = true
}
switch6.onclick = function() {
    myFunction6()
  }
label6.appendChild(switch6)
var span6 = document.createElement('span')
span6.className = "slider round"
label6.appendChild(span6)
div6.appendChild(h6)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = "A button is added to other Scratchers' project pages that takes you to the Propose Projects to Be Featured studio."
div6.appendChild(description)
div6.appendChild(label6)
document.querySelector('#page-404 > div').appendChild(div6)
function myFunction6() {
    if (switch6.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'pptbf '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('pptbf', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

var div7 = document.createElement('div')
var h7 = document.createElement('h1')
h7.textContent = 'Add TurboWarp Button to Editor'
var label7 = document.createElement('label')
label7.className = "switch"
var switch7 = document.createElement('input')
switch7.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('turbowarp')) {
    switch7.checked = true
}
switch7.onclick = function() {
    myFunction7()
  }
label7.appendChild(switch7)
var span7 = document.createElement('span')
span7.className = "slider round"
label7.appendChild(span7)
div7.appendChild(h7)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'A button is added in the Scratch editor to open the project in the TurboWarp editor.'
div7.appendChild(description)
div7.appendChild(label7)
document.querySelector('#page-404 > div').appendChild(div7)
function myFunction7() {
    if (switch7.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'turbowarp '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('turbowarp', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// rounded corners
var div8 = document.createElement('div')
var h8 = document.createElement('h1')
h8.textContent = 'Add Rounded Corners to Profile Images'
var label8 = document.createElement('label')
label8.className = "switch"
var switch8 = document.createElement('input')
switch8.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('round')) {
    switch8.checked = true
}
switch8.onclick = function() {
    myFunction8()
  }
label8.appendChild(switch8)
var span8 = document.createElement('span')
span8.className = "slider round"
label8.appendChild(span8)
div8.appendChild(h8)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'The featured project thumbnail and the profile picture have rounded corners.'
div8.appendChild(description)
div8.appendChild(label8)
document.querySelector('#page-404 > div').appendChild(div8)
function myFunction8() {
    if (switch8.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'round '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('round', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// statistics button
var div9 = document.createElement('div')
var h9 = document.createElement('h1')
h9.textContent = 'Show Statistics in My Stuff'
var label9 = document.createElement('label')
label9.className = "switch"
var switch9 = document.createElement('input')
switch9.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('stats')) {
    switch9.checked = true
}
switch9.onclick = function() {
    myFunction9()
  }
label9.appendChild(switch9)
var span9 = document.createElement('span')
span9.className = "slider round"
label9.appendChild(span9)
div9.appendChild(h9)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Adds a button that takes you to your automatic ScratchStats page.'
div9.appendChild(description)
div9.appendChild(label9)
document.querySelector('#page-404 > div').appendChild(div9)
function myFunction9() {
    if (switch9.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'stats '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('stats', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// hide sprite watermark
var div10 = document.createElement('div')
var h10 = document.createElement('h1')
h10.textContent = 'Hide the Useless Sprite Watermark'
var label10 = document.createElement('label')
label10.className = "switch"
var switch10 = document.createElement('input')
switch10.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('watermark')) {
    switch10.checked = true
}
switch10.onclick = function() {
    myFunction10()
  }
label10.appendChild(switch10)
var span10 = document.createElement('span')
span10.className = "slider round"
label10.appendChild(span10)
div10.appendChild(h10)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Hides the useless watermark of the current sprite in the top right corner of the block editor.'
div10.appendChild(description)
div10.appendChild(label10)
document.querySelector('#page-404 > div').appendChild(div10)
function myFunction10() {
    if (switch10.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'watermark '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('watermark', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// show full title
var div11 = document.createElement('div')
var h11 = document.createElement('h1')
h11.textContent = 'Show Full Project Title'
var label11 = document.createElement('label')
label11.className = "switch"
var switch11 = document.createElement('input')
switch11.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('full-title')) {
    switch11.checked = true
}
switch11.onclick = function() {
    myFunction11()
  }
label11.appendChild(switch11)
var span11 = document.createElement('span')
span11.className = "slider round"
label11.appendChild(span11)
div11.appendChild(h11)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Hover over any project title on a profile to view the full title, not cut off.'
div11.appendChild(description)
div11.appendChild(label11)
document.querySelector('#page-404 > div').appendChild(div11)
function myFunction11() {
    if (switch11.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'full-title '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('full-title', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// add * to scratch team in discuss
var div12 = document.createElement('div')
var h12 = document.createElement('h1')
h12.textContent = 'Scratch Team Asterisk in Forums'
var label12 = document.createElement('label')
label12.className = "switch"
var switch12 = document.createElement('input')
switch12.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('forum-asterisk')) {
    switch12.checked = true
}
switch12.onclick = function() {
    myFunction12()
  }
label12.appendChild(switch12)
var span12 = document.createElement('span')
span12.className = "slider round"
label12.appendChild(span12)
div12.appendChild(h12)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Adds an asterisk (*) next to the usernames of any Scratch Team member in the forums.'
div12.appendChild(description)
div12.appendChild(label12)
document.querySelector('#page-404 > div').appendChild(div12)
function myFunction12() {
    if (switch12.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'forum-asterisk '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('forum-asterisk', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// add * to scratch team in discuss
var div13 = document.createElement('div')
var h13 = document.createElement('h1')
h13.textContent = 'Show All Projects Button in Search'
var label13 = document.createElement('label')
label13.className = "switch"
var switch13 = document.createElement('input')
switch13.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('nfe')) {
    switch13.checked = true
}
switch13.onclick = function() {
    myFunction13()
  }
label13.appendChild(switch13)
var span13 = document.createElement('span')
span13.className = "slider round"
label13.appendChild(span13)
div13.appendChild(h13)
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Adds a button to search through all the Scratch projects, not just the FE (for everyone) ones.'
div13.appendChild(description)
div13.appendChild(label13)
document.querySelector('#page-404 > div').appendChild(div13)
function myFunction13() {
    if (switch13.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'nfe '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('nfe', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

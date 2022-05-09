if (getCookie('ST Features') === undefined) {
    document.cookie = `ST Features=${getCookie('ST Features') + 'ST '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
}


function createFeature(name, description, id) {
    var div23 = document.createElement('div')
var h23 = document.createElement('h3')
h23.textContent = name
var label23 = document.createElement('label')
label23.className = "switch"
var switch23 = document.createElement('input')
switch23.type = "checkbox"
switch23.id = id
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes(id)) {
    switch23.checked = true
}
switch23.onclick = function() {
    if (this.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + this.id+' '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll(this.id, '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
  }
label23.appendChild(switch23)
var span23 = document.createElement('span')
span23.className = "slider round"
label23.appendChild(span23)
div23.appendChild(h23)
div23.appendChild(document.createElement('br'))
var description2 = document.createElement('h3')
description2.style.marginTop = '-20px'
description2.textContent = description
div23.appendChild(description2)
div23.appendChild(label23)
document.querySelector('#page-404 > div').appendChild(div23)
}








var l1 = document.createElement('link')
l1.rel = 'preconnect'
l1.href = 'https://fonts.googleapis.com'
document.head.appendChild(l1)
var l2 = document.createElement('link')
l2.rel = 'preconnect'
l2.href = 'https://fonts.gstatic.com'
document.head.appendChild(l2)
var l3 = document.createElement('link')
l3.href = 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
l3.rel = 'stylesheet'
document.head.appendChild(l3)

document.querySelector('#page-404 > div.box-content').remove()
document.querySelector('title').textContent = 'ScratchTools'

var centered = document.createElement('center')
var divtitle = document.createElement('div')
divtitle.style.backgroundColor = '#302c2c'
divtitle.style.borderRadius = '25px'
var titleofpage = document.createElement('h1')
titleofpage.textContent = 'ScratchTools Settings'
titleofpage.style.fontSize = '65px'
divtitle.appendChild(titleofpage)
titleofpage.style.color = 'white'
titleofpage.style.marginTop = '50px'
centered.appendChild(divtitle)
document.querySelector('#page-404 > div').appendChild(centered)

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

var featured = document.createElement('h1')
featured.textContent = 'New Features'

document.querySelector('#page-404 > div').appendChild(featured)

createFeature('Unbold Site Text', 'Makes it so that all test across Scratch is unbolded, and just normal text!', 'unbold-forum-topics')

createFeature("Meow", "Meow mrow reoowwww meow mrow. Mew mrow reoowwww purr meow mreow purr! Reoowwww mew!", "meow")


var br = document.createElement('br')
document.querySelector('#page-404 > div').appendChild(br)
var br = document.createElement('br')
document.querySelector('#page-404 > div').appendChild(br)









var featured = document.createElement('h1')
featured.textContent = 'Other Features'

document.querySelector('#page-404 > div').appendChild(featured)

  // show profile comment project titles

  var div1 = document.createElement('div')
var h1 = document.createElement('h3')
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
div1.appendChild(document.createElement('br'))
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
var h2 = document.createElement('h3')
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
div2.appendChild(document.createElement('br'))
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
var h3 = document.createElement('h3')
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
div3.appendChild(document.createElement('br'))
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
var h4 = document.createElement('h3')
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
div4.appendChild(document.createElement('br'))
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
var h5 = document.createElement('h3')
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
div5.appendChild(document.createElement('br'))
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
var h6 = document.createElement('h3')
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
div6.appendChild(document.createElement('br'))
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
var h7 = document.createElement('h3')
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
div7.appendChild(document.createElement('br'))
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
var h8 = document.createElement('h3')
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
div8.appendChild(document.createElement('br'))
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
var h9 = document.createElement('h3')
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
div9.appendChild(document.createElement('br'))
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
var h10 = document.createElement('h3')
h10.textContent = 'Hide Sprite Watermark'
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
div10.appendChild(document.createElement('br'))
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Hides the current sprite watermark on the top right corner of the editor.'
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
var h11 = document.createElement('h3')
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
div11.appendChild(document.createElement('br'))
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
var h12 = document.createElement('h3')
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
div12.appendChild(document.createElement('br'))
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
var h13 = document.createElement('h3')
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
div13.appendChild(document.createElement('br'))
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Adds a button to search all Scratch projects, including projects that are marked NFE.'
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

document.querySelector('#page-404 > div').style.display = 'block'

  // plain white background in scratch editor
  var div14 = document.createElement('div')
  var h14 = document.createElement('h3')
  h14.textContent = 'Remove Dots from Block Editor Background'
  var label14 = document.createElement('label')
  label14.className = "switch"
  var switch14 = document.createElement('input')
  switch14.type = "checkbox"
  console.log(getCookie('ST Features'))
  if (getCookie('ST Features').includes('editorbg')) {
      switch14.checked = true
  }
  switch14.onclick = function() {
      myFunction14()
    }
  label14.appendChild(switch14)
  var span14 = document.createElement('span')
  span14.className = "slider round"
  label14.appendChild(span14)
  div14.appendChild(h14)
  div14.appendChild(document.createElement('br'))
  var description = document.createElement('h3')
  description.style.marginTop = '-20px'
  description.textContent = 'Switches the white dotted background in the editor for a plain white background.'
  div14.appendChild(description)
  div14.appendChild(label14)
  document.querySelector('#page-404 > div').appendChild(div14)
  function myFunction14() {
      if (switch14.checked === true) {
          document.cookie = `ST Features=${getCookie('ST Features') + 'editorbg '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      } else {
          document.cookie = `ST Features=${getCookie('ST Features').replaceAll('editorbg', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      }
  }
  
  // save forum drafts
  var div15 = document.createElement('div')
  var h15 = document.createElement('h3')
  h15.textContent = 'Save Forum Post Drafts'
  var label15 = document.createElement('label')
  label15.className = "switch"
  var switch15 = document.createElement('input')
  switch15.type = "checkbox"
  console.log(getCookie('ST Features'))
  if (getCookie('ST Features').includes('forum-draft')) {
      switch15.checked = true
  }
  switch15.onclick = function() {
      myFunction15()
    }
  label15.appendChild(switch15)
  var span15 = document.createElement('span')
  span15.className = "slider round"
  label15.appendChild(span15)
  div15.appendChild(h15)
  div15.appendChild(document.createElement('br'))
  var description = document.createElement('h3')
  description.style.marginTop = '-20px'
  description.textContent = 'Saves what you write in your forum post, and gives you the option to reuse it next time.'
  div15.appendChild(description)
  div15.appendChild(label15)
  document.querySelector('#page-404 > div').appendChild(div15)
  function myFunction15() {
      if (switch15.checked === true) {
          document.cookie = `ST Features=${getCookie('ST Features') + 'forum-draft '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      } else {
          document.cookie = `ST Features=${getCookie('ST Features').replaceAll('forum-draft', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      }
  }
  
  // replace news with recent projects
  var div16 = document.createElement('div')
  var h16 = document.createElement('h3')
  h16.textContent = 'Replace Scratch News with Recent Projects'
  var label16 = document.createElement('label')
  label16.className = "switch"
  var switch16 = document.createElement('input')
  switch16.type = "checkbox"
  console.log(getCookie('ST Features'))
  if (getCookie('ST Features').includes('scratch-news-recent')) {
      switch16.checked = true
  }
  switch16.onclick = function() {
      myFunction16()
    }
  label16.appendChild(switch16)
  var span16 = document.createElement('span')
  span16.className = "slider round"
  label16.appendChild(span16)
  div16.appendChild(h16)
  div16.appendChild(document.createElement('br'))
  var description = document.createElement('h3')
  description.style.marginTop = '-20px'
  description.textContent = 'Replaces the Scratch News on the homepage with your recent projects.'
  div16.appendChild(description)
  div16.appendChild(label16)
  document.querySelector('#page-404 > div').appendChild(div16)
  function myFunction16() {
      if (switch16.checked === true) {
          document.cookie = `ST Features=${getCookie('ST Features') + 'scratch-news-recent '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      } else {
          document.cookie = `ST Features=${getCookie('ST Features').replaceAll('scratch-news-recent', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      }
  }
  
  // settings button in footer
  var div17 = document.createElement('div')
  var h17 = document.createElement('h3')
  h17.textContent = 'ScratchTools Settings Button in Footer'
  var label17 = document.createElement('label')
  label17.className = "switch"
  var switch17 = document.createElement('input')
  switch17.type = "checkbox"
  console.log(getCookie('ST Features'))
  if (getCookie('ST Features').includes('settings-footer')) {
      switch17.checked = true
  }
  switch17.onclick = function() {
      myFunction17()
    }
  label17.appendChild(switch17)
  var span17 = document.createElement('span')
  span17.className = "slider round"
  label17.appendChild(span17)
  div17.appendChild(h17)
  div17.appendChild(document.createElement('br'))
  var description = document.createElement('h3')
  description.style.marginTop = '-20px'
  description.textContent = 'Puts the ScratchTools settings button in the footer, rather than at the top of the homepage.'
  div17.appendChild(description)
  div17.appendChild(label17)
  document.querySelector('#page-404 > div').appendChild(div17)
  function myFunction17() {
      if (switch17.checked === true) {
          document.cookie = `ST Features=${getCookie('ST Features') + 'settings-footer '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      } else {
          document.cookie = `ST Features=${getCookie('ST Features').replaceAll('settings-footer', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      }
  }
  
  // open links in new tab
  var div18 = document.createElement('div')
  var h18 = document.createElement('h3')
  h18.textContent = 'Open Links in New Tabs on Projects'
  var label18 = document.createElement('label')
  label18.className = "switch"
  var switch18 = document.createElement('input')
  switch18.type = "checkbox"
  console.log(getCookie('ST Features'))
  if (getCookie('ST Features').includes('open-new-tab')) {
      switch18.checked = true
  }
  switch18.onclick = function() {
      myFunction18()
    }
  label18.appendChild(switch18)
  var span18 = document.createElement('span')
  span18.className = "slider round"
  label18.appendChild(span18)
  div18.appendChild(h18)
  div18.appendChild(document.createElement('br'))
  var description = document.createElement('h3')
  description.style.marginTop = '-20px'
  description.textContent = 'Opens clicked links in a new tab to make sure you do not lose your project progress.'
  div18.appendChild(description)
  div18.appendChild(label18)
  document.querySelector('#page-404 > div').appendChild(div18)
  function myFunction18() {
      if (switch18.checked === true) {
          document.cookie = `ST Features=${getCookie('ST Features') + 'open-new-tab '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      } else {
          document.cookie = `ST Features=${getCookie('ST Features').replaceAll('open-new-tab', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
      }
  }
  
  // ocular button in forums
  var div19 = document.createElement('div')
  var h19 = document.createElement('h3')
  h19.textContent = 'Ocular Button in Forums'
  var label19 = document.createElement('label')
  label19.className = "switch"
  var switch19 = document.createElement('input')
  switch19.type = "checkbox"
  console.log(getCookie('ST Features'))
  if (getCookie('ST Features').includes('ocular-link')) {
      switch19.checked = true
  }
  switch19.onclick = function() {
      myFunction19()
    }
  label19.appendChild(switch19)
  var span19 = document.createElement('span')
  span19.className = "slider round"
  label19.appendChild(span19)
  div19.appendChild(h19)
  div19.appendChild(document.createElement('br'))
  var description = document.createElement('h3')
  description.style.marginTop = '-20px'
  description.textContent = "Adds a button to a user's Ocular page next to their usernames in the forums."
  div19.appendChild(description)
  div19.appendChild(label19)
  document.querySelector('#page-404 > div').appendChild(div19)
  function myFunction19() {
      if (switch19.checked === true) {
          document.cookie = `ST Features=${getCookie('ST Features') + 'ocular-link '}; expires=Thu, 19 Dec 9999 12:00:00 UTC; path=/`;
      } else {
          document.cookie = `ST Features=${getCookie('ST Features').replaceAll('ocular-link', '')}; expires=Thu, 19 Dec 9999 12:00:00 UTC; path=/`;
      }
  }
  
  // color slider input
  var div20 = document.createElement('div')
  var h20 = document.createElement('h3')
  h20.textContent = 'Slider for Outline'
  var label20 = document.createElement('label')
  label20.className = "switch"
  var switch20 = document.createElement('input')
  switch20.type = "checkbox"
  console.log(getCookie('ST Features'))
  if (getCookie('ST Features').includes('color-slider-input')) {
      switch20.checked = true
  }
  switch20.onclick = function() {
      myFunction20()
    }
  label20.appendChild(switch20)
  var span20 = document.createElement('span')
  span20.className = "slider round"
  label20.appendChild(span20)
  div20.appendChild(h20)
  div20.appendChild(document.createElement('br'))
  var description = document.createElement('h3')
  description.style.marginTop = '-20px'
  description.textContent = "Replaces the number input for the outline width in the color editor with a slider."
  div20.appendChild(description)
  div20.appendChild(label20)
  document.querySelector('#page-404 > div').appendChild(div20)
  function myFunction20() {
      if (switch20.checked === true) {
          document.cookie = `ST Features=${getCookie('ST Features') + 'color-slider-input '}; expires=Thu, 19 Dec 9999 12:00:00 UTC; path=/`;
      } else {
          document.cookie = `ST Features=${getCookie('ST Features').replaceAll('color-slider-input', '')}; expires=Thu, 19 Dec 9999 12:00:00 UTC; path=/`;
      }
  }
  
  // remove editor icons
  var div21 = document.createElement('div')
  var h21 = document.createElement('h3')
  h21.textContent = 'Remove Editor Icons'
  var label21 = document.createElement('label')
  label21.className = "switch"
  var switch21 = document.createElement('input')
  switch21.type = "checkbox"
  console.log(getCookie('ST Features'))
  if (getCookie('ST Features').includes('remove-editor-icons')) {
      switch21.checked = true
  }
  switch21.onclick = function() {
      myFunction21()
    }
  label21.appendChild(switch21)
  var span21 = document.createElement('span')
  span21.className = "slider round"
  label21.appendChild(span21)
  div21.appendChild(h21)
  div21.appendChild(document.createElement('br'))
  var description = document.createElement('h3')
  description.style.marginTop = '-20px'
  description.textContent = "Hides the icons for the code, paint, and sound editors."
  div21.appendChild(description)
  div21.appendChild(label21)
  document.querySelector('#page-404 > div').appendChild(div21)
  function myFunction21() {
      if (switch21.checked === true) {
          document.cookie = `ST Features=${getCookie('ST Features') + 'remove-editor-icons '}; expires=Thu, 19 Dec 9999 12:00:00 UTC; path=/`;
      } else {
          document.cookie = `ST Features=${getCookie('ST Features').replaceAll('remove-editor-icons', '')}; expires=Thu, 19 Dec 9999 12:00:00 UTC; path=/`;
      }
  }

// NFE project status

var div23 = document.createElement('div')
var h23 = document.createElement('h3')
h23.textContent = 'Show Project Rating'
var label23 = document.createElement('label')
label23.className = "switch"
var switch23 = document.createElement('input')
switch23.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('feprojectcheck')) {
    switch23.checked = true
}
switch23.onclick = function() {
    myFunction23()
  }
label23.appendChild(switch23)
var span23 = document.createElement('span')
span23.className = "slider round"
label23.appendChild(span23)
div23.appendChild(h23)
div23.appendChild(document.createElement('br'))
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = "Shows a project's rating next to the project timestamp."
div23.appendChild(description)
div23.appendChild(label23)
document.querySelector('#page-404 > div').appendChild(div23)
function myFunction23() {
    console.log('test')
    if (switch23.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'feprojectcheck '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('feprojectcheck', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// st settings button in account settings
var div25 = document.createElement('div')
var h25 = document.createElement('h3')
h25.textContent = 'ScratchTools Settings Button in Account Settings'
var label25 = document.createElement('label')
label25.className = "switch"
var switch25 = document.createElement('input')
switch25.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('stsettingsaccount')) {
    switch25.checked = true
}
switch25.onclick = function() {
    myFunction25()
  }
label25.appendChild(switch25)
var span25 = document.createElement('span')
span25.className = "slider round"
label25.appendChild(span25)
div25.appendChild(h25)
div25.appendChild(document.createElement('br'))
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Puts the ScratchTools Settings button on the Account Settings page, in addition to any pages that it is already in.'
div25.appendChild(description)
div25.appendChild(label25)
document.querySelector('#page-404 > div').appendChild(div25)
function myFunction25() {
    console.log('test')
    if (switch25.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'stsettingsaccount '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('stsettingsaccount', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}

// account settings --> settings
var div24 = document.createElement('div')
var h24 = document.createElement('h3')
h24.textContent = 'Replace Account Settings Text'
var label24 = document.createElement('label')
label24.className = "switch"
var switch24 = document.createElement('input')
switch24.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('accountsettings')) {
    switch24.checked = true
}
switch24.onclick = function() {
    myFunction24()
  }
label24.appendChild(switch24)
var span24 = document.createElement('span')
span24.className = "slider round"
label24.appendChild(span24)
div24.appendChild(h24)
div24.appendChild(document.createElement('br'))
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = 'Replaces the Account Settings button with a Settings button that leads to the same place.'
div24.appendChild(description)
div24.appendChild(label24)
document.querySelector('#page-404 > div').appendChild(div24)
function myFunction24() {
    console.log('test')
    if (switch24.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'accountsettings '}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('accountsettings', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}
//secret
var div3 = document.createElement('div')
var h3 = document.createElement('h3')
h3.textContent = 'THE FORBIDDEN SECRET'
var label3 = document.createElement('label')
label3.className = "switch"
var switch3 = document.createElement('input')
switch3.type = "checkbox"
console.log(getCookie('ST Features'))
if (getCookie('ST Features').includes('secret')) {
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
div3.appendChild(document.createElement('br'))
var description = document.createElement('h3')
description.style.marginTop = '-20px'
description.textContent = '[redacted]'
div3.appendChild(description)
div3.appendChild(label3)
document.querySelector('#page-404 > div').appendChild(div3)
function myFunction3() {
    if (switch3.checked === true) {
        document.cookie = `ST Features=${getCookie('ST Features') + 'secret'}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    } else {
        document.cookie = `ST Features=${getCookie('ST Features').replaceAll('secret', '')}; expires=Thu, 18 Dec 9999 12:00:00 UTC; path=/`;
    }
}
//meow















  document.querySelector('#page-404 > div').querySelectorAll('div').forEach(function(item) {
      item.style.margin = '15px'
      item.style.border = '1px solid black'
      item.style.padding = '5px'
      item.style.borderRadius = '5px'
      if (item === document.querySelector('#page-404 > div > center > div')) {
        item.style.borderRadius = '25px'
      }
  })
  document.querySelector('#page-404 > div').querySelectorAll('h3').forEach(function(item) {
    item.style.width = '720px'
    if (item.parentNode.firstChild === item) {
        item.style.color = '#2196F3'
    }
})

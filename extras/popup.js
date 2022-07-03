async function doStuff() {
    const response = await fetch('https://tools.scratchstatus.org/warning/')
    const data = await response.json()
    if (data['title'] !== ' ') {
        console.log(data['color'])
        var div = document.createElement('div')
        var title = data['title']
        var title2 = document.createElement('h3')
        title2.style.color = color
        title2.textContent = title
        var description = data['description']
        var description2 = document.createElement('p')
        description2.textContent = description
        var color = data['color']
        div.style.padding = '10px'
        div.style.margin = '5px'
        div.style.borderRadius = '10px'
        div.style.border = `2px solid ${color}`
        div.appendChild(title2)
        div.appendChild(description2)
        if (data['button'] !== ' ') {
            var button = document.createElement('button')
            button.addEventListener("click", openIndex);
            button.style.border = '0px'
            button.style.padding = '7px'
            button.style.borderRadius = '5px'
            button.style.backgroundColor = '#ff9f00'
            button.style.color = 'white'

function openIndex() {
chrome.tabs.create({active: true, url: data['url']});
}
button.textContent = data['button']
div.appendChild(button)
        }
        document.body.prepend(div)
    }
}
doStuff()
function leaderboard() {
    chrome.tabs.create({active: true, url: '/extras/leaderboard.html' });
}

//document.querySelector('h3.leaderboard').onclick = function() {
//leaderboard()
//}

function again() {
    var abc = document.querySelector('center')
    var def = document.createElement('button')
    def.onclick = function() {
        chrome.tabs.create({active: true, url: 'https://tools.scratchstatus.org/' });
    }
    def.textContent = 'Website'
            def.style.border = '0px'
            def.style.padding = '7px'
            def.style.borderRadius = '5px'
            def.style.backgroundColor = '#ff9f00'
            def.style.color = 'white'
            def.style.margin = '10px'
abc.appendChild(def)

var abc = document.querySelector('center')
    var def = document.createElement('button')
    def.onclick = function() {
        chrome.tabs.create({active: true, url: 'https://discord.gg/B8be27p5Cn' });
    }
    def.textContent = 'Discord'
    def.title = 'Ages 13 and over!!'
            def.style.border = '0px'
            def.style.padding = '7px'
            def.style.borderRadius = '5px'
            def.style.backgroundColor = '#ff9f00'
            def.style.color = 'white'
            def.style.margin = '10px'
abc.appendChild(def)
}
again()

async function createFeature(name, description, id, credits, def) {
    var div23 = document.createElement('div')
    var item = div23
    item.style.margin = '15px'
    item.style.border = '1px solid black'
    item.style.padding = '5px'
    item.style.borderRadius = '5px'
var h23 = document.createElement('h3')
h23.textContent = name
var label23 = document.createElement('label')
label23.className = "switch"
var switch23 = document.createElement('input')
switch23.type = "checkbox"
switch23.id = id
await chrome.storage.local.get(["features"], async function (obj) {
    if (obj['features'] !== undefined) {
        if (def === true) {
            if (obj['features'].includes(switch23.id)) {
    switch23.checked = false
} else {
    switch23.checked = true
}
        } else {
if (obj['features'].includes(switch23.id)) {
    switch23.checked = true
} else {
    switch23.checked = false
}
        }
    } else {
        await chrome.storage.local.set({"features": "ok"})
        switch23.checked = false
    }

});
console.log(getCookie('ST Features'))
switch23.addEventListener('click', async function() {
    await chrome.storage.local.get(["features"], async function (obj) {
        console.log(obj['features'])
    if (obj['features'].includes(switch23.id)) {
        console.log('false')
        await chrome.storage.local.set({"features": obj['features'].replaceAll(switch23.id, '')})
                await chrome.storage.local.set({"features": obj['features'].replaceAll(switch23.id, '')})
                switch23.checked = false
    } else {
        console.log('true')
        await chrome.storage.local.set({"features": obj['features']+switch23.id})
        switch23.checked = true
    }
})
  })
  await chrome.storage.local.get(["features"], function (obj) {
    console.log(obj['features'])
label23.appendChild(switch23)
var span23 = document.createElement('span')
span23.className = "slider round"
label23.appendChild(span23)
div23.appendChild(h23)
div23.appendChild(document.createElement('br'))
var description2 = document.createElement('h3')
description2.style.marginTop = '-20px'
description2.style.width = '200px'
description2.textContent = description
var a = document.createElement('h3')
a.textContent = `Credits: ${credits.join(', ')}.`
div23.appendChild(description2)
div23.appendChild(label23)
div23.appendChild(a)
document.querySelector('div.settings').appendChild(div23)
})
}
async function getFeatures() {
    var response = await fetch('/features/features.json')
    var data = await response.json()
    Object.keys(data).forEach(function(el) {
        createFeature(data[el]['title'], data[el]['description'], data[el]['file'], data[el]['credits'], data[el]['default'])
    })
}
getFeatures()

function getCookie(name) {
}

document.querySelector('div.settings').querySelectorAll('div').forEach(function(item) {

})
document.querySelector('div.settings').querySelectorAll('h3').forEach(function(item) {
  item.style.width = '720px'
  if (item.parentNode.firstChild === item) {
      item.style.color = '#2196F3'
  }
})

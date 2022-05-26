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
await chrome.storage.sync.get("features", async function (obj) {
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
        await chrome.storage.sync.set({"features": "ok"})
        switch23.checked = false
    }

});
console.log(getCookie('ST Features'))
switch23.addEventListener('click', async function() {
    await chrome.storage.sync.get("features", async function (obj) {
        console.log(obj['features'])
    if (obj['features'].includes(switch23.id)) {
        console.log('false')
        await chrome.storage.sync.set({"features": obj['features'].replaceAll(switch23.id, '')})
                await chrome.storage.sync.set({"features": obj['features'].replaceAll(switch23.id, '')})
                switch23.checked = false
    } else {
        console.log('true')
        await chrome.storage.sync.set({"features": obj['features']+switch23.id})
        switch23.checked = true
    }
})
  })
  await chrome.storage.sync.get("features", function (obj) {
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
a.textContent = `Credits: ${credits}.`
div23.appendChild(description2)
div23.appendChild(label23)
div23.appendChild(a)
div23.style.display = 'inline-block'
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

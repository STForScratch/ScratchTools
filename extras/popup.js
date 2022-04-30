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

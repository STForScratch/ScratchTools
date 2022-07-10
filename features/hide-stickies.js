function hideStickies() {
document.querySelector('tbody').querySelectorAll('tr').forEach(function(el) {
    if (el.querySelector('div.isticky') !== null) {
        el.style.display = 'none'
    }
})
}

function showStickies() {
    document.querySelector('tbody').querySelectorAll('tr').forEach(function(el) {
        if (el.querySelector('div.isticky') !== null) {
            el.style.display = 'table-row'
        }
    })
    }
var a = document.createElement('a')
a.textContent = 'Show Stickies'
a.style.float = 'right'
document.querySelector('div#vf').querySelector('div.box-head').appendChild(a)
document.querySelector('div#vf').querySelector('div.box-head').querySelector('h4').style.float = 'left'
a.onclick = function() {
    if (a.textContent === 'Show Stickies') {
        showStickies()
        a.textContent = 'Hide Stickies'
    } else {
        hideStickies()
        a.textContent = 'Show Stickies'
    }
}
hideStickies()

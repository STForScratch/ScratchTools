if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
checkSubactions()
function checkSubactions() {
    if(document.querySelector('#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions') === null) {
        window.setTimeout(checkSubactions, 100)
    } else {
        focusMode()
    }
}
function focusMode() {
var btn = document.createElement('button')
btn.className = 'button focusMode'
btn.textContent = 'Focus Mode'
btn.onclick = function() {
  document.querySelector('#footer').remove()
  document.querySelector('#navigation').remove()
  document.querySelector("#view > div > div.project-lower-container").remove()
}
document.querySelector("#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions").appendChild(btn)
}
}

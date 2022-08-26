if (window.location.href.startsWith('https://scratch.mit.edu/projects/')) {
var style = document.createElement('style')
style.innerHTML = `
.monitor_value-inner_3E9Ou {
    overflow: scroll;
    text-overflow: clip;
}
`
document.body.appendChild(style)
}
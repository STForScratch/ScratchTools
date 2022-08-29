chrome.storage.sync.get("font", async function (obj) {
    var name = obj['font']
var style = document.createElement('style')
style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=${name.replaceAll(')', '').replaceAll("'", '').replaceAll('}', '').replaceAll(' ', '+')}:wght@200;300;400;500;600;700&display=swap');

* {
    font-family: '${name}', sans-serif;
}
`
document.body.appendChild(style)
})
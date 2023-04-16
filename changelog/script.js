var version = chrome.runtime.getManifest().version_name;
document.querySelector("title").textContent = "What's New in v" + version;
document.querySelector("h1").textContent = "What's New in v" + version;

async function getChanges() {
    const changes = await (await fetch("./changes.json")).json()
    if (changes.new.length) {
        var h3 = document.createElement("h3")
        h3.textContent = "New Features"
        var ul = document.createElement("ul")
        changes.new.forEach(function(el) {
            var li = document.createElement("li")
            li.textContent = el
            ul.appendChild(li)
        })
        document.querySelector(".right").appendChild(h3)
        document.querySelector(".right").appendChild(ul)
    }
    if (changes.enhanced.length) {
        var h3 = document.createElement("h3")
        h3.textContent = "Enhancements"
        var ul = document.createElement("ul")
        changes.enhanced.forEach(function(el) {
            var li = document.createElement("li")
            li.textContent = el
            ul.appendChild(li)
        })
        document.querySelector(".right").appendChild(h3)
        document.querySelector(".right").appendChild(ul)
    }
    if (changes.fixed.length) {
        var h3 = document.createElement("h3")
        h3.textContent = "Bug Fixes"
        var ul = document.createElement("ul")
        changes.fixed.forEach(function(el) {
            var li = document.createElement("li")
            li.textContent = el
            ul.appendChild(li)
        })
        document.querySelector(".right").appendChild(h3)
        document.querySelector(".right").appendChild(ul)
    }
}
getChanges()
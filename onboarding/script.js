async function start() {
await chrome.runtime.sendMessage({text: "get-logged-in-user"}, async function(response) {});
  document.querySelector(".center-perfectly").remove();
  var center = createCenter();
  var h2 = document.createElement("h1");
  h2.textContent = "Here are some of our top features, enable some!";
  var p = document.createElement("p")
  p.textContent = "There are an additional 100+ features for you to choose from. You can change your settings at any time from the extension popup."
  var features = document.createElement("div")
  features.className = "features-row"
  var button = document.createElement("button")
  window.newElements = {
    button: button,
  }
  button.textContent = "Skip"
  features.appendChild(await createFeature("search-context-menus"))
  features.appendChild(await createFeature("collapse-blocks"))
  features.appendChild(await createFeature("get-project-tags"))
  button.onclick = messagesPage
  center.appendChild(h2);
  center.appendChild(p)
  center.appendChild(features)
  center.appendChild(button)
}

async function messagesPage() {
    document.querySelector(".center-perfectly").remove();
    var center = createCenter();
    var h1 = document.createElement("h1");
    h1.textContent = "Thank you.";
    h1.className = "big"
    var h3 = document.createElement("h2")
    h3.style.fontWeight = "400"
    h3.textContent = "Dozens of developers have worked hard to make hundreds of features on ScratchTools, which is used by over 4,000 people worldwide."
    center.appendChild(h1)
    center.appendChild(h3)
    var button = document.createElement("button")
    button.textContent = "Get Started"
    button.onclick = async function() {
        window.location.href = (window.user ? "https://scratch.mit.edu/users/"+window.user+"/" : "https://scratch.mit.edu")
    }
    center.appendChild(button)
}

function createCenter() {
  var div = document.createElement("div");
  div.className = "center-perfectly";
  document.body.appendChild(div);
  return div;
}

async function createFeature(id) {
    var div = document.createElement("div")
    div.className = "feature"
    var obj = (await chrome.storage.sync.get("features")).features
    if (obj?.includes(id)) {
        div.classList.add("enabled")
        window.newElements.button.textContent = "Continue"
    }
    var img = document.createElement("div")
    img.style.backgroundImage = "url(/features/images/"+id+".png)"
    div.appendChild(img)
    var data = await (await fetch("/features/features.json")).json()
    var h2 = document.createElement("h2")
    var featureData = null
    data.forEach(function(el) {
        if (el.file === id) {
            featureData = el
        }
    })
    h2.textContent = featureData.title
    var p = document.createElement("p")
    p.textContent = featureData.description
    var span = document.createElement("span")
    span.textContent = "Click to enable/disable"
    div.appendChild(h2)
    div.appendChild(p)
    div.appendChild(span)
    div.addEventListener("click", async function() {
        var obj = (await chrome.storage.sync.get("features")).features
        if (div.className.includes("enabled")) {
            div.classList.remove("enabled")
            if (obj) {
                await chrome.storage.sync.set({
                    features: obj.replaceAll(featureData.file, "")
                })
            }
        } else {
            div.classList.add("enabled")
            if (obj) {
                await chrome.storage.sync.set({
                    features: obj+"."+featureData.file
                })
            } else {
                await chrome.storage.sync.set({
                    features: featureData.file
                })
            }
        }
        if (document.querySelector(".enabled")) {
            document.querySelector("button").textContent = "Continue"
        } else {
            document.querySelector("button").textContent = "Skip"
        }
    })
    return div
}

document.querySelector("button[data-function=start]").onclick = start

chrome.runtime.onMessage.addListener(async function(msg, sender, sendResponse) {
    if (msg?.user.username) {
        window.user = msg.user.username
    } else {
        window.user = null
    }
})
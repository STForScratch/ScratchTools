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
  button.onclick = themePage
  center.appendChild(h2);
  center.appendChild(p)
  center.appendChild(features)
  center.appendChild(button)
}

async function messagesPage() {
    document.querySelector(".center-perfectly").remove();
    var center = createCenter();
    var h1 = document.createElement("h1");
    h1.textContent = chrome.runtime.getManifest().version_name.endsWith("-beta") ? "You're using the beta." : "Thank you.";
    h1.className = "big"
    var h3 = document.createElement("h2")
    h3.style.fontWeight = "400"
    h3.textContent = chrome.runtime.getManifest().version_name.endsWith("-beta") ? "If you find any bugs, just open up the full settings page, click on the \"Additional Settings\" button, and click \"Report a Bug\"." : "Dozens of developers have worked hard to make hundreds of features on ScratchTools, which is used by over 4,000 people worldwide."
    center.appendChild(h1)
    center.appendChild(h3)
    var button = document.createElement("button")
    button.textContent = "Get Started"
    button.onclick = async function() {
        window.location.href = (window.user ? "https://scratch.mit.edu/users/"+window.user+"/" : "https://scratch.mit.edu")
    }
    center.appendChild(button)
}

async function themePage(){
    document.querySelector(".center-perfectly").remove();
    var center = createCenter();
    center.className = "center-perfectly"

    var h1 = document.createElement("h1");
    h1.textContent = "Choose a Theme"; h1.className = "big"; h1.style.fontWeight = "bold"
    center.append(h1)
    
    var themeSelection = document.createElement("div"); 
    themeSelection.className = "theme-selection"; 
    center.append(themeSelection)

    var themePreview = document.createElement("div");
    themePreview.className = "theme-preview";
    themeSelection.append(themePreview)

    var currentTheme = ((await chrome.storage.sync.get("theme")).theme || "light")
    
    var themePreviewImg = document.createElement("img");
    themePreviewImg.src = "themes/"+currentTheme+".svg";
    themePreviewImg.id = "theme-preview"
    themePreview.append(themePreviewImg)

    var themeOptions = document.createElement("div");
    themeOptions.className = "themes";
    themeSelection.append(themeOptions)

    var light = document.createElement("div");
    light.className = "theme-circle theme-light "+((currentTheme === "light") ? "theme-select" : "theme-noselect");
    light.id = "light"
    light.onclick = async function() {
        themePreviewImg.src = `/onboarding/themes/light.svg`
        light.classList.remove("theme-noselect")
        light.classList.add("theme-select")
        dark.classList.remove("theme-select")
        dark.classList.add("theme-noselect")
        await chrome.storage.sync.set({ theme: "light" })
    }
    themeOptions.append(light)

    var dark = document.createElement("div");
    dark.className = "theme-circle theme-dark "+((currentTheme === "dark") ? "theme-select" : "theme-noselect");
    dark.id = "dark"
    dark.onclick = async function() {
        themePreviewImg.src = `/onboarding/themes/dark.svg`
        dark.classList.remove("theme-noselect")
        dark.classList.add("theme-select")
        light.classList.remove("theme-select")
        light.classList.add("theme-noselect")
        await chrome.storage.sync.set({ theme: "dark" })
    }
    themeOptions.append(dark)

    var button = document.createElement("button")
    button.textContent = "Continue"
    button.onclick = messagesPage
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
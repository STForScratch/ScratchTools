// Theme.js by @Daniel4-Scratch
// Theme.js is a file that is used to set the theme of the page.
// Apply Theme.js to a page and it will apply the theme to the page.
// It also dynamically changes the theme when it is changed in the settings.

// Loads the theme from storage and applies it to the page
chrome.storage.sync.get("theme", function (obj) {
  let theme = obj.theme;
  if (!theme) theme = "light";

  const themeLink = document.createElement("link");
  themeLink.setAttribute("rel", "stylesheet");
  themeLink.setAttribute("href", `/extras/styles/${theme}.css`);
  themeLink.id = "themecss";
  document.head.appendChild(themeLink);

  const version = chrome.runtime.getManifest().version_name;
  if (version.includes("beta")) setBetaTheme();
});

// Updates the theme when it is changed
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (var key in changes) {
    if (key === "theme") {
      document.getElementById("themecss").href = `/extras/styles/${changes[key].newValue}.css`;
    }
  }
});

// Sets the beta theme
function setBetaTheme() {
  if (document.querySelector("link[rel=icon]")) {
    document.querySelector("link[rel=icon]").href =
      "/extras/icons/beta/beta.svg";
  }
  const betaCSS = document.createElement("link");
  betaCSS.setAttribute("rel", "stylesheet");
  betaCSS.setAttribute("href", "/extras/styles/beta.css");
  document.head.appendChild(betaCSS);
  if (document.head.id == "Popup") {
    document.getElementById("minilogo").src = "/extras/icons/beta/beta.svg";
    document.getElementById("popupnote").innerHTML =
      "Welcome to the beta verison of ScratchTools! This version is not stable and may contain bugs. Please report any bugs you find <a href='https://github.com/STForScratch/ScratchTools/issues' target='_blank'>here</a>.";
  }
}

async function setTheme(themetext) {
  var theme = document.getElementById("themecss");
  theme.href = `/extras/styles/${themetext}.css`;
  await chrome.storage.sync.set({ theme: themetext });
}

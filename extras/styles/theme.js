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
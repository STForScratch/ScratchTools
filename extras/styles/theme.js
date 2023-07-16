var defaultThemes = [
  {
    data: {
      background: "#ffffff",
      box: "#eeeeee",
      feature: "#eeeeee75",
      gradient: ["#ff8c2d", "#ffb740"],
      input: "#e4e4e4",
      primary: "#000000",
      scrollbar: "#c2bfbf",
      scrollbar_active: "#b2afaf",
      searchbar: "#eeeeee",
      secondary: "#00000077",
      slider: "#cccccc",
      theme: "#FF9F00",
    },
    id: "64b36b38785a4110e937ac30",
    title: "Classic Light",
    active: true,
    theme: "light",
  },
  {
    data: {
      background: "#3f3f3f",
      box: "#eeeeee",
      feature: "#343434",
      gradient: ["#ff8c2d", "#ffb740"],
      input: "#545454",
      primary: "#ffffff",
      scrollbar: "#797979",
      scrollbar_active: "#656565",
      searchbar: "#ffffff17",
      secondary: "#ffffff77",
      slider: "#4b4b4b",
      theme: "#FF9F00",
    },
    id: "64b36b38785a4110e937ac31",
    title: "Classic Dark",
    theme: "dark",
  },
];

async function setActiveTheme() {
  var themes =
    (await chrome.storage.sync.get("themes"))?.themes || defaultThemes;
  setTheme(themes.find((el) => el.active).id);
}
setActiveTheme();

async function setTheme(themeId) {
  var enabled =
    (await chrome.storage.sync.get("themes"))?.themes || defaultThemes;
  if (enabled.find((el) => !el.theme)) {
    enabled = defaultThemes;
    await chrome.storage.sync.set({
      themes: enabled,
    });
  }
  var found = enabled.find((el) => el.id === themeId);
  found.active = true;
  document.head.querySelector("style.theme")?.remove();
  var style = document.createElement("style");
  style.textContent = `
  :root {
    --theme: ${found.data.theme};
    --background: ${found.data.background};
    --primary-color: ${found.data.primary};
    --secondary-color: ${found.data.secondary};
    --searchbar-bg: ${found.data.searchbar};
    --searchbar-gears: url("/extras/icons/settings.svg");
    --searchbar-search: ${
      found.theme === "light"
        ? 'url("/extras/icons/search.svg")'
        : 'url("/extras/icons/search-light.svg")'
    };
    --mini-logo: url("/extras/icons/mini-logo.svg");
    --box: ${found.data.box};
    --feature-bg: ${found.data.feature};
    --feature-input-bg: ${found.data.input};
    --feature-slider-bg: ${found.data.slider};
    --scrollbar-handle: ${found.data.scrollbar};
    --scrollbar-handle-active: ${found.data.scrollbar_active};
    --theme-icon: url("/extras/icons/dark.svg");
    --navbar-gradient: linear-gradient(0.25turn, ${found.data.gradient[0]}, ${
    found.data.gradient[1]
  });
    --campsite: url("/extras/icons/campsitelight.svg");
  }
  `;
  if (found.theme === "light") {
    style.textContent += `
    
    .feedback-btn img {
      height: 1rem;
      position: relative;
      top: 0.2rem;
      filter: invert(1);
    }
    
    .support-btn img {
      height: 1rem;
      position: relative;
      top: 0.2rem;
      filter: invert(1);
    }`;
  } else {
    style.textContent += `
    .settingsButton {
      filter: brightness(0) invert(1);
    }`;
  }
  style.className = "theme";
  document.head.appendChild(style);
}

chrome.runtime.onMessage.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  console.log(msg)
  if (msg.msg === "installedThemesUpdate") {
    getThemes()
  } else if (msg.msg === "themeUpdate") {
    setTheme(msg.value.id)
  }
})
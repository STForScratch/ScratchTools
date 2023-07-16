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
  var active = enabled.find((el) => el.active);
  var found = enabled.find((el) => el.id === themeId);
  active.active = false;
  found.active = true;
  await chrome.storage.sync.set({
    themes: enabled,
  });
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

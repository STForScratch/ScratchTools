function gEBI(id) {
  return document.getElementById(id);
}
const section = {
  1: gEBI("section_1"),
  2: gEBI("section_2"),
  3: gEBI("section_3"),
  4: gEBI("section_4"),
};

async function start() {
  section[1].classList.add("hidden");
  section[2].classList.remove("hidden");
}
async function theme() {
  section[2].classList.add("hidden");
  section[3].classList.remove("hidden");

  const light = gEBI("light");
  const dark = gEBI("dark");

  const themes = {
    light: {
      enabled: true,
      element: gEBI("light"),
    },
    dark: {
      enabled: false,
      element: gEBI("dark"),
    },
    purple: {
      enabled: false,
      element: gEBI("purple"),
    },
  };

  async function changeTheme(theme) {
    const themePreviewImg = gEBI("theme-preview");
    themePreviewImg.src = `/onboarding/themes/${theme}.svg`;
    themes[theme].element.classList.remove("theme-noselect");
    themes[theme].element.classList.add("theme-select");
    for (const themeName in themes) {
      if (themeName !== theme) {
        themes[themeName].element.classList.remove("theme-select");
        themes[themeName].element.classList.add("theme-noselect");
      }
    }

    await chrome.storage.sync.set({ theme: theme });
  }

  const themePreviewImg = gEBI("theme-preview");
  themes.light.element.onclick = async function () {
    await changeTheme("light");
  };
  themes.dark.element.onclick = async function () {
    await changeTheme("dark");
  };
  themes.purple.element.onclick = async function () {
    await changeTheme("purple");
  };
}

async function end() {
  section[3].classList.add("hidden");
  section[4].classList.remove("hidden");
}
const button = gEBI("end_button");
button.addEventListener("click", () => {
  window.location.href = "https://scratch.mit.edu";
});

//check if verison-name manifest contains "beta" if change text
if (chrome.runtime.getManifest().version_name.includes("beta")) {
  gEBI("end_title").textContent = "Thanks for trying out the beta!";
  gEBI(
    "end_text"
  ).textContent = `If you find any bugs, just open up the full settings page, click on the "Additional
    Settings" button, and click "Report a Bug".`;
}

document.querySelector("button[data-function=start]").onclick = start;

document.querySelector("button[data-function=theme]").onclick = theme;

document.querySelector("button[data-function=end]").onclick = end;

async function createFeature(id) {
  var div = document.createElement("div");
  div.className = "feature";
  var obj = (await chrome.storage.sync.get("features")).features;
  if (obj?.includes(id)) {
    div.classList.add("enabled");
    document.querySelector("button[data-function=theme]").textContent =
      "Continue";
  }
  var img = document.createElement("div");
  img.style.backgroundImage = "url(/onboarding/images/" + id + ".png)";
  div.appendChild(img);
  var data = await (await fetch("/features/features.json")).json();
  var h2 = document.createElement("h2");
  var featureData = null;
  for (var i in data) {
    var el = data[i];
    if (el.file === id || el.id === id) {
      if (el.version === 2) {
        featureData = await (
          await fetch(`/features/${el.id}/data.json`)
        ).json();
        featureData.id = el.id;
      } else {
        featureData = el;
      }
    }
  }
  h2.textContent = featureData.title;
  var p = document.createElement("p");
  p.textContent = featureData.description;
  var span = document.createElement("span");
  span.textContent = "Click to enable/disable";
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(span);
  div.addEventListener("click", async function () {
    var obj = (await chrome.storage.sync.get("features")).features;
    if (div.className.includes("enabled")) {
      div.classList.remove("enabled");
      if (obj) {
        await chrome.storage.sync.set({
          features: obj.replaceAll(featureData.file || featureData.id, ""),
        });
      }
    } else {
      div.classList.add("enabled");
      if (obj) {
        await chrome.storage.sync.set({
          features: obj + "." + (featureData.file || featureData.id),
        });
      } else {
        await chrome.storage.sync.set({
          features: (featureData.file || featureData.id),
        });
      }
    }
    if (document.querySelector(".enabled")) {
      document.querySelector("button[data-function=theme]").textContent =
        "Continue";
    } else {
      document.querySelector("button[data-function=theme]").textContent =
        "Skip";
    }
  });
  return div;
}

async function loadFeatures() {
  var featuredFeatures = await (await fetch("./featured.json")).json();
  featuredFeatures.forEach(async function (ftr) {
    document
      .querySelector(".features-row")
      .appendChild(await createFeature(ftr));
  });
}
loadFeatures();

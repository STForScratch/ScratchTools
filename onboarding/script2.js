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
  },
];

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
  document.querySelector("#section_2").classList.add("hidden");
  document.querySelector("#section_3").classList.remove("hidden");
  var installed =
    (await chrome.storage.sync.get("themes"))?.themes || defaultThemes;
  if (installed === defaultThemes) {
    await chrome.storage.sync.set({
      themes: defaultThemes,
    });
  }
  installed.forEach(function (el) {
    var div = document.createElement("div");
    div.className = "circle theme";
    if (el.active) {
      div.classList.add("theme-select");
    }
    div.addEventListener("click", async function() {
      installed =
      (await chrome.storage.sync.get("themes"))?.themes || defaultThemes;
      if (installed.find((theme) => theme.id === el.id)) {
        var found = installed.find((theme) => theme.id === el.id)
        var active = installed.find((theme) => theme.active)
        active.active = false
        found.active = true
        await chrome.storage.sync.set({
          themes: installed,
        })
        div.parentNode.querySelector(".theme-select").classList.remove("theme-select")
        div.classList.add("theme-select")
        generatePreview(found.id)
      } else {
        div.remove()
      }
    })
    div.style.background = `linear-gradient(135deg, ${el.data.theme} 50%, ${el.data.background} 50%`;
    document.querySelector(".themes").appendChild(div);
  });
  var activeTheme = installed.find((el) => el.active);
  generatePreview(activeTheme.id);
}

async function generatePreview(activeThemeId) {
  var svgData = await (await fetch("/themes/settings/svgData.svg")).text();
  document.querySelector(".theme-preview").innerHTML = svgData;
  var svg = document.querySelector(".theme-preview")
  var activeTheme = (await chrome.storage.sync.get("themes")).themes
    .find((el) => el.id === activeThemeId);

    [
      "theme",
      "background",
      "primary",
      "secondary",
      "searchbar",
      "feature",
      "slider"
    ].forEach(function (el) {
      svg.querySelectorAll(`[fill="var(--${el})"]`).forEach(function (element) {
        element.style.fill = activeTheme.data[el];
      });
      svg.querySelectorAll(`[fill="var(--icon)"]`).forEach(function (el) {
        el.style.fill = activeTheme.theme === "dark" ? "white" : "#3D3D3D";
      });
      svg.querySelectorAll(`[stroke="var(--icon)"]`).forEach(function (el) {
        el.style.stroke = activeTheme.theme === "dark" ? "white" : "#3D3D3D";
      });
    });
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
          features: featureData.file || featureData.id,
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

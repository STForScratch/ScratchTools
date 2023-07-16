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

async function getThemes() {
  var steThemes = await (
    await fetch("https://data.scratchtools.app/themes/scratchtools/")
  ).json();
  steThemes.forEach(function (el) {
    document
      .querySelector(".ste-themes")
      .appendChild(createScratchToolsTheme(el));
  });
}

var svgData = "";
var enabled = [];
async function getSvgData() {
  var data = await (await fetch("/themes/settings/svgData.svg")).text();
  var themesData = (await chrome.storage.sync.get("themes"))?.themes;
  enabled =
    typeof themesData === "object" && themesData ? themesData : defaultThemes;
  await chrome.storage.sync.set({
    themes: enabled,
  });
  svgData = data;
  getThemes();
}
getSvgData();

function createScratchToolsTheme(data) {
  var div = document.createElement("div");
  div.className = "theme";

  var svg = document.createElement("div");
  svg.dataset.id = data._id;
  svg.innerHTML = svgData;
  [
    "theme",
    "background",
    "primary",
    "secondary",
    "searchbar",
    "feature",
    "slider",
  ].forEach(function (el) {
    svg.querySelectorAll(`[fill="var(--${el})"]`).forEach(function (element) {
      element.style.fill = data.colors[el];
    });
    svg.querySelectorAll(`[fill="var(--icon)"]`).forEach(function (el) {
      el.style.fill = data.theme === "dark" ? "white" : "#3D3D3D";
    });
    svg.querySelectorAll(`[stroke="var(--icon)"]`).forEach(function (el) {
      el.style.stroke = data.theme === "dark" ? "white" : "#3D3D3D";
    });
  });
  svg.style.background = `linear-gradient(45deg, ${data.colors.gradient[0]}, ${data.colors.gradient[1]})`;
  div.appendChild(svg);

  var h3 = document.createElement("h2");
  h3.textContent = data.title;
  div.appendChild(h3);

  var p = document.createElement("p");
  p.textContent = "By " + data.author;
  div.appendChild(p);

  var button = document.createElement("button");
  button.textContent = enabled.find((el) => el.id === data._id)
    ? "Uninstall"
    : "Install";
  if (enabled.find((el) => el.id === data._id)) {
    button.classList.add("uninstall");
  }
  button.style.backgroundColor = data.colors.theme;
  button.addEventListener("click", async function () {
    enabled = (await chrome.storage.sync.get("themes")).themes;
    if (!enabled.find((el) => el.id === data._id)) {
      if (enabled.length < 5) {
        button.textContent = "Uninstall";
        button.classList.add("uninstall");
        enabled.push({
          title: data.title,
          id: data._id,
          data: data.colors,
          theme: data.theme,
        });
        await chrome.storage.sync.set({
          themes: enabled,
        });
      } else {
        alert("You can't have more than 5 themes installed at a time.");
      }
    } else if (enabled.length !== 1) {
      button.textContent = "Install";
      button.classList.remove("uninstall");
      var isActive = !!enabled.find((el) => el.id === data._id).active;
      enabled = enabled.filter((el) => el.id !== data._id);
      if (isActive) {
        enabled[0].active = true;
      }
      await chrome.storage.sync.set({
        themes: enabled,
      });
    } else {
      alert("This is your last installed theme! You can't disable it!");
    }
  });
  div.appendChild(button);

  return div;
}

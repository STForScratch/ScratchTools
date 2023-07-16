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
  enabled = typeof themesData === "object" ? themesData : [];
  if (typeof themesData === "object") {
    await chrome.storage.sync.set({
      themes: [],
    });
  }
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
  button.textContent = "Install";
  button.style.backgroundColor = data.colors.theme;
  div.appendChild(button);

  return div;
}

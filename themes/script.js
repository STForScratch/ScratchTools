async function getThemes() {
  var steThemes = await (
    await fetch("https://data.scratchtools.app/themes/scratchtools/")
  ).json();
  steThemes.forEach(function (el) {
    document
      .querySelector(".ste-themes")
      .appendChild(createScratchToolsTheme(el));
      document
      .querySelector(".ste-themes")
      .appendChild(createScratchToolsTheme(el));
      document
      .querySelector(".ste-themes")
      .appendChild(createScratchToolsTheme(el));
      document
      .querySelector(".ste-themes")
      .appendChild(createScratchToolsTheme(el));
  });
}

document.querySelectorAll(".section > button").forEach(function(el) {
    el.onclick = function() {
        el.parentNode.querySelector(".themes-box").style.height = null
        el.remove()
    }
})

var svgData = "";
async function getSvgData() {
  var data = await (await fetch("/themes/svgData.svg")).text();
  svgData = data;
  getThemes();
}
getSvgData();

function createScratchToolsTheme(data) {
  var div = document.createElement("div");
  div.className = "theme";

  var svg = document.createElement("div");
  svg.innerHTML = svgData;
  var style = document.createElement("style");
  style.textContent = `
    :root {
        --theme: ${data.colors.theme};
        --background: ${data.colors.background};
        --primary: ${data.colors.primary};
        --secondary: ${data.colors.secondary};
        --searchbar: ${data.colors.searchbar};
        --feature: ${data.colors.feature};
        --slider: ${data.colors.slider};
        --icon: ${data.theme === "dark" ? "white" : "#3D3D3D"};
      }`;
  svg.firstChild.prepend(style);
  svg.style.background = `linear-gradient(45deg, ${data.colors.gradient[0]}, ${data.colors.gradient[1]})`;
  div.appendChild(svg);

  var h3 = document.createElement("h2");
  h3.textContent = data.title;
  div.appendChild(h3);

  var p = document.createElement("p");
  p.textContent = "By " + data.author;
  div.appendChild(p);

  var button = document.createElement("button")
  button.textContent = "Install"
  button.style.backgroundColor = data.colors.theme
  div.appendChild(button)

  return div;
}

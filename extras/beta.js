if (chrome.runtime.getManifest().version_name.toLowerCase().includes("beta")) {
  document.documentElement.style.setProperty("--theme", "#6f00ff");

  if (document.querySelector("h2.title") !== null) {
    document.querySelector(
      "h2.title"
    ).innerHTML = `ScratchTools Settings <span style="color: #9b57fa">Beta</span>`;
  }
  if (document.querySelector("div.span") !== null) {
    document.querySelector("div.span").textContent = "ScratchTools Beta ";
  }
}

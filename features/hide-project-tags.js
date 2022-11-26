var style = document.createElement("style");
style.textContent = `
.project-description a[href*="/search/projects?q="] {
    display: none !important;
}
`;
document.body.appendChild(style);

ScratchTools.setDisable("hide-project-tags", function () {
  style.remove();
});

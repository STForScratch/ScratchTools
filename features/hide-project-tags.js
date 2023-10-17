var style = document.createElement("style");
style.textContent = `
.project-description a[href*="/search/projects?q="] {
    display: none !important;
}

.project-description a.scratchtoolsTag[href*="/search/projects?q="] {
  display: inline !important;
}
`;
document.body.appendChild(style);

ScratchTools.setDisable("hide-project-tags", function () {
  style.remove();
});

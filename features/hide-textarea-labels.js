var style = document.createElement("style");
style.className = ".hideTextareaLabels";
style.textContent = `
.project-textlabel {
    display: none !important;
}`;
document.body.appendChild(style);

ScratchTools.setDisable("hide-textarea-labels", function () {
  document.querySelector(".hideTextareaLabels").remove();
});

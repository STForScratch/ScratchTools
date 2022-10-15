var style = document.createElement("style");
style.textContent = `
li.gallery > a.image > span.image {
    border: 0px !important;
}
`;
style.className = "scratchtoolsRemoveBorder";
document.body.appendChild(style);
ScratchTools.setDisable("hide-studio-borders", function () {
  document.querySelector(".scratchtoolsRemoveBorder").remove();
});

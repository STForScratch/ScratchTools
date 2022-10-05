var style = document.createElement("style");
style.innerHTML = `
    .box {
transition: box-shadow .2s;
box-shadow: 0 0 7px #999999;
}
  .box:hover {
    box-shadow: 0 0 15px #999999;
  }
`;
style.className = "scratchtoolsBoxShadows";
document.body.appendChild(style);

ScratchTools.setDisable("box-shadows", function () {
  document.querySelector(".scratchtoolsBoxShadows").remove();
});

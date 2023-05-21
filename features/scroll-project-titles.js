ScratchTools.styles.add(
  `
.project-title.no-edit {
    overflow-x: auto !important;
    text-overflow: clip !important;
}`,
  "scroll project titles"
);

ScratchTools.setDisable("scroll-project-titles", function () {
  if (document.querySelector(".project-title.no-edit")) {
    document.querySelector(".project-title.no-edit").scrollLeft = 0;
  }
  ScratchTools.styles.removeStyleById("scroll project titles");
});

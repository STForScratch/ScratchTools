ScratchTools.waitForElements("img", addTerrible, "terrible", false);
function addTerrible() {
  document.querySelectorAll("img").forEach(function (el) {
    el.src = "https://c.tenor.com/WHrgX-FXJjwAAAAM/rickroll.gif";
  });
}

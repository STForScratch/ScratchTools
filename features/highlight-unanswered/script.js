if (
  window.location.href
    .toLowerCase()
    .startsWith("https://scratch.mit.edu/discuss/") &&
  window.location.href.toLowerCase() !== "https://scratch.mit.edu/discuss/" &&
  window.location.href.toLowerCase() !== "https://scratch.mit.edu/discuss"
) {
  document.querySelectorAll("tbody > tr").forEach(function (el) {
    if (el.querySelector("td.tc2").textContent === "0") {
      el.style.backgroundColor = "#dce8f7";
    }
  });
}
ScratchTools.setDisable("highlight-unanswered", function () {
  document.querySelectorAll("tbody > tr").forEach(function (el) {
    el.style.backgroundColor = null;
  });
});
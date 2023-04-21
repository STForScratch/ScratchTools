var statsPercentagesEnabled = true;

if (window.location.href.startsWith("https://scratch.mit.edu/mystuff/")) {
  document.querySelectorAll("div.media-stats").forEach(function (project) {
    if (project.querySelector(".stat") && statsPercentagesEnabled) {
      var views = project.querySelectorAll(".stat")[0].textContent;
      getStatsForElement(project.querySelectorAll(".stat")[1]);
      getStatsForElement(project.querySelectorAll(".stat")[2]);
      getStatsForElement(project.querySelectorAll(".stat")[3]);
      function getStatsForElement(el) {
        var count = el.textContent;
        var percent =
          (
            Math.round((Number(count) / Number(views)) * 10000) / 100
          ).toString() + "%";
        el.title = percent;
      }
    }
  });
}

ScratchTools.setDisable("stats-percentages", function () {
  statsPercentagesEnabled = false;
  document.querySelectorAll(".stat").forEach(function (el) {
    el.title = undefined;
  });
});

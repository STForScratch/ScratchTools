ScratchTools.waitForElements(
  ".thumbnail-loves",
  async function (el) {
    var response = await fetch(
      el.parentNode.firstChild.href.replace("https://", "https://api.")
    );
    if (response.status !== 200) return;
    var data = await response.json();
    el.title = data.stats.loves;
    el.firstChild.textContent = data.stats.loves;
  },
  "accurateLovesCount",
  false
);

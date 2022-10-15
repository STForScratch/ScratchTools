if (window.location.href.startsWith("https://scratch.mit.edu/projects/")) {
  const waitForShareDate = new MutationObserver(checkTrending);
  waitForShareDate.observe(document.querySelector("body"), {
    attributes: true,
    childList: true,
    subtree: true,
  });
  async function checkTrending() {
    if (document.querySelector("div.share-date") !== null) {
      waitForShareDate.disconnect();
      var response = await fetch(
        "https://api.scratch.mit.edu/explore/projects?limit=40&offset=0&language=en&mode=trending&q=*"
      );
      var data = await response.json();
      data.forEach(function (el, i) {
        if (
          el.id.toString() ===
          window.location.href
            .replace("https://scratch.mit.edu/projects/", "")
            .replaceAll("/", "")
        ) {
          if (document.querySelector(".scratchtoolsTrendingInfo") === null) {
            var span = document.createElement("span");
            span.textContent = ` • #${i + 1} on Trending`;
            span.className = "scratchtoolsTrendingInfo";
            document.querySelector("div.share-date").appendChild(span);
            ScratchTools.setDisable("check-if-trending", function () {
              document.querySelector(".scratchtoolsTrendingInfo").remove();
            });
          }
        }
      });
    }
  }
  checkTrending();
}

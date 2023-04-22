if (window.location.href.startsWith("https://scratch.mit.edu/projects/")) {
  async function getFollowerCount(el) {
    var response = await fetch(
      "https://scratch.mit.edu/users/" +
        el.querySelector("a")?.textContent +
        "/followers/"
    );
    var data = (await response.text())
      .toLowerCase()
      .replaceAll("<!doctype html>", "");
    var div = document.createElement("div");
    div.innerHTML = data;
    if (!document.querySelector(".scratchtoolsFollowerCount")) {
      if (stillComplete) {
        var span = document.createElement("span");
        span.textContent =
          " (" +
          div
            .querySelector(".box-head > h2")
            .textContent.split("(")[1]
            .split(")")[0] +
          " followers" +
          ")";
        span.className = "scratchtoolsFollowerCount";
        document.querySelector(".title").appendChild(span);
      }
    }
  }
  ScratchTools.setDisable("follower-count", function () {
    stillComplete = false;
    document.querySelector(".scratchtoolsFollowerCount").remove();
  });
  var stillComplete = true;
  ScratchTools.waitForElements(
    ".title",
    getFollowerCount,
    "project follower count",
    false
  );
}

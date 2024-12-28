if (ScratchTools.Storage.colorComment) {
  document.body.classList.add("colorComment");
  document.body.classList.remove("hideComment");
} else {
  document.body.classList.remove("colorComment");
  document.body.classList.add("hideComment");
}

if (ScratchTools.Storage.dontHideStudioComments) {
  document.body.classList.add("dontHideStudioComments")
}

var hideAds = new Feature({ id: "hide-advertisements" });
hideAds.settings.addEventListener("changed", function ({key: name, value}) {
  if (name === "colorComment") {
    if (value) {
      document.body.classList.add("colorComment");
      document.body.classList.remove("hideComment");
    } else {
      document.body.classList.remove("colorComment");
      document.body.classList.add("hideComment");
    }
  } else if (name === "dontHideStudioComments") {
    if (value) {
      document.body.classList.add("dontHideStudioComments")
    } else {
      document.body.classList.remove("dontHideStudioComments")
    }
  }
});

ScratchTools.waitForElements(
  ".comment-bubble",
  function (comment) {
    if (
      !comment.parentNode.parentNode.parentNode.className.includes(
        "scratchtoolsAd"
      )
    ) {
      if (comment.querySelector("a")) {
        comment.querySelectorAll("a").forEach(function (a) {
          if (
            a.href.startsWith("https://scratch.mit.edu/projects/") ||
            a.href.startsWith("https://scratch.mit.edu/studios/")
          ) {
            comment.parentNode.parentNode.parentNode.classList.add(
              "scratchtoolsAd"
            );
          }
        });
      }
    }
  },
  "scratchtoolsAdsThree",
  false
);

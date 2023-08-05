if (!document.querySelector(".scratchtools-main-clone-counter")) {
  ScratchTools.waitForElements(
    "div[class^='stage-header_stage-size-toggle-group_']",
    function () {
      document
        .querySelector("div[class^='stage-header_stage-size-toggle-group_']")
        .addEventListener("click", function (event) {
          var counter = document.querySelector(
            ".scratchtools-main-clone-counter span"
          );
          if (
            event.target.closest("[class*='stage-header_stage-button-first']")
          ) {
            counter.style.display = "none";
          } else if (
            event.target.closest("[class*='stage-header_stage-button-last']")
          ) {
            counter.style.display = null;
          }
        });
      var div = document.createElement("div");
      div.className = "scratchtools-main-clone-counter";
      var img = document.createElement("img");
      img.src = ScratchTools.Resources["clones"];
      var span = document.createElement("span");
      span.textContent = "0 clones";
      div.appendChild(img);
      div.appendChild(span);
      if (!document.querySelector(".scratchtools-main-clone-counter")) {
        ScratchTools.appendToSharedSpace({
          space: "afterStopButton",
          element: div,
          order: 0.5,
        });
      }
    },
    "clone-counter-above-stage",
    false
  );
  var interval = setInterval(function () {
    if (document.querySelector(".scratchtools-main-clone-counter")) {
      var counter = document.querySelector(
        ".scratchtools-main-clone-counter span"
      );
      var count = (
        ScratchTools.Scratch?.vm?.runtime?._cloneCounter || 0
      ).toString();
      counter.textContent = count + " clones";
    } else if (
      document.querySelector(
        "div[class^='stage-header_stage-size-toggle-group_']"
      )
    ) {
      var div = document.createElement("div");
      div.className = "scratchtools-main-clone-counter";
      var img = document.createElement("img");
      img.src = ScratchTools.Resources["clones"];
      var span = document.createElement("span");
      span.textContent = "0 clones";
      div.appendChild(img);
      div.appendChild(span);
      if (!document.querySelector(".scratchtools-main-clone-counter")) {
        ScratchTools.appendToSharedSpace({
          space: "afterStopButton",
          element: div,
          order: 0.5,
        });
      }
    }
  }, 100);
}

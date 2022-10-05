var countClonesStill = true;
function addCloneCounter() {
  if (document.querySelector("progress.clonecount.scratchtools") === null) {
    var bar = document.createElement("progress");
    bar.value = "0";
    bar.max = "300";
    bar.className = "clonecount scratchtools";
    bar.style.position = "absolute";
    bar.style.margin = "0";
    var style = document.createElement("style");
    style.innerHTML = `
    .clonecount {
        top: 50%;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    `;
    document.body.appendChild(style);
    checkForCloneCounterPosition();

    function checkForCloneCounterPosition() {
      document.querySelectorAll("div").forEach(function (el) {
        if (el.className.includes("controls_controls-container_")) {
          el.appendChild(bar);
          cloneCount();
        }
      });
      if (document.querySelector("progress.clonecount.scratchtools") === null) {
        setTimeout(checkForCloneCounterPosition, 100);
      }
    }

    function cloneCount() {
      document.querySelector("progress.clonecount.scratchtools").value =
        ScratchTools.Scratch.vm.runtime._cloneCounter.toString();
      document.querySelector(
        "progress.clonecount.scratchtools"
      ).style.backgroundColor =
        ScratchTools.Scratch.vm.runtime._cloneCounter.toString();
      if (countClonesStill) {
        setTimeout(cloneCount, 200);
      }
    }
  }
}
addCloneCounter();
ScratchTools.setDisable("clone-counter", function () {
  countClonesStill = false;
  document.querySelector(".clonecount").remove();
});

if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
  if (
    document.scratchtoolsTimer !== undefined &&
    document.scratchtoolsTimer !== null
  ) {
    var bar = document.createElement("div");
    bar.className = "timer scratchtools";
    bar.style.margin = "0";
    bar.style.marginTop = "7px";
    bar.style.marginLeft = "5px";
    document.querySelectorAll("div").forEach(function (el) {
      if (el.className.includes("controls_controls-container_")) {
        if (document.querySelector("div.timer.scratchtools") === null) {
          el.appendChild(bar);
          bar.textContent = "0 secs";
        }
      }
    });
  }
  ScratchTools.Scratch.vm.runtime.on("PROJECT_RUN_START", function () {
    if (document.querySelector("div.timer.scratchtools") === null) {
      var bar = document.createElement("div");
      bar.className = "timer scratchtools";
      bar.style.margin = "0";
      bar.style.marginTop = "7px";
      bar.style.marginLeft = "5px";
      document.querySelectorAll("div").forEach(function (el) {
        if (el.className.includes("controls_controls-container_")) {
          if (document.querySelector("div.timer.scratchtools") === null) {
            el.appendChild(bar);
            bar.textContent = "0 secs";
          }
        }
      });
    }
    document.scratchtoolsTimer = ScratchTools.Scratch.vm.runtime.currentMSecs;
  });
  ScratchTools.Scratch.vm.runtime.on("PROJECT_RUN_STOP", function () {
    document.scratchtoolsTimer = null;
    if (document.querySelector("div.timer.scratchtools") !== null) {
      document.querySelector("div.timer.scratchtools").remove();
    }
  });
  setInterval(getCurrentM, 50);
  function getCurrentM() {
    if (document.querySelector("div.timer.scratchtools") !== null) {
      if (document.scratchtoolsTimer !== undefined) {
        const currentTime = (((ScratchTools.Scratch.vm.runtime.currentMSecs -
          document.scratchtoolsTimer) /
        1000).toString()+"000000").slice(0, 6)
        document.querySelector("div.timer.scratchtools").textContent = `${
          currentTime
        } secs`;
      }
    }
  }
}

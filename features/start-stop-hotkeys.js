document.addEventListener("keydown", function (e) {
  if (e.which === 71 && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (ScratchTools.Scratch.scratchGui().vmStatus.started) {
      if (ScratchTools.Scratch.scratchGui().vmStatus.running) {
        ScratchTools.Scratch.vm.stopAll();
      } else {
        ScratchTools.Scratch.vm.greenFlag();
      }
    } else {
      ScratchTools.Scratch.vm.start();
      ScratchTools.Scratch.vm.greenFlag();
    }
  }
});

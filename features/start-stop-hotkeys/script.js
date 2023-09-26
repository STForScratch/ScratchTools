export default function ({ feature, console }) {
  document.addEventListener("keydown", function (e) {
    if (!feature.traps.vm) return;
    if (!feature.self.enabled) return;
    if (e.which === 71 && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (feature.traps.gui().vmStatus.started) {
        if (feature.traps.gui().vmStatus.running) {
          feature.traps.vm.stopAll();
        } else {
          feature.traps.vm.greenFlag();
        }
      } else {
        feature.traps.vm.start();
        feature.traps.vm.greenFlag();
      }
    }
  });
}

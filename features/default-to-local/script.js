export default function ({ feature, console }) {
  ScratchTools.waitForElements(".ReactModalPortal", function (modal) {
    console.log(modal)
    if (!feature.self.enabled) return;
    console.log("passed enabled")
    if (modal.querySelector(".sa-swap-local-global-hint")) return;
    console.log("passed no sa")
    if (modal.querySelector('[class^="prompt_variable-name-text-input_"]')) {
      document.querySelectorAll('[name="variableScopeOption"]')[1].click();
    }
  });
}

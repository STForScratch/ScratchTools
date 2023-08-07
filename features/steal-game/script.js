export default async function ({ feature, console }) {
  ScratchTools.waitForElements(".remix-button span", function(remixText) {
    if (feature.self.enabled) {
        remixText.textContent = "Steal Game";
      }
  });

  feature.addEventListener("enabled", async function () {
    var remixText = await document.querySelector(".remix-button span");
    if (!remixText) return;
    remixText.textContent = "Steal Game";
  });

  feature.addEventListener("disabled", async function () {
    var remixText = await document.querySelector(".remix-button span");
    if (!remixText) return;
    remixText.textContent = "Remix";
  });
}

export default async function ({ feature, console }) {
  let activeStage;
  ScratchTools.waitForElements(
    "div[class*='target-pane_stage-selector-wrapper_']",
    function (stage) {
      activeStage = stage;

      if (!feature.self.enabled) return;

      stage.classList.add("ste-stage_in_spritepane");
      document
        .querySelector("div[class^='sprite-info_sprite-info_']")
        .appendChild(stage);
    }
  );

  feature.addEventListener("disabled", function () {
    if (activeStage) {
      activeStage.classList.remove("ste-stage_in_spritepane");
      document
        .querySelector("div[class^='target-pane_target-pane_']")
        .appendChild(activeStage);
    }
  });

  feature.addEventListener("enabled", function () {
    if (activeStage) {
      activeStage.classList.add("ste-stage_in_spritepane");
      document
        .querySelector("div[class^='sprite-info_sprite-info_']")
        .appendChild(activeStage);
    }
  });
}

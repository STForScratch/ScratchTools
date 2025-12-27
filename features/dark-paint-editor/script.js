export default async function ({ feature, console, scratchClass }) {
  let isDark;

  const BACKGROUND_LIGHT = "#FFFFFF";
  const BACKGROUND_TILE_LIGHT = "#D9E3F2";
  const BACKGROUND_DARK = "#111";
  const BACKGROUND_TILE_DARK = "#222";
  const WORKSPACE_BOUNDS_LIGHT = "#ECF1F9";
  const WORKSPACE_BOUNDS_DARK = "#333";
  const OUTLINE_INNER_LIGHT = "#FFFFFF";
  const OUTLINE_INNER_DARK = "#555555";

  ScratchTools.waitForElements(
    "div[class^='paint-editor_zoom-controls_']",
    function () {
        isDark = false

        if (document.querySelector(".ste-dark-paint-btn")) return;
        
        let button = document.createElement("div")
        button.className = `${scratchClass("button-group_button-group_2_")} ste-dark-paint-btn`

        let span = document.createElement("span")
        span.className = `${scratchClass("button_button_")} ${scratchClass("paint-editor_button-group-button_")}`
        span.role = "button"
        button.appendChild(span)

        let img = document.createElement("img")
        img.src = feature.self.getResource("dark-paint-btn")
        span.appendChild(img)

        button.addEventListener("click", function() {
            isDark = !isDark
            updateTheme(isDark)
        })

        feature.self.hideOnDisable(button)

        ScratchTools.appendToSharedSpace({
            space: "paintEditorZoomControls",
            element: button,
            order: 0,
          });
    }
  );

  async function updateTheme(isDark) {
    let paper = await feature.traps.getPaper();

    let backgroundLayer = paper.project.layers.find(
      (el) => el.data?.["isBackgroundGuideLayer"]
    );
    let outlineLayer = paper.project.layers.find(
      (el) => el.data?.["isOutlineLayer"]
    );

    const bitmapChildren = backgroundLayer.bitmapBackground.children;
    bitmapChildren[0].fillColor = isDark ? BACKGROUND_DARK : BACKGROUND_LIGHT;
    bitmapChildren[1].fillColor = isDark
      ? BACKGROUND_TILE_DARK
      : BACKGROUND_TILE_LIGHT;

    const vectorChildren = backgroundLayer.vectorBackground.children;
    vectorChildren[0].fillColor = isDark
      ? WORKSPACE_BOUNDS_DARK
      : WORKSPACE_BOUNDS_LIGHT;
    vectorChildren[1].children[0].fillColor = isDark
      ? BACKGROUND_DARK
      : BACKGROUND_LIGHT;
    vectorChildren[1].children[1].fillColor = isDark
      ? BACKGROUND_TILE_DARK
      : BACKGROUND_TILE_LIGHT;

    outlineLayer.children[0].strokeColor = isDark
      ? OUTLINE_INNER_DARK
      : OUTLINE_INNER_LIGHT;
  }

  feature.addEventListener("disabled", function() {
    updateTheme(false)
  })

  feature.addEventListener("enabled", function() {
    updateTheme(isDark || false)
  })
}

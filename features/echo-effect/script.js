export default function ({ feature, console }) {
  ScratchTools.waitForElements(
    "div[class^='sound-editor_row_'][class*='sound-editor_row-reverse_']",
    function (container) {
      if (container.querySelector(".ste-echo")) return;
      let button = document.createElement("div");
      button.className =
        "icon-button_container_278u5 sound-editor_effect-button_2zuzT ste-echo";
      button.role = "button";

      feature.self.hideOnDisable(button)

      button.addEventListener("click", function() {
        feature.traps.sound().handleEffect("echo")
      })

      let img = document.createElement("img");
      img.src = feature.self.getResource("echo-effect-btn");
      img.draggable = false;
      button.appendChild(img);

      let title = document.createElement("div");
      title.className = "icon-button_title_36ChS";
      title.textContent = feature.msg("echo");
      button.appendChild(title);

      container.appendChild(button)
    })
}

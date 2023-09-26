export default function ({ feature, console }) {
  ScratchTools.waitForElements(".Popover-body", function (body) {
    if (!feature.traps.paint().modals.fillColor) return;
    if (!feature.traps.paint().selectedItems[0]) return;
    if (feature.traps.paint().format.startsWith("BITMAP")) return;
    body = body.firstChild;
    if (body.querySelector(".ste-opacity-slider")) return;

    let div = document.createElement("div");
    div.className = "ste-opacity-slider";
    feature.self.hideOnDisable(div);

    let data = document.createElement("div");
    data.className = "color-picker_row-header_173LQ";
    div.appendChild(data);

    let name = document.createElement("span");
    name.className = "color-picker_label-name_17igY";
    name.textContent = "Opacity";

    let value = document.createElement("span");
    value.className = "color-picker_label-readout_9vjb2";
    value.textContent = Math.floor(
      (feature.traps.paint().selectedItems[0]?.opacity || 1) * 100
    )?.toString();

    data.appendChild(name);
    data.appendChild(value);

    let slider = document.createElement("div");
    slider.className =
      "ste-opacity-slider-checkered slider_container_o2aIb slider_last_10jvO";
    div.appendChild(slider);

    let sliderBg = document.createElement("div");
    sliderBg.style.background = `linear-gradient(270deg, ${
      feature.traps.paint().selectedItems[0]?.fillColor?._canvasStyle
    } 0%, rgba(0, 0, 0, 0) 100%)`;
    sliderBg.className = "ste-opacity-background";
    slider.appendChild(sliderBg);

    let handle = document.createElement("div");
    handleSlider(handle, value);
    handle.className = "ste-opacity-handle slider_handle_3f0xk";
    handle.style.left = "124px";
    if (feature.traps.paint().selectedItems[0]?.opacity) {
      handle.style.left =
        (124 * feature.traps.paint().selectedItems[0]?.opacity).toString() +
        "px";
    }
    slider.appendChild(handle);

    body.insertBefore(
      div,
      body.querySelector("[class^='color-picker_swatch-row_']")
    );
  });

  let lastColor;

  feature.redux.subscribe(function () {
    let slider = document.querySelector(".ste-opacity-background");
    let newColor =
      feature.traps.paint?.()?.selectedItems[0]?.fillColor?._canvasStyle;
    if (!slider) return;
    if (newColor === lastColor) return;
    lastColor = newColor;
    slider.style.background = `linear-gradient(270deg, ${lastColor} 0%, rgba(0, 0, 0, 0) 100%)`;
  });

  function handleSlider(handle, value) {
    let isDragging = false;

    handle.addEventListener("mousedown", (e) => {
      isDragging = true;
      const initialX = e.clientX;
      const handleLeft = parseInt(handle.style.left) || 0;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      function onMouseMove(e) {
        if (isDragging) {
          const offsetX = e.clientX - initialX;
          let newLeft = handleLeft + offsetX;

          // Ensure the handle stays within the slider's range
          newLeft = Math.max(0, Math.min(124, newLeft));

          feature.traps.paint().selectedItems.forEach(function (item) {
            item.setOpacity(newLeft / 124);
          });

          value.textContent = Math.floor((newLeft / 124) * 100).toString();

          handle.style.left = newLeft + "px";
        }
      }

      function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
    });

    // Optionally, you can add touch event listeners for mobile devices
    handle.addEventListener("touchstart", (e) => {
      isDragging = true;
      const initialX = e.touches[0].clientX;
      const handleLeft = parseInt(handle.style.left) || 0;

      handle.addEventListener("touchmove", onTouchMove);
      handle.addEventListener("touchend", onTouchEnd);

      function onTouchMove(e) {
        if (isDragging) {
          const offsetX = e.touches[0].clientX - initialX;
          let newLeft = handleLeft + offsetX;

          newLeft = Math.max(0, Math.min(124, newLeft));

          feature.traps.paint().selectedItems.forEach(function (item) {
            item.setOpacity(newLeft / 124);
          });

          value.textContent = Math.floor((newLeft / 124) * 100).toString();

          handle.style.left = newLeft + "px";
        }
      }

      function onTouchEnd() {
        isDragging = false;
        handle.removeEventListener("touchmove", onTouchMove);
        handle.removeEventListener("touchend", onTouchEnd);
      }
    });
  }
}

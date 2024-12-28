export default async function ({ feature, console, scratchClass }) {
  let lastRotation = 0

  feature.page.waitForElements(
    "div[class^='color-picker_gradient-picker-row_'][class*='color-picker_gradient-swatches-row_']",
    function (row) {
      let body = document.querySelector(".Popover-body");

      if (feature.traps.paint().selectedItems.length !== 1) return;
      if (feature.traps.paint().selectedItems[0].fillColor._components[0].radial) return;
      if (!document.querySelector("div[class^='color-picker_gradient-picker-row_'][class*='color-picker_gradient-swatches-row_']")) return;
      if (body.querySelector(".ste-direction-slider")) return;

      let div = document.createElement("div");
      div.className = "ste-direction-slider";
      feature.self.hideOnDisable(div);

      let data = document.createElement("div");
      data.className = scratchClass("color-picker_row-header_");
      div.appendChild(data);

      let name = document.createElement("span");
      name.className = scratchClass("color-picker_label-name_");
      name.textContent = feature.msg("direction");

      let value = document.createElement("span");
      value.className = scratchClass("color-picker_label-readout_");
      value.textContent = "0";

      data.appendChild(name);
      data.appendChild(value);

      let slider = document.createElement("div");
      slider.className =
        "ste-direction-slider-checkered " + scratchClass("slider_container_") + " " + scratchClass("slider_last_Ik11I");
      div.appendChild(slider);

      let sliderBg = document.createElement("div");
      sliderBg.style.background = `linear-gradient(270deg, ${
        feature.traps.paint().selectedItems[0]?.fillColor?._canvasStyle
      } 0%, rgba(0, 0, 0, 0) 100%)`;
      sliderBg.className = "ste-direction-background";
      slider.appendChild(sliderBg);

      let handle = document.createElement("div");
      handleSlider(handle, value);
      handle.className = "ste-direction-handle " + scratchClass("slider_handle_ubeAr");
      handle.style.left = "0px";
      slider.appendChild(handle);

      body.firstChild.insertBefore(div, body.querySelector("div[class^='color-picker_row-header_']").parentElement);
      lastRotation = 0
    }
  );

  feature.redux.subscribe(function() {
    if (!document.querySelector("div[class^='paint-editor_editor-container_']")) return;

    if (!document.querySelector("div[class^='color-picker_gradient-picker-row_'][class*='color-picker_gradient-swatches-row_']") || feature.traps.paint().selectedItems[0]?.fillColor._components[0].radial || feature.traps.paint().selectedItems.length !== 1) {
        document.querySelector(".ste-direction-slider")?.remove()
    }
})

  const rotateColor = function (amount) {
    let data = rotatePoints(
      feature.traps.paint().selectedItems[0].fillColor
        ._components[1],
      feature.traps.paint().selectedItems[0].fillColor
        ._components[2],
      amount
    );

    feature.traps.paint().selectedItems[0].fillColor._components[1].x =
      data.finalP1.x;
    feature.traps.paint().selectedItems[0].fillColor._components[1].y =
      data.finalP1.y;

    feature.traps.paint().selectedItems[0].fillColor._components[2].x =
      data.finalP2.x;
    feature.traps.paint().selectedItems[0].fillColor._components[2].y =
      data.finalP2.y;
  };

  function rotatePoints(p1, p2, angle) {
    // Calculate the midpoint
    const midpoint = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };

    const translatedP1 = {
      x: p1.x - midpoint.x,
      y: p1.y - midpoint.y,
    };
    const translatedP2 = {
      x: p2.x - midpoint.x,
      y: p2.y - midpoint.y,
    };

    const radians = angle * (Math.PI / 180);

    const rotatedP1 = {
      x:
        translatedP1.x * Math.cos(radians) - translatedP1.y * Math.sin(radians),
      y:
        translatedP1.x * Math.sin(radians) + translatedP1.y * Math.cos(radians),
    };
    const rotatedP2 = {
      x:
        translatedP2.x * Math.cos(radians) - translatedP2.y * Math.sin(radians),
      y:
        translatedP2.x * Math.sin(radians) + translatedP2.y * Math.cos(radians),
    };

    const finalP1 = {
      x: rotatedP1.x + midpoint.x,
      y: rotatedP1.y + midpoint.y,
    };
    const finalP2 = {
      x: rotatedP2.x + midpoint.x,
      y: rotatedP2.y + midpoint.y,
    };

    return { finalP1, finalP2 };
  }

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

          newLeft = Math.max(0, Math.min(124, newLeft));
          
          rotateColor(Math.floor((newLeft / 124) * 360) - lastRotation)
          update()
          lastRotation = Math.floor((newLeft / 124) * 360)

          value.textContent =
            Math.floor((newLeft / 124) * 360).toString()

          handle.style.left = newLeft + "px";
        }
      }

      function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
    });

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

          rotateColor(Math.floor((newLeft / 124) * 360) - lastRotation)
          update()
          lastRotation = Math.floor((newLeft / 124) * 360)

          value.textContent =
            Math.floor((newLeft / 124) * 360).toString()

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

  function update() {
    feature.traps.getPaper().tool.onUpdateImage()
  }
}

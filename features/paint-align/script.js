export default async function ({ feature, scratchClass }) {
  ScratchTools.waitForElements(
    "div[class^='mode-tools_mod-labeled-icon-height_']",
    function (row) {
      if (row.querySelector(".ste-align-items")) return;

      let span = document.createElement("span");
      span.className =
        `${scratchClass("button_button_")} ${scratchClass("labeled-icon-button_mod-edit-field_")} ste-align-items`;
      span.role = "button";

      let img = document.createElement("img");
      img.src = feature.self.getResource("paint-align");
      img.className = scratchClass("labeled-icon-button_edit-field-icon_");
      img.alt = feature.msg("align");
      img.title = feature.msg("align");
      img.draggable = false;
      span.appendChild(img);

      let label = document.createElement("span");
      label.textContent = feature.msg("align");
      label.className = scratchClass("labeled-icon-button_edit-field-title_");
      span.appendChild(label);

      span.addEventListener("click", function (e) {
        if (span.className.includes("disabled")) return;
        centerObjects(e.shiftKey);
      });

      row.appendChild(span);
    }
  );

  feature.redux.subscribe(function () {
    if (document.querySelector(".ste-align-items")) {
      let span = document.querySelector(".ste-align-items");

      if (
        feature.traps.paint().format === "BITMAP" ||
        feature.traps.paint().selectedItems?.length < 2
      ) {
        span.classList.add("button_mod-disabled_1rf31");
      } else {
        span.classList.remove("button_mod-disabled_1rf31");
      }
    }
  });

  function centerObjects(stay) {
    let items = feature.traps.paint().selectedItems;

    let allX = [];
    let allY = [];
    let average = (array) => array.reduce((a, b) => a + b) / array.length;

    for (var i in items) {
      allX.push(getMidPoint(items[i].segments).x);
      allY.push(getMidPoint(items[i].segments).y);
    }

    let trueMidpoint = stay
      ? {
          x: getMidPoint(items[0].segments).x,
          y: getMidPoint(items[0].segments).y,
        }
      : { x: average(allX), y: average(allY) };

    for (var i in items) {
      let selfMidpoint = getMidPoint(items[i].segments);
      let adjustX = trueMidpoint.x - selfMidpoint.x;
      let adjustY = trueMidpoint.y - selfMidpoint.y;

      for (var seg in items[i].segments) {
        items[i].segments[seg]._point._x += adjustX;
        items[i].segments[seg]._point._y += adjustY;
      }

      if (items[i].fillColor._type === "gradient") {
        for (var comp in items[i].fillColor?._components || []) {
          items[i].fillColor._components[comp].x += adjustX;
          items[i].fillColor._components[comp].y += adjustY;
        }
      }
    }

    feature.traps.getPaper().tool.onUpdateImage();
  }

  function getMidPoint(segments) {
    let x = [];
    let y = [];

    for (var i in segments) {
      x.push(segments[i]._point._x);
      y.push(segments[i]._point._y);
    }

    let xAverage = (Math.min(...x) + Math.max(...x)) / 2;
    let yAverage = (Math.min(...y) + Math.max(...y)) / 2;

    return { x: xAverage, y: yAverage };
  }
}

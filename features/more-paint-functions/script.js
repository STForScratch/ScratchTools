export default async function ({ feature, console }) {
  function unite() {
    let paper = feature.traps.getPaper();
    let items = paper.project.selectedItems;

    if (items.length !== 2) return;

    for (var i in items) {
      if (i > 0) {
        items[0].unite(items[i]);
      }
    }

    for (var i in items) {
      items[i].remove();
    }

    paper.tool.onUpdateImage();
  }

  function subtract() {
    let paper = feature.traps.getPaper();
    let items = paper.project.selectedItems;

    if (items.length !== 2) return;

    for (var i in items) {
      if (i > 0) {
        items[0].subtract(items[i]);
      }
    }

    for (var i in items) {
      items[i].remove();
    }

    paper.tool.onUpdateImage();
  }

  function exclude() {
    let paper = feature.traps.getPaper();
    let items = paper.project.selectedItems;

    if (items.length !== 2) return;

    for (var i in items) {
      if (i > 0) {
        items[0].exclude(items[i]);
      }
    }

    for (var i in items) {
      items[i].remove();
    }

    paper.tool.onUpdateImage();
  }

  function intersect() {
    let paper = feature.traps.getPaper();
    let items = paper.project.selectedItems;

    if (items.length !== 2) return;

    for (var i in items) {
      if (i > 0) {
        items[0].intersect(items[i]);
      }
    }

    for (var i in items) {
      items[i].remove();
    }

    paper.tool.onUpdateImage();
  }

  ScratchTools.waitForElements(
    "div[class^='mode-tools_mod-labeled-icon-height_']",
    async function (row) {
      if (row.querySelector(".ste-more-functions")) return;

      let functions = [
        {
          name: "Unite",
          icon: "function-unite",
          callback: unite,
        },
        {
          name: "Subtract",
          icon: "function-subtract",
          callback: subtract,
        },
        {
          name: "Exclude",
          icon: "function-exclude",
          callback: exclude,
        },
        {
          name: "Intersect",
          icon: "function-intersect",
          callback: intersect,
        },
      ];

      for (var i in functions) {
        row.appendChild(makeButton(functions[i]));
      }

      let align = await ScratchTools.waitForElement(".ste-align-items");
      row.appendChild(align);
    }
  );

  feature.redux.subscribe(function () {
    if (document.querySelector(".ste-more-functions")) {
      let span = document.querySelector(".ste-more-functions");
      if (
        feature.traps.paint().format === "BITMAP" ||
        feature.traps.paint().selectedItems?.length < 2
      ) {
        document.querySelectorAll(".ste-more-functions").forEach(function (el) {
          el.classList.add("button_mod-disabled_1rf31");
        });
      } else {
        document.querySelectorAll(".ste-more-functions").forEach(function (el) {
          el.classList.remove("button_mod-disabled_1rf31");
        });
      }
    }
  });

  function makeButton({ name, icon, callback }) {
    let span = document.createElement("span");
    span.className =
      "button_button_u6SE2 labeled-icon-button_mod-edit-field_1bXYC ste-more-functions";
    span.role = "button";

    let img = document.createElement("img");
    img.src = feature.self.getResource(icon);
    img.className = "labeled-icon-button_edit-field-icon_3j-Pf";
    img.alt = name;
    img.title = name;
    img.draggable = false;
    span.appendChild(img);

    let label = document.createElement("span");
    label.textContent = name;
    label.className = "labeled-icon-button_edit-field-title_1ZoEV";
    span.appendChild(label);

    span.addEventListener("click", function (e) {
      if (span.className.includes("disabled")) return;
      callback();
    });

    feature.self.hideOnDisable(span);

    return span;
  }
}

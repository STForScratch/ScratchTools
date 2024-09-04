export default async function ({ feature, console }) {
  const icons = {
    Cap: ["butt", "round", "square"],
    Join: ["miter", "round", "bevel", "arcs", "miter-clip"],
  };

  function createSection(type) {
    const selectedItems = feature.traps.getPaper().project.selectedItems;
    const result = document.createElement("div");
    let strokeValue = undefined;

    function changeItems(pos, value) {
      for (var i in selectedItems) {
        if (selectedItems[i][pos] !== undefined) {
          selectedItems[i][pos] = value;
        }
      }
    }

    const row = document.createElement("div");
    row.classList.add("color-picker_row-header_173LQ");
    const labelName = document.createElement("span");
    labelName.classList.add("color-picker_label-name_17igY");
    labelName.textContent = `Line ${type}`;
    const labelReadout = document.createElement("span");
    labelReadout.classList.add("color-picker_label-readout_9vjb2");
    if (selectedItems.length === 1) {
      strokeValue = `${selectedItems[0][`stroke${type}`]}`;
      labelReadout.textContent = strokeValue;
    }
    row.appendChild(labelName);
    row.appendChild(labelReadout);

    const content = document.createElement("div");
    content.classList.add("color-picker_gradient-picker-row_mnu4O");
    icons[type].forEach((iconName) => {
      const icon = document.createElement("img");
      icon.classList.add(`ste-outline-shape-options-${iconName}`);
      icon.src = feature.self.getResource(`${type}-${iconName}`);
      if (iconName !== strokeValue)
        icon.classList.add("ste-outline-shape-options-passive");
      icon.addEventListener("click", () => {
        changeItems(`stroke${type}`, `${iconName}`);
        labelReadout.textContent = iconName;
        const elements = content.getElementsByTagName("*");
        for (let i = 0; i < elements.length; i++) {
          if (
            elements[i].classList.contains(
              `ste-outline-shape-options-${iconName}`
            )
          )
            elements[i].classList.remove("ste-outline-shape-options-passive");
          else elements[i].classList.add("ste-outline-shape-options-passive");
        }
      });
      content.appendChild(icon);
    });

    result.appendChild(row);
    result.appendChild(content);
    feature.self.hideOnDisable(result)
    return result;
  }

  ScratchTools.waitForElements(
    "div[class*='color-picker_swatch-row_']",
    function (element) {
      if (feature.traps.paint().modals.fillColor) return;
      if (feature.traps.getPaper().project.selectedItems.length < 1) return;
      const dividerLine = document.createElement("div");
      dividerLine.classList.add("color-picker_divider_3a3qR");
      const sectionCap = createSection("Cap");
      const sectionJoin = createSection("Join");

      element.insertAdjacentElement("afterend", sectionJoin);
      element.insertAdjacentElement("afterend", sectionCap);
      element.insertAdjacentElement("afterend", dividerLine);
    }
  );
}

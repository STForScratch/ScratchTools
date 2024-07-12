export default async function ({ feature, console }) {
  const availableWidth = 405;

  function getSpaceWidth() {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.whiteSpace = "pre";
    span.textContent = " ";
    document.body.appendChild(span);
    const spaceWidth = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return spaceWidth;
  }

  function getTextWidth(text) {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.whiteSpace = "pre";
    span.textContent = text;
    document.body.appendChild(span);
    const textWidth = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return textWidth;
  }

  function clearCenterAlignment(textarea) {
    const lines = textarea.value.split("\n");
    const uncenteredLines = lines.map((line) => {
      return line.replace(/^\s+/, "");
    });
    textarea.value = uncenteredLines.join("\n");
  }

  function centerAlignText(textarea) {
    if (!feature.self.enabled) return;

    const form = document.querySelector(".project-notes");
    if (form) {
      const activeElement = textarea || document.activeElement;
      if (
        activeElement.tagName === "TEXTAREA" &&
        form.contains(activeElement)
      ) {
        clearCenterAlignment(activeElement);

        const spaceWidth = getSpaceWidth();
        const lines = activeElement.value.split("\n");
        const centeredLines = lines.map((line) => {
          const textWidth = getTextWidth(line);
          const totalSpaces = (availableWidth - textWidth) / spaceWidth / 2;
          const spaces =
            totalSpaces > 0 ? " ".repeat(Math.floor(totalSpaces)) : "";
          return spaces + line;
        });
        activeElement.value = centeredLines.join("\n");
      }
    }
  }

  window.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "u") {
      if (feature.settings.get("use-align-hotkey")) {
        centerAlignText();
      }
    }
  });

  ScratchTools.waitForElements(
    ".project-notes .project-textlabel",
    function (div) {
      if (div.querySelector(".ste-align-center")) return;

      let textarea = div.parentElement.querySelector("textarea");

      let img = document.createElement("img");
      img.src = feature.self.getResource("center-align");
      img.className = "ste-align-center";
      img.addEventListener("mousedown", function () {
        centerAlignText(textarea);
      });
      feature.self.hideOnDisable(img);

      div.appendChild(img);

      textarea.addEventListener("focusin", function () {
        img.classList.add("show");
      });

      textarea.addEventListener("focusout", function () {
        img.classList.remove("show");
      });
    }
  );
}

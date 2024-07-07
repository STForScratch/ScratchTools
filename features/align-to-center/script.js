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

  function centerAlignText() {
    const form = document.querySelector(".project-description-form");
    if (form) {
      const activeElement = document.activeElement;
      if (
        activeElement.tagName === "TEXTAREA" &&
        form.contains(activeElement)
      ) {
        const spaceWidth = getSpaceWidth();
        const lines = activeElement.value.split("\n");
        const centeredLines = lines.map((line) => {
          const textWidth = getTextWidth(line);
          const totalSpaces = (availableWidth - textWidth) / spaceWidth / 2;
          const spaces = " ".repeat(Math.floor(totalSpaces));
          return spaces + line;
        });
        activeElement.value = centeredLines.join("\n");
      }
    }
  }

  window.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "u") {
      centerAlignText();
    }
  });
}

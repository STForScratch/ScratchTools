// ==UserScript==
// @name Colored Editor Context Menu for Scratch 3
// @version 1.0
// @namespace https://github.com/forkphorus/cat-plus
// @match https://scratch.mit.edu/projects/*
// @grant GM_addStyle
// @run-at document-start
// ==/UserScript==

function rgb2hsl(rgb) {
  const r = ((rgb >> 16) & 0xff) / 0xff;
  const g = ((rgb >> 8) & 0xff) / 0xff;
  const b = (rgb & 0xff) / 0xff;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (min === max) {
    return [0, 0, r * 100];
  }

  const c = max - min;
  const l = (min + max) / 2;
  const s = c / (1 - Math.abs(2 * l - 1));

  var h;
  switch (max) {
    case r:
      h = ((g - b) / c + 6) % 6;
      break;
    case g:
      h = (b - r) / c + 2;
      break;
    case b:
      h = (r - g) / c + 4;
      break;
  }
  h *= 60;

  return [h, s * 100, l * 100];
}

window.addEventListener("load", function () {
  document.body.addEventListener(
    "mousedown",
    function (e) {
      if (e.button !== 2) {
        return;
      }

      const widgetDiv = document.querySelector(".blocklyWidgetDiv");
      if (!widgetDiv) {
        return;
      }

      if (
        e.target.closest(".blocklyMainBackground") ||
        e.target.closest(".blocklyBubbleCanvas")
      ) {
        widgetDiv.classList.remove("u-contextmenu-colored");
        return;
      }

      const block = e.target.closest(".blocklyDraggable");
      if (!block) {
        return;
      }

      const background = block.querySelector(".blocklyBlockBackground");
      if (!background) {
        return;
      }

      const fill = background.getAttribute("fill");
      if (!fill) {
        return;
      }

      const fillHex = fill.substr(1);
      const rgb = parseInt(fillHex, 16);
      const hsl = rgb2hsl(rgb);
      hsl[2] = Math.max(hsl[2] - 15, 0);
      const border = "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)";

      widgetDiv.classList.add("u-contextmenu-colored");
      widgetDiv.style.setProperty("--u-contextmenu-bg", fill);
      widgetDiv.style.setProperty("--u-contextmenu-border", border);
    },
    true
  );
});

GM_addStyle(`
  .u-contextmenu-colored .blocklyContextMenu {
    background-color: var(--u-contextmenu-bg);
    border-color: var(--u-contextmenu-border);
  }
  .u-contextmenu-colored .blocklyContextMenu .goog-menuitem {
    color: white;
  }
  .u-contextmenu-colored .blocklyContextMenu .goog-menuitem:hover.goog-menuitem-highlight {
    border-color: transparent;
  }
  .u-contextmenu-colored .blocklyContextMenu .goog-menuitem:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  input.scratchtools-search-contextmenu {
    background-color: var(--u-contextmenu-bg);
    color: white;
    }
  input.scratchtools-search-contextmenu::placeholder {
    color: white;
  }
  `);

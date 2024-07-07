export default async function ({ feature, console }) {
  let { default: openTypeDefault } = await import(
    "../../libraries/opentype.js"
  );
  openTypeDefault();

  let fonts = await (await fetch(feature.server.endpoint("/fonts/"))).json();

  feature.page.waitForElements(
    "div[class^='asset-panel_wrapper_'] div[class^='action-menu_more-buttons_']",
    function (menu) {
      if (menu.querySelector(".ste-more-fonts")) return;

      let div = document.createElement("div");
      div.className = "ste-more-fonts";
      feature.self.hideOnDisable(div);

      let original =
        menu.parentElement.previousElementSibling.previousElementSibling;
      let id = original.getAttribute("aria-label").replace(/\s+/g, "_");

      let button = document.createElement("button");
      button.dataset.tip = "Add Font";
      button.dataset.for = `ste-${id}-Add Font`;
      button.currentitem = false;
      button.ariaLabel = "Add Font";
      button.className =
        "action-menu_button_1qbot action-menu_more-button_1fMGZ ste-more-fonts-btn";
      div.appendChild(button);

      let img = Object.assign(document.createElement("img"), {
        src: feature.self.getResource("more-text-icon"),
        draggable: false,
        className: "action-menu_more-icon_TJUQ7",
        width: 10,
      });
      button.appendChild(img);

      let tooltip = Object.assign(document.createElement("div"), {
        className:
          "__react_component_tooltip place-right type-dark action-menu_tooltip_3Bkh5",
        id: `ste-${id}-Add Font`,
        textContent: "Add Font",
      });
      tooltip.dataset.id = "tooltip";
      div.appendChild(tooltip);

      menu.prepend(div);

      button.addEventListener("click", function () {
        let div = document.createElement("div");
        div.className = "ste-font-options";

        let modal = ScratchTools.modals.create({
          title: "Pick Font",
          description:
            "You can pick a font from the list below to add to the project.",
          components: [
            {
              type: "html",
              content: div,
            },
          ],
          cancel: true,
        });

        for (var i in fonts) {
          let span = document.createElement("span");
          span.className = "ste-font-option";
          span.dataset.font = fonts[i];

          let img = document.createElement("img");
          img.src = feature.server.endpoint(`/font/image/${fonts[i]}/`);
          span.appendChild(img);

          span.addEventListener("click", function () {
            let font = this.dataset.font;
            modal.close();

            let button = document.createElement("button");
            button.textContent = "Continue";

            let typeModal = ScratchTools.modals.create({
              title: "Type Text",
              description: "Type the text you would like to add.",
              cancel: true,
              components: [
                {
                  type: "html",
                  content: Object.assign(document.createElement("input"), {
                    className: "ste-font-input",
                  }),
                },
                {
                  type: "html",
                  content: button,
                },
                {
                  type: "html",
                  content: document.createElement("br"),
                },
              ],
            });

            button.addEventListener("click", function () {
              let text = document.querySelector(".ste-font-input").value;
              typeModal.close();

              setFont(font, text);
            });
          });

          div.appendChild(span);
        }
      });

      let observer = new MutationObserver(doresize);
      observer.observe(menu, { attributes: true, subtree: true });

      function doresize() {
        let rect = div.getBoundingClientRect();
        tooltip.style.top = rect.top + 2 + "px";
        tooltip.style.left = rect.left + rect.width + "px";
      }
    }
  );

  function setFont(font, text) {
    async function fetchFont(url) {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch font");
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
    }

    function createSVGFromText(font, text) {
      let width = font.getAdvanceWidth(text, 72);
      const path = font.getPath(text, 0, 150, 72);
      const svgPath = path.toSVG();
      const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width.toString()}" height="200">
       ${svgPath}
      </svg>
        `;
      return svg;
    }

    async function generateSVGText(url, text) {
      try {
        const fontArrayBuffer = await fetchFont(url);
        const font = opentype.parse(fontArrayBuffer);
        const svgText = createSVGFromText(font, text);
        addCostume(svgText);
      } catch (error) {
        console.error("Error:" + error);
      }
    }

    generateSVGText(feature.server.endpoint(`/font/${font}.ttf`), text);
  }

  window.setFont = setFont;

  function addCostume(svg) {
    let fileInput = document.querySelector("input[type=file]");

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const file = new File([blob], "text.svg", { type: "image/svg+xml" });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;

    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

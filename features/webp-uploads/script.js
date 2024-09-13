export default async function ({ feature, console }) {
  let fileInput = {
    costume: null,
    sprite: null,
    stage: null,
  };

  ScratchTools.waitForElements(
    "div[class*='asset-panel_wrapper_'] input[type=file]",
    function (input) {
      fileInput.costume = input;

      fileInput.costume.parentElement.addEventListener("click", function (e) {
        if (!feature.self.enabled) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        let input = document.createElement("input");
        input.accept = ".svg, .png, .bmp, .jpg, .jpeg, .gif, .webp";
        input.setAttribute("multiple", null);
        input.type = "file";

        let files = [];

        input.addEventListener("change", async function () {
          const dataTransfer = new DataTransfer();

          for (var i in input.files) {
            let file = input.files[i];
            if (file?.type?.startsWith("image/")) {
              if (file.type === "image/webp") {
                let blob = await convertWebPFileToPng(file);
                file = new File([blob], file.name.split(".")[0] + ".png", {
                  type: "image/png",
                });
                dataTransfer.items.add(file);
              } else {
                dataTransfer.items.add(file);
              }
            }
          }

          fileInput.costume.files = dataTransfer.files;

          fileInput.costume.dispatchEvent(
            new Event("change", { bubbles: true })
          );
        });

        input.click();
      });
    }
  );

  ScratchTools.waitForElements(
    "div[class*='sprite-selector_sprite-selector_'] input[type=file]",
    function (input) {
      fileInput.sprite = input;

      fileInput.sprite.parentElement.addEventListener("click", function (e) {
        if (!feature.self.enabled) return;
        
        e.preventDefault();
        e.stopImmediatePropagation();

        let input = document.createElement("input");
        input.accept = ".svg, .png, .bmp, .jpg, .jpeg, .gif, .webp";
        input.setAttribute("multiple", null);
        input.type = "file";

        let files = [];

        input.addEventListener("change", async function () {
          const dataTransfer = new DataTransfer();

          for (var i in input.files) {
            let file = input.files[i];
            if (file?.type?.startsWith("image/")) {
              if (file.type === "image/webp") {
                let blob = await convertWebPFileToPng(file);
                file = new File([blob], file.name.split(".")[0] + ".png", {
                  type: "image/png",
                });
                dataTransfer.items.add(file);
              } else {
                dataTransfer.items.add(file);
              }
            }
          }

          fileInput.sprite.files = dataTransfer.files;

          fileInput.sprite.dispatchEvent(
            new Event("change", { bubbles: true })
          );
        });

        input.click();
      });
    }
  );

  ScratchTools.waitForElements(
    "div[class*='stage-selector_stage-selector_'] input[type=file]",
    function (input) {
      fileInput.stage = input;

      fileInput.stage.parentElement.addEventListener("click", function (e) {
        if (!feature.self.enabled) return;
        
        e.preventDefault();
        e.stopImmediatePropagation();

        let input = document.createElement("input");
        input.accept = ".svg, .png, .bmp, .jpg, .jpeg, .gif, .webp";
        input.setAttribute("multiple", null);
        input.type = "file";

        let files = [];

        input.addEventListener("change", async function () {
          const dataTransfer = new DataTransfer();

          for (var i in input.files) {
            let file = input.files[i];
            if (file?.type?.startsWith("image/")) {
              if (file.type === "image/webp") {
                let blob = await convertWebPFileToPng(file);
                file = new File([blob], file.name.split(".")[0] + ".png", {
                  type: "image/png",
                });
                dataTransfer.items.add(file);
              } else {
                dataTransfer.items.add(file);
              }
            }
          }

          fileInput.stage.files = dataTransfer.files;

          fileInput.stage.dispatchEvent(new Event("change", { bubbles: true }));
        });

        input.click();
      });
    }
  );

  async function convertWebPFileToPng(webpFile) {
    try {
      const img = new Image();
      const webpUrl = URL.createObjectURL(webpFile);
      img.src = webpUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const pngBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      URL.revokeObjectURL(webpUrl);

      return pngBlob;
    } catch (error) {
      console.error("Error converting webp to png:", error);
      throw error;
    }
  }
}

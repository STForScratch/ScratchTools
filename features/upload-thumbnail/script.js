export default async function ({ feature, console }) {
    ScratchTools.waitForElements(
      ".preview .inner .flex-row.action-buttons",
      async function (row) {
        if (feature.redux.getState()?.preview.projectInfo.author.username !== feature.redux.getState()?.session?.session?.user?.username) return;

        if (row.querySelector(".ste-thumbnail")) return;
        let button = document.createElement("button");
        button.className = "button action-button ste-thumbnail";
        button.textContent = "Set Thumbnail";
        feature.self.hideOnDisable(button);
  
        let input = document.createElement("input");
        input.className = "ste-thumbnail-input";
        input.style.display = "none";
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("input", onThumbInput);
        document.body.appendChild(input);
  
        function onThumbInput() {
          if (input.files?.[0]) {
            setThumbnail(input.files[0]);
          }
        }
  
        button.addEventListener("click", async function () {
          let upload = document.createElement("button");
          upload.textContent = "Upload Image or GIF";
          upload.style.marginRight = ".5rem";
          upload.addEventListener("click", function () {
            input.click();
          });
  
          async function getStage() {
            return new Promise((resolve) => {
              feature.traps.vm.postIOData("video", {
                forceTransparentPreview: true,
              });
              feature.traps.vm.renderer.requestSnapshot((dataURL) => {
                feature.traps.vm.postIOData("video", {
                  forceTransparentPreview: false,
                });
                resolve(dataURL);
              });
            });
          }
  
          let useStage = document.createElement("button");
          useStage.textContent = "Use Stage";
          useStage.className = "ste-thumbnail-stage";
          useStage.addEventListener("click", async function () {
            function dataURLtoBlob(dataurl) {
              let arr = dataurl.split(",");
              let mime = arr[0].match(/:(.*?);/)[1];
              let bstr = atob(arr[1]);
              let n = bstr.length;
              let u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              return new Blob([u8arr], { type: mime });
            }
  
            let url = await getStage()
            console.log(url)
            let blob = dataURLtoBlob(url);
  
            let file = new File([blob], "image.png", { type: "image/png" });
  
            let dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
  
            input.files = dataTransfer.files;
  
            onThumbInput();
          });
  
          if (!feature.traps.gui().vmStatus.started) {
            useStage.setAttribute("disabled", "");
          }
  
          let modal = ScratchTools.modals.create({
            title: "Set Thumbnail",
            description:
              "You can set the thumbnail to an image you upload or you can set it to what is currently on the stage. The project needs to have been started already in order to upload from the stage.",
            components: [
              {
                type: "html",
                content: upload,
              },
              {
                type: "html",
                content: useStage,
              },
              {
                type: "html",
                content: document.createElement("br"),
              },
            ],
          });
  
          useStage.addEventListener("click", function () {
            modal.close();
          });
  
          upload.addEventListener("click", function () {
            modal.close();
          });
        });
        row.appendChild(button);
      }
    );
  
    async function setThumbnail(file) {
      let options = {
        body: file,
        headers: {
          accept: "*/*",
          "content-type": file.type,
          "x-csrftoken": feature.auth.csrf(),
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: window.location.href,
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        mode: "cors",
        credentials: "include",
      };
  
      let response = await fetch(
        `https://scratch.mit.edu/internalapi/project/thumbnail/${
          window.location.pathname.split("/")[2]
        }/set/`,
        options
      );
  
      if (response.ok) {
        ScratchTools.modals.create({
          title: "Successfully Set Thumbnail",
          description: "This project's thumbnail has been updated.",
          components: [],
        });
      } else {
          ScratchTools.modals.create({
              title: "Failed to Set Thumbnail",
              description: "This project's thumbnail was not able to be updated.",
              components: [],
            });
      }
    }
  }
  
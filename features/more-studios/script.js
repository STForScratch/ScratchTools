export default async function ({ feature, console }) {
  ScratchTools.waitForElements(
    ".mod-addToStudio .studio-list-container",
    async function (modal) {
      let offset = 0;

      let loadMore = document.createElement("button");
      loadMore.textContent = "Load More";
      loadMore.className = "button ste-load-more-studios"
      loadMore.addEventListener("click", getStudios);

      feature.self.hideOnDisable(loadMore)

      modal.parentNode.appendChild(loadMore);

      async function getStudios() {
        let studioOptions = feature.redux.getState().preview.curatedStudios;

        offset += 20;

        let myStudios = await (
          await fetch(
            `https://api.scratch.mit.edu/users/${
              feature.redux.getState().session.session.user.username
            }/studios/curate?offset=${offset.toString()}`
          )
        ).json();

        myStudios = myStudios.filter(
          (studio) => !studioOptions.find((el) => el.id === studio.id)
        );

        let addedStudios = feature.redux.getState().preview.currentStudioIds;

        myStudios.forEach(function (studio) {
          let div = document.createElement("div");
          div.className =
            "studio-selector-button studio-selector-button-enabled";

          let title = document.createElement("div");
          title.className = "studio-selector-button-text";
          title.title = studio.title;
          title.textContent = studio.title;
          div.appendChild(title);

          let button = document.createElement("div");
          button.className = "studio-status-icon";

          let img = document.createElement("img");
          button.appendChild(img);
          div.appendChild(button);

          let added = false;

          div.addEventListener("click", async function () {
            if (added) return;

            let token = feature.redux.getState().session.session.user.token;
            let projectId = feature.redux.getState().preview.projectInfo.id;

            let response = await fetch(
              "https://api.scratch.mit.edu/studios/" +
                studio.id +
                "/project/" +
                projectId,
              {
                headers: {
                  accept: "*/*",
                  "x-token": token,
                },
                body: null,
                method: "POST",
              }
            );

            if (!response.ok) return;

            title.classList.remove("studio-selector-button-text-unselected");
            button.classList.remove("studio-status-icon-unselected");

            div.classList.add("studio-selector-button-selected");
            title.classList.add("studio-selector-button-text-selected");

            img.className = "studio-status-icon-checkmark-img";
            img.alt = "checkmark-icon";
            img.src = "/svgs/modal/confirm.svg";
          });

          if (!addedStudios.includes(studio.id)) {
            title.classList.add("studio-selector-button-text-unselected");
            button.classList.add("studio-status-icon-unselected");

            img.className = "studio-status-icon-plus-img";
            img.alt = "plus-icon";
            img.src = "/svgs/modal/add.svg";

            modal.appendChild(div);

            feature.self.hideOnDisable(div)
          }
        });
      }
    }
  );
}

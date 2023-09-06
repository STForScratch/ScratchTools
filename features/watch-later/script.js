export default function ({ feature, console }) {
  ScratchTools.waitForElements(
    ".flex-row.action-buttons",
    async function (row) {
      let saved = (await ScratchTools.storage.get("watchLater")) || [];

      let button = document.createElement("button");
      button.className = "button action-button ste-watch-later";
      button.textContent = saved.includes(
        window.location.pathname.split("/")[2]
      )
        ? feature.msg("unsave")
        : feature.msg("save");

      feature.self.hideOnDisable(button);

      button.style.display = !feature.redux.getState().preview.projectInfo.is_published ? "none" : null

      feature.redux.subscribe(function() {
        button.style.display = !feature.redux.getState().preview.projectInfo.is_published ? "none" : null
      })

      button.addEventListener("click", async function () {
        saved = (await ScratchTools.storage.get("watchLater")) || [];

        if (saved.includes(window.location.pathname.split("/")[2])) {
          saved = saved.filter(
            (id) => id !== window.location.pathname.split("/")[2]
          );
        } else {
          saved.push(window.location.pathname.split("/")[2]);
        }

        await ScratchTools.storage.set({
          key: "watchLater",
          value: saved,
        });

        button.textContent = saved.includes(
          window.location.pathname.split("/")[2]
        )
          ? feature.msg("unsave")
          : feature.msg("save");
      });

      row.appendChild(button);
    }
  );
}

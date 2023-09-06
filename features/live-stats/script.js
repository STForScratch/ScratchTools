export default function ({ feature, console }) {
  ScratchTools.waitForElements(
    "div.flex-row.stats.noselect",
    async function (row) {
      let love = row.querySelector(".project-loves");
      let favorite = row.querySelector(".project-favorites");
      let remix = row.querySelector(".project-remixes");
      let view = row.querySelector(".project-views");

      let interval = setInterval(async function () {
        if (!row) clearInterval(interval);
        if (!row) return;
        if (!feature.self.enabled) return;

        let data = await (
          await fetch(
            `https://api.scratch.mit.edu/projects/${
              window.location.pathname.split("/")[2]
            }/?nocache=${Date.now().toString()}`
          )
        ).json();

        if (data.error) return;

        love.textContent = data.stats.loves.toString()
        favorite.textContent = data.stats.favorites.toString()
        remix.textContent = data.stats.remixes.toString()
        view.textContent = data.stats.views.toString()

        feature.redux.getState().preview.projectInfo.stats = data.stats
      }, 5000);
    }
  );
}

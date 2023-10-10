export default async function ({ feature, console }) {
  ScratchTools.waitForElements(
    ".studio-project-bottom .overflow-menu-container",
    function (menu) {
      let img = document.createElement("img");
      img.src = feature.self.getResource("remove-project-trash");
      img.classList.add("ste-remove-project");

      feature.self.hideOnDisable(img);

      menu.appendChild(img);

      img.addEventListener("click", async function () {
        let projectId = menu
          .closest(".studio-project-tile")
          .firstChild.href.split("/")[4];
        await fetch(
          "https://api.scratch.mit.edu/studios/" +
            window.location.pathname.split("/")[2] +
            "/project/" +
            projectId,
          {
            headers: {
              "x-token": feature.redux.getState().session.session.user.token,
            },
            method: "DELETE",
          }
        );
        menu.closest(".studio-project-tile").remove();
      });
    }
  );
}

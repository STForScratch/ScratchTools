export default async function ({ feature, console }) {
  let notes = await ScratchTools.waitForElement(".flex-row.project-notes");

  document.addEventListener("scroll", checkScroll);

  checkScroll()

  async function checkScroll() {
    if (notes && !isInViewport(notes)) {
      if (!document.querySelector(".ste-project-bar")) {
        let div = document.createElement("div");
        div.classList.add("ste-project-bar");

        let a = document.createElement("a");
        a.href = `/users/${
          feature.redux.getState().preview.projectInfo.author.username
        }/`;

        let img = document.createElement("img");
        img.src =
          feature.redux.getState().preview.projectInfo.author.profile.images[
            "90x90"
          ];
        img.classList.add("ste-profile-picture");
        a.appendChild(img);

        div.appendChild(a);

        let title = document.createElement("div");
        title.classList.add("ste-project-title");

        let h2 = document.createElement("h2");
        h2.textContent = feature.redux.getState().preview.projectInfo.title;

        title.appendChild(h2);

        let span = document.createElement("span");
        span.textContent = "by ";
        title.appendChild(span);

        let username = document.createElement("a");
        username.href = `/users/${
          feature.redux.getState().preview.projectInfo.author.username
        }/`;
        username.textContent =
          feature.redux.getState().preview.projectInfo.author.username;
        title.appendChild(username);

        div.appendChild(a);
        div.appendChild(title);

        let arrow = document.createElement("img")
        arrow.src = feature.self.getResource("up-arrow-icon")
        arrow.classList.add("ste-arrow-icon")
        arrow.addEventListener("click", function() {
            document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        })

        div.appendChild(arrow)

        feature.self.hideOnDisable(div);
        document.body.appendChild(div);
      }
    } else {
      document.querySelector(".ste-project-bar")?.remove();
      notes = await ScratchTools.waitForElement(".flex-row.project-notes");
    }
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

async function addStudioProjects(studioId) {
  let studio = await (
    await fetch(`https://api.scratch.mit.edu/studios/${studioId}`)
  ).json();
  studio.projects = await (
    await fetch(
      `https://api.scratch.mit.edu/studios/${studioId}/projects?limit=5`
    )
  ).json();
  let box = document.createElement("div");
  box.className = "box scratchtoolsCustomStudio";

  let boxHeader = document.createElement("div");
  boxHeader.className = "box-header";
  let h4 = document.createElement("h4");
  h4.textContent = studio.title;
  boxHeader.appendChild(h4);
  let h5 = document.createElement("h5");
  let p = document.createElement("p");
  let a = document.createElement("a");
  a.textContent = "Visit the studio";
  a.href = `/studios/${studioId}/`;
  boxHeader.appendChild(p);
  p.appendChild(a);

  let boxContent = document.createElement("div");
  boxContent.className = "box-content";

  let slider = document.createElement("div");
  slider.className = "slick-initialized slick-slider carousel";
  let list = document.createElement("div");
  list.className = "slick-list";
  let track = document.createElement("div");
  track.textContent = "slick-track";
  track.style =
    "opacity: 1; transform: translate3d(0px, 0px, 0px); width: 5400px;";

  boxContent.appendChild(slider);
  slider.appendChild(list);
  list.appendChild(track);

  box.appendChild(boxHeader);
  box.appendChild(boxContent);

  studio.projects.forEach(function (project, i) {
    let projectBox = document.createElement("div");
    projectBox.className = "thumbnail project slick-slide slick-active";
    let thumbnailLink = document.createElement("a");
    thumbnailLink.href = `/projects/${project.id}/`;
    thumbnailLink.className = "thumbnail-image";
    let thumbnail = document.createElement("img");
    thumbnail.src = project.image;

    projectBox.appendChild(thumbnailLink);
    thumbnailLink.appendChild(thumbnail);

    let info = document.createElement("div");
    info.className = "thumbnail-info";
    let title = document.createElement("div");
    title.className = "thumbnail-title";

    let projectTitle = document.createElement("a");
    projectTitle.href = `/projects/${project.id}/`;
    projectTitle.textContent = project.title;
    projectTitle.title = project.title;

    let author = document.createElement("div");
    author.className = "thumbnail-creator";
    let authorLink = document.createElement("a");
    authorLink.href = `/users/${project.username}/`;
    authorLink.textContent = project.username;

    projectBox.appendChild(info);
    info.appendChild(title);
    title.appendChild(projectTitle);
    title.appendChild(author);
    author.appendChild(authorLink);

    track.appendChild(projectBox);
  });
  document
    .querySelector(".inner.mod-splash")
    .insertBefore(box, document.querySelector(".inner.mod-splash > .box"));
}
let alreadyStarted = false;
ScratchTools.waitForElements(
  ".inner.mod-splash > .box",
  function () {
    let studioid = ScratchTools.Storage["Studio ID"];
    if (/^\d+$/.test(studioid)) {
      if (!alreadyStarted && document.querySelector(".splash-header")) {
        alreadyStarted = true;
        addStudioProjects(studioid);
      }
    }
  },
  "wait for studio boxes",
  false
);

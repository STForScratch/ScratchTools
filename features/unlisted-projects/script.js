async function getToken(projectId) {
  let projectToken = (
    await (
      await fetch(
        `https://api.scratch.mit.edu/projects/${projectId}?nocache=${Date.now()}`,
        {
          headers: {
            "x-token": ScratchTools.Auth.user.token,
          },
        }
      )
    ).json()
  ).project_token;
  return projectToken;
}

async function cacheProject() {
  const projectId = window.location.pathname.split("/")[2];
  const token = await getToken(projectId);
  var response = await fetch(
    `https://unlisted.gantzos.com/cache/${projectId}?token=${token}`
  );
  var data = await response.json();
  return data;
}

async function uncacheProject() {
  const projectId = window.location.pathname.split("/")[2];
  const token = await getToken(projectId);
  var response = await fetch(
    `https://unlisted.gantzos.com/uncache/${projectId}?token=${token}`
  );
  var data = await response.json();
  return data;
}

async function loadCachedProject(projectId) {
  var response = await fetch(
    `https://unlisted.gantzos.com/cached/${projectId}/`
  );
  var data = await response.json();
  ScratchTools.Scratch.vm.loadProject(JSON.stringify(data));
}

async function checkIfCached() {
  const projectId = window.location.pathname.split("/")[2];
  const token = await getToken(projectId);
  var response = await fetch(
    `https://unlisted.gantzos.com/iscached/${projectId}?token=${token}`
  );
  var data = await response.json();
  return data.isCached;
}

ScratchTools.waitForElements(
  "[class*='share-button_share-button']",
  createButton,
  "unlisted-projects",
  false
);

async function createButton(el) {
  var el = el || document.querySelector("[class*='share-button_share-button']");
  el.onclick = createButton;
  if (el.className.includes("share-button_share-button_")) {
    if (!document.querySelector(".scratchtools-unlisted")) {
      const classList = document.querySelector(
        "[class*='share-button_share-button']"
      ).parentNode.classList;
      classList.length = 2;

      let btn = document.createElement("div");
      let span = document.createElement("span");
      btn.role = "button";
      btn.className = "button";
      span.style.backgroundColor = "#ff8c1a";
      btn.classList = classList;
      btn.style.display = "none";
      btn.classList.add("scratchtools-unlisted");
      btn.appendChild(span);
      document
        .querySelector('[class^="menu-bar_main-menu_"]')
        .lastChild.before(btn);
      span.classList = document.querySelector(
        "[class*='share-button_share-button']"
      ).classList;
      if (await checkIfCached()) {
        span.textContent = "Make Private";
        btn.onclick = async function () {
          await uncacheProject();
          btn.remove();
          createButton();
        };
      } else {
        span.textContent = "Make Unlisted";
        btn.onclick = async function () {
          const data = await cacheProject();
          ScratchTools.modals.create({
            title: "Unlisted link",
            description: "Here's the link to view your project.",
            components: [
              {
                type: "code",
                content: data.error
                  ? "Project is not unlisted. You can make it unlisted from the editor. A project is not unlisted if it is shared."
                  : "https://turbowarp.org/editor?project_url=https://unlisted.gantzos.com/cached/" +
                    data.id,
              },
            ],
          });
          btn.remove();
          createButton();
        };
      }
      btn.style.display = null;
    }
  }
}

ScratchTools.waitForElements(
  "div.flex-row.action-buttons",
  async function (el) {
    if (
      !el.querySelector(".scratchtools-copy-unlisted-link") &&
      (
        await (
          await fetch(
            `https://api.scratch.mit.edu/projects/${
              ScratchTools.Scratch.scratchGui().projectState.projectId
            }?token=${await getToken(
              ScratchTools.Scratch.scratchGui().projectState.projectId
            )}`
          )
        ).json()
      ).code
    ) {
      var data = await (
        await fetch(
          `https://unlisted.gantzos.com/iscached/${
            window.location.pathname.split("/")[2]
          }/`
        )
      ).json();
      if (data.isCached) {
        var button = document.createElement("button");
        button.className =
          "button action-button scratchtools-copy-unlisted-link";
        button.textContent = "Copy Unlisted";
        button.addEventListener("click", async function () {
          var data = await (
            await fetch(
              `https://unlisted.gantzos.com/getlink/${
                ScratchTools.Scratch.scratchGui().projectState.projectId
              }?token=${await getToken(
                ScratchTools.Scratch.scratchGui().projectState.projectId
              )}`
            )
          ).json();
          ScratchTools.modals.create({
            title: "Unlisted link",
            description: "Here's the link to view your project.",
            components: [
              {
                type: "code",
                content: data.error
                  ? "Project is not unlisted. You can make it unlisted from the editor. A project is not unlisted if it is shared."
                  : "https://turbowarp.org/editor?project_url=https://unlisted.gantzos.com/cached/" +
                    data.link,
              },
            ],
          });
        });
        ScratchTools.appendToSharedSpace({
          space: "beforeProjectActionButtons",
          element: button,
          order: 0.5,
        });
      }
    }
  },
  "scratchtools-copy-unlisted-link",
  false
);

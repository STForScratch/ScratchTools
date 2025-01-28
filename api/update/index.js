function getPageType() {
  let url = new URL(window.location.href);
  if (document.querySelector("#page-404")) {
    return null;
  } else if (url.pathname.startsWith("/projects/")) {
    return "project";
  } else if (url.pathname.startsWith("/discuss/")) {
    return "forum";
  } else {
    return "website";
  }
}

async function checkUpdate() {
  let version = chrome.runtime.getManifest().version;
  let { updateScreens } = await chrome.storage.sync.get("updateScreens");

  if (updateScreens) {
    let page = getPageType();

    if (page && updateScreens[page] !== version) {
      updateScreens[page] = version;
      await chrome.storage.sync.set({
        updateScreens,
      });
      let update = await (
        await fetch(
          chrome.runtime.getURL(`/api/update/changelogs/${page}.json`)
        )
      ).json();
      if (update.active) {
        makeScreen(update);
      }
    }
  } else {
    await chrome.storage.sync.set({
      updateScreens: {
        website: "0",
        project: "0",
        forum: "0",
      },
    });
    checkUpdate()
  }
}
checkUpdate();

function makeScreen(update) {
  console.log(update);
  if (document.querySelector(".ste-update-bg")) return;
  let background = Object.assign(document.createElement("div"), {
    className: "ste-update-bg",
  });

  let div = Object.assign(document.createElement("div"), {
    className: "ste-update-box",
  });

  let topRow = document.createElement("div");
  topRow.append(
    Object.assign(document.createElement("img"), {
      src: chrome.runtime.getURL("/api/update/icons/logo.svg"),
    })
  );
  div.appendChild(topRow);

  let h2 = document.createElement("h2");
  buildText(h2, update.title);
  div.appendChild(h2);

  let p = document.createElement("p");
  p.textContent = update.description;
  div.appendChild(p);

  let b = document.createElement("b");
  b.textContent = " Here's what's new:";
  p.appendChild(b);

  let rows = Object.assign(document.createElement("div"), {
    className: "rows",
  });

  for (var i in update.changes) {
    let row = document.createElement("div");
    let img = document.createElement("img");
    img.src = chrome.runtime.getURL(
      `/api/update/icons/${update.changes[i].icon}`
    );
    let slogan = document.createElement("p");
    slogan.textContent = update.changes[i].slogan;
    row.append(img, slogan);
    rows.appendChild(row);
  }

  div.appendChild(rows);

  let viewMore = document.createElement("div");
  viewMore.className = "view-more";
  let viewMoreSpan = viewMore.appendChild(
    Object.assign(document.createElement("span"), {
      textContent: "View All",
    })
  );
  div.appendChild(viewMore);

  viewMoreSpan.addEventListener("click", function () {
    viewMore.remove();
    rows.style.maxHeight = "none";
  });

  let button = document.createElement("button");
  button.textContent = "Continue";
  button.addEventListener("click", function () {
    background.remove();
    div.remove();
  });
  background.addEventListener("click", function () {
    div.remove();
    background.remove();
  });
  div.appendChild(button);

  document.body.appendChild(div);
  document.body.appendChild(background);
}

function buildText(element, title) {
  let blocks = title.split("{{ version }}");
  console.log(blocks);

  for (var i in blocks) {
    let span = document.createElement("span");
    span.textContent = blocks[i];
    element.appendChild(span);

    if (Number(i) !== Number(blocks.length - 1)) {
      console.log(i);
      let version = document.createElement("span");
      version.textContent = "v" + chrome.runtime.getManifest().version;
      version.className = "color";
      element.appendChild(version);
    }
  }

  return;
}

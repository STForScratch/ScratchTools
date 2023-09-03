async function getOrigins() {
  let perms = await chrome.permissions.getAll();
  if (perms?.origins?.includes("https://api.scratch.mit.edu/*")) {
    getMessages();
  } else {
    document
      .querySelector(".enable-messaging button")
      .addEventListener("click", requestPermissions);
  }
}
getOrigins();

function getOffsetLimits(count) {
  let turns = Math.floor(count / 40);
  return {
    offset: count - turns * 40,
    turns,
  };
}

async function getMessages() {
  let collapsed = false;
  document
    .querySelector(".collapse-btn")
    .addEventListener("click", function () {
      if (collapsed) {
        document.querySelector(".collapse-btn").textContent = "(collapse)";
        document.querySelector(".container .content").style.display = "none";
      } else {
        document.querySelector(".collapse-btn").textContent = "(uncollapse)";
        document.querySelector(".container .content").style.display = null;
      }
      collapsed = !collapsed;
    });
  document.querySelector(".enable-messaging").remove();
  let session = await (
    await fetch("https://scratch.mit.edu/session/", {
      headers: {
        "x-requested-with": "XMLHttpRequest",
      },
    })
  ).json();
  let { count } = await (
    await fetch(
      `https://api.scratch.mit.edu/users/${session.user.username}/messages/count`
    )
  ).json();

  let messages = [];

  if (getOffsetLimits(count).turns) {
    for (let i = 0; i < getOffsetLimits(count).turns; i++) {
      var data = await (
        await fetch(
          "https://api.scratch.mit.edu/users/" +
            session.user.username +
            "/messages?limit=40&offset=" +
            (i * 40).toString(),
          {
            headers: {
              "x-token": session.user.token,
            },
          }
        )
      ).json();
      messages.push(...data);
    }
  }
  if (getOffsetLimits(count).offset) {
    var data = await (
      await fetch(
        "https://api.scratch.mit.edu/users/" +
          session.user.username +
          "/messages?limit=" +
          getOffsetLimits(count).offset +
          "&offset=" +
          (getOffsetLimits(count).turns * 40).toString(),
        {
          headers: {
            "x-token": session.user.token,
          },
        }
      )
    ).json();
    messages.push(...data);
  }

  messages.forEach(function (el) {
    createMessage(el);
  });
}

async function removeBox() {
  document.querySelector(".messaging")?.remove();
}

async function requestPermissions() {
  await chrome.permissions.request(
    {
      origins: ["https://api.scratch.mit.edu/"],
    },
    (granted) => {
      if (granted) {
        getMessages();
      } else {
        removeBox();
      }
    }
  );
}

function createMessage(data) {
  let div = document.createElement("div");
  div.classList.add("msg");
  let container = document.querySelector(".messages");

  if (data.type === "followuser") {
    container = document.querySelector("div[data-type=follows]");
    div.append(
      ...createElements({
        type: "a",
        content: data.actor_username,
        href: returnProfileURL(data.actor_username),
      })
    );
    div.style.display = "inline-block";
    div.style.marginleft = ".5rem";
  } else if (data.type === "loveproject") {
    div.append(
      ...createElements(
        {
          type: "a",
          content: data.actor_username,
          href: returnProfileURL(data.actor_username),
        },
        {
          type: "span",
          content: " loved your project ",
        },
        {
          type: "a",
          content: data.title,
          href: returnProjectURL(data.project_id),
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
    container = getContainer("project", data.project_id, data.title);
  } else if (data.type === "favoriteproject") {
    div.append(
      ...createElements(
        {
          type: "a",
          content: data.actor_username,
          href: returnProfileURL(data.actor_username),
        },
        {
          type: "span",
          content: " favorited your project ",
        },
        {
          type: "a",
          content: data.project_title,
          href: returnProjectURL(data.project_id),
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
    container = getContainer("project", data.project_id, data.project_title);
  } else if (data.type === "addcomment") {
    div.append(
      ...createElements(
        {
          type: "a",
          content: data.actor_username,
          href: returnProfileURL(data.actor_username),
        },
        {
          type: "span",
          content: " commented on ",
        },
        {
          type: "a",
          content:
            data.comment_type === 1 ? "your profile" : data.comment_obj_title,
          href: [
            returnProjectURL(data.comment_obj_id),
            returnProfileURL(data.comment_obj_title),
            returnStudioURL(data.comment_obj_id),
          ][data.comment_type],
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
    div.appendChild(createComment(data.comment_fragment));

    if (data.comment_type === 1) {
      container = document.querySelector("div[data-type=profile]");
    } else {
      container = getContainer(
        ["project", "profile", "studio"][data.comment_type],
        data.comment_obj_id,
        data.comment_obj_title
      );
    }
  } else if (data.type === "curatorinvite") {
    div.append(
      ...createElements(
        {
          type: "a",
          content: data.actor_username,
          href: returnProfileURL(data.actor_username),
        },
        {
          type: "span",
          content: " invited you to curate ",
        },
        {
          type: "a",
          content: data.title,
          href: returnStudioURL(data.gallery_id) + "curators",
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
    container = document.querySelector("div[data-type=curators]");
  } else if (data.type === "remixproject") {
    div.append(
      ...createElements(
        {
          type: "a",
          content: data.actor_username,
          href: returnProfileURL(data.actor_username),
        },
        {
          type: "span",
          content: " remixed your project ",
        },
        {
          type: "a",
          content: data.parent_title,
          href: returnProjectURL(data.parent_id),
        },
        {
          type: "span",
          content: " as ",
        },
        {
          type: "a",
          content: data.title,
          href: returnProjectURL(data.project_id),
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
    container = document.querySelector("div[data-type=remixes]");
  } else if (data.type === "studioactivity") {
    div.append(
      ...createElements(
        {
          type: "span",
          content: "There was new studio activity in ",
        },
        {
          type: "a",
          content: data.title,
          href: returnStudioURL(data.gallery_id) + "activity",
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
    container = document.querySelector("div[data-type=activity]");
  } else if (data.type === "forumpost") {
    div.append(
      ...createElements(
        {
          type: "span",
          content: "There was new activity in the forum topic ",
        },
        {
          type: "a",
          content: data.topic_title,
          href: returnForumURL(data.topic_id),
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
  } else if (data.type === "becomeownerstudio") {
    div.append(
      ...createElements(
        {
          type: "a",
          content: data.actor_username,
          href: returnProfileURL(data.actor_username),
        },
        {
          type: "span",
          content: " promoted you to manager of ",
        },
        {
          type: "a",
          content: data.gallery_title,
          href: returnStudioURL(data.gallery_id),
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
    container = document.querySelector("div[data-type=curators]");
  } else if (data.type === "becomehoststudio") {
    div.append(
      ...createElements(
        {
          type: "a",
          content: data.actor_username,
          href: returnProfileURL(data.actor_username),
        },
        {
          type: "span",
          content: " made you the new owner of ",
        },
        {
          type: "a",
          content: data.gallery_title,
          href: returnStudioURL(data.gallery_id),
        },
        {
          type: "span",
          content: ".",
        }
      )
    );
    container = document.querySelector("div[data-type=curators]");
  }

  if (!div.querySelector("*")) return;

  container.style.display = null;
  if (container.dataset.type === "activity") {
    container.querySelector(".content").appendChild(div);
  } else {
    container.appendChild(div);
  }
}

function createElements(...elements) {
  let list = [];
  elements.forEach(function (el) {
    let element = document.createElement(el.type);
    if (el.type === "a") {
      element.href = el.href;
    }
    element.textContent = el.content;
    list.push(element);
  });
  return list;
}

function createComment(content) {
  let div = document.createElement("div");

  div.className = "comment";
  div.textContent = decodeHtmlEntities(content);

  return div;
}

function returnProfileURL(username) {
  return `https://scratch.mit.edu/users/${username}/`;
}

function returnStudioURL(id) {
  return `https://scratch.mit.edu/studios/${id}/`;
}

function returnProjectURL(id) {
  return `https://scratch.mit.edu/projects/${id}/`;
}

function returnForumURL(id) {
  return `https://scratch.mit.edu/discuss/topic/${id}/unread/`;
}

function decodeHtmlEntities(html) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(
    `<!doctype html><body>${html}`,
    "text/html"
  ).body.textContent;
  return decodedString;
}

function getContainer(type, id, name) {
  if (
    document.querySelector(
      `.messaging .container[data-type='${type}'][data-id='${id}']`
    )
  ) {
    return document.querySelector(
      `.messaging .container[data-type='${type}'][data-id='${id}']`
    );
  } else {
    let div = document.createElement("div");
    div.className = "container";
    div.dataset.type = type;
    div.dataset.id = id;

    let h3 = document.createElement("h3");
    h3.textContent = name;
    div.appendChild(h3);

    document.querySelector(".messages").appendChild(div);
    return div;
  }
}

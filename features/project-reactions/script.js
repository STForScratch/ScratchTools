export default async function ({ feature, console }) {
  let username = feature.redux.getState().session?.session?.user?.username;

  let projectId = window.location.pathname.split("/")[2];
  let reactions = await (
    await fetch(feature.server.endpoint(`/reactions/${projectId}/`))
  ).json();

  ScratchTools.waitForElements("div.flex-row.stats", function (req, res) {
    makeReactions(reactions);
  });

  function makeReactions(data) {
    let parent = document.querySelector("div.flex-row.stats");

    let already = parent.querySelector(".ste-reactions");
    already?.remove();

    let div = document.createElement("div");
    div.className = "ste-reactions";

    let reactionsList = document.createElement("div");
    reactionsList.className = "ste-reactions-list";

    let allEmojis = [];
    for (var i in reactions) {
      if (!allEmojis.includes(reactions[i].emoji)) {
        allEmojis.push({
          emoji: reactions[i].emoji,
          count: reactions.filter((el) => el.emoji === reactions[i].emoji)
            .length,
        });
      }
    }

    if (allEmojis.length === 0) {
      let span = document.createElement("span");

      let img = document.createElement("img");
      img.src = feature.self.getResource("project-reactions-heart-eyes");
      span.appendChild(img);

      reactionsList.appendChild(span);
    }

    for (var i in allEmojis) {
      if (i < 3) {
        let span = document.createElement("span");

        let img = document.createElement("img");
        img.src = feature.self.getResource(
          "project-reactions-" + allEmojis[i].emoji
        );
        span.appendChild(img);

        reactionsList.appendChild(span);
      }
    }

    div.appendChild(reactionsList);

    let modal = document.createElement("div");
    modal.className = "ste-reactions-modal";
    div.appendChild(modal);

    let options = document.createElement("div");
    options.classList.add("ste-reactions-options");

    function updateOptions() {
      allEmojis = [];
      for (var i in reactions) {
        if (!allEmojis.includes(reactions[i].emoji)) {
          allEmojis.push({
            emoji: reactions[i].emoji,
            count: reactions.filter((el) => el.emoji === reactions[i].emoji)
              .length,
          });
        }
      }

      options.innerHTML = "";

      let emojis = [
        "beaming",
        "crying",
        "fire",
        "hands",
        "heart-eyes",
        "heart-face",
        "hearts",
        "laughing",
        "popper",
        "thumbsup",
      ];

      for (var i in emojis) {
        let img = document.createElement("img");
        img.src = feature.self.getResource("project-reactions-" + emojis[i]);
        img.className = "ste-reactions-option";
        img.dataset.emoji = emojis[i];
        if (
          reactions.find((el) => el.emoji === emojis[i] && el.user === username)
        ) {
          img.classList.add("selected");
        }

        let span = document.createElement("span");
        span.textContent = allEmojis
          .filter((el) => el.emoji === emojis[i])
          .length.toString();
        options.appendChild(span);

        img.addEventListener("click", async function () {
          let emoji = this.dataset.emoji;
          if (!img.className.includes("selected")) {
            this.classList.add("selected");
            ScratchTools.verifyUser(async function (token) {
              let data = await (
                await fetch("https://data.scratchtools.app/react/", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    token,
                    emoji,
                    project: projectId,
                  }),
                })
              ).json();

              if (data.success) {
                reactions = data.data;
                updateOptions();
              }
            });
          } else {
            this.classList.remove("selected");
            ScratchTools.verifyUser(async function (token) {
              let data = await (
                await fetch("https://data.scratchtools.app/unreact/", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ token, emoji, project: projectId }),
                })
              ).json();

              if (data.success) {
                reactions = data.data;
                updateOptions();
              }
            });
          }
        });
        options.appendChild(img);
      }
    }
    updateOptions();
    modal.appendChild(options);

    parent.appendChild(div);
  }
}

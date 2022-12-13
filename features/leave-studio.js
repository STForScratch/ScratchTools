if (
  window.location.href
    .toLowerCase()
    .startsWith("https://scratch.mit.edu/studios/") &&
  window.location.href.includes("/curators") &&
  !document.querySelector(".scratchtoolsLeaveStudio")
) {
  const studioId = window.location.href.replace("https://", "").split("/")[2];

  async function leaveStudio() {
    var auth = await ScratchTools.Session();
    await fetch(
      "https://scratch.mit.edu/site-api/users/curators-in/" +
        studioId +
        "/remove/?usernames=" +
        auth.user.username,
      {
        headers: {
          "x-csrftoken": ScratchTools.cookies.get("scratchcsrftoken"),
        },
        body: null,
        method: "PUT",
      }
    );
    window.location.href = window.location.href;
  }

  async function getCurating() {
    var auth = await ScratchTools.Session();
    var response = await fetch(
      "https://api.scratch.mit.edu/studios/" +
        studioId +
        "/users/" +
        auth.user.username,
      {
        headers: {
          "x-token": auth.user.token,
        },
      }
    );
    var data = await response.json();
    if (
      (data.curator || data.manager) &
      (document.querySelector(".studio-member-name").textContent !==
        auth.user.username)
    ) {
      ScratchTools.waitForElements(
        ".studio-member-name",
        function (el) {
          var btn = document.createElement("button");
          btn.className = "scratchtoolsLeaveStudio button";
          btn.textContent = "Leave Studio";
          btn.style.backgroundColor = "#ff4c4c";
          btn.style.position = "absolute";
          btn.style.right = "0px";
          btn.onclick = function () {
            if (confirm("Are you sure you want to leave the studio?")) {
              leaveStudio();
            }
          };
          document
            .querySelector(".studio-header-container.studio-managers-header")
            .appendChild(btn);
        },
        "scratchtoolsLeaveStudio",
        false
      );
    }
  }
  getCurating();
}

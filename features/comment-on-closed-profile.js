function addNoCommentBox() {
  const loggedInUser = Scratch?.INIT_DATA?.LOGGED_IN_USER?.model?.username;
  const profileUser = Scratch?.INIT_DATA?.PROFILE?.model?.username;
  if (profileUser !== loggedInUser || /^gdpr\d+$/.test(profileUser)) {
    waitForNoCommentsObserver.disconnect();
    return;
  }

  if (document.querySelector("#comments-enabled") !== null) {
    if (ScratchTools.Storage.commentInputFound === undefined) {
      ScratchTools.Storage.commentInputFound = true;
      document
        .querySelector("#comments-enabled")
        .addEventListener("input", function () {
          if (document.querySelector("#comments-enabled").checked) {
            addBox();
          } else {
            if (
              document.querySelector("form.scratchtools.comments-on") !== null
            ) {
              document
                .querySelector("form.scratchtools.comments-on")
                .remove();
            }
          }
        });
    }
  }
  addBox();

  function addBox() {
    var div = document.querySelector(".comments-off");
    if (div !== null) {
      div.className = "";
      div.innerHTML = `<form id="main-post-form" class="comments-on scratchtools" style="
      float: left;
      margin: 0;
      margin-left: 10px;
      margin-bottom: 0;
      display: block;
  ">
          <div class="control-group tooltip right">
              <textarea name="content" placeholder="Commenting is closed, but you can comment anyways."></textarea>
              <span class="small-text">You have <span id="chars-left">500</span> characters left.</span>
          </div>
          <div class="control-group error">
              <div class="button small postComment" data-parent-thread="" data-commentee-id=""><a>Post</a></div>
              <div class="button small grey cancelComment" data-control="cancel"><a>Cancel</a></div>
              <span class="notification"></span>
          </div>
      </form>`;
      div.querySelector("textarea").addEventListener("input", function () {
        div.querySelector("#chars-left").textContent = (
          500 - div.querySelector("textarea").value.length
        ).toString();
      });
      document.querySelector(".postComment").onclick = function () {
        postComment(div.querySelector("textarea").value);
        div.querySelector("textarea").value = "";
      };
      document.querySelector(".cancelComment").onclick = function () {
        div.querySelector("textarea").value = "";
        div.querySelector("#chars-left").textContent = (
          500 - div.querySelector("textarea").value.length
        ).toString();
      };
    }
  }

  async function postComment(content) {
    var open = await fetch(
      "https://scratch.mit.edu/site-api/comments/user/" +
        loggedInUser +
        "/toggle-comments/",
      {
        headers: {
          accept: "*/*",
          "x-csrftoken": ScratchTools.cookies.get("scratchcsrftoken"),
          "x-requested-with": "XMLHttpRequest",
        },
        method: "POST",
        credentials: "include",
      }
    );

    var response = await fetch(
      "https://scratch.mit.edu/site-api/comments/user/" +
        loggedInUser +
        "/add/",
      {
        headers: {
          accept: "text/html, */*; q=0.01",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-csrftoken": ScratchTools.cookies.get("scratchcsrftoken"),
          "x-requested-with": "XMLHttpRequest",
        },
        body: `{"content":"${content}","parent_id":"","commentee_id":""}`,
        method: "POST",
        credentials: "include",
      }
    );

    var close = await fetch(
      "https://scratch.mit.edu/site-api/comments/user/" +
        loggedInUser +
        "/toggle-comments/",
      {
        headers: {
          accept: "*/*",
          "x-csrftoken": ScratchTools.cookies.get("scratchcsrftoken"),
          "x-requested-with": "XMLHttpRequest",
        },
        method: "POST",
        credentials: "include",
      }
    );

    ScratchTools.modals.create({
      title: "Comment posted",
      description: "Reloading page...",
    });

    window.location.href = window.location.href;
  }
}

if (window.location.href.startsWith("https://scratch.mit.edu/users/")) {
  var waitForNoCommentsObserver = new MutationObserver(addNoCommentBox);
  waitForNoCommentsObserver.observe(document.querySelector("body"), {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

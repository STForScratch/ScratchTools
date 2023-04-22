function addNoCommentBox() {
  if (
    Scratch.INIT_DATA.PROFILE.model.username !==
    Scratch.INIT_DATA.LOGGED_IN_USER.model.username
  ) {
    waitForNoCommentsObserver.disconnect();
  } else {
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
                
                
                <span class="small-text" style="display/:
    block;
    block;
    bloc;
    blo;
    bl;
    b;
">You have <span id="chars-left">500</span> characters left.</span>
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
          Scratch.INIT_DATA.LOGGED_IN_USER.model.username +
          "/toggle-comments/",
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9,el;q=0.8",
            "sec-ch-ua":
              '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": ScratchTools.cookies.get("scratchcsrftoken"),
            "x-requested-with": "XMLHttpRequest",
          },
          referrer: window.location.href,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
      var openData = await open.text();
      var response = await fetch(
        "https://scratch.mit.edu/site-api/comments/user/" +
          Scratch.INIT_DATA.LOGGED_IN_USER.model.username +
          "/add/",
        {
          headers: {
            accept: "text/html, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,el;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua":
              '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": ScratchTools.cookies.get("scratchcsrftoken"),
            "x-requested-with": "XMLHttpRequest",
          },
          referrer: window.location.href,
          referrerPolicy: "strict-origin-when-cross-origin",
          body:
            '{"content":"' + content + '","parent_id":"","commentee_id":""}',
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
      var close = await fetch(
        "https://scratch.mit.edu/site-api/comments/user/" +
          Scratch.INIT_DATA.LOGGED_IN_USER.model.username +
          "/toggle-comments/",
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9,el;q=0.8",
            "sec-ch-ua":
              '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": ScratchTools.cookies.get("scratchcsrftoken"),
            "x-requested-with": "XMLHttpRequest",
          },
          referrer: window.location.href,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
      var closeData = await close.text();
      ScratchTools.modals.create({
        title: "Comment posted",
        description: "Reloading page..."
      })
      window.location.href = window.location.href;
    }
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

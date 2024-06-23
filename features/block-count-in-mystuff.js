if (window.location.href.startsWith("https://scratch.mit.edu/mystuff")) {
  var stillLookingForBlockCount = true;

  async function getBlockCount(projectId) {
    let { project_token } = await (await fetch("https://api.scratch.mit.edu/projects/" + projectId, {
      "headers": {
        "accept": "*/*",
        "x-token": (await ScratchTools.Session()).user.token,
      },
      "referrer": "https://scratch.mit.edu/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
    })).json()
    var response = await fetch(
      "https://projects.scratch.mit.edu/" + projectId + "/?token=" + project_token
    );
    if (response.ok) {
      var data = await response.json();
      if (data.targets) {
        var blocks = 0;
        data.targets.forEach(function (el) {
          if (el.blocks) {
            blocks = blocks + Object.keys(el.blocks).length;
          }
        });
        return blocks;
      }
    }
  }
  ScratchTools.waitForElements(
    "ul.media-list > li",
    async function (el) {
      if (
        stillLookingForBlockCount &&
        !el.querySelector(".scratchtoolsBlockCount")
      ) {
        if (el.querySelector('a[href*="/projects/"]')) {
          var blocks = await getBlockCount(
            el
              .querySelector(".title")
              .firstChild.href.replaceAll(
                "https://scratch.mit.edu/projects/",
                ""
              )
              .replaceAll("/", "")
          );
          var span = document.createElement("span");
          span.textContent = blocks.toString() + " total blocks";
          span.className = "media-info-item scratchtoolsBlockCount date";
          span.style.display = "block";
          el.querySelector(".media-info-item.date.shortDateFormat").appendChild(
            span
          );
          el.querySelector('a[data-control="edit"]').style.transition = "none";
          el.querySelector('a[data-control="edit"]').style.marginTop = "1px";
        }
      }
    },
    "blockCountOnProjects",
    false
  );

  ScratchTools.setDisable("block-count-in-mystuff", function () {
    stillLookingForBlockCount = false;
    document.querySelectorAll('a[data-control="edit"]').forEach(function (el) {
      el.style.marginTop = null;
    });
    document.querySelectorAll(".scratchtoolsBlockCount").forEach(function (el) {
      el.remove();
    });
  });
}

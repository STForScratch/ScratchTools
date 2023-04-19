async function addBadges() {
  var author = (
    await (
      await fetch(
        `https://api.scratch.mit.edu/projects/${
          window.location.pathname.split("/")[2]
        }/`
      )
    ).json()
  ).author.username;
  ScratchTools.waitForElements(
    ".comment .username",
    function (el) {
      if (el.innerText === author) {
        if (!el.querySelector(".creator-badge")) {
          var span = document.createElement("span");
          span.textContent = "Author";
          span.className = "creator-badge";
          el.appendChild(span);
        }
      }
    },
    "creator-comments",
    false
  );
}
addBadges();

ScratchTools.setDisable("creator-badge", function() {
    document.querySelectorAll(".creator-badge").forEach(function(badge) {
        badge.remove()
    })
})
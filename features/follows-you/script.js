async function getFollowing(user1, user2) {
  var notFound = true;
  var isFollowing = false;
  var offset = 0;
  while (notFound) {
    var response = await fetch(
      `https://api.scratch.mit.edu/users/${user2}/following/?limit=40&offset=${offset.toString()}`
    );
    var data = await response.json();
    if (data.length === 0) {
      notFound = false;
    }
    data.forEach(function (el) {
      if (el.username.toLowerCase() === user1.toLowerCase()) {
        notFound = false;
        isFollowing = true;
        ScratchTools.waitForElements(".header-text", function (element) {
          if (!document.querySelector(".scratchtoolsFollowsYou")) {
            var span = element.insertBefore(
              document.createElement("span"),
              document.querySelector(".profile-details")
            );
			if (typeof scratchAddons !== 'undefined') {
			for(var i = 0; i < scratchAddons.eventTargets.self.length; i++) {
				if(scratchAddons.eventTargets.self[i].id == "better-featured-project"){
				span.style.color = "white";
				}
			}}
            span.className = "scratchtoolsFollowsYou";
            span.textContent = "Follows You";
		  }
        });
      }
    });
    offset = offset + 40;
  }
}
if (
  window.location.href
    .toLowerCase()
    .startsWith("https://scratch.mit.edu/users/")
) {
  getFollowing(
    Scratch.INIT_DATA.LOGGED_IN_USER.model.username,
    window.location.href
      .toLowerCase()
      .split("https://scratch.mit.edu/users/")[1]
      .split("/")[0]
  );
}
ScratchTools.setDisable("follows-you", function () {
  if (document.querySelector(".scratchtoolsFollowsYou")) {
    document.querySelector(".scratchtoolsFollowsYou").remove();
  }
});
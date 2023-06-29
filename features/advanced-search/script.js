async function checkIfUser() {
  var search = new URLSearchParams(window.location.search).get("q");
  var user = await (
    await fetch(`https://api.scratch.mit.edu/users/${search}/`)
  ).json();
  if (user.username) {
    var div = document.createElement("div");
    div.className = "ste-search-user";
    var pfp = document.createElement("img");
    pfp.src = user.profile.images["90x90"];
    pfp.className = "ste-search-user-pfp";

    var data = document.createElement("div");
    data.className = "ste-search-user-data";

    var span = document.createElement("span");
    span.className = "ste-search-user-username";
    span.textContent = `@${user.username}`;
    var p = document.createElement("p");
    p.textContent = user.profile.bio;
    p.className = "ste-search-user-bio";

    div.appendChild(pfp);
    data.appendChild(span);
    data.appendChild(p);
    div.appendChild(data);

    var a = document.createElement("a");
    a.className = "ste-search-user-btn";
    a.href = `/users/${user.username}/`;
    var button = document.createElement("button");
    button.className = "button";
    button.textContent = "View Profile";
    a.appendChild(button);
    div.appendChild(a);

    var outerDiv = document.createElement("div");
    outerDiv.className = "ste-search-border-top";
    outerDiv.appendChild(div);

    ScratchTools.waitForElements(
      "div.sort-controls",
      function (box) {
        if (!box.querySelector(".ste-search-user")) {
          box.appendChild(outerDiv);
        }
      },
      "search-users",
      false
    );
  }
}
checkIfUser();

async function getExactJoinDate(el) {
  if (!el.className.includes("scratchtoolsUpdateTime")) {
    el.classList.add("scratchtoolsUpdateTime");
    var response = await fetch(
      "https://api.scratch.mit.edu/users/" +
        Scratch.INIT_DATA.PROFILE.model.username +
        "/"
    );
    var data = await response.json();
    el.childNodes[3].textContent = new Date(
      data.history.joined
    ).toLocaleString();
    el.childNodes[4].textContent = "";
  }
}

ScratchTools.waitForElements(
  ".profile-details",
  getExactJoinDate,
  "get-exact-join-date",
  false
);

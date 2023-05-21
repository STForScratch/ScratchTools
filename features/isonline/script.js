async function checkUser() {
  if (document.querySelector(".ste-isonline")) {
    document.querySelector(".ste-isonline").remove();
  }
  var data = await (
    await fetch(
      `https://data.scratchtools.app/isonline/${
        window.location.pathname.split("/")[2]
      }/`
    )
  ).json();
  if (data.scratchtools) {
    var span = document.createElement("span");
    span.className =
      "ste-isonline " +
      (data.online ? "ste-detect-online" : "ste-detect-offline");
    span.textContent = data.online ? "Online" : "Offline";
    span.title = "This was added by ScratchTools.";
    document.querySelector(".location").appendChild(span);
  } else {
    var span = document.createElement("span");
    span.className = "ste-isonline unsure";
    span.textContent = "(Doesn't use ScratchTools online detection)";
    span.title = "This was added by ScratchTools.";
    document.querySelector(".location").appendChild(span);
  }
}
checkUser();

async function checkUser() {
  var isOnlineFeature = new Feature({ id: "isonline" })
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
    span.textContent = data.online ? isOnlineFeature.getLocale("online") : isOnlineFeature.getLocale("offline");
    span.title = "This was added by ScratchTools.";
    span.setScratchTools()
    document.querySelector(".location").appendChild(span);
  } else {
    var span = document.createElement("span");
    span.className = "ste-isonline unsure";
    span.textContent = isOnlineFeature.getLocale("unavailable");
    span.title = "This was added by ScratchTools.";
    span.setScratchTools()
    document.querySelector(".location").appendChild(span);
  }
}
checkUser();

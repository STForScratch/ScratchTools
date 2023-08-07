export default async function({ feature, console }) {
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
    span.textContent = data.online ? feature.msg("online") : feature.msg("offline");
    span.title = "This was added by ScratchTools.";
    span.setScratchTools()
    ScratchTools.appendToSharedSpace({
      space: "afterProfileCountry",
      element: span,
      order: 1,
    });
  } else {
    var span = document.createElement("span");
    span.className = "ste-isonline unsure";
    span.textContent = feature.msg("unavailable");
    span.title = "This was added by ScratchTools.";
    span.setScratchTools()
    ScratchTools.appendToSharedSpace({
      space: "afterProfileCountry",
      element: span,
      order: 1,
    });
  }

  feature.addEventListener("disabled", async function() {
    var span = await ScratchTools.waitForElement(".ste-isonline")
    span.style.display = "none"
  })

  feature.addEventListener("enabled", async function() {
    var span = await ScratchTools.waitForElement(".ste-isonline")
    span.style.display = null
  })
}
async function getStatus() {
  if (document.querySelector(".ste-status")) {
    document.querySelector(".ste-status").remove();
  }
  var data = await (
    await fetch(
      `https://data.scratchtools.app/status/${
        window.location.pathname.split("/")[2]
      }/`
    )
  ).json();
  var span = document.createElement("span");
  span.className = "ste-status";
  span.textContent = data.status || "🙂";
  if (
    Scratch.INIT_DATA.PROFILE.model.username === ScratchTools.Auth.user.username
  ) {
    span.addEventListener("click", async function () {
      window.location.href = "https://auth.itinerary.eu.org/auth/?redirect="+ btoa("https://scratch.mit.edu/ste/dashboard/verify/?system=dashboard")+"&name=ScratchTools"
    });
  }
  document.querySelector(".profile-details").prepend(span);
}
getStatus();

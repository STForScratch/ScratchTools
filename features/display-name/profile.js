async function getDisplayName() {
  var data = await (
    await fetch(
      `https://data.scratchtools.app/name/${
        window.location.pathname.split("/")[2]
      }/`
    )
  ).json();
  if (data.displayName) {
    if (!document.querySelector(".ste-display-name")) {
      var span = document.createElement("span");
      span.textContent = data.displayName;
      span.className = "ste-display-name";

      var usernameSpan = document.createElement("span");
      usernameSpan.textContent =
        "@" + document.querySelector(".header-text h2").childNodes[0].textContent;
      usernameSpan.className = "ste-username";

      document.querySelector(".header-text h2").childNodes[0].textContent = "";
      document.querySelector(".header-text h2").prepend(usernameSpan);
      document.querySelector(".header-text h2").prepend(span);
    }
  }
}
getDisplayName();

if (
  Scratch.INIT_DATA.PROFILE.model.username === ScratchTools.Auth.user.username
) {
  if (!document.querySelector(".ste-set-display-name")) {
    var span = document.createElement("span");
    span.textContent = "Set Display Name";
    span.className = "ste-set-display-name";
    span.addEventListener("click", function () {
        window.location.href = "https://auth.itinerary.eu.org/auth/?redirect="+ btoa("https://scratch.mit.edu/ste/dashboard/verify/?system=dashboard")+"&name=ScratchTools"
    });
    document.querySelector(".header-text h2").appendChild(span);
  }
}

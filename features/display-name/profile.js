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
      var newDisplayName = prompt(
        "Please enter in your desired display name.\n\nPlease make sure that it's appropriate, other users will see it too. Leave this blank if you wish to change your mind. Set the display name to your username if you want to delete your display name."
      );
      if (newDisplayName) {
        ScratchTools.verifyUser(async function (token) {
          var data = await (
            await fetch("https://data.scratchtools.app/setdisplay/", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: newDisplayName, token: token }),
            })
          ).json();
          if (data.success) {
            alert("Set display name!");
            window.location.href = window.location.href
          } else {
            alert("An error occurred while trying to set your display name.");
          }
        });
      }
    });
    document.querySelector(".header-text h2").appendChild(span);
  }
}

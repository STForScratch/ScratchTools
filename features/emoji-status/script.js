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
      if (confirm("Would you like to set your emoji status?")) {
        var status = prompt(
          "What would you like your status to be?\n\nIt must be one single emoji."
        );
        ScratchTools.verifyUser(async function (token) {
          var data = await (
            await fetch("https://data.scratchtools.app/setstatus/", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: status, token: token }),
            })
          ).json();
          if (data.success) {
            alert("Set emoji status!");
            window.location.href = window.location.href;
          } else if (data.error) {
            alert(data.error);
          }
        });
      }
    });
  }
  document.querySelector(".profile-details").prepend(span);
}
getStatus();

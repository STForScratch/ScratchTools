ScratchTools.waitForElements(
  "div.box#profile-data div.footer",
  async function (footer) {
    if (!document.querySelector(".ste-block-user")) {
      var user = window.location.pathname.split("/")[2];
      var blocked = await ScratchTools.storage.get("blocked");
      var isBlocked;
      if (blocked?.includes(user)) {
        isBlocked = true;
      } else {
        isBlocked = false;
      }
      var div = document.createElement("div");
      div.className = "ste-block-user action";
      div.textContent = `${isBlocked ? "Unblock" : "Block"} user`;
      footer.appendChild(div);
      div.addEventListener("click", async function () {
        isBlocked = !isBlocked;
        div.textContent = `${isBlocked ? "Unblock" : "Block"} user`;
        if (blocked) {
          if (!isBlocked) {
            var newArray = [];
            blocked.forEach(function (el) {
              if (el !== user) {
                newArray.push(user);
              }
            });
            blocked = newArray;
            await ScratchTools.storage.set({ key: "blocked", value: blocked });
          } else {
            blocked.push(user);
            await ScratchTools.storage.set({ key: "blocked", value: blocked });
          }
        } else {
          blocked = [user];
          await ScratchTools.storage.set({ key: "blocked", value: blocked });
        }
      });
    }
  },
  "check-blocked",
  false
);

ScratchTools.setDisable("block-messages", function () {
  document.querySelector(".ste-block-user")?.remove();
});

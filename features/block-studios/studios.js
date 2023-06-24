var storage = {};

storage.setItem = function (name, value) {
  return localStorage.setItem(name, JSON.stringify(value));
};

storage.getItem = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

function getStudioId(href) {
  return href
    .replaceAll("https://scratch.mit.edu/studios/", "")
    .replaceAll("/", "")
    .replaceAll("activity", "");
}

ScratchTools.waitForElements(
  ".studio-activity > .studio-header-container",
  function (container) {
    if (!document.querySelector(".scratchtoolsDisableButton")) {
      var btn = document.createElement("button");
      if (!storage.getItem("blockedStudios")) {
        storage.setItem("blockedStudios", []);
      }
      if (
        storage
          .getItem("blockedStudios")
          .includes(getStudioId(window.location.href))
      ) {
        btn.textContent = "Enable Studio Activity Messages";
      } else {
        btn.textContent = "Disable Studio Activity Messages";
      }
      btn.className = "scratchtoolsDisableButton button";
      btn.onclick = function () {
        var blocked = storage.getItem("blockedStudios");
        if (
          storage
            .getItem("blockedStudios")
            .includes(getStudioId(window.location.href))
        ) {
          var newBlocked = [];
          blocked.forEach(function (item) {
            if (item !== getStudioId(window.location.href)) {
              newBlocked.push(item);
            }
          });
          storage.setItem("blockedStudios", newBlocked);
          btn.textContent = "Disable Studio Activity Messages";
        } else {
          blocked.push(getStudioId(window.location.href));
          storage.setItem("blockedStudios", blocked);
          btn.textContent = "Enable Studio Activity Messages";
        }
      };
      container.appendChild(btn);
    }
  },
  "waitForActivityMessagesHidden",
  false
);
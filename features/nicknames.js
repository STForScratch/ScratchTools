const nicknames = JSON.parse(localStorage.getItem("scratchtools-nicknames"));
ScratchTools.waitForElements(
  "a[href^='/users/'], .activity-stream .actor, #profile-data .header-text h2",
  function (el) {
    if (
      Object.keys(nicknames).includes(
        el.textContent.toLowerCase().replace("@", "")
      )
    ) {
      el.textContent = el.textContent
        .toLowerCase()
        .replace(
          el.textContent.toLowerCase().replace("@", ""),
          nicknames[el.textContent.toLowerCase().replace("@", "")]
        );
    }
  },
  "nickname-replace",
  false
);
ScratchTools.waitForElements(
  "#profile-data .header-text h2",
  function (el) {
    if (!el.querySelector(".set-nickname")) {
      var span = document.createElement("span");
      span.textContent = "Change Nickname";
      span.style.color = "#1aa0d8";
      span.style.fontSize = "1rem";
      span.style.fontWeight = "400";
      span.style.cursor = "pointer";
      span.style.marginLeft = "1rem";
      span.className = "set-nickname";
      el.onclick = function () {
        var data = JSON.parse(
          localStorage.getItem("scratchtools-nicknames") || "{}"
        );
        var newName = prompt("What would you like the nickname to be?\n\nPress cancel if you've changed your mind and want to reset the nickname.");
        data[Scratch.INIT_DATA.PROFILE.model.id.toLowerCase()] = newName || undefined;
        localStorage.setItem("scratchtools-nicknames", JSON.stringify(data));
        window.location.href = window.location.href
      };
      el.appendChild(span);
    }
  },
  "set-nickname",
  false
);

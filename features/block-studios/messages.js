var storage = {};

storage.setItem = function (name, value) {
  return localStorage.setItem(name, JSON.stringify(value));
};

storage.getItem = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

ScratchTools.waitForElements(
  ".social-message.mod-studio-activity",
  function (el) {
    if (
      storage
        .getItem("blockedStudios")
        .includes(getStudioId(el.querySelector("a").href))
    ) {
      el.classList.add("ste-blocked-studio");
    }
  },
  "hideCertainActivityMessages",
  false
);

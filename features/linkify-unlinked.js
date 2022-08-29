ScratchTools.waitForElements(".content", () => {
document.querySelectorAll(".content").forEach(el => e.innerText = e.innerText.replaceAll(
  /[^>"'](https?:\/\/[A-Za-z0-9\.-]+\.[a-zA-Z])/ig/* This is a regex to find uris that aren't links*/,
  `<a href=${RegExp['$&']}>${RegExp['$&']}</a>`));
  }
  );

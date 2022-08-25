ScratchTools.waitForElements(".content", () => {
document.querySelectorAll(".content").forEach(el => e.innerText = e.innerText.replaceAll(
  /[^>"'](http|https)?:\/\/turbowarp\.org\/#?[0-9]*\/?(?:editor)?/ig/* This is a regex to find turbowarp uris that aren't links*/,
  `<a href=${RegExp.$&}>${RegExp.$&}</a>`));
  }
  );

if (window.location.href.startsWith("https://scratch.mit.edu/discuss/")) {
  document.querySelectorAll("img").forEach(function (el) {
    var types = {
      smile: "1F600",
      neutral: "1F610",
      sad: "1F61F",
      big_smile: "1F603",
      yikes: "1F62C",
      wink: "1F609",
      hmm: "1F914",
      tongue: "1F61B",
      lol: "1F923",
      mad: "1F621",
      roll: "1F644",
      cool: "1F60E",
    };
    if (el.src.startsWith("https://cdn.scratch.mit.edu/scratchr2/static/__")) {
      Object.keys(types).forEach(function (obj) {
        if (el.src.endsWith(`__/djangobb_forum/img/smilies/${obj}.png`)) {
          el.src =
            "https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/" +
            types[obj].toLowerCase() +
            ".png";
          el.style.width = "15px";
        }
      });
    }
  });
}

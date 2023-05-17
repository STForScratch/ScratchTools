ScratchTools.waitForElements(
  ".media-item-content",
  async function (el) {
    var data = await (
      await fetch(
        `https://unlisted.gantzos.com/iscached/${
          new URL(el.querySelector(".title a").href).pathname.split("/")[2]
        }/`
      )
    ).json();
    if (data.isCached) {
      var img = document.createElement("img");
      img.src = ScratchTools.Resources["unlisted-star"];
      img.className = "scratchtools-unlisted-star";
      img.title = "This project is unlisted.";
      el.querySelector(".title").appendChild(img);
    }
  },
  "show-if-unlisted",
  false
);

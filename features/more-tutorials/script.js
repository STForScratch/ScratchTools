async function postIdeas() {
  var data = await (
    await fetch("https://data.scratchtools.app/tutorials/")
  ).json();
  var parent = await ScratchTools.waitForElement(
    "section.ttt-section > .masonry"
  );
  if (!document.querySelector(".ste-tile")) {
    data.forEach(function (el) {
      var tile = document.createElement("div");
      tile.className = "ttt-tile ste-tile";
      var tutorial = document.createElement("a");
      tutorial.className = "ttt-tile-tutorial";
      tutorial.href = `https://youtube.com/watch?v=${el.id}`;
      tile.appendChild(tutorial);
      var imgDiv = document.createElement("div");
      imgDiv.className = "ttt-tile-image";
      tutorial.appendChild(imgDiv);
      var img = document.createElement("img");
      img.src = `https://img.youtube.com/vi/${el.id}/maxresdefault.jpg`;
      img.className = "ttt-tile-image-img";
      imgDiv.appendChild(img);
      var info = document.createElement("div");
      info.className = "ttt-tile-info";
      tutorial.appendChild(info);
      var h3 = document.createElement("h3");
      h3.className = "ttt-tile-title";
      h3.textContent = el.title;
      info.appendChild(h3);
      var p = document.createElement("p");
      p.className = "ttt-tile-description";
      p.textContent = el.description;
      info.appendChild(p);
      parent.appendChild(tile);
    });
  }
}
postIdeas();

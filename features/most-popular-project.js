async function testStuff() {
  var offset = [];
  var ready = [];
  var titles = [];
  var views = [];
  var ids = [];
  var instructions = [];
  while (ready.length === 0) {
    var response = await fetch(
      "https://api.scratch.mit.edu/users/" +
        Scratch.INIT_DATA.PROFILE.model.username +
        "/projects/?offset=" +
        offset.length * 20
    );
    var data = await response.json();
    if (data.length === 0) {
      ready.push("");
    } else {
      data.forEach(function (project) {
        titles.push(project.title);
        views.push(project.stats.views);
        ids.push(project.id);
        instructions.push(project.instructions);
      });
      offset.push("");
    }
  }
  document
    .querySelector("div#content")
    .insertBefore(
      addBox(
        titles[views.indexOf(maximumViews(views))],
        ids[views.indexOf(maximumViews(views))],
        views[views.indexOf(maximumViews(views))],
        instructions[views.indexOf(maximumViews(views))]
      ),
      document.querySelector("div.box.slider-carousel-container.prevent-select")
    );
}
if (window.location.href.startsWith("https://scratch.mit.edu/users/")) {
  testStuff();
}

function maximumViews(numArray) {
  return Math.max.apply(null, numArray);
}

function addBox(title, id, views, instructions) {
  if (document.querySelector(".ste-most-popular")) return;
  var a = document.createElement("a");
  a.href = `https://scratch.mit.edu/projects/${id}/`;
  var box = document.createElement("div");
  box.className = "box ste-most-popular";
  var boxHead = document.createElement("div");
  boxHead.className = "box-head";
  var boxTitle = document.createElement("h4");
  boxTitle.textContent =
    title + " • Most Popular Project (" + views.toString() + " views)";
  box.appendChild(boxHead);
  a.appendChild(boxTitle);
  boxHead.appendChild(a);
  var boxContent = document.createElement("div");
  boxContent.className = "box-content";
  boxContent.style.padding = "2vw";
  box.appendChild(boxContent);
  var p = document.createElement("p");
  p.style.width = "500px";
  p.style.whiteSpace = "pre-line";
  p.textContent = instructions;
  boxContent.appendChild(p);
  boxTitle.style.color = "#1aa0d8";
  var thumbnail = document.createElement("img");
  thumbnail.style.display = "inline-block";
  thumbnail.src = `https://cdn2.scratch.mit.edu/get_image/project/${id}_480x360.png`;
  thumbnail.className = "lazy image";
  thumbnail.style.display = "block";
  boxContent.appendChild(thumbnail);
  thumbnail.style.width = "300px";
  p.style.textAlign = "left";
  p.style.float = "left";
  p.style.whiteSpace = "pre-line";
  boxContent.style.height = "250px";
  boxContent.style.overflowY = "hidden";
  thumbnail.style.textAlign = "right";
  thumbnail.style.float = "right";
  return box;
}

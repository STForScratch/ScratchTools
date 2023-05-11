var version = chrome.runtime.getManifest().version_name;
document.querySelector("title").textContent = "What's New in v" + version;
document.querySelector("h1").textContent = "What's New in v" + version;

async function getChanges() {
  var newFeatures = await (await fetch("/features/features.json")).json();
  for (var i in newFeatures) {
    var feature = newFeatures[i];
    if (feature.versionAdded === "v" + version) {
      var div = document.createElement("div");
      var h2 = document.createElement("h2");
      if (feature.version === 2) {
        var data = await (
          await fetch(`/features/${feature.id}/data.json`)
        ).json();
        h2.textContent = data.title;
      } else {
        h2.textContent = data.title;
      }
      div.appendChild(h2);
      var p = document.createElement("p");
      p.textContent = data?.description || feature.description;
      div.appendChild(p);
      var design = document.createElement("div");
      design.className = "colorful-design";
      div.prepend(design);
      if (i > 2) {
        div.className = "wide-feature feature";
        document.querySelector(".new-features-full").prepend(div);
      } else {
        div.className = "feature";
        document.querySelector(".new-features").prepend(div);
      }
    }
  }
  const changes = await (await fetch("./changes.json")).json();
  if (changes.enhanced.length) {
    var h3 = document.createElement("h2");
    h3.textContent = "Enhancements";
    document.querySelector(".better-bugs .left").appendChild(h3);
    changes.enhanced.forEach(function (el) {
      var div = document.createElement("div");
      div.textContent = el;
      div.className = "better-item";
      document.querySelector(".better-bugs .left").appendChild(div);
    });
  }
  if (changes.fixed.length) {
    var h3 = document.createElement("h2");
    h3.textContent = "Bug Fixes";
    document.querySelector(".better-bugs .right").appendChild(h3);
    changes.fixed.forEach(function (el) {
      var div = document.createElement("div");
      div.textContent = el;
      div.className = "bug-item";
      document.querySelector(".better-bugs .right").appendChild(div);
    });
  }
}
getChanges();

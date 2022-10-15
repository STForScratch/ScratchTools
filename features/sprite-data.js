function getSpriteData() {
  try {
    var currentSpriteName = [];
    document.querySelectorAll("div").forEach(function (el) {
      if (el.className.includes("sprite-selector-item_is-selected")) {
        el.querySelectorAll("div").forEach(function (el) {
          if (el.className.includes("sprite-selector-item_sprite-name_")) {
            currentSpriteName.push(el.textContent);
          }
        });
      }
    });
    if (currentSpriteName.length !== 0) {
      var currentSpriteName = currentSpriteName[0];
      try {
        document.querySelector("#react-tabs-0 > span").textContent = `Code (${
          Object.keys(
            vm.runtime.getSpriteTargetByName(currentSpriteName).blocks._blocks
          ).length
        })`;
      } catch (err) {}
      try {
        document.querySelector(
          "#react-tabs-2 > span"
        ).textContent = `Costumes (${
          vm.runtime.getSpriteTargetByName(currentSpriteName).getCostumes()
            .length
        })`;
      } catch (err) {}
      try {
        document.querySelector("#react-tabs-4 > span").textContent = `Sounds (${
          vm.runtime.getSpriteTargetByName(currentSpriteName).getSounds().length
        })`;
      } catch (err) {}
    } else {
      document.querySelector("#react-tabs-0 > span").textContent = `Code`;
      document.querySelector("#react-tabs-2 > span").textContent = `Backdrops`;
      document.querySelector("#react-tabs-4 > span").textContent = `Sounds`;
    }
  } catch (err) {}
  setTimeout(getSpriteData, 200);
}
if (
  window.location.href.includes("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  getSpriteData();
}

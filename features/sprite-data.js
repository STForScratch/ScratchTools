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
        document.querySelectorAll("li[id^=react-tabs]")[0].textContent = `Code (${
          Object.keys(
            vm.runtime.getSpriteTargetByName(currentSpriteName).blocks._blocks
          ).length
        })`;
      } catch (err) {}
      try {
        document.querySelectorAll("li[id^=react-tabs]")[1].textContent = `Costumes (${
          vm.runtime.getSpriteTargetByName(currentSpriteName).getCostumes()
            .length
        })`;
      } catch (err) {}
      try {
        document.querySelectorAll("li[id^=react-tabs]")[2].textContent = `Sounds (${
          vm.runtime.getSpriteTargetByName(currentSpriteName).getSounds().length
        })`;
      } catch (err) {}
    } else {
      document.querySelectorAll("li[id^=react-tabs]")[0].textContent = `Code`;
      document.querySelectorAll("li[id^=react-tabs]")[1].textContent = `Backdrops`;
      document.querySelectorAll("li[id^=react-tabs]")[2].textContent = `Sounds`;
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

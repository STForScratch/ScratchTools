if (
  window.location.href.includes("/editor") &&
  window.location.href.startsWith("https://scratch.mit.edu/projects/")
) {
  function setStuff() {
    try {
      var base;
      document.querySelectorAll("div").forEach(function (el) {
        if (
          el.className.startsWith("sprite-selector_items-wrapper_") &&
          el.className.includes(" box_box_")
        ) {
          base = el;
        }
      });
      var children = [];
      base.querySelectorAll("div").forEach(function (el) {
        if (el.className.startsWith("sprite-selector_sprite-wrapper_")) {
          children.push(el);
        }
      });
      children.forEach(function (el) {
        el.style.width = "100%";
        el.firstChild.style.width = "100%";
        el.style.maxWidth = "100%";
        el.firstChild.style.textAlign = "left";
        var title;
        el.querySelectorAll("div").forEach(function (element) {
          if (
            element.className.startsWith("sprite-selector-item_sprite-name_")
          ) {
            title = element;
          }
        });
        if (!el.className.includes(" scratchtoolswide")) {
          title.id = title.textContent;
          el.className = el.className + " scratchtoolswide";
        }
        title.textContent =
          title.id +
          " (" +
          Object.keys(
            ScratchTools.Scratch.vm.runtime.getSpriteTargetByName(title.id)
              .blocks._blocks
          ).length +
          " blocks) (" +
          ScratchTools.Scratch.vm.runtime
            .getSpriteTargetByName(title.id)
            .x.toString() +
          ", " +
          ScratchTools.Scratch.vm.runtime.getSpriteTargetByName(title.id).y +
          ")";
      });
    } catch (err) {}
  }
  setInterval(setStuff, 50);
}

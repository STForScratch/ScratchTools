ScratchTools.waitForElements(
  ".project-textlabel",
  function (el) {
    var editable = document.querySelector(".project-description-edit")
      ? true
      : false;
    if (editable && !el.querySelector(".ste-live-character-count")) {
      var textarea = el.parentNode.querySelector("textarea");
      var span = document.createElement("span");
      span.textContent = `${(
        5000 - textarea.value.length
      ).toString()} characters left`;
      if (5000 - textarea.value.length <= 500) {
        span.classList.add("ste-lcc-low");
      }
      span.classList.add("ste-live-character-count");
      el.appendChild(span);
      textarea.addEventListener("input", function () {
        span.textContent = `${(
          5000 - textarea.value.length
        ).toString()} characters left`;
        if (5000 - textarea.value.length <= 500) {
          span.classList.add("ste-lcc-low");
        } else {
          span.classList.remove("ste-lcc-low");
        }
      });
    }
  },
  "liveCharacterCount",
  false
);

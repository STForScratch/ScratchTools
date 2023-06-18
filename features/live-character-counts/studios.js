ScratchTools.waitForElements(
  "textarea.studio-description",
  function (textarea) {
    if (!document.querySelector(".ste-studio-charcount")) {
      var span = document.createElement("span");
      span.classList.add("ste-studio-charcount");
      span.textContent = `${(
        5000 - textarea.value.length
      ).toString()} characters left`;
      if (5000 - textarea.value.length <= 500) {
        span.classList.add("ste-lcc-low");
      }
      textarea.parentNode.appendChild(span);
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
  "liveCharacterCountStudioDescription",
  false
);

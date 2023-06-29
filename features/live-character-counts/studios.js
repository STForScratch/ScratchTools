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

ScratchTools.waitForElements("textarea.inplace-textarea.studio-title", function(textarea) {
  if (!textarea.parentNode.querySelector(".ste-stu-title-count")) {
    var span = document.createElement("span");
    span.classList.add("ste-stu-title-count");
    span.textContent = `${(52 - textarea.value.length).toString()} characters left`;
    if (52 - textarea.value.length <= 6) {
      span.classList.add("ste-lcc-low");
    }
    textarea.parentNode.appendChild(span);
    textarea.addEventListener("input", function () {
      span.textContent = `${(
        52 - textarea.value.length
      ).toString()} characters left`;
      if (52 - textarea.value.length <= 6) {
        span.classList.add("ste-lcc-low");
      } else {
        span.classList.remove("ste-lcc-low");
      }
    });
  }
}, "liveCharacterCountStudioTitle", false)
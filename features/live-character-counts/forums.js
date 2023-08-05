if (!document.querySelector(".ste-forum-char")) {
  var textarea = document.querySelector("div#markItUpId_signature textarea");

  var span = document.createElement("span");
  span.classList.add("ste-forum-char");
  span.textContent = `${(
    2000 - textarea.value.length
  ).toString()} characters left.`;
  if (2000 - textarea.value.length <= 250) {
    span.classList.add("ste-lcc-low");
  }

  textarea.addEventListener("input", function () {
    span.textContent = `${(
      2000 - textarea.value.length
    ).toString()} characters left.`;
    if (2000 - textarea.value.length <= 250) {
      span.classList.add("ste-lcc-low");
    } else {
      span.classList.remove("ste-lcc-low");
    }
  });

  ScratchTools.appendToSharedSpace({
    space: "forumToolbarTools",
    element: span,
    order: 0,
  });
}

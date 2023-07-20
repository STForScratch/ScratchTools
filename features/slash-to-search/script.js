document.body.addEventListener("keyup", function (e) {
  if (
    e.which === 191 &&
    document.activeElement === document.body &&
    !ScratchTools.Scratch?.scratchGui()?.vmStatus?.running
  ) {
    document.querySelector("li.search input")?.focus();
    document.querySelector("input#search-input")?.focus()
  }
});

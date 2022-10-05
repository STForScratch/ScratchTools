function unbold() {
  if (window.location.href.includes("https://scratch.mit.edu/")) {
    document.querySelectorAll("*").forEach(function (el) {
      el.style.fontWeight = "normal";
    });
    window.setTimeout(unbold, 100);
  }
}
unbold();

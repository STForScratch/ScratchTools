var urlParams = new URLSearchParams(window.location.search);
if (
  !urlParams.get("mode") &&
  window.location.href
    .toLowerCase()
    .startsWith("https://scratch.mit.edu/search/projects")
) {
  window.location.href = window.location.href + "&mode=trending";
}

export default async function({ feature, console }) {
  let ELEMENTS = [];
  let type = feature.settings.get("custom-explore-tab") || "Animations";

  ScratchTools.waitForElements(
    "a[href='/explore/projects/'], a[href='/explore/projects'], a[href='/explore/projects/all'], a[href='/explore/projects/all/']",
    (a) => {
      if (a.parentElement.className.includes("sub-nav categories")) return;
      ELEMENTS.push(a);
      a.href = feature.self.enabled ? `/explore/projects/${type.toLowerCase()}/` : "/explore/projects/";
    }
  );

  function updateRedirects() {
    for (const a of ELEMENTS) {
      a.href = feature.self.enabled ? `/explore/projects/${type.toLowerCase()}/` : "/explore/projects/";
    }
  }

  document.addEventListener("click", e => {
    if (!feature.self.enabled) return;
    let el = e.target;
    while (el && el !== document) {
      if (
        el.tagName === "A" &&
        (
          el.getAttribute("href") === "/explore/projects/" ||
          el.getAttribute("href") === "/explore/projects" ||
          el.getAttribute("href") === "/explore/projects/all" ||
          el.getAttribute("href") === "/explore/projects/all/"
        )
      ) {
        e.preventDefault();
        window.location.href = `/explore/projects/${type.toLowerCase()}/`;
        break;
      }
      el = el.parentElement;
    }
  });

  feature.addEventListener("disabled", updateRedirects);
  feature.addEventListener("enabled", updateRedirects);
  feature.settings.addEventListener("changed", ({ value }) => {
    type = value;
    updateRedirects();
  });
}

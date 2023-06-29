ScratchTools.waitForElements(
  "a[href*='https://scratch.mit.edu/projects/'], a[href^='/projects/']",
  async function (a) {
    if (
      !a.parentNode?.className.includes("title") &&
      a.textContent.toLowerCase().replaceAll(" ", "").replaceAll("\n", "") ===
        a.href.toLowerCase().replaceAll(" ", "").replaceAll("\n", "")
    ) {
      var data = await (
        await fetch(
          `https://api.scratch.mit.edu/projects/${
            new URL(
              a.href.toLowerCase().replaceAll(" ", "").replaceAll("\n", "")
            ).pathname.split("/")[2]
          }/`
        )
      ).json();
      if (data?.title) {
        a.textContent = data.title;
      }
    }
  },
  "project-links",
  false
);

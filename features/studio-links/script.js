ScratchTools.waitForElements(
    "a[href*='https://scratch.mit.edu/studios/'], a[href^='/studios/']",
    async function (a) {
      if (
        !a.parentNode?.className.includes("title") &&
        a.textContent.toLowerCase().replaceAll(" ", "").replaceAll("\n", "") ===
          a.href.toLowerCase().replaceAll(" ", "").replaceAll("\n", "")
      ) {
        var data = await (
          await fetch(
            `https://api.scratch.mit.edu/studios/${
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
    "studio-links",
    false
  );
  
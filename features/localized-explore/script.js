export default async function ({ feature, console }) {
  let myCountry = (
    await (
      await fetch(
        `https://api.scratch.mit.edu/users/${feature.redux
          .getState()
          .session.session.user.username.replace("*", "")}/`
      )
    ).json()
  ).profile.country;

  ScratchTools.waitForElements("div.thumbnail.project", detectCountry);

  async function detectCountry(element) {
    let author = element.querySelector(".thumbnail-creator a");

    let data = await (
      await fetch(
        `https://api.scratch.mit.edu/users/${author.textContent
          .replaceAll("\n", "")
          .replace("*", "")
          .replaceAll(" ", "")}/`
      )
    ).json();

    if (data.profile.country !== myCountry) {
      element.classList.add("ste-outside-country");
      if (feature.settings.get("hide-completely")) {
        element.classList.add("ste-country-hide");
      }
    } else {
      element.classList.add("ste-inside-country");
    }
  }

  feature.settings.addEventListener("changed", function ({ key, value }) {
    if (key === "hide-completely") {
      console.log(value);
      if (value) {
        document
          .querySelectorAll(".ste-outside-country")
          .forEach(function (el) {
            el.classList.add("ste-country-hide");
          });
      } else {
        document.querySelectorAll(".ste-country-hide").forEach(function (el) {
          el.classList.remove("ste-country-hide");
        });
      }
    }
  });

  feature.addEventListener("enabled", function() {
    ScratchTools.waitForElements("div.thumbnail.project", detectCountry);
  })
}

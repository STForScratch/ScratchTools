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

  async function getLanguage(country) {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (data && data[0] && data[0].languages) {
        return Object.values(data[0].languages)[0];
      }
      return null;
    } catch {
      return null;
    }
  }

  const myLanguage = await getLanguage(myCountry);

  ScratchTools.waitForElements("div.thumbnail.project", detectLanguage);

  async function detectLanguage(element) {
    let author = element.querySelector(".thumbnail-creator a");

    let data = await (
      await fetch(
        `https://api.scratch.mit.edu/users/${author.textContent
          .replaceAll("\n", "")
          .replace("*", "")
          .replaceAll(" ", "")}/`
      )
    ).json();

    const authorLanguage = await getLanguage(data.profile.country);

    if (authorLanguage !== myLanguage) {
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
    ScratchTools.waitForElements("div.thumbnail.project", detectLanguage);
  })
}

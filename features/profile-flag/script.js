export default async function ({ feature }) {
  const locationElement = await ScratchTools.waitForElement(
    "p.profile-details > span.location"
  );

  const locationText = locationElement.textContent.trim();
  const countryFlag = getCountryFlag(locationText);
  if (!countryFlag) return;

  const imgElement = new Image();
  imgElement.src = countryFlag;

  ScratchTools.appendToSharedSpace({
    space: "afterProfileCountry",
    element: imgElement,
    order: -1,
  });

  feature.self.hideOnDisable(locationHolder);

  function getCountryFlag(locationText) {
    const GithubUrl = "https://raw.githubusercontent.com/STForScratch/data/main/flags/";
    const countryName = locationText.toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(",", "")
      .replaceAll(".", "") + ".svg";
    return GithubUrl + countryName;
  }
}
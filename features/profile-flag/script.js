export default async function ({ feature }) {
  const locationElement = await ScratchTools.waitForElement(
    "p.profile-details > span.location"
  );

  const locationText = locationElement.textContent.trim();
  const countryFlag = getCountryFlag(locationText);
  if (!countryFlag) return;

  const locationHolder = document.createElement("div");
  locationHolder.className = "location-holder";

  const imgElement = new Image();
  imgElement.src = countryFlag;

  locationHolder.textContent = locationText; 

  locationHolder.appendChild(imgElement);

  feature.self.hideOnDisable(locationHolder);

  locationElement.parentNode.replaceChild(locationHolder, locationElement);

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

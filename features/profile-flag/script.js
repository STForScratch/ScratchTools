export default async function ({ feature }) {
  const locationHolder = await ScratchTools.waitForElement("p.profile-details > span.location");
  if (!locationHolder) return;

  const locationText = locationHolder.childNodes[0]?.nodeValue?.trim();
  if (!locationText) return;

  const flagUrl = getFlagUrl(locationText);
  if (!flagUrl) return;

  const imgElement = new Image();
  imgElement.src = flagUrl;

  ScratchTools.appendToSharedSpace({
    space: "afterProfileCountry",
    element: imgElement,
    order: -1
  });

  feature.self.hideOnDisable(locationHolder);

  function getFlagUrl(locationText) {
    const GithubUrl = "https://raw.githubusercontent.com/STForScratch/data/main/flags/";
    return GithubUrl + locationText.toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(",", "")
      .replaceAll(".", "") + ".svg";
  }
}

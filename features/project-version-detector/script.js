export default async function ({ feature, console }) {
  ScratchTools.waitForElements("div.share-date", function (shareDateDiv) {
    const shareDateSpan = shareDateDiv.querySelector("span");

    if (shareDateSpan) {
      const shareDate = shareDateSpan.textContent.trim();
      const shareDateObject = new Date(shareDate);

      const versionDates = [
        { version: "Scratch 1.0", date: new Date("May 15, 2007") },
        { version: "Scratch 1.1", date: new Date("May 26, 2007") },
        { version: "Scratch 1.2", date: new Date("December 2, 2007") },
        { version: "Scratch 1.3", date: new Date("September 2, 2008") },
        { version: "Scratch 1.3.1", date: new Date("November 24, 2008") },
        { version: "Scratch 1.4", date: new Date("July 2, 2009") },
        { version: "Scratch 2.0", date: new Date("May 9, 2013") },
        { version: "Scratch 3.0", date: new Date("January 2, 2019") },
      ];

      let detectedVersion = null;

      for (const versionInfo of versionDates) {
        if (shareDateObject >= versionInfo.date) {
          detectedVersion = versionInfo.version;
        } else {
          break;
        }
      }

      const additionalInfoSpan = document.createElement("span");
      additionalInfoSpan.textContent = " • Shared in " + detectedVersion;

      shareDateSpan.parentNode.insertBefore(
        additionalInfoSpan,
        shareDateSpan.nextSibling
      );

      feature.self.hideOnDisable(additionalInfoSpan)
    }
  });
}

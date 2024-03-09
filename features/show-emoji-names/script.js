export default async function ({ feature, console }) {
  ScratchTools.waitForElements(".comments img.easter-egg", function (img) {
    img.title = capitalize(
      img.src.split("/")[8].split(".")[0].replaceAll("-", " ")
    );
  });

  ScratchTools.waitForElements("span.emoji-text img.emoji", function (img) {
    img.title = capitalize(
      img.src.split("/")[5].split(".")[0].replaceAll("-", " ")
    );
  });

  function capitalize(string) {
    return string
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
  }
}

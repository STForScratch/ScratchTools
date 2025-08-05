export default async function ({ feature, console }) {
  let allowCleanUp = true;

  function cleanUp() {
    if (!allowCleanUp) return;
    let titles = [];
    document.querySelectorAll("div.thumbnail.project").forEach((el) => {
      const title = el
        .querySelector("div.thumbnail-title")
        .firstChild.textContent.toLowerCase();
      if (
        title.includes("part ") ||
        title.includes("#trending") ||
        title.includes("test") ||
        title.includes("gf") ||
        title.includes("bf") ||
        title.includes("girlfriend") ||
        title.includes("boyfriend") ||
        title.includes("doors") ||
        title.includes("scp") ||
        title.includes("speedrun platformer") ||
        title.includes("cave platformer") ||
        title.includes("platformer 1") ||
        title.includes("platformer 2") ||
        title.includes("platformer 3") ||
        title.includes("friday night") ||
        title.includes("fnf") ||
        title.includes("funk") ||
        title.includes("vs") ||
        title.includes("Add yourself") ||
        title.includes("ays") ||
        title.includes("your oc") ||
        title.includes("scratch's smooth saturday") ||
        title.includes("dave") ||
        title.includes("bambi") ||
        title.includes("sarvente") ||
        title.includes("singing") ||
        title.includes("scratched out") ||
        title.includes("ost") ||
        title.includes("sprunki") ||
        title.includes("incredibox") ||
        title.includes("skibidi") ||
        title.includes("phase ") ||
        title.includes("+)") ||
        (title.includes("digital") && title.includes("circus")) ||
        (title.includes("dark") && title.includes("platformer")) ||
        (title.includes("generic") && title.includes("platformer")) ||
        (title.includes("jungle") && title.includes("platformer")) ||
        (title.includes("night") && title.includes("platformer")) ||
        (title.includes("alphabet") && title.includes("lore")) ||
        countInstances(title, "#") > 3
      )
        el.style.display = "none";

      titles.forEach(function (el2) {
        if (similarity(el2, title) > 0.5) {
          if (el !== undefined && el !== null) {
            el.style.display = "none";
          }
        }
      });
      titles.push(title);
    });

    function countInstances(string, word) {
      return string.split(word).length - 1;
    }

    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue =
                  Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }

    function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (
        (longerLength - editDistance(longer, shorter)) /
        parseFloat(longerLength)
      );
    }
  }

  cleanUp();
  document
    .querySelector("#projectBox button")
    .addEventListener("click", () => cleanUp());

  ScratchTools.setDisable("anti-generic", () => {
    allowCleanUp = false;
    document.querySelectorAll("div.thumbnail.project").forEach((el) => {
      el.style.display = "block";
    });
  });
}

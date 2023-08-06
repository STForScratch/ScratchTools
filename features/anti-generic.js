function cleanUp() {
  if (allowCleanUp) {
    var titles = [];
    document.querySelectorAll("div.thumbnail.project").forEach(function (el) {
      var title = el
        .querySelector("div.thumbnail-title")
        .firstChild.textContent.toLowerCase();
      if (title.includes("part ")) {
        el.style.display = "none";
      }
      if (title.includes("#trending")) {
        el.style.display = "none";
      }
      if (title.includes("test")) {
        el.style.display = "none";
      }
      if (title.includes("gf")) {
        el.style.display = "none";
      }
      if (title.includes("bf")) {
        el.style.display = "none";
      }
      if (title.includes("girlfriend")) {
        el.style.display = "none";
      }
      if (title.includes("boyfriend")) {
        
        el.style.display = "none";
      }
      if (title.includes("doors")) {
        
        el.style.display = "none";
      }
      if (title.includes("scp")) {
        
        el.style.display = "none";
      }
      if (title.includes("speedrun platformer")) {
        
        el.style.display = "none";
      }
      if (title.includes("cave platformer")) {
        
        el.style.display = "none";
      }
      if (title.includes("dark platformer")) {
        
        el.style.display = "none";
      }
      if (title.includes("jungle platformer")) {
        
        el.style.display = "none";
      }
      if (title.includes("platformer 1")) {
        
        el.style.display = "none";
      }
      if (title.includes("platformer 2")) {
        
        el.style.display = "none";
      }
      if (title.includes("platformer 3")) {
        
        el.style.display = "none";
      }
      if (title.includes("fnf")) {
        
        el.style.display = "none";
      }
      if (title.includes("funkin")) {
        
        el.style.display = "none";
      }
      if (title.includes("vs")) {
        
        el.style.display = "none";
      }
      if (title.includes("Add yourself")) {
        
        el.style.display = "none";
      }
      if (title.includes("your oc")) {
        
        el.style.display = "none";
      }
      if (title.includes("scratch's smooth saturday")) {
        
        el.style.display = "none";
      }
      if (title.includes("dave")) {
        
        el.style.display = "none";
      }
      if (title.includes("bambi")) {
        
        el.style.display = "none";
      }
      if (title.includes("fnf vs")) {
        
        el.style.display = "none";
      }
      if (title.includes("friday night funkin")) {
        
        el.style.display = "none";
      }
      if (title.includes("funk")) {
        
        el.style.display = "none";
      }
      if (title.includes("sarvente")) {
        
        el.style.display = "none";
      }
      if (title.includes("singing")) {
        
        el.style.display = "none";
      }
      if (title.includes("ays")) {
        
        el.style.display = "none";
      }
      if (title.includes("ays/oc")) {
        
        el.style.display = "none";
      }
      if (title.includes("friday night")) {
        
        el.style.display = "none";
      }
      if (title.includes("scratched out")) {
        
        el.style.display = "none";
      }
      if (title.includes("dave and bambi")) {
        
        el.style.display = "none";
      }
      if (title.includes("dark") && title.includes("platformer")) {
        
        el.style.display = "none";
      }
      if (title.includes("friday night") && title.includes("funkin")) {
        
        el.style.display = "none";
      }
      if (title.includes("dave") && title.includes("bambi")) {
        
        el.style.display = "none";
      }
      if (title.includes("fnf") && title.includes("vs")) {
        
        el.style.display = "none";
      }
      if (title.includes("funkin") && title.includes("vs")) {
        
        el.style.display = "none";
      }
      if (title.includes("generic") && title.includes("platformer")) {
        
        el.style.display = "none";
      }
      if (title.includes("jungle") && title.includes("platformer")) {
        
        el.style.display = "none";
      }
      if (title.includes("night") && title.includes("platformer")) {
        
        el.style.display = "none";
      }
      if (title.includes("OST")) {
        
        el.style.display = "none";
      }
      if (countInstances(title, "#") > 3) {
        
        el.style.display = "none";
      }
      if (title.includes("alphabet") && title.includes("lore")) {
        
        el.style.display = "none";
      }
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
    if (window.location.href.includes("https://scratch.mit.edu/explore/")) {
      setTimeout(cleanUp, 200);
    }
  }
}
if (window.location.href.includes("https://scratch.mit.edu/explore/")) {
  var allowCleanUp = true;
  cleanUp();
  ScratchTools.setDisable("anti-generic", function () {
    allowCleanUp = false;
    document.querySelectorAll("div.thumbnail.project").forEach(function (el) {
      el.style.display = null;
    });
  });
}

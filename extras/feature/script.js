var feature = new URLSearchParams(window.location.search).get("feature");
if (feature) {
  getFeature(feature);
} else {
  window.location.href = "https://scratch.mit.edu";
}

async function getFeature(id) {
  var data = await (await fetch("/features/features.json")).json();
  var features = (await chrome.storage.sync.get("features")).features || ""
  data.forEach(async function (feature) {
    if ((feature.id || feature.file) === id) {
      if (feature.version === 2) {
        var newData = await (
          await fetch(`/features/${feature.id}/data.json`)
        ).json();
        newData.id = feature.id;
        newData.version = feature.version;
        feature = newData;
        document.querySelector("h1").textContent = feature.title;
        document.querySelector("p").textContent = feature.description;
      } else {
        document.querySelector("h1").textContent = feature.title;
        document.querySelector("p").textContent = feature.description;
      }
      feature.id = feature.file || feature.id
      document.querySelector("title").textContent = feature.title
      var span = document.querySelector(".credits")
      feature.credits.forEach(function (credit, i) {
        var a = document.createElement("a");
        if (feature.version === 2) {
          a.textContent = credit.username;
          a.href = credit.url;
        } else {
          a.textContent = credit;
          a.href = feature.urls[i];
        }
        if (feature.credits.length !== (i+1)) {
            a.textContent = a.textContent+", "
        }
        span.appendChild(a);
      });
      document.querySelector(".try").dataset.id = feature.id
      if (features.includes(feature.id)) {
        document.querySelector(".try").style.display = null
        document.querySelector(".try").textContent = "Disable"
        document.querySelector(".try").onclick = change
      } else {
        document.querySelector(".try").style.display = null
        document.querySelector(".try").textContent = "Try it Out"
        document.querySelector(".try").onclick = change
      }
      if (feature.options) {
        for (var optionPlace in feature.options) {
          var option = feature.options[optionPlace];
          var input = document.createElement("input");
          input.dataset.id = option.id;
          input.placeholder = option.name;
          input.type = ["text", "checkbox", "number", "color"][option.type || 0];
          var optionData = (await chrome.storage.sync.get(option.id))[option.id];
          input.value = optionData || "";
          document.querySelector(".options").appendChild(input);
          input.addEventListener("input", async function () {
            var saveData = {};
            saveData[this.dataset.id] = this.value;
            await chrome.storage.sync.set(saveData);
          });
        }
      }
      async function change() {
        var features = (await chrome.storage.sync.get("features")).features || ""
        if (features.includes(feature.id)) {
            document.querySelector(".try").textContent = "Enable"
            await chrome.storage.sync.set({
                features: features.replaceAll(feature.id, "")
            })
        } else {
            document.querySelector(".try").textContent = "Disable"
            await chrome.storage.sync.set({
                features: features+"."+feature.id
            })
        }
    }
    }
  });
}

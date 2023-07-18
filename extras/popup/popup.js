var defaultThemes = [
  {
    data: {
      background: "#ffffff",
      box: "#eeeeee",
      feature: "#eeeeee75",
      gradient: ["#ff8c2d", "#ffb740"],
      input: "#e4e4e4",
      primary: "#000000",
      scrollbar: "#c2bfbf",
      scrollbar_active: "#b2afaf",
      searchbar: "#eeeeee",
      secondary: "#00000077",
      slider: "#cccccc",
      theme: "#FF9F00",
    },
    id: "64b36b38785a4110e937ac30",
    title: "Classic Light",
    active: true,
    theme: "light",
  },
  {
    data: {
      background: "#3f3f3f",
      box: "#eeeeee",
      feature: "#343434",
      gradient: ["#ff8c2d", "#ffb740"],
      input: "#545454",
      primary: "#ffffff",
      scrollbar: "#797979",
      scrollbar_active: "#656565",
      searchbar: "#ffffff17",
      secondary: "#ffffff77",
      slider: "#4b4b4b",
      theme: "#FF9F00",
    },
    id: "64b36b38785a4110e937ac31",
    title: "Classic Dark",
    theme: "dark",
  },
];

if (document.querySelector(".sparkle")) {
  var sparkle = document.querySelector(".sparkle");
  sparkle.addEventListener("mouseover", function () {
    if (!sparkle.parentNode.querySelector(".tip")) {
      var span = document.createElement("span");
      span.textContent =
        "These features are recommended for you based on other features you have enabled.";
      span.className = "tip";
      sparkle.parentNode.appendChild(span);
    }
  });
  sparkle.addEventListener("mouseout", function () {
    if (sparkle.parentNode.querySelector(".tip")) {
      sparkle.parentNode.querySelector(".tip").remove();
    }
  });
}

async function getSuggestions() {
  var enabled = (await chrome.storage.sync.get("features"))?.features || "";
  var data = await (await fetch("/features/features.json")).json();
  var suggested = [];
  for (var i in data) {
    var feature = data[i];
    if (feature.version === 2) {
      if (enabled.includes(feature.id)) {
        var featureData = await (
          await fetch(`/features/${feature.id}/data.json`)
        ).json();
        if (featureData.similar) {
          for (var i2 in featureData.similar) {
            if (
              !suggested.includes(featureData.similar[i2]) &&
              !enabled.includes(featureData.similar[i2])
            ) {
              suggested.push(featureData.similar[i2]);
            }
          }
        }
      }
    }
  }
  if (suggested.length) {
    document.querySelector(".suggested").style.display = null;
    suggested.forEach(async function (suggestion) {
      var data = await (
        await fetch(`/features/${suggestion}/data.json`)
      ).json();
      var div = document.createElement("div");
      div.className = "feature-suggestion";
      var h3 = document.createElement("h3");
      h3.textContent = data.title;
      var p = document.createElement("p");
      p.textContent = data.description;
      var span = document.createElement("span");
      span.textContent = "Click to view feature.";
      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(span);
      document.querySelector(".suggested-features").appendChild(div);
      div.addEventListener("click", function () {
        var feature = document.querySelector(
          `div.feature[data-id="${suggestion}"]`
        );
        feature.style.display = null;
        feature.classList.add("scrolled");
        feature.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        setTimeout(function () {
          feature.classList.remove("scrolled");
        }, 2000);
      });
    });
  }
}
if (document.querySelector(".suggested")) {
  getSuggestions();
}

async function getEnabledFeatureCount() {
  var features = await (await fetch("/features/features.json")).json();
  var count = 0;
  var storageData = (await chrome.storage.sync.get("features"))?.features || "";
  features.forEach(function (feature) {
    if (storageData.includes(feature.file || feature.id)) {
      count = count + 1;
    }
  });
  return count;
}

if (document.querySelector(".feedback-btn")) {
  document
    .querySelector(".feedback-btn")
    .addEventListener("click", function () {
      chrome.tabs.create({
        url: "https://scratch.mit.edu/scratchtools/feedback/auth/",
      });
    });
}

if (document.querySelector(".more-settings-btn")) {
  var moreSettingsBtn = document.querySelector(".more-settings-btn");
  moreSettingsBtn.addEventListener("click", async function () {
    var components = [
      {
        content:
          "Version: " +
          chrome.runtime.getManifest().version_name +
          "\nFeatures enabled: " +
          (await getEnabledFeatureCount()).toString() +
          "\nLanguage: " +
          chrome.i18n.getUILanguage(),
        type: "code",
      },
      {
        content: "Copy Feature Codes",
        type: "button",
        callback: returnFeatureCode,
        additonalClassNames: ["secondary-btn"],
      },
    ];
    if (chrome.runtime.getManifest().version_name.endsWith("-beta")) {
      components.push({
        content: "Report a Bug",
        type: "button",
        callback: function () {
          chrome.tabs.create({
            url: "https://github.com/STForScratch/ScratchTools/issues/new?assignees=&labels=bug&projects=&template=--bug.yml",
          });
        },
        additonalClassNames: ["secondary-btn"],
      });
    }
    if (!chrome.runtime.getManifest().version_name.endsWith("-beta")) {
      await chrome.runtime.sendMessage(
        { text: "get-logged-in-user" },
        async function (response) {}
      );
    }
    ScratchTools.modals.create({
      title: "More settings",
      description:
        "These are some additional settings that you can use to change other aspects of ScratchTools.",
      components: components,
    });
  });
}

chrome.runtime.onMessage.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  if (msg?.user?.username) {
    var data = await (
      await fetch(`https://data.scratchtools.app/isbeta/${msg.user.username}/`)
    ).json();
    if (data.beta && document.querySelector(".st-modal")) {
      var btn = document.createElement("button");
      btn.textContent = "Install Beta";
      btn.className = "secondary-btn install-beta";
      btn.addEventListener("click", function () {
        document.querySelector(".st-modal-blur-bg")?.remove();
        ScratchTools.modals.create({
          title: "Beta installation",
          description:
            "You are currently enrolled in the ScratchTools beta program. Are you sure you would like to install the ScratchTools beta?",
          components: [
            {
              content: "Install",
              type: "button",
              callback: function () {
                chrome.tabs.create({
                  url: "https://github.com/STForScratch/ScratchTools/zipball/master",
                });
              },
              additonalClassNames: ["secondary-btn"],
            },
          ],
        });
      });
      if (!document.querySelector(".st-modal").querySelector(".install-beta")) {
        document
          .querySelector(".st-modal")
          .insertBefore(btn, document.querySelector(".st-modal").lastChild);
      }
    }
  }
});

function setBetaTheme() {
  if (document.querySelector("link[rel=icon]")) {
    document.querySelector("link[rel=icon]").href =
      "/extras/icons/beta/beta.svg";
  }
  const betaCSS = document.createElement("link");
  betaCSS.setAttribute("rel", "stylesheet");
  betaCSS.setAttribute("href", "/extras/styles/beta.css");
  document.head.appendChild(betaCSS);
  if (document.head.id == "Popup") {
    document.getElementById("minilogo").src = "/extras/icons/beta/beta.svg";
    document.getElementById("popupnote").innerHTML =
      "Welcome to the beta verison of ScratchTools! This version is not stable and may contain bugs. Please report any bugs you find <a href='https://github.com/STForScratch/ScratchTools/issues' target='_blank'>here</a>.";
  }

  async function checkCurrentVersion() {
    var newest = (
      await (
        await fetch(
          "https://raw.githubusercontent.com/STForScratch/ScratchTools/beta/changelog/beta.json?nocache=" +
            Date.now().toString()
        )
      ).json()
    ).version;
    var current = (await (await fetch("/changelog/beta.json")).json()).version;
    if (newest !== current) {
      var lastUpdatedFor = await chrome.storage.sync.get(
        "lastBetaNotification"
      );
      if (
        lastUpdatedFor?.lastBetaNotification?.version !==
          chrome.runtime.getManifest().version_name ||
        lastUpdatedFor?.lastBetaNotification?.beta !== current
      ) {
        await chrome.storage.sync.set({
          lastBetaNotification: {
            beta: current,
            version: chrome.runtime.getManifest().version_name,
          },
        });
        alert(
          "There is currently a newer version of the ScratchTools Beta available."
        );
      }
      if (document.querySelector("#popupnote")) {
        document.querySelector("#popupnote").textContent =
          "There is currently a newer version of the ScratchTools Beta available.";
      }
    }
  }
  // checkCurrentVersion();
}
if (window.location.href.includes("extras/index.html")) {
  window.addEventListener("click", function (e) {
    if (
      document.getElementById("themedropdown").contains(e.target) ||
      document.getElementById("themedropdown-btn").contains(e.target)
    ) {
      // Clicked in box
    } else {
      document.getElementById("themedropdown").style.display = "none";
    }
  });
  document.getElementById("themedropdown-btn").addEventListener("click", () => {
    if (document.getElementById("themedropdown").style.display == "block") {
      document.getElementById("themedropdown").style.display = "none";
    } else {
      document.getElementById("themedropdown").style.display = "block";
    }
  });

  if (document.querySelector(".dropdown")) {
    getThemes();
  }
}

async function getThemes() {
  document.querySelectorAll(".dropdown > *").forEach(function (el) {
    el.remove();
  });
  var themes =
    (await chrome.storage.sync.get("themes"))?.themes || defaultThemes;
  themes.forEach(function (theme) {
    var div = document.createElement("div");
    div.className = "item";
    div.dataset.id = theme.id;
    div.textContent = theme.title;
    var circle = document.createElement("div");
    circle.className = "circle";
    circle.style.background = `linear-gradient(135deg, ${theme.data.theme} 050%, ${theme.data.background} 50%)`;
    div.prepend(circle);
    document.querySelector(".dropdown").appendChild(div);
    div.addEventListener("click", async function () {
      var enabled = (await chrome.storage.sync.get("themes")).themes;
      var active = enabled.find((el) => el.active);
      var found = enabled.find((el) => el.id === theme.id);
      active.active = false;
      found.active = true;
      await chrome.storage.sync.set({
        themes: enabled,
      });
      document.getElementById("themedropdown").style.display = "none";
    });
  });
  var div = document.createElement("div");
  div.className = "item";
  div.textContent = "Theme Store";
  document.querySelector(".dropdown").appendChild(div);
  div.addEventListener("click", async function () {
    document.getElementById("themedropdown").style.display = "none";
    chrome.tabs.create({
      url: "/themes/settings/index.html",
    });
  });
}

chrome.runtime.onMessage.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  if (msg.msg === "installedThemesUpdate") {
    getThemes();
  } else if (msg.msg === "themeUpdate") {
    setTheme(msg.value.id);
  }
  if (msg.msg === "returnedUser") {
  }
});

async function setActiveTheme() {
  var themes =
    (await chrome.storage.sync.get("themes"))?.themes || defaultThemes;
  setTheme(themes.find((el) => el.active).id);
}
setActiveTheme();

async function setTheme(themeId) {
  var enabled =
    (await chrome.storage.sync.get("themes"))?.themes || defaultThemes;
  if (enabled.find((el) => !el.theme)) {
    enabled = defaultThemes;
    await chrome.storage.sync.set({
      themes: enabled,
    });
  }
  var found = enabled.find((el) => el.id === themeId);
  document.head.querySelector("style.theme")?.remove();
  var style = document.createElement("style");
  style.textContent = `
  :root {
    --theme: ${found.data.theme};
    --background: ${found.data.background};
    --primary-color: ${found.data.primary};
    --secondary-color: ${found.data.secondary};
    --searchbar-bg: ${found.data.searchbar};
    --searchbar-gears: url("/extras/icons/settings.svg");
    --searchbar-search: ${
      found.theme === "light"
        ? 'url("/extras/icons/search.svg")'
        : 'url("/extras/icons/search-light.svg")'
    };
    --mini-logo: url("/extras/icons/mini-logo.svg");
    --box: ${found.data.box};
    --feature-bg: ${found.data.feature};
    --feature-input-bg: ${found.data.input};
    --feature-slider-bg: ${found.data.slider};
    --scrollbar-handle: ${found.data.scrollbar};
    --scrollbar-handle-active: ${found.data.scrollbar_active};
    --theme-icon: url("/extras/icons/dark.svg");
    --navbar-gradient: linear-gradient(0.25turn, ${found.data.gradient[0]}, ${
    found.data.gradient[1]
  });
    ${
      found.theme === "light"
        ? '--campsite: url("/extras/icons/campsitelight.svg");'
        : '--campsite: url("/extras/icons/campsitedark.svg");'
    }
  }
  `;
  if (found.theme !== "light") {
    style.textContent += `
    .settingsButton {
      filter: brightness(0) invert(1);
    }`;
  }
  style.className = "theme";
  document.head.appendChild(style);
}

document.querySelector(".support-btn")?.addEventListener("click", function () {
  chrome.tabs.create({
    url: "/extras/support/index.html",
  });
});

document.querySelector(".searchbar").placeholder =
  chrome.i18n.getMessage("search") || "search";

document.querySelector(".searchbar").addEventListener("input", function () {
  if (document.querySelector(".welcome")) {
    if (document.querySelector(".searchbar").value) {
      document.querySelector(".welcome").style.display = "none";
    } else {
      document.querySelector(".welcome").style.display = null;
    }
  }
  document.querySelectorAll(".feature").forEach(function (el) {
    if (
      (
        el.querySelector("h3").textContent.toLowerCase() +
        el.querySelector("p").textContent.toLowerCase() +
        el.querySelector("span").textContent.toLowerCase()
      ).includes(document.querySelector(".searchbar").value.toLowerCase())
    ) {
      el.style.display = null;
    } else {
      el.style.display = "none";
    }
  });
});

if (document.querySelector(".settingsButton")) {
  document
    .querySelector(".settingsButton")
    .addEventListener("click", async function () {
      chrome.tabs.create({
        url: "/extras/index.html",
      });
    });
} else {
  document.addEventListener("keydown", function (e) {
    if (e.which === 70 && e.altKey) {
      returnFeatureCode();
    }
  });
}

async function returnFeatureCode() {
  var featuresData = (await chrome.storage.sync.get("features")).features || "";
  const data = await (
    await fetch("https://data.scratchtools.app/create/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features: featuresData }),
    })
  ).json();
  if (data.error) {
    ScratchTools.modals.create({
      title: "An error occurred",
      description:
        "We were unable to generate a code for your features. They could be corrupt, or the server had an issue.",
    });
  } else {
    ScratchTools.modals.create({
      title: "Saved features",
      description:
        "We've converted your feature set into a short code that you can save or use when reporting bugs. You can copy it from below.",
      components: [{ type: "code", content: data.code }],
    });
  }
}

async function getFeatures() {
  const settings = (await chrome.storage.sync.get("features")).features || "";
  const data = await (await fetch("/features/features.json")).json();
  for (var featurePlace in data) {
    var feature = data[featurePlace];

    var div = document.createElement("div");
    div.className = "feature";

    feature.id = feature.id || feature.file;
    div.dataset.id = feature.id;

    if (feature.version === 2) {
      const featureData = await (
        await fetch("/features/" + feature.id + "/data.json")
      ).json();
      featureData.id = feature.id;
      featureData.version = feature.version;
      feature = featureData;
    }
    div.dataset.type = feature.type.join("");

    var h3 = document.createElement("h3");
    h3.textContent =
      chrome.i18n.getMessage(feature.id.replaceAll("-", "_") + "_title") ||
      feature.title;
    h3.className = "featureTitle";
    div.appendChild(h3);

    var label = document.createElement("label");
    label.className = "switch";
    var input = document.createElement("input");
    input.type = "checkbox";
    var span = document.createElement("span");
    span.className = "slider round";
    label.appendChild(input);
    label.appendChild(span);
    div.appendChild(label);
    if (settings.includes(feature.id)) {
      input.checked = true;
    }

    input.addEventListener("input", async function () {
      var allFeaturesList = await (
        await fetch("/features/features.json")
      ).json();
      for (var i in allFeaturesList) {
        ftr = allFeaturesList[i];
        if (
          ftr.id === this.parentNode.parentNode.dataset.id &&
          ftr.version === 2
        ) {
          var finalFeatureData = await (
            await fetch(`/features/${ftr.id}/data.json`)
          ).json();
        }
      }
      var data = (await chrome.storage.sync.get("features")).features || "";
      if (!data.includes(this.parentNode.parentNode.dataset.id)) {
        if (finalFeatureData?.additionalAgreements) {
          var ok = confirm(finalFeatureData.additionalAgreements);
        } else {
          var ok = true;
        }
        if (ok) {
          this.checked = true;
          await chrome.storage.sync.set({
            features: data + "." + this.parentNode.parentNode.dataset.id,
          });
          dynamicEnable(this.parentNode.parentNode.dataset.id);
        } else {
          window.close();
        }
      } else {
        this.checked = false;
        await chrome.storage.sync.set({
          features: data.replaceAll(this.parentNode.parentNode.dataset.id, ""),
        });
        dynamicDisable(this.parentNode.parentNode.dataset.id);
      }
    });

    var p = document.createElement("p");
    p.textContent =
      chrome.i18n.getMessage(
        feature.id.replaceAll("-", "_") + "_description"
      ) || feature.description;
    div.appendChild(p);

    if (feature.options) {
      for (var optionPlace in feature.options) {
        var option = feature.options[optionPlace];
        var input = document.createElement("input");
        input.dataset.id = option.id;
        input.dataset.feature = feature.id;
        input.placeholder = option.name;
        input.type = ["text", "checkbox", "number", "color"][option.type || 0];
        var optionData = (await chrome.storage.sync.get(option.id))[option.id];
        input.value = optionData || "";
        div.appendChild(input);
        if (input.type === "checkbox") {
          var label = document.createElement("label");
          label.textContent = option.name;
          div.appendChild(label);
          input.checked = optionData || false;
        }
        input.dataset.validation = btoa(
          JSON.stringify(option.validation || [])
        );
        input.addEventListener("input", async function () {
          var validation = JSON.parse(atob(this.dataset.validation));
          var ready = true;
          var input = this;
          validation.forEach(function (validate) {
            if (ready) {
              input.style.outline = "none";
              if (
                input.nextSibling?.className?.includes("validation-explanation")
              ) {
                input.nextSibling.remove();
              }
              if (!new RegExp(validate.regex).test(input.value)) {
                ready = false;
                input.style.outline = "2px solid #f72f4a";
                var explanation = document.createElement("span");
                explanation.className = "validation-explanation";
                explanation.textContent = validate.explanation;
                explanation.style.color = "#f72f4a";
                explanation.style.marginBottom = "1rem";
                input.insertAdjacentElement("afterend", explanation);
              }
            }
          });
          if (ready) {
            if (this.type !== "checkbox") {
              finalValue = this.value;
            } else {
              var data = await chrome.storage.sync.get(this.dataset.id);
              if (data[this.dataset.id]) {
                this.checked = false;
                finalValue = false;
              } else {
                this.checked = true;
                finalValue = true;
              }
            }
            var saveData = {};
            saveData[this.dataset.id] = finalValue;
            await chrome.storage.sync.set(saveData);
            var featureToUpdate = this;
            chrome.tabs.query({}, function (tabs) {
              for (var i = 0; i < tabs.length; i++) {
                try {
                  chrome.scripting.executeScript({
                    args: [
                      featureToUpdate.dataset.feature,
                      featureToUpdate.dataset.id,
                      finalValue,
                    ],
                    target: { tabId: tabs[i].id },
                    func: updateSettingsFunction,
                    world: "MAIN",
                  });
                  function updateSettingsFunction(feature, name, value) {
                    if (allSettingChangeFunctions[feature]) {
                      allSettingChangeFunctions[feature](name, value);
                    }
                  }
                } catch (err) {
                  console.log(err);
                }
              }
            });
          }
        });
      }
    }

    var span = document.createElement("span");
    span.textContent =
      (chrome.i18n.getMessage("credits_text") || "Credits") + ": ";

    feature.credits.forEach(function (credit, i) {
      var a = document.createElement("a");
      if (feature.version === 2) {
        a.textContent = credit.username;
        if (document.querySelector(".main-page")) {
          a.href = credit.url;
        } else {
          a.onclick = function () {
            chrome.tabs.create({
              url: credit.url,
            });
          };
        }
      } else {
        a.textContent = credit;
        a.dataset.url = feature.urls[i];
        if (document.querySelector(".main-page")) {
          a.href = feature.urls[i];
        } else {
          a.onclick = function () {
            chrome.tabs.create({
              url: this.dataset.url,
            });
          };
        }
      }
      span.appendChild(a);
      if (i + 1 !== feature.credits.length) {
        var comma = document.createElement("span");
        comma.textContent = ", ";
        span.appendChild(comma);
      }
    });
    div.appendChild(span);

    document.querySelector(".settings").appendChild(div);
  }
}
getFeatures();

async function dynamicEnable(id) {
  var features = await (await fetch("/features/features.json")).json();
  features.forEach(async function (feature) {
    if (feature.file === id) {
      if (feature.dynamic) {
        chrome.tabs.query({}, function (tabs) {
          for (var i = 0; i < tabs.length; i++) {
            try {
              chrome.scripting.executeScript({
                target: { tabId: tabs[i].id },
                files: [`/features/${feature.file}.js`],
                world: "MAIN",
              });
            } catch (err) {}
          }
        });
      }
    } else if (feature.version === 2 && feature.id === id) {
      var featureData = await (
        await fetch(`/features/${feature.id}/data.json`)
      ).json();
      if (featureData.dynamic) {
        featureData.scripts?.forEach(function (el) {
          chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
              try {
                if (new URL(tabs[i].url).pathname.match(script.runOn)) {
                  chrome.scripting.executeScript({
                    target: { tabId: tabs[i].id },
                    files: [`/features/${feature.id}/${el.file}`],
                    world: "MAIN",
                  });
                }
              } catch (err) {}
            }
          });
        });
        featureData.styles?.forEach(function (style) {
          chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
              try {
                if (new URL(tabs[i].url).pathname.match(style.runOn)) {
                  chrome.scripting.executeScript({
                    args: [
                      feature.id,
                      chrome.runtime.getURL(
                        `/features/${feature.id}/${style.file}`
                      ),
                    ],
                    target: { tabId: tabs[i].id },
                    func: insertCSS,
                    world: "MAIN",
                  });
                  function insertCSS(feature, path) {
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = path;
                    link.dataset.feature = feature;
                    document
                      .querySelector(".scratchtools-styles-div")
                      .appendChild(link);
                  }
                }
              } catch (err) {}
            }
          });
        });
      }
    }
  });
}

async function dynamicDisable(id) {
  var features = await (await fetch("/features/features.json")).json();
  features.forEach(async function (feature) {
    if (feature.file === id) {
      if (feature.dynamic) {
        chrome.tabs.query({}, function (tabs) {
          for (var i = 0; i < tabs.length; i++) {
            try {
              chrome.scripting.executeScript({
                args: [id],
                target: { tabId: tabs[i].id },
                func: disableFeature,
                world: "MAIN",
              });
              function disableFeature(f) {
                ScratchTools.disable(f);
              }
            } catch (err) {}
          }
        });
      }
    } else if (feature.version === 2 && feature.id === id) {
      var featureData = await (
        await fetch(`/features/${feature.id}/data.json`)
      ).json();
      if (featureData.dynamic) {
        chrome.tabs.query({}, function (tabs) {
          for (var i = 0; i < tabs.length; i++) {
            try {
              chrome.scripting.executeScript({
                args: [feature.id],
                target: { tabId: tabs[i].id },
                func: disableFeature,
                world: "MAIN",
              });
              function disableFeature(f) {
                ScratchTools.disable(f);
              }
            } catch (err) {}
          }
        });
      }
    }
  });
}

var ScratchTools = ScratchTools || {};
ScratchTools.modals = {
  create: function (data) {
    var div = document.createElement("div");
    div.className = "st-modal-blur-bg";

    var modal = document.createElement("div");
    modal.className = "st-modal";

    var h1 = document.createElement("h1");
    h1.textContent = data.title;
    modal.appendChild(h1);

    var p = document.createElement("p");
    p.textContent = data.description;
    modal.appendChild(p);

    var orangeBar = document.createElement("div");
    orangeBar.className = "st-modal-header";

    data.components?.forEach(function (component) {
      var element;
      if (component.type === "code") {
        var code = document.createElement("code");
        code.textContent = component.content;
        modal.appendChild(code);
        element = code;
      }
      if (component.type === "button") {
        var btn = document.createElement("button");
        btn.textContent = component.content;
        if (component.src) {
          var linkToBtn = document.createElement("a");
          linkToBtn.href = component.src;
          linkToBtn.appendChild(btn);
          modal.appendChild(linkToBtn);
        } else if (component.callback) {
          btn.addEventListener("click", component.callback);
          modal.appendChild(btn);
        }
        btn.addEventListener("click", function () {
          div.remove();
        });
        element = btn;
      }
      component.additonalClassNames?.forEach(function (className) {
        element.classList.add(className);
      });
    });

    var closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.onclick = function () {
      div.remove();
    };
    modal.appendChild(closeButton);

    div.appendChild(modal);
    modal.prepend(orangeBar);
    document.body.appendChild(div);
    return modal;
  },
};

document.getElementById("campsite")?.addEventListener("click", function () {
  // open new link in new tab
  chrome.tabs.create({
    url: "https://youtu.be/z54AmH9Yi78",
  });
});

if (document.querySelector(".buttons")) {
  document.querySelectorAll(".buttons button").forEach(function (el) {
    el.addEventListener("click", function () {
      document.body.dataset.filter = el.textContent;
      el.parentNode.querySelector(".selected").classList.remove("selected");
      el.classList.add("selected");
    });
  });
}

async function getUser() {
  try {
    var data = await (
      await fetch("https://scratch.mit.edu/session/", {
        headers: {
          "x-requested-with": "XMLHttpRequest",
        },
      })
    ).json();
    return data?.user;
  } catch (err) {
    return null;
  }
}

async function getNotifications() {
  var user = await getUser()
  if (user) {
    var data = await (await fetch(`https://data.scratchtools.app/messages/${user.username}/count/`)).json()
    if (data.count !== 0) {
      var span = document.createElement("span")
      span.textContent = data.count.toString()
      span.className = "notification"
      document.querySelector(".feedback-btn").appendChild(span)
      document.querySelector(".feedback-btn").style.bottom = "2.5rem"
    }
  }
}
if (document.querySelector(".feedback-btn")) {
  getNotifications();
}

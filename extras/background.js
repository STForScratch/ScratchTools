chrome.runtime.onInstalled.addListener(async function (object) {
  try {
    var featureData = await (await fetch("/features/features.json")).json();
  } catch (err) {
    chrome.tabs.create({
      url: `data:text/plain,ScratchTools has crashed because the features.json file is configured incorrectly.`,
    });
  }
  chrome.alarms.clearAll();
  chrome.alarms.create("displayMessageCount", {
    delayInMinutes: 0.5,
    periodInMinutes: 0.5,
  });
  var version = chrome.runtime.getManifest().version_name;
  const changelogData = await (await fetch("/changelog/changes.json")).json();
  if (changelogData.version === version) {
    var storedVersion = (await chrome.storage.sync.get("version")).version;
    await chrome.storage.sync.set({
      version: version,
    });
    if (storedVersion && storedVersion !== version) {
      await chrome.tabs.create({
        url: "/changelog/index.html",
      });
    }
  }
  if (
    chrome.runtime.getManifest().version_name.toLowerCase().includes("beta")
  ) {
    chrome.action.setIcon({
      path: {
        default_icon: "/extras/icons/purple.png",
        16: "/extras/icons/purple-16.png",
        48: "/extras/icons/purple-48.png",
        128: "/extras/icons/purple-128.png",
      },
    });
  }
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL("https://scratchtools.app/goodbye");
    chrome.tabs.create({ url: "/onboarding/index.html" });
    var response = await fetch("/features/features.json");
    var data = await response.json();
    chrome.storage.sync.get("features", function (obj) {
      if (!obj.features) {
        var str = "";
        data.forEach(function (el) {
          if (el.default) {
            str = str + " " + el.file;
          }
        });
        chrome.storage.sync.set({ features: str });
      }
    });
  }
  var obj = await chrome.storage.sync.get("features");
  if (obj.features && obj.features.includes("display-message-count-in-icon")) {
    try {
      var response = await fetch(
        "https://scratch.mit.edu/messages/ajax/get-message-count/"
      );
      var data = await response.json();
      chrome.action.setBadgeText({ text: data.msg_count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: "#ff9f00" });
    } catch (err) {
      chrome.action.setBadgeText({ text: "?" });
      chrome.action.setBadgeBackgroundColor({ color: "#ff9f00" });
    }
  } else {
    chrome.action.setBadgeText({ text: "" });
  }
});

chrome.tabs.onUpdated.addListener(async function (tabId, info) {
  var tab = await chrome.tabs.get(tabId);
  var listOfIds = [];
  var features = await (await fetch("/features/features.json")).json();
  features.forEach(function (feature) {
    listOfIds.push(feature.file || feature.id);
  });
  if (
    tab.url?.startsWith("https://scratch.mit.edu/scratchtools/features/") &&
    listOfIds.includes(
      tab.url
        .replace("https://scratch.mit.edu/scratchtools/features/", "")
        .replaceAll("/", "")
    )
  ) {
    await chrome.scripting.executeScript({
      args: [
        chrome.runtime.getURL("/extras/feature/index.html") +
          "?feature=" +
          tab.url
            .replace("https://scratch.mit.edu/scratchtools/features/", "")
            .replaceAll("/", ""),
      ],
      target: { tabId: tabId },
      func: redirectToFeature,
      world: "MAIN",
    });
    function redirectToFeature(url) {
      window.location.href = url;
    }
  } else {
    if (info.status === "loading") {
      var ScratchTools = {};
      ScratchTools.console = {};
      ScratchTools.console.log = function (text) {
        var styleArray = [
          "padding: 0.1rem",
          "background-color: lime",
          "border-radius: 0.2rem",
          "color: black",
        ];
        console.log("%cScratchTools", styleArray.join(";"), text);
      };
      ScratchTools.console.warn = function (text) {
        var styleArray = [
          "padding: 0.1rem",
          "background-color: yellow",
          "border-radius: 0.2rem",
          "color: black",
        ];
        console.log("%cScratchTools", styleArray.join(";"), text);
      };
      ScratchTools.console.error = function (text) {
        var styleArray = [
          "padding: 0.1rem",
          "background-color: #ff9f00",
          "border-radius: 0.2rem",
          "color: black",
        ];
        console.log("%cScratchTools", styleArray.join(";"), text);
      };
      async function getCurrentTab() {
        ScratchTools.console.log("STARTING.");
        var response = await fetch("/features/features.json");
        var data = await response.json();
        var uiLanguage = chrome.i18n.getUILanguage() || "en";
        if (uiLanguage.includes("-")) {
          uiLanguage = uiLanguage.split("-")[0];
        }
        await chrome.scripting.executeScript({
          args: [chrome.runtime.getURL("/api/modal.css")],
          target: { tabId: tabId },
          func: injectCss,
          world: "MAIN",
        });
        function injectCss(path) {
          var link = document.createElement("link");
          link.href = path;
          link.rel = "stylesheet";
          document.head.appendChild(link);
        }
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/main.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected main API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/modals.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected modals API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/feature.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected feature API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/auth.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected auth API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/logging.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected logging API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/vm.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected Scratch API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/cookies.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected cookies API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/getScratch.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected getScratch API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/spaces.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected protect spaces API.");
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/extras/protect-mention.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected protect mention script.");
        var newFullData = [];
        for (var i in data) {
          var feature = data[i];
          if (feature.version === 2) {
            var featureData = await (
              await fetch(`/features/${feature.id}/data.json`)
            ).json();
            featureData.id = feature.id;
            featureData.version = feature.version;
            if (featureData.locales) {
              if (chrome.i18n.getUILanguage().includes("-")) {
                var language = chrome.i18n.getUILanguage().split("-")[0];
              } else {
                var language = chrome.i18n.getUILanguage();
              }
              try {
                var localesData = await (
                  await fetch(
                    `/features/--i18n/${language}/${featureData.id}.json`
                  )
                ).json();
              } catch (err) {
                var localesData = await (
                  await fetch(`/features/--i18n/en/${featureData.id}.json`)
                ).json();
              }
              featureData.localesData = localesData;
            }
            newFullData.push(featureData);
          } else {
            newFullData.push(feature);
          }
        }
        await chrome.scripting.executeScript({
          args: [newFullData],
          target: { tabId: tabId },
          func: getFeaturesForAPI,
          world: "MAIN",
        });
        ScratchTools.console.log("Injected features API.");
        function getFeaturesForAPI(dataFeatures) {
          ScratchTools.Features.data = dataFeatures;
        }
        addData();
        for (var i in data) {
          var feature = data[i];
          if (feature.version === 2) {
            var featureData = await (
              await fetch(`/features/${feature.id}/data.json`)
            ).json();
            for (var resource in featureData.resources) {
              await chrome.scripting.executeScript({
                args: [
                  featureData.resources[resource].name,
                  chrome.runtime.getURL(
                    `/features/${feature.id}${featureData.resources[resource].path}`
                  ),
                ],
                target: { tabId: tabId },
                func: injectResource,
                world: "MAIN",
              });
              function injectResource(name, path) {
                ScratchTools.Resources[name] = path;
                var style = document.createElement("style");
                style.textContent = `:root {
                  --scratchtoolsresource-${name}: url(${path});
                }`;
                document.body.appendChild(style);
              }
            }
          }
        }
        var langData = {};
        try {
          var langDataFetched = await (
            await fetch(`/_locales/${uiLanguage}/messages.json`)
          ).json();
          if (langDataFetched) {
            langData = langDataFetched;
          } else {
            langData = {};
          }
        } catch (err) {
          langData = {};
        }
        chrome.scripting.executeScript({
          args: [langData],
          target: { tabId: tabId },
          func: function (langData) {
            ScratchTools.languageData = langData;
            ScratchTools.i18n = {
              getString: function (string, feature) {
                return (
                  ScratchTools.languageData[
                    "feature_" + feature.replaceAll("-", "_") + "_" + string
                  ]?.message || null
                );
              },
            };
          },
          world: "MAIN",
        });
        async function addData() {
          var allStorage = {};
          await data.forEach(async function (el) {
            if (el.options !== undefined) {
              await el.options.forEach(async function (option) {
                var test = await chrome.storage.sync.get(option.id);
                if (test[option.id] !== undefined) {
                  var data = {};
                  data[option.id] = test[option.id];
                  chrome.scripting.executeScript({
                    args: [data],
                    target: { tabId: tabId },
                    func: getStorage,
                    world: "MAIN",
                  });
                }
              });
            }
          });
        }
        function getStorage(storage) {
          ScratchTools.Storage[Object.keys(storage)[0]] =
            storage[Object.keys(storage)[0]];
        }
        ScratchTools.console.log("Injected storage API.");
        Object.keys(data).forEach(async function (el) {
          var disabled = (await chrome.storage.sync.get("autoDisabled"))
            .autoDisabled;
          if (!disabled || !disabled.includes(data[el].file)) {
            if (data[el]["world"] === undefined) {
              var world = "MAIN";
            } else {
              if (data[el]["world"].toLowerCase() === "isolated") {
                var world = "ISOLATED";
              }
              if (data[el]["world"].toLowerCase() === "main") {
                var world = "MAIN";
              }
            }
            chrome.storage.sync.get("features", async function (obj) {
              if (obj["features"].includes(data[el]["file"] || data[el].id)) {
                if (data[el].version === 2) {
                  var newData = await (
                    await fetch(`/features/${data[el].id}/data.json`)
                  ).json();
                  newData.scripts?.forEach(function (script) {
                    chrome.scripting.executeScript({
                      target: { tabId: tabId },
                      files: [`/features/${data[el]["id"]}/${script}`],
                      world: newData.world?.toUpperCase() || "MAIN",
                    });
                  });
                  newData.styles?.forEach(function (style) {
                    chrome.scripting.executeScript({
                      args: [
                        data[el].id,
                        chrome.runtime.getURL(
                          `/features/${data[el]["id"]}/${style}`
                        ),
                      ],
                      target: { tabId: tabId },
                      func: insertCSS,
                      world: "MAIN",
                    });
                    function insertCSS(feature, path) {
                      var link = document.createElement("link");
                      link.rel = "stylesheet";
                      link.href = path;
                      link.dataset.feature = feature;
                      document.head.appendChild(link);
                    }
                  });
                } else {
                  chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: [`/features/${data[el]["file"]}.js`],
                    world: world,
                  });
                }
                ScratchTools.console.log("Injected feature: " + data[el].file);
              }
            });
          }
        });
      }
      getCurrentTab();
    }
  }
});

chrome.runtime.onMessage.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  if (msg.text === "get-logged-in-user") {
    sendResponse(true);
    const data = await (
      await fetch("https://scratch.mit.edu/session/", {
        headers: {
          accept: "*/*",
          "accept-language": "en, en;q=0.8",
          "sec-ch-ua":
            '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://scratch.mit.edu/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
    ).json();
    await chrome.tabs.sendMessage(sender.tab.id, data, function (response) {});
  }
});

chrome.alarms.onAlarm.addListener(async function () {
  chrome.alarms.clearAll();
  chrome.alarms.create("test", {
    delayInMinutes: 0.5,
    periodInMinutes: 0.5,
  });
  var response = await fetch(
    "https://raw.githubusercontent.com/STForScratch/data/main/disabled.json"
  );
  var data = await response.json();
  await chrome.storage.sync.set({ autoDisabled: data });
  var obj = await chrome.storage.sync.get("features");
  if (obj.features && obj.features.includes("display-message-count-in-icon")) {
    try {
      var response = await fetch(
        "https://scratch.mit.edu/messages/ajax/get-message-count/"
      );
      var data = await response.json();
      chrome.action.setBadgeText({ text: data.msg_count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: "#ff9f00" });
    } catch (err) {
      chrome.action.setBadgeText({ text: "?" });
      chrome.action.setBadgeBackgroundColor({ color: "#ff9f00" });
    }
  } else {
    chrome.action.setBadgeText({ text: "" });
  }
});

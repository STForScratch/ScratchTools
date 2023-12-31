let cachedStorage;
let cachedStyles;

async function cache() {
  cachedStorage = (await chrome.storage.sync.get("features"))?.features || "";
  cachedStyles = await getEnabledStyles();
  cachedScripts = await getModules();
  return true;
}
cache();

async function checkBetaUpdates() {
  var loggedIn = await (
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
  if (loggedIn?.user) {
    var isBeta = (
      await (
        await fetch(
          `https://data.scratchtools.app/isbeta/${loggedIn.user.username}/`
        )
      ).json()
    ).beta;
    if (isBeta) {
      var data = await (
        await fetch(
          "https://data.scratchtools.app/latest/?nocache=" +
            Date.now().toString()
        )
      ).json();
      if (
        data.version !== chrome.runtime.getManifest().version_name ||
        (await (await fetch("/changelog/beta.json")).json()).beta !==
          data.beta
      ) {
        // chrome.tabs.create({
        //   url: "/extras/beta/index.html",
        // });
      }
    }
  }
}
if (chrome.runtime.getManifest().version_name.endsWith("-beta")) {
  checkBetaUpdates();
}

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
      if (version === "3.0.0") {
        await chrome.tabs.create({
          url: "/changelog/3/index.html",
        });
      } else {
        await chrome.tabs.create({
          url: "/changelog/index.html",
        });
      }
    }
  }
  if (
    chrome.runtime.getManifest().version_name.toLowerCase().includes("beta")
  ) {
    chrome.action.setIcon({
      path: {
        default_icon: "/extras/icons/beta/beta128.png",
        16: "/extras/icons/beta/beta16.png",
        48: "/extras/icons/beta/beta48.png",
        128: "/extras/icons/beta/beta128.png",
      },
    });
  }
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    await chrome.storage.sync.set({
      timeInstalled: Date.now(),
    });
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
    let features = await getFeaturesCode();
    let username = await getUsername();
    chrome.runtime.setUninstallURL(
      "https://scratchtools.app/goodbye?installed=" +
        Date.now().toString() +
        "&code=" +
        features +
        (username ? "&username=" + username : "") +
        "&version=" +
        chrome.runtime.getManifest().version_name
    );
  } else {
    let features = await getFeaturesCode();
    let username = await getUsername();
    let time =
      (await chrome.storage.sync.get("timeInstalled"))?.timeInstalled || 0;
    chrome.runtime.setUninstallURL(
      "https://scratchtools.app/goodbye?installed=" +
        time.toString() +
        "&code=" +
        features +
        (username ? "&username=" + username : "") +
        "&version=" +
        chrome.runtime.getManifest().version_name
    );
  }
  var obj = await chrome.storage.sync.get("features");
  if (obj.features && obj.features.includes("display-message-count-in-icon")) {
    try {
      var response = await fetch(
        "https://scratch.mit.edu/messages/ajax/get-message-count/"
      );
      var data = await response.json();
      chrome.action.setBadgeText({ text: data.msg_count.toString() });
      chrome.action.setBadgeBackgroundColor({
        color: !chrome.runtime.getManifest().version_name.endsWith("-beta")
          ? "#ff9f00"
          : "#00a2ff",
      });
    } catch (err) {
      chrome.action.setBadgeText({ text: "?" });
      chrome.action.setBadgeBackgroundColor({
        color: !chrome.runtime.getManifest().version_name.endsWith("-beta")
          ? "#ff9f00"
          : "#00a2ff",
      });
    }
  } else {
    chrome.action.setBadgeText({ text: "" });
  }
});

chrome.storage.onChanged.addListener(async function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "features") {
      await cache();
      let features = await getFeaturesCode();
      let username = await getUsername();
      let time =
        (await chrome.storage.sync.get("timeInstalled"))?.timeInstalled || 0;
      chrome.runtime.setUninstallURL(
        "https://scratchtools.app/goodbye?installed=" +
          time.toString() +
          "&code=" +
          features +
          (username ? "&username=" + username : "") +
          "&version=" +
          chrome.runtime.getManifest().version_name
      );
    }
    if (key === "themes") {
      if (oldValue.length !== newValue.length) {
        chrome.runtime.sendMessage({
          msg: "installedThemesUpdate",
          value: newValue,
        });
      }
      if (
        oldValue.find((el) => el.active) !== newValue.find((el) => el.active)
      ) {
        chrome.runtime.sendMessage({
          msg: "themeUpdate",
          value: newValue.find((el) => el.active),
        });
      }
    }
  }
});

chrome.tabs.onUpdated.addListener(async function (tabId, info) {
  var tab = await chrome.tabs.get(tabId);
  if (tab?.url?.startsWith("https://scratch.mit.edu/")) {
    var obj = await chrome.storage.sync.get("features");
    if (obj.features && obj.features.includes("isonline")) {
      var lastCached = await chrome.storage.sync.get("lastOnlineCached");
      if ((lastCached.lastOnlineCached || 0) < Date.now() - 300000) {
        try {
          var loggedIn = await (
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
          if (loggedIn?.user) {
            var data = await (
              await fetch("https://data.scratchtools.app/online/", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: loggedIn.user.username }),
              })
            ).json();
          }
        } catch (err) {}
      }
    }
  }
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
  } else if (
    tab.url?.startsWith("https://scratch.mit.edu/ste/dashboard/verify/")
  ) {
    if (info.status === "loading") {
      await chrome.scripting.executeScript({
        args: [chrome.runtime.id],
        target: { tabId: tabId },
        func: injectExtensionPageUrl,
        world: "MAIN",
      });
      function injectExtensionPageUrl(id) {
        window.steSupportId = id;
      }
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/extras/page.js`],
        world: "MAIN",
      });
    }
  } else if (
    tab.url?.startsWith("https://scratch.mit.edu/scratchtools/feedback/auth/")
  ) {
    if (info.status === "loading") {
      await chrome.scripting.executeScript({
        args: [chrome.runtime.id],
        target: { tabId: tabId },
        func: injectExtensionPageUrl,
        world: "MAIN",
      });
      function injectExtensionPageUrl(id) {
        window.steSupportId = id;
      }
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/extras/feedback/page.js`],
        world: "MAIN",
      });
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
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/verify.js`],
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
        ScratchTools.console.log("Injected spaces API.");
        var newFullData = [];
        for (var i in data) {
          var feature = data[i];
          if (feature.version === 2) {
            var featureData = await (
              await fetch(`/features/${feature.id}/data.json`)
            ).json();
            featureData.id = feature.id;
            featureData.version = feature.version;
            if (chrome.i18n.getUILanguage().includes("-")) {
              var language = chrome.i18n.getUILanguage().split("-")[0];
            } else {
              var language = chrome.i18n.getUILanguage();
            }
            let localesData = {};
            try {
              localesData = await (
                await fetch(
                  `/feature-locales/${featureData.id}/${language}.json`
                )
              ).json();
            } catch (err) {
              try {
                localesData = await (
                  await fetch(`/feature-locales/${featureData.id}/en.json`)
                ).json();
              } catch (err) {}
            }
            let locales = {};
            Object.keys(localesData).forEach(function (el) {
              locales[`${featureData.id}/${el}`] = localesData[el];
            });
            featureData.localesData = locales;
            newFullData.push(featureData);
          } else {
            newFullData.push(feature);
          }
        }
        await chrome.scripting.executeScript({
          args: [
            newFullData,
            chrome.runtime
              .getURL("")
              .slice(0, chrome.runtime.getURL("").length - 1),
          ],
          target: { tabId: tabId },
          func: getFeaturesForAPI,
          world: "MAIN",
        });
        ScratchTools.console.log("Injected features API.");
        function getFeaturesForAPI(dataFeatures, dir) {
          ScratchTools.dir = dir;
          ScratchTools.Features.data = dataFeatures;
        }
        await chrome.scripting.executeScript({
          args: [cachedScripts],
          target: { tabId: tabId },
          func: injectCachedModules,
          world: "MAIN",
        });
        function injectCachedModules(data) {
          ScratchTools.modules = data;
        }
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/extras/protect-mention.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected protect mention script.");
        await chrome.scripting.executeScript({
          args: [chrome.runtime.id],
          target: { tabId: tabId },
          func: injectExtensionId,
          world: "MAIN",
        });
        ScratchTools.console.log("Injected extension ID.");
        function injectExtensionId(id) {
          ScratchTools.id = id;
        }
        await chrome.scripting.executeScript({
          args: [chrome.runtime.getURL("/extras/icons/icon128.png")],
          target: { tabId: tabId },
          func: injectExtensionIcon,
          world: "MAIN",
        });
        ScratchTools.console.log("Injected extension icon.");
        function injectExtensionIcon(icon) {
          ScratchTools.icons = { main: icon };
        }
        addData();
        injectStyles(tabId);
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
            if (el.version === 2) {
              el.options = (
                await (await fetch(`/features/${el.id}/data.json`)).json()
              ).options;
            }
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
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`/api/module.js`],
          world: "MAIN",
        });
        ScratchTools.console.log("Injected module API.");
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
                if (data[el].version !== 2) {
                  chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: [`/features/${data[el]["file"]}.js`],
                    world: world,
                  });
                }
                ScratchTools.console.log(
                  "Injected feature: " + data[el].file || data[el].id
                );
              }
            });
          }
        });
      }
      getCurrentTab();
    }
  }
});

chrome.runtime.onMessageExternal.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  if (msg.msg === "openSupportChat") {
    await chrome.tabs.create({
      url: "/extras/support/chat/index.html?code=" + msg.token,
    });
    chrome.tabs.remove(sender.tab.id, function () {});
  }
  if (msg.msg === "openDashboardPage") {
    await chrome.tabs.create({
      url: "/extras/dashboard/index.html?code=" + msg.token + "&username=" + msg.username,
    });
    chrome.tabs.remove(sender.tab.id, function () {});
  }
  if (msg.msg === "openFeedbackPage") {
    await chrome.tabs.create({
      url: "/extras/feedback/index.html?code=" + msg.token,
    });
    chrome.tabs.remove(sender.tab.id, function () {});
  }
  if (msg === "openSettings") {
    await chrome.tabs.create({
      url: "/extras/index.html",
    });
  }
  if (typeof msg === "object") {
    if (msg.message === "storageSet") {
      await chrome.storage.sync.set({ [msg.key]: msg.value });
    }
    if (msg.message === "storageGet") {
      var data = (await chrome.storage.sync.get(msg.key))?.[msg.key] || null;
      await chrome.scripting.executeScript({
        args: [msg.key, data],
        target: { tabId: sender.tab.id },
        func: returnStorageValue,
        world: "MAIN",
      });
      function returnStorageValue(key, value) {
        storagePromises.forEach(function (promise) {
          if (promise.key === key && !promise.resolved) {
            promise.resolve(value);
            promise.resolved = true;
          }
        });
      }
    }
  }
});

async function getEnabledStyles() {
  var allStyles = [];
  var data = (await (await fetch(`/features/features.json`)).json()).filter(
    (el) => el.version === 2 && cachedStorage.includes(el.id)
  );
  for (var i in data) {
    var feature = data[i];
    var styles = (
      await (await fetch(`/features/${feature.id}/data.json`)).json()
    ).styles;
    if (styles) {
      for (var i2 in styles) {
        styles[i2].feature = feature;
        allStyles.push(styles[i2]);
      }
    }
  }
  return allStyles;
}
async function getModules() {
  var allScripts = [];
  var data = (await (await fetch(`/features/features.json`)).json()).filter(
    (el) => el.version === 2 && cachedStorage.includes(el.id)
  );
  for (var i in data) {
    var feature = data[i];
    var scripts =
      (await (await fetch(`/features/${feature.id}/data.json`)).json())
        .scripts || [];
    if (scripts) {
      for (var i2 in scripts) {
        scripts[i2].feature = feature;
        scripts[i2].file = chrome.runtime.getURL(
          `/features/${feature.id}/${scripts[i2].file}`
        );
        allScripts.push(scripts[i2]);
      }
    }
  }
  return allScripts;
}
chrome.runtime.onMessage.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  if (msg.msg === "openSupportAuth") {
    chrome.tabs.create({
      url: "https://scratch.mit.edu/scratchtools/support/auth/",
    });
  }
  if (msg.action === "getStyles") {
    sendResponse({ data: cachedStyles });
  }
  if (msg?.text === "get-logged-in-user") {
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
      !chrome.runtime.getManifest().version_name.endsWith("-beta")
        ? "#ff9f00"
        : "#00a2ff";
    } catch (err) {
      chrome.action.setBadgeText({ text: "?" });
      !chrome.runtime.getManifest().version_name.endsWith("-beta")
        ? "#ff9f00"
        : "#00a2ff";
    }
  } else {
    chrome.action.setBadgeText({ text: "" });
  }
});

async function injectStyles(tabId) {
  cachedStorage = (await chrome.storage.sync.get("features"))?.features || "";
  cachedStyles = await getEnabledStyles();
  console.log(JSON.stringify(cachedStyles));
  var theStyles = [];
  cachedStyles.forEach(function (el) {
    el.url = chrome.runtime.getURL(`/features/${el.feature.id}/${el.file}`);
    theStyles.push(el);
  });
  await chrome.scripting.executeScript({
    args: [theStyles],
    target: { tabId: tabId },
    func: injectTheStyles,
    world: "MAIN",
  });
  function injectTheStyles(styles) {
    if (!document.querySelector(".scratchtools-styles-div *")) {
      var div = document.createElement("div");
      div.className = "scratchtools-styles-div";
      document.head.appendChild(div);
      styles.forEach(function (style) {
        if (window.location.pathname.match(style.runOn)) {
          var link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = style.url;
          link.dataset.feature = style.feature.id;
          document.querySelector(".scratchtools-styles-div").appendChild(link);
        }
      });
    }
  }
}

async function getUsername() {
  let data = await (
    await fetch("https://scratch.mit.edu/session/", {
      headers: {
        "x-requested-with": "XMLHttpRequest",
      },
    })
  ).json();
  return data?.user?.username || null;
}

async function getFeaturesCode() {
  let featuresData =
    (await chrome.storage.sync.get("features"))?.features || "";
  let data = await (
    await fetch("https://data.scratchtools.app/create/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features: featuresData }),
    })
  ).json();
  return data.code;
}

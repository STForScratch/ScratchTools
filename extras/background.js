var version = "2.14.0";

chrome.runtime.onInstalled.addListener(async function (object) {
  chrome.alarms.clearAll();
  chrome.alarms.create("displayMessageCount", {
    delayInMinutes: 0.1,
    periodInMinutes: 0.1,
  });
  if (
    chrome.runtime.getManifest().version_name.toLowerCase().includes("beta")
  ) {
    chrome.action.setIcon({
      path: {
        default_icon: "/extras/purple.png",
        16: "/extras/purple-16.png",
        48: "/extras/purple-48.png",
        128: "/extras/purple-128.png",
      },
    });
  }
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    if (
      chrome.runtime.getManifest().version_name.toLowerCase().includes("beta")
    ) {
      chrome.runtime.setUninstallURL("https://scratchtools.app/beta-goodbye");
      chrome.tabs.create({ url: "https://scratchtools.app/beta-welcome" });
    } else {
      chrome.runtime.setUninstallURL("https://scratchtools.app/goodbye");
      chrome.tabs.create({ url: "https://scratchtools.app/welcome" });
    }
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
  var obj = await chrome.storage.sync.get("features")
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
  chrome.action.setBadgeText({ text:'' })
}
});

chrome.tabs.onUpdated.addListener(function (tabId, info) {
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
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/api/main.js`],
        world: "MAIN",
      });
      ScratchTools.console.log("Injected main API.");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/api/auth.js`],
        world: "MAIN",
      });
      ScratchTools.console.log("Injected auth API.");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/api/logging.js`],
        world: "MAIN",
      });
      ScratchTools.console.log("Injected logging API.");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/api/vm.js`],
        world: "MAIN",
      });
      ScratchTools.console.log("Injected Scratch API.");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/api/cookies.js`],
        world: "MAIN",
      });
      ScratchTools.console.log("Injected cookies API.");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/api/getScratch.js`],
        world: "MAIN",
      });
      ScratchTools.console.log("Injected getScratch API.");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/api/spaces.js`],
        world: "MAIN",
      });
      ScratchTools.console.log("Injected protect spaces API.");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/extras/protect-mention.js`],
        world: "MAIN",
      });
      ScratchTools.console.log("Injected protect mention script.");
      chrome.scripting.executeScript({
        args: [data],
        target: { tabId: tabId },
        func: getFeaturesForAPI,
        world: "MAIN",
      });
      ScratchTools.console.log("Injected features API.");
      function getFeaturesForAPI(dataFeatures) {
        ScratchTools.Features.data = dataFeatures;
      }
      addData();
      async function addData() {
        var allStorage = {};
        await data.forEach(async function (el) {
          if (el.options !== undefined) {
            await el.options.forEach(async function (option) {
              var test = await chrome.storage.sync.get(option);
              if (test[option] !== undefined) {
                var data = {};
                data[option] = test[option];
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
        chrome.storage.sync.get("features", function (obj) {
          if (obj["features"].includes(data[el]["file"])) {
            chrome.scripting.executeScript({
              target: { tabId: tabId },
              files: [`/features/${data[el]["file"]}.js`],
              world: world,
            });
            ScratchTools.console.log("Injected feature: " + data[el].file);
          }
        });
      });
      await chrome.storage.sync.get("version", async function (obj) {
        if (obj["version"] !== version) {
          var tab = await chrome.tabs.get(tabId);
          if (tab.url.includes("https://scratch.mit.edu")) {
            chrome.storage.sync.set({ version: version });
            chrome.scripting.executeScript({
              target: { tabId: tabId },
              files: [`/extras/new.js`],
            });
            ScratchTools.console.log("Injected version update info modal.");
          }
        }
      });
    }
    getCurrentTab();
  }
});

chrome.alarms.onAlarm.addListener(async function () {
  chrome.alarms.clearAll();
  chrome.alarms.create("test", {
    delayInMinutes: 0.1,
    periodInMinutes: 0.1,
  });
  var obj = await chrome.storage.sync.get("features")
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
  chrome.action.setBadgeText({ text:'' })
}
});

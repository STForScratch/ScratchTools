var version = '2.14.0'

chrome.runtime.onInstalled.addListener(function (object) {
  if (chrome.runtime.getManifest().version_name.toLowerCase().includes('beta')) {
    chrome.action.setIcon({
      path : {
        "default_icon":"/extras/purple.png",
        "16": "/extras/purple-16.png",
        "48": "/extras/purple-48.png",
        "128": "/extras/purple-128.png"
      }
    })
  }
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        if (chrome.runtime.getManifest().version_name.toLowerCase().includes('beta')) {
            chrome.runtime.setUninstallURL('https://scratchtools.app/beta-goodbye')
            chrome.tabs.create({ url: 'https://scratchtools.app/beta-welcome' })
        } else {
            chrome.runtime.setUninstallURL('https://scratchtools.app/goodbye')
            chrome.tabs.create({ url: 'https://scratchtools.app/welcome' })
        }
    }
});

chrome.tabs.onUpdated.addListener(function (tabId , info) {
    if (info.status === 'loading') {
  async function getCurrentTab() {
    var response = await fetch('/features/features.json')
    var data = await response.json()
      chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/api/main.js`],
      world:'MAIN'
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/api/auth.js`],
      world:'MAIN'
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/api/logging.js`],
      world:'MAIN'
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/api/vm.js`],
      world:'MAIN'
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/api/cookies.js`],
      world:'MAIN'
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/api/getScratch.js`],
      world:'MAIN'
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/extras/protect-mention.js`],
      world:'MAIN'
    });
    chrome.scripting.executeScript({
      args: [data],
      target: { tabId: tabId },
      func: getFeaturesForAPI,
      world:'MAIN'
    });
    function getFeaturesForAPI(dataFeatures) {
      ScratchTools.Features.data = dataFeatures
    }
    addData()
    async function addData() {
    var allStorage = {}
    await data.forEach(async function(el) {
      if (el.options !== undefined) {
        await el.options.forEach(async function(option) {
          var test = await chrome.storage.sync.get(option)
          if (test[option] !== undefined) {
            var data = {}
            data[option] = test[option]
            chrome.scripting.executeScript({
              args: [data],
              target: { tabId: tabId },
              func: getStorage,
              world:'MAIN'
            });
          }
        })
      }
    })
  }
    function getStorage(storage) {
      ScratchTools.Storage[Object.keys(storage)[0]] = storage[Object.keys(storage)[0]]
    }
    Object.keys(data).forEach(async function(el) {
      if (data[el]['world'] === undefined) {
        var world = 'MAIN'
      } else {
        if (data[el]['world'].toLowerCase() === 'isolated') {
          var world = 'ISOLATED'
        }
        if (data[el]['world'].toLowerCase() === 'main') {
          var world = 'MAIN'
        }
      }
      chrome.storage.sync.get("features", function (obj) {
        if (data[el]['default'] === true) {
          if (!obj['features'].includes(data[el]['file'])) {
       chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/features/${data[el]['file']}.js`],
        world:world
      });
    }
        } else {
        if (obj['features'].includes(data[el]['file'])) {
       chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/features/${data[el]['file']}.js`],
        world:world
      });
        }
    }
    });
    })
    await chrome.storage.sync.get("version", async function (obj) {
        if (obj['version'] !== version) {
            var tab = await chrome.tabs.get(tabId)
            if (tab.url.includes('https://scratch.mit.edu')) {
            chrome.storage.sync.set({"version": version})
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: [`/extras/new.js`]
              });
            }
        }
    })
  }
  getCurrentTab()
  }
  })

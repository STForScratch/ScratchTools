chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        if (chrome.runtime.getManifest().version_name.toLowerCase().includes('beta')) {
            chrome.runtime.setUninstallURL('https://tools.scratchstatus.org/beta-goodbye')
            chrome.tabs.create({ url: 'https://tools.scratchstatus.org/beta-welcome' })
        } else {
            chrome.runtime.setUninstallURL('https://tools.scratchstatus.org/goodbye')
            chrome.tabs.create({ url: 'https://tools.scratchstatus.org/welcome' })
        }
    }
});
  
  chrome.tabs.onUpdated.addListener(function (tabId , info) {
    console.log(info.status)
    if (info.status === 'loading') {
  async function getCurrentTab() {
    var response = await fetch('/features/features.json')
    var data = await response.json()
    console.log(data)
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
      console.log(world)
      chrome.storage.sync.get("features", function (obj) {
        console.log(obj['features']);
        console.log(obj['features'])
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
    var version = '2.8.0'
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

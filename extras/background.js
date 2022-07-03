chrome.runtime.onInstalled.addListener(() => { // this event is triggered when the extension is installed or reloaded
    chrome.tabs.create({
        url: 'https://tools.scratchstatus.org/'
    }); // this is to open a webpage
});

chrome.tabs.onUpdated.addListener(function(tabId, info) {
    if (info.status === 'loading') {
        async function getCurrentTab() {
            var response = await fetch('/features/features.json')
            var data = await response.json()
            console.log(data)
            Object.keys(data).forEach(async function(el) {
                chrome.storage.local.get(["features"], function(obj) {
                    console.log(obj['features']);
                    console.log(obj['features'])
                    if (data[el]['default'] === true) {
                        if (!obj['features'].includes(data[el]['file'])) {
                            chrome.tabs.executeScript({
                                file: `/features/${data[el]['file']}.js`
                            });
                        }
                    } else {
                        if (obj['features'].includes(data[el]['file'])) {
                            chrome.tabs.executeScript({
                                file: `/features/${data[el]['file']}.js`
                            });
                        }
                    }
                });
            })
            var version = '2.5.0'
            await chrome.storage.local.get(["version"], async function(obj) {
                if (obj['version'] !== version) {
                    var tab = await chrome.tabs.get(tabId)
                    if (tab.url.includes('https://scratch.mit.edu')) {
                        chrome.storage.local.set({
                            "version": version
                        })
                        chrome.tabs.executeScript({
                            file: `/extras/new.js`
                        });
                    }
                }
            })
        }
        getCurrentTab()
    }
})

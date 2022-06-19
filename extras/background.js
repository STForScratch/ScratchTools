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
            var tab = await chrome.tabs.get(tabId)
            if (tab.url.toLowerCase().includes('https://scratch.mit.edu/scratchtools/enable/')) {
                var queryString = tab.url.search;
                var urlParams = new URLSearchParams(queryString);
                var feature = urlParams.get('feature')
                data.forEach(async function(el) {
                    if (el.file === feature) {
                        await chrome.storage.sync.get("features", async function(obj) {
                            chrome.storage.sync.set({
                                "features": obj['features'] + el.file
                            })
                        })
                    }
                })
            }
            console.log(data)
            Object.keys(data).forEach(async function(el) {
                chrome.storage.sync.get("features", function(obj) {
                    console.log(obj['features']);
                    console.log(obj['features'])
                    if (data[el]['default'] === true) {
                        if (!obj['features'].includes(data[el]['file'])) {
                            chrome.scripting.executeScript({
                                target: {
                                    tabId: tabId
                                },
                                files: [`/features/${data[el]['file']}.js`]
                            });
                        }
                    } else {
                        if (obj['features'].includes(data[el]['file'])) {
                            chrome.scripting.executeScript({
                                target: {
                                    tabId: tabId
                                },
                                files: [`/features/${data[el]['file']}.js`]
                            });
                        }
                    }
                });
            })
            var version = '2.5.0'
            await chrome.storage.sync.get("version", async function(obj) {
                if (obj['version'] !== version) {
                    var tab = await chrome.tabs.get(tabId)
                    if (tab.url.includes('https://scratch.mit.edu')) {
                        chrome.storage.sync.set({
                            "version": version
                        })
                        chrome.scripting.executeScript({
                            target: {
                                tabId: tabId
                            },
                            files: [`/extras/new.js`]
                        });
                    }
                }
            })
        }
        getCurrentTab()
    }
})

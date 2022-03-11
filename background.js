chrome.runtime.onInstalled.addListener(() => { // this event is triggered when the extension is installed or reloaded
    chrome.tabs.create({ url: 'https://rgantzosonscratch.github.io/ScratchTools-Site/v1.6' }); // this is to open a webpage
});
chrome.runtime.onInstalled.addListener(() => { // this event is triggered when the extension is installed or reloaded
  chrome.tabs.create({ url: 'https://tools.scratchstatus.org/' }); // this is to open a webpage
});

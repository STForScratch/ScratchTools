chrome.runtime.onInstalled.addListener(() => { // this event is triggered when the extension is installed or reloaded
  chrome.tabs.create({ url: 'https://tools.scratchstatus.org/' }); // this is to open a webpage
});

chrome.tabs.onUpdated.addListener(function (tabId , info) {
  if (info.status === 'interactive') {
async function getCurrentTab() {
  var response = await fetch('/features/features.json')
  var data = await response.json()
  console.log(data)
  Object.keys(data).forEach(async function(el) {
    chrome.storage.sync.get("features", function (obj) {
      console.log(obj['features']);
      console.log(obj['features'])
      if (obj['features'].includes(data[el]['file'])) {
     chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/features/${data[el]['file']}.js`]
    });
  }
  });
  })
}
getCurrentTab()
}
})

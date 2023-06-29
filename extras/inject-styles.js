async function getAllUserstyles() {
  var div = document.createElement("div");
  div.className = "scratchtools-styles-div";
  document.head.appendChild(div);
  var styles = await getStyles();
  styles.forEach(function (style) {
    if (window.location.pathname.match(style.runOn)) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = chrome.runtime.getURL(`/features/${style.feature.id}/${style.file}`);
      link.dataset.feature = style.feature.id;
      document.querySelector(".scratchtools-styles-div").appendChild(link);
    }
  });
}

var injectStylesWaitForHead = new MutationObserver(injectStyles);
injectStylesWaitForHead.observe(document.querySelector("html"), {
  childList: true,
});

async function injectStyles() {
  if (document.head) {
    injectStylesWaitForHead.disconnect();
    getAllUserstyles();
  }
}

async function getStyles() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getStyles" }, function (response) {
      resolve(response.data || "");
    });
  });
}

function ensureStylesContainer() {
  var existingContainer = document.querySelector(".scratchtools-styles-div");
  if (existingContainer) {
    return existingContainer;
  }

  var container = document.createElement("div");
  container.className = "scratchtools-styles-div";
  (document.head || document.documentElement).appendChild(container);
  return container;
}

async function getAllUserstyles() {
  var styles = await getStyles();
  if (!Array.isArray(styles) || styles.length === 0) {
    return;
  }

  var container = ensureStylesContainer();
  var existingHrefs = new Set(
    Array.from(container.querySelectorAll("link[rel='stylesheet']")).map(
      function (link) {
        return link.href;
      }
    )
  );
  var fragment = document.createDocumentFragment();

  styles.forEach(function (style) {
    if (!style || !style.feature || !style.feature.id || !style.file || !style.runOn) {
      return;
    }
    if (!window.location.pathname.match(style.runOn)) {
      return;
    }

    var href = chrome.runtime.getURL(`/features/${style.feature.id}/${style.file}`);
    if (existingHrefs.has(href)) {
      return;
    }

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.feature = style.feature.id;
    fragment.appendChild(link);
    existingHrefs.add(href);
  });

  container.appendChild(fragment);
}

var injectStylesWaitForHead = new MutationObserver(injectStyles);
if (document.documentElement) {
  injectStylesWaitForHead.observe(document.documentElement, {
    childList: true,
  });
}
injectStyles();

async function injectStyles() {
  if (document.head) {
    injectStylesWaitForHead.disconnect();
    ensureStylesContainer();
    getAllUserstyles();
  }
}

async function getStyles() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getStyles" }, function (response) {
      if (chrome.runtime.lastError) {
        resolve([]);
        return;
      }
      resolve(Array.isArray(response && response.data) ? response.data : []);
    });
  });
}

var steConsoleData = [];

var ste = {
  console: {
    log: function (content, title) {
      var styleArray = [
        "padding: 0.2rem",
        "padding-left: .5rem",
        "padding-right: .4rem",
        "background-color: #ff9f00",
        "border-radius: 0.75rem",
        "color: white",
        "border-top-right-radius: 0rem",
        "border-bottom-right-radius: 0rem",
        "font-family: Inter",
        "width: 2rem",
      ];
      console.log("%cScratchTools", styleArray.join(";"), title, content);
      steConsoleData.push({
        script: title,
        data: content,
        time: Date.now(),
        type: "log",
      });
    },
    warn: function (content, title) {
      var styleArray = [
        "padding: 0.2rem",
        "padding-left: .5rem",
        "padding-right: .4rem",
        "background-color: yellow",
        "border-radius: 0.75rem",
        "color: black",
        "border-top-right-radius: 0rem",
        "border-bottom-right-radius: 0rem",
        "font-family: Inter",
        "width: 2rem",
      ];
      console.log("%cScratchTools", styleArray.join(";"), title, content);
      steConsoleData.push({
        script: title,
        data: content,
        time: Date.now(),
        type: "warn",
      });
    },
    error: function (content, title) {
      var styleArray = [
        "padding: 0.2rem",
        "padding-left: .5rem",
        "padding-right: .4rem",
        "background-color: red",
        "border-radius: 0.75rem",
        "color: white",
        "border-top-right-radius: 0rem",
        "border-bottom-right-radius: 0rem",
        "font-family: Inter",
        "width: 2rem",
      ];
      console.log("%cScratchTools", styleArray.join(";"), title, content);
      steConsoleData.push({
        script: title,
        data: content,
        time: Date.now(),
        type: "error",
      });
    },
  },
};

var ScratchTools = {};
ScratchTools.managedElements = [];
ScratchTools.Storage = {};
ScratchTools.Resources = {};
ste.console.log("ScratchTools API Created", "ste-main");

if (
  window.location.href.startsWith("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  ScratchTools.type = "Editor";
} else {
  ScratchTools.type = "Website";
}

var storagePromises = [];
ScratchTools.storage = {
  get: async function (key) {
    chrome.runtime.sendMessage(ScratchTools.id, { message: "storageGet", key });
    return new Promise((resolve, reject) => {
      storagePromises.push({ key: key, resolve });
    });
  },
  set: async function ({ key, value }) {
    chrome.runtime.sendMessage(ScratchTools.id, {
      message: "storageSet",
      key,
      value,
    });
  },
};

let waitForSingleElements = [];

var allWaitInstances = {};
let totalRunners = 0;
ScratchTools.waitForElements = function (selector, callback) {
  totalRunners += 1;
  var thisRunner = "wait-" + (totalRunners - 1).toString();
  while (allWaitInstances[thisRunner]) {
    totalRunners += 1;
    thisRunner = "wait-" + (totalRunners - 1).toString();
  }
  allWaitInstances[thisRunner] = {
    selector,
    callback,
    elements: [],
  };
  returnScratchToolsSelectorsMutationObserverCallbacks();
  return {
    id: thisRunner,
    remove: function () {
      allWaitInstances[thisRunner].removed = true;
    },
  };
};

var stylesDiv = document.querySelector("div.scratchtools-styles-div");
ScratchTools.waitForElements("head > *", function (el) {
  if (el !== stylesDiv) {
    document.head.appendChild(stylesDiv);
  }
});

ScratchTools.waitForElement = async function (selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      resolve(document.querySelector(selector));
    } else {
      waitForSingleElements.push({
        selector: selector,
        resolved: false,
        resolve,
      });
    }
  });
};

function enableScratchToolsSelectorsMutationObserver() {
  var ScratchToolsSelectorsMutationObserver = new MutationObserver(
    returnScratchToolsSelectorsMutationObserverCallbacks
  );
  ScratchToolsSelectorsMutationObserver.observe(
    document.querySelector("html"),
    { attributes: true, childList: true, subtree: true }
  );
}

enableScratchToolsSelectorsMutationObserver();

function returnScratchToolsSelectorsMutationObserverCallbacks() {
  Object.keys(allWaitInstances).forEach(function (key) {
    var waitInstance = allWaitInstances[key];
    if (!waitInstance.removed) {
      document.querySelectorAll(waitInstance.selector).forEach(function (el) {
        if (!waitInstance.elements?.includes(el)) {
          allWaitInstances[key].elements.push(el);
          waitInstance.callback(el);
        }
      });
    }
  });
  waitForSingleElements
    .filter((promise) => !promise.resolved)
    .forEach(function (promise) {
      if (document.querySelector(promise.selector)) {
        promise.resolved = true;
        promise.resolve(document.querySelector(promise.selector));
      }
    });
}

ScratchTools.createModal = function (titleText, description, buttons) {
  if (document.querySelector(".scratchtoolsUpdateInfo") === null) {
    var box = document.createElement("div");
    box.className = "box scratchtoolsUpdateInfo";
    var boxHeader = document.createElement("div");
    boxHeader.className = "box-header";
    var boxContent = document.createElement("div");
    boxContent.className = "box-content";
    box.appendChild(boxHeader);
    box.appendChild(boxContent);
    var title = document.createElement("h4");
    title.textContent = titleText;
    title.style.color = "#575e75";
    var p = document.createElement("p");
    p.innerHTML = description;
    p.style.color = "#575e75";
    boxContent.appendChild(p);
    boxHeader.appendChild(title);
    box.style.position = "fixed";
    box.style.left = "2rem";
    box.style.bottom = "2rem";
    boxContent.style.padding = "8px 20px";
    boxHeader.style.padding = "8px 20px";
    document.body.appendChild(box);
    boxHeader.style.display = "block";
    boxHeader.style.clear = "both";
    boxHeader.style.margin = "0";
    boxHeader.style.borderTop = "1px solid #fff";
    boxHeader.style.borderBottom = "1px solid #d9d9d9";
    boxHeader.style.borderRadius = "10px 10px 0 0";
    boxHeader.style.backgroundColor = "#f2f2f2";
    boxHeader.style.padding = "8px 20px";
    boxHeader.style.height = "20px";
    boxHeader.style.overflow = "hidden";
    boxContent.style.backgroundColor = "#fff";
    box.style.display = "inline-block";
    box.style.border = "1px solid #d9d9d9";
    box.style.borderRadius = "10px 10px 0 0";
    box.style.backgroundColor = "#fff";
    buttons.forEach(function (el) {
      var button = document.createElement("button");
      button.className = "button";
      button.style.marginRight = "5px";
      button.textContent = el.label;
      if (el.type === "link") {
        var a = document.createElement("a");
        a.href = el.href;
        a.target = "_blank";
        a.appendChild(button);
        boxContent.appendChild(a);
      } else {
        if (el.type === "close") {
          button.onclick = function () {
            box.remove();
          };
        } else {
          button.onclick = el.callback;
        }
        boxContent.appendChild(button);
      }
    });
    box.style.width = "40vw";
  }
};

ScratchTools.Features = {};
ScratchTools.Features.get = function (search) {
  var all = {};
  ScratchTools.Features.data.forEach(function (el) {
    all[el.file] = el;
  });
  return all[search];
};

var allSettingChangeFunctions = {};

var allDisableFunctions = {};
var allEnableFunctions = {};
ScratchTools.setDisable = function (feature, f) {
  allDisableFunctions[feature] = f;
  ste.console.log(`Set disable function for ${feature}.`, "ste-main");
};

Element.prototype.applyStyles = function (data) {
  var element = this;
  Object.keys(data).forEach(function (el) {
    element.style[el] = data[el];
  });
};

ScratchTools.disable = function (feature) {
  allFeatures
    .filter((el) => el.self.id === feature)
    .forEach(function (el) {
      el.self.enabled = false;
    });
  ScratchTools.managedElements
    .filter((el) => el.feature === feature)
    .forEach(function (el) {
      if (!el.element) return;
      el.previousDisplay = el.element?.style.display;
      el.element.style.display = "none";
    });
  ste.console.log(`Disabled ${feature}.`, "ste-main");
  document
    .querySelectorAll(`link[data-feature=${feature}]`)
    .forEach(function (el) {
      el.remove();
    });
  if (allDisableFunctions[feature]) {
    allDisableFunctions[feature]();
  }
};

ScratchTools.createProjectButton = function (text, callback, id) {
  var button = document.createElement("button");
  button.textContent = text;
  button.className = "button action-button";
  button.dataset.id = id;
  ScratchTools.waitForElements(
    ".flex-row.action-buttons",
    function (el) {
      el.appendChild(button);
      button.onclick = function () {
        callback(button);
      };
    },
    "addProjectButton-" + id,
    false
  );
};

function GM_addStyle(styleData) {
  var style = document.createElement("style");
  style.textContent = styleData;
  return document.querySelector("html").appendChild(style);
}

ScratchTools.styles = {
  add: function (data, id) {
    var style = document.createElement("style");
    style.textContent = data;
    if (id) {
      style.dataset.scratchtoolsstyleid = id;
    }
    document.body.after(style);
    return style;
  },
  getStyleById: function (id) {
    return document.querySelector(`[data-scratchtoolsstyleid="${id}"]`);
  },
  removeStyleById: function (id) {
    document
      .querySelectorAll(`[data-scratchtoolsstyleid="${id}"]`)
      .forEach(function (style) {
        style.remove();
      });
  },
};

ScratchTools.waitForElements(
  "ul[class*='menu_menu_'][class*='menu_right_']",
  function (ul) {
    if (
      ul.parentNode?.previousSibling?.previousSibling?.className.startsWith(
        "settings-menu_dropdown-label_"
      )
    ) {
      if (!ul.querySelector(".ste-menu-full-settings")) {
        var li = document.createElement("li");
        li.className =
          "ste-menu-full-settings menu_menu-item_3EwYA menu_hoverable_3u9dt";

        var div = document.createElement("div");
        div.className = "settings-menu_option_3rMur";

        var icon = document.createElement("img");
        icon.src = ScratchTools.icons.main;
        icon.style.width = "24px";

        var span = document.createElement("span");
        span.className = "settings-menu_submenu-label_r-gA3";

        var label = document.createElement("span");
        label.textContent = "ScratchTools Settings";

        li.addEventListener("click", function () {
          document.body.click();
          chrome.runtime.sendMessage(ScratchTools.id, "openSettings");
        });

        li.appendChild(div);
        div.appendChild(icon);
        div.appendChild(span);
        span.appendChild(label);

        ul.appendChild(li);
      }
    }
  },
  "ste-full-settings-btn",
  false
);

async function blockliveDetection() {
  let gui = document
    .querySelector("#app")
    [
      Object.keys(app).find((key) => key.startsWith("__reactContainer"))
    ].child.stateNode.store.getState()?.scratchGui;
  if (!gui?.projectState) return;
  let detectBlocklive = await import("./blocklive-detection/blocklive-detect.js");
  detectBlocklive.default();
}
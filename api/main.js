var ScratchTools = {};
ScratchTools.Storage = {};
ScratchTools.Resources = {};
console.log("ScratchTools API Created");
if (
  window.location.href.startsWith("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  ScratchTools.type = "Editor";
} else {
  ScratchTools.type = "Website";
}

var allSelectors = {};
var allCallbacksForWait = {};
ScratchTools.waitForElements = function (selector, callback, id, rework) {
  if (allCallbacksForWait[selector] === undefined) {
    allCallbacksForWait[selector] = [{ callback: callback, id: id }];
  } else {
    allCallbacksForWait[selector].push({ callback: callback, id: id });
  }
  if (rework) {
    allSelectors[id] = [document.querySelectorAll(selector)];
  } else {
    allSelectors[id] = [];
    returnScratchToolsSelectorsMutationObserverCallbacks();
  }
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
  Object.keys(allCallbacksForWait).forEach(function (el) {
    document.querySelectorAll(el).forEach(function (element) {
      allCallbacksForWait[el].forEach(function (el2) {
        if (!allSelectors[el2.id].includes(element)) {
          allSelectors[el2.id].push(element);
          el2.callback(element);
        }
      });
    });
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

var allDisableFunctions = {};
ScratchTools.setDisable = function (feature, f) {
  allDisableFunctions[feature] = f;
  ScratchTools.console.log(`Set disable function for ${feature}.`);
};

ScratchTools.disable = function (feature) {
  ScratchTools.console.log(`Disabled ${feature}.`);
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

ScratchTools.modals = {
  create: function (data) {
    var div = document.createElement("div");
    div.className = "st-modal-blur-bg";

    var modal = document.createElement("div");
    modal.className = "st-modal";

    var h1 = document.createElement("h1");
    h1.textContent = data.title;
    modal.appendChild(h1);

    var p = document.createElement("p");
    p.textContent = data.description;
    modal.appendChild(p);

    var orangeBar = document.createElement("div");
    orangeBar.className = "st-modal-header";

    data.components?.forEach(function(component) {
      if (component.type === "code") {
        var code = document.createElement("code")
        code.textContent = component.content
        modal.appendChild(code)
      }
    })

    var closeButton = document.createElement("button")
    closeButton.textContent = "Close"
    closeButton.onclick = function() {
      div.remove()
    }
    modal.appendChild(closeButton)

    div.appendChild(modal);
    modal.prepend(orangeBar);
    document.body.appendChild(div);
  },
};

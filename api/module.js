let allFeatures = []
let alreadyInjected = [];

ScratchTools.modules.forEach(async function (script) {
  var feature = await import(ScratchTools.dir + "/api/feature/index.js");
  var shouldBeRun = true;
  if (script.runOn) {
    shouldBeRun = !!new URL(window.location.href).pathname.match(script.runOn);
  }
  if (script.pageType) {
    var pageType = document.querySelector("#app") ? 3 : 2;
    shouldBeRun = pageType === script.pageType;
  }
  if (shouldBeRun) {
    if (!alreadyInjected.includes(script.file)) {
      alreadyInjected.push(script.file);
      var fun = await import(script.file);
      if (fun.default) {
        var featureGenerated = feature.default(script.feature)
        allFeatures.push(featureGenerated)
        fun.default({
          feature: featureGenerated,
          console: {
            log: function (content) {
              ste.console.log(content, script.feature.id);
            },
            warn: function (content) {
              ste.console.warn(content, script.feature.id);
            },
            error: function (content) {
              ste.console.error(content, script.feature.id);
            },
          },
        });
      }
    }
  }
});

ScratchTools.injectModule = async function (script) {
  var feature = await import(ScratchTools.dir + "/api/feature/index.js");
  var shouldBeRun = true;
  if (script.runOn) {
    shouldBeRun = !!new URL(window.location.href).pathname.match(script.runOn);
  }
  if (script.pageType) {
    var pageType = document.querySelector("#app") ? 3 : 2;
    shouldBeRun = pageType === script.pageType;
  }
  if (shouldBeRun) {
    if (!alreadyInjected.includes(script.file)) {
      alreadyInjected.push(script.file);
      var fun = await import(script.file);
      if (fun.default) {
        var featureGenerated = feature.default(script.feature)
        allFeatures.push(featureGenerated)
        fun.default({
          feature: featureGenerated,
          console: {
            log: function (content) {
              ste.console.log(content, script.feature.id);
            },
            warn: function (content) {
              ste.console.warn(content, script.feature.id);
            },
            error: function (content) {
              ste.console.error(content, script.feature.id);
            },
          },
        });
      }
    } else {
      allFeatures.filter((el) => el.self.id === script.feature.id).forEach(function(el) {
        el.self.enabled = true
      })
      ScratchTools.managedElements.filter((el) => el.feature === script.feature.id).forEach(function(el) {
        if (!el.element) return;
        el.element.style.display = el?.previousDisplay || null
      })
      allEnableFunctions[script.feature.id]?.();
    }
  }
};

async function loadApril() {
  let april = await import("./april/index.js")
  april.default()
}
loadApril()
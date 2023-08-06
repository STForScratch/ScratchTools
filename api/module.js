let alreadyInjected = [];

ScratchTools.modules.forEach(async function (script) {
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
      fun.default({
        feature: new Feature(script.feature),
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
});

ScratchTools.injectModule = async function (script) {
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
      fun.default({
        feature: new Feature(script.feature),
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
    } else {
      allEnableFunctions[script.feature.id]?.();
    }
  }
};

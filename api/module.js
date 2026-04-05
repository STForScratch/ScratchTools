let allFeatures = []
let alreadyInjected = [];

function scratchClass(name) {
  let element = document.querySelector(`[class*='${name}']`);
  if (element) {
    let classes = [...element.classList];
    return classes.find((el) => el.includes(name));
  } else {
    let text = []

    for (var i in ScratchTools.cssFiles) {
      text.push(ScratchTools.cssFiles[i].data)
    }

    text = text.join("\n\n")
    let classes = ScratchTools.getClassNamesFromCSSText(text)

    let relClass = classes.find((el) => el.includes(name))
    return relClass
  }
}

function className(name) {
  return "ste-" + name.toLowerCase().replaceAll(" ", "-")
}

async function ensureFeatureRuntimeData(featureId) {
  if (!featureId || !Array.isArray(ScratchTools?.Features?.data)) {
    return;
  }

  let existing = ScratchTools.Features.data.find(function (el) {
    return el.id === featureId;
  });

  let needsRuntimeData =
    !existing ||
    !Array.isArray(existing.resources) ||
    !Array.isArray(existing.options);

  if (!needsRuntimeData) {
    return;
  }

  let featureData = null;
  try {
    let response = await fetch(`${ScratchTools.dir}/features/${featureId}/data.json`);
    if (response.ok) {
      featureData = await response.json();
    }
  } catch (error) {}

  if (!featureData) {
    if (!existing) {
      ScratchTools.Features.data.push({
        id: featureId,
        resources: [],
        options: [],
        localesData: {},
      });
    }
    return;
  }

  let merged = Object.assign({}, existing || {}, featureData);
  merged.id = featureId;
  merged.resources = Array.isArray(merged.resources) ? merged.resources : [];
  merged.options = Array.isArray(merged.options) ? merged.options : [];
  merged.localesData = merged.localesData || existing?.localesData || {};

  if (existing) {
    Object.assign(existing, merged);
  } else {
    ScratchTools.Features.data.push(merged);
  }
}

function runFeatureEntry(fun, script, featureGenerated) {
  let featureLabel = script?.feature?.id || script?.file || "module-loader";
  try {
    let response = fun.default({
      feature: featureGenerated,
      scratchClass,
      className,
      console: {
        log: function (content) {
          ste.console.log(content, featureLabel);
        },
        warn: function (content) {
          ste.console.warn(content, featureLabel);
        },
        error: function (content) {
          ste.console.error(content, featureLabel);
        },
      },
    });

    if (response && typeof response.then === "function") {
      Promise.resolve(response).catch(function (error) {
        ste.console.error(error, featureLabel);
      });
    }
  } catch (error) {
    ste.console.error(error, featureLabel);
  }
}

ScratchTools.modules.forEach(async function (script) {
  try {
    await ensureFeatureRuntimeData(script?.feature?.id);
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
          runFeatureEntry(fun, script, featureGenerated);
        }
      }
    }
  } catch (error) {
    ste.console.error(error, script?.feature?.id || script?.file || "module-loader");
  }
});

ScratchTools.injectModule = async function (script) {
  try {
    await ensureFeatureRuntimeData(script?.feature?.id);
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
          runFeatureEntry(fun, script, featureGenerated);
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
  } catch (error) {
    ste.console.error(error, script?.feature?.id || script?.file || "module-loader");
  }
};

async function loadApril() {
  let april = await import("./april/index.js")
  april.default()
}
loadApril()
let alreadyInjected = []

ScratchTools.modules.forEach(async function (script) {
  if (!alreadyInjected.includes(script.file)) {
    alreadyInjected.push(script.file);
    var fun = await import(script.file);
    fun.default({
      feature: new Feature(script.feature),
      console: {
        log: function(content) {
          ste.console.log(content, script.feature.id)
        },
        warn: function(content) {
          console.log(script)
          ste.console.warn(content, script.feature.id)
        },
        error: function(content) {
          ste.console.error(content, script.feature.id)
        }
      },
    });
  }
});

ScratchTools.injectModule = async function(script) {
  if (!alreadyInjected.includes(script.file)) {
    alreadyInjected.push(script.file);
    var fun = await import(script.file);
    fun.default({
      feature: new Feature(script.feature),
      console: {
        log: function(content) {
          ste.console.log(content, script.feature.id)
        },
        warn: function(content) {
          console.log(script)
          ste.console.warn(content, script.feature.id)
        },
        error: function(content) {
          ste.console.error(content, script.feature.id)
        }
      },
    });
  } else {
    allEnableFunctions[script.feature.id]?.()
  }
}
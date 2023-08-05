ScratchTools.modules.forEach(async function (script) {
  var fun = await import(script.file);
  fun.default({
    feature: new Feature(script.feature),
  });
});

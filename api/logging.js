ScratchTools.console = {};

ScratchTools.console.styleLog = function (text, backgroundColor) {
  var styleArray = [
    "padding: 0.1rem",
    "background-color: " + backgroundColor,
    "border-radius: 0.2rem",
    "color: black",
  ];
  console.log("%cScratchTools", styleArray.join(";"), text);
};

ScratchTools.console.log = function (text) {
  ScratchTools.console.styleLog(text, "lime");
};

ScratchTools.console.warn = function (text) {
  ScratchTools.console.styleLog(text, "yellow");
};

ScratchTools.console.error = function (text) {
  ScratchTools.console.styleLog(text, "#ff9f00");
};

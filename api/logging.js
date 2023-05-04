ScratchTools.console = {};
ScratchTools.console.log = function (text) {
  var styleArray = [
    "padding: 0.1rem",
    "background-color: lime",
    "border-radius: 0.2rem",
    "color: black",
  ];
  console.log("%cScratchTools", styleArray.join(";"), text);
};
ScratchTools.console.warn = function (text) {
  var styleArray = [
    "padding: 0.1rem",
    "background-color: yellow",
    "border-radius: 0.2rem",
    "color: black",
  ];
  console.log("%cScratchTools", styleArray.join(";"), text);
};
ScratchTools.console.error = function (text) {
  var styleArray = [
    "padding: 0.1rem",
    "background-color: #3FA9F5",
    "border-radius: 0.2rem",
    "color: black",
  ];
  console.log("%cScratchTools", styleArray.join(";"), text);
};

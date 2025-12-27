// Thank you to mxmou, WorldLanguages, ErrorGamer2000, apple502j, TheColaber, and towerofnix

function immediatelyRunFunctionInMainWorld(fn) {
  if (typeof fn !== "function") throw "Expected function";
  const div = document.createElement("div");
  div.setAttribute("onclick", "(" + fn + ")()");
  document.documentElement.appendChild(div);
  div.click();
  div.remove();
}

immediatelyRunFunctionInMainWorld(() => {
  const oldBind = Function.prototype.bind;
  window.__steTraps = new EventTarget()
  const onceMap = (__steTraps._onceMap = Object.create(null));

  Function.prototype.bind = function (...args) {
    if (Function.prototype.bind === oldBind) {
      return oldBind.apply(this, args);
    } else if (
      args[0] &&
      Object.prototype.hasOwnProperty.call(args[0], "editingTarget") &&
      Object.prototype.hasOwnProperty.call(args[0], "runtime")
    ) {
      onceMap.vm = args[0];
      Function.prototype.bind = oldBind;
      return oldBind.apply(this, args);
    } else {
      return oldBind.apply(this, args);
    }
  };
});

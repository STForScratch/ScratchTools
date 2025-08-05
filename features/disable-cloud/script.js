export default async function ({ feature, console }) {
  feature.traps.gui().projectState.cloudStatus = "ENABLED";

  ScratchTools.waitForElements(".extension-chip", function (chip) {
    if (!chip.firstChild.src.endsWith("/svgs/project/clouddata.svg")) return;
    if (chip.querySelector(".ste-cloud-disable")) return;

    let content = chip.querySelector(".extension-content");

    let outer = document.createElement("div");
    outer.className = "ste-action-holder";
    outer.appendChild(content.lastChild);

    let div = document.createElement("div");
    div.className = "extension-action ste-cloud-disable";
    outer.appendChild(div);

    feature.self.hideOnDisable(div)

    let span = document.createElement("span");
    span.textContent = "Disable";
    div.appendChild(span);

    span.addEventListener("click", function () {
      if (span.textContent === "Disable") {
        span.textContent = "Enable";
        feature.traps.gui().projectState.cloudStatus = "DISABLED";
      } else {
        span.textContent = "Disable";
        feature.traps.gui().projectState.cloudStatus = "ENABLED";
      }
    });

    content.appendChild(outer);
  });

  const nativeWsSend = WebSocket.prototype.send;
  WebSocket.prototype.send = function (...args) {
    let data = JSON.parse(args[0]);
    if (
      data.method === "set" &&
      feature.traps.gui().projectState.cloudStatus === "DISABLED" &&
      feature.self.enabled
    )
      return;
    return nativeWsSend.call(this, ...args);
  };
}

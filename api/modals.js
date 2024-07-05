HTMLElement.prototype.setScratchTools = function () {
  this.style.cursor = "pointer";
  this.addEventListener("click", function () {
    ScratchTools.modals.create({
      title: "Added by ScratchTools",
      description: "This element was added by a feature in ScratchTools.",
    });
  });
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

    data.components?.forEach(function (component) {
      if (component.type === "code") {
        var code = document.createElement("code");
        code.textContent = component.content;
        modal.appendChild(code);
      } else if (component.type === "html") {
        modal.appendChild(component.content);
      }
    });

    var closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.onclick = function () {
      div.remove();
    };
    modal.appendChild(closeButton);

    div.appendChild(modal);
    modal.prepend(orangeBar);
    document.body.appendChild(div);

    return {
      close: function () {
        div.remove();
      },
    };
  },
};

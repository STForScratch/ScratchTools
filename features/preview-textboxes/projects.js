
  function preview() {
    document
      .querySelectorAll(".project-description-form")
      .forEach(function (el) {
        el.className = "project-description";
        if (el.querySelector("textarea").value === "") {
          el.parentNode.style.display = "none";
        } else {
          el.firstChild.style.display = "none";
          if (el.parentNode.parentNode.lastChild.style.display === "none") {
            el.parentNode.style.marginBottom = "0";
          }
          var span = document.createElement("span");
          span.textContent = el.querySelector("textarea").value;
          el.prepend(span);
          span.className = "scratchtoolsPreviewText";
        }
      });
  }
  function reset() {
    document
      .querySelectorAll(".scratchtoolsPreviewText")
      .forEach(function (el) {
        el.remove();
      });
    document.querySelectorAll(".project-description").forEach(function (el) {
      el.parentNode.style.display = "flex";
      el.className = "project-description-form";
      el.firstChild.style.display = "flex";
      el.parentNode.parentNode.firstChild.style.marginBottom = "0.75rem";
    });
  }
  ScratchTools.waitForElements(
    "div.flex-row.action-buttons",
    setup,
    "preview textboxes project",
    false
  );
  function setup() {
    if (
      document.querySelector(".scratchtools-preview-button") === null &&
      document.querySelector(".project-description-form") !== null
    ) {
      var btn = document.createElement("button");
      btn.innerHTML = "<span>Preview Description</span>";
      btn.className = "button action-button scratchtools-preview-button";
      btn.onclick = function () {
        if (btn.textContent === "Stop Preview") {
          btn.firstChild.textContent = "Preview Description";
          reset();
        } else {
          btn.firstChild.textContent = "Stop Preview";
          preview();
        }
      };
      document.querySelector("div.flex-row.action-buttons").appendChild(btn);
    }
  }
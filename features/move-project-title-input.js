ScratchTools.waitForElements(
  "[class^='gui_menu-bar-position_'] [class*='project-title-input_title-field_']",
  function (input) {
    input.remove();
  },
  "remove-title-from-nav",
  false
);

ScratchTools.waitForElements(
  'div[class^="stage-header_stage-size-row"]',
  function () {
    if (!document.querySelector(".st-new-title-input") && !document.querySelector("span[class*='menu-bar_remix-button_']")) {
      var input = document.createElement("input");
      input.className =
        "input_input-form_l9eYg project-title-input_title-field_en5Gd menu-bar_title-field-growable_3qr4G";
      input.value = window.newTitle || ScratchTools.Scratch.scratchGui().projectTitle;
      input.placeholder = "Title";
      input.style.width = "100%";
      input.style.color = "gray";
      input.classList.add("st-new-title-input");
      input.style.marginLeft = ".2rem";
      input.style.marginRight = ".2rem";
      input.addEventListener("focusout", async function () {
        var newName = input.value
        var data = await (
          await fetch(
            "https://api.scratch.mit.edu/projects/" +
              ScratchTools.Scratch.scratchGui().projectState.projectId,
            {
              headers: {
                accept: "application/json",
                "accept-language": "en, en;q=0.8",
                "content-type": "application/json",
                "x-token": ScratchTools.Auth.user.token,
              },
              referrer: "https://scratch.mit.edu/",
              referrerPolicy: "strict-origin-when-cross-origin",
              body: '{"title":"' + input.value + '"}',
              method: "PUT",
              mode: "cors",
              credentials: "omit",
            }
          )
        ).json();
        if (data.code === "BadRequest") {
          ScratchTools.modals.create({
            title: "Oops!",
            description: "Please keep the title of the project appropriate.",
          });
        } else {
          window.newTitle = newName
        }
      });
      ScratchTools.appendToSharedSpace({
        space: "stageHeader",
        element: input,
        order: 0,
      });
    }
  },
  "move-project-title"
);

var style = document.createElement("style");
style.textContent = `
    [class*='project-title-input_title-field_'] {
        color: #595959 !important;
    }
    
    [class*='menu-bar_menu-bar-item_'][class*='- menu-bar_growable_'] {
        display: none;
    }

    .st-new-title-input::placeholder {
      color: gray;
    }
    `;
document.body.appendChild(style);

ScratchTools.waitForElements(
  ".see-inside-button",
  function () {
    document.querySelectorAll(".st-new-title-input").forEach(function (el) {
      el.remove();
    });
  },
  "only-title-input-inside",
  false
);

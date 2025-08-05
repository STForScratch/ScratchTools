export default async function ({ feature, console, scratchClass }) {
  document.body.addEventListener("contextmenu", async (event) => {
    const ctxTarget = event.target.closest(
      ".react-contextmenu-wrapper, [data-state]"
    );
    if (!ctxTarget) return;
    const ctx = feature.getInternals(ctxTarget);

    if (!ctx) return;

    const listCtx = findParentWithProp(ctx, "opcode");
    if (listCtx && listCtx.props.id) {
      let listId = listCtx.props.id;

      let stage = feature.traps.vm.runtime.getTargetForStage();
      let list = stage.lookupVariableById(listId);

      if (list.type !== "list") return;

      const menuInternal =
        feature.getInternals(ctxTarget).return.stateNode.props.id;
      if (!menuInternal) return;

      let menus = document.querySelectorAll("body > nav.react-contextmenu");

      let menu = Array.prototype.find.call(menus, (pMenu) => {
        const menuInternals = feature.getInternals(pMenu);
        return menuInternals?.return?.stateNode?.props?.id === menuInternal;
      });

      if (menu.querySelector(".ste-copy-paste-list")) return;

      menu.prepend(
        optionBuilder("paste", async function () {
          try {
            let text = await getClipboardWithContextMenu();
            if (text) {
              let newItems = text.split("\n");

              if (
                confirm(
                  `Are you sure you want to add ${newItems.length} item${
                    newItems.length === 1 ? "s" : ""
                  } to your "${
                    stage.lookupVariableById(listId).name
                  }" list? This will clear all existing items.`
                )
              ) {
                stage.lookupVariableById(listId).value = newItems || [];

                updateList(listId);

                alert(
                  `Successfully pasted ${newItems.length} items to your "${
                    stage.lookupVariableById(listId).name
                  }" list!`
                );
              }
            } else {
              alert("Oops! You don't have anything copied!");
            }
          } catch (err) {
            alert("Oops! Something went wrong.");
          }
          closeContextMenu();
        })
      );

      menu.prepend(
        optionBuilder("copy", async function () {
          let text = stage.lookupVariableById(listId).value.join("\n");
          await navigator.clipboard.writeText(text);
          closeContextMenu();
        })
      );

      window.menu = menu;
    }

    function updateList(id) {
      feature.traps.vm.runtime.requestUpdateMonitor(
        new Map([
          ["id", id],
          ["x", Date.now()],
          ["y", 0],
        ])
      );
    }

    function closeContextMenu() {
      const clickEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      document.body.dispatchEvent(clickEvent);
    }

    function optionBuilder(text, callback) {
      let div = document.createElement("div");
      div.classList.add("react-contextmenu-item");
      div.classList.add(scratchClass("context-menu_menu-item_"));
      div.classList.add("ste-copy-paste-list");

      feature.self.hideOnDisable(div);

      div.addEventListener("click", callback);

      div.role = "menuitem";
      div.tabIndex = "-1";
      div.ariaDisabled = false;

      let span = document.createElement("span");
      span.textContent = text;
      div.appendChild(span);

      return div;
    }

    async function getClipboardWithContextMenu() {
      const input = document.createElement("input");
      input.style.position = "absolute";
      input.style.opacity = "0";
      document.body.appendChild(input);

      input.focus();

      try {
        const text = await navigator.clipboard.readText();
        return text;
      } catch (err) {
        console.log("Failed to read clipboard:", err);
      } finally {
        document.body.removeChild(input);
      }
    }

    // Credit to @mxmou on GitHub for findParentWithProp

    function findParentWithProp(reactInternalInstance, prop) {
      if (!reactInternalInstance) return null;
      while (
        !reactInternalInstance.stateNode?.props ||
        !Object.prototype.hasOwnProperty.call(
          reactInternalInstance.stateNode.props,
          prop
        )
      ) {
        if (!reactInternalInstance.return) return null;
        reactInternalInstance = reactInternalInstance.return;
      }
      return reactInternalInstance.stateNode;
    }
  });
}

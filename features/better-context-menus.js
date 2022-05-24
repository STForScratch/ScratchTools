var script = document.createElement('script')

script.innerHTML = `
  let workspace = Blockly.getMainWorkspace();
  let hooked = false;

  // Maps block opcodes to our custom context menu handler, if any.
  // Handlers are passed the menu options list and the Blockly SVG block
  // Handlers are expected to modify the options list in place in any way they choose (push, sort, pop, etc.)
  const menuLibrary = {
    // Add a way to rename variables from their reference
    data_variable: variableRenameFactory(3, 'variable'),

    // Add a way to rename lists from their reference
    data_listcontents: variableRenameFactory(3, 'list'),

    // This doesn't work. Seems to be an editor and scratch-vm desync.
    // event_broadcast: variableRenameFactory(3, 'broadcast'),

    // TODO: consider rename options on var sets, var changes, list gets, etc.

    // Add a way to jump to a block's definition on procedure call blocks
    procedures_call(options, block) {
      options.push({
        enabled: true,
        text: "Go To Definition",
        callback() {
          const procCode = block.procCode_;
          for (const block of workspace.getAllBlocks()) {
            if (block.type === 'procedures_prototype' && block.procCode_ === procCode) {
              const parent = block.parentBlock_;
              scrollToBlock(parent);
              break;
            }
          }
        },
      });
    },
  };

  function variableRenameFactory(insertIndex, type) {
    return function(options, block) {
      options.splice(insertIndex, 0, {
        enabled: true,
        text: `+"`Rename ${type}`"+`,
        callback() {
          const target = block.childBlocks_.length > 0 ? block.childBlocks_[0] : block;

          const inputList = target.inputList;
          const fieldRow = inputList[0].fieldRow;
          const variable = fieldRow[0].variable_;
          const variableId = variable.id_;
          const oldName = variable.name;

          // prompt() isn't perfect but works well enough for this use case
          const newName = prompt(`+"`Rename '${oldName}' ${type} to:`"+`, oldName);
          if (typeof newName !== 'string') {
            return;
          }
          workspace.renameVariableById(variableId, newName);
        },
      });
    };
  }

  function scrollToBlock(block) {
    const MARGIN = 20;
    const position = block.getRelativeToSurfaceXY();
    const metrics = workspace.getMetrics();
    const x = position.x * workspace.scale - metrics.contentLeft;
    const y = position.y * workspace.scale - metrics.contentTop;
    workspace.scrollbar.set(x - MARGIN, y - MARGIN);
  }

  function hook() {
    hooked = true;

    // We add our own change listener to react to all block creations
    workspace.addChangeListener(function(change) {
      if (change.type !== 'create') {
        return;
      }

      // change.ids is a list of blocks that have been created.
      for (const id of change.ids) {
        const block = workspace.getBlockById(id);
        if (!block) continue;
        const type = block.type;

        if (type in menuLibrary) {
          // customContextMenu will be called when a block's context menu is accessed.
          // It is passed a list it is expected to modify it in place.
          // Retain the original customContextMenu() (if any) to avoid breaking behavior.
          const nativeCustomContextMenu = block.customContextMenu;
          block.customContextMenu = function(options) {
            if (nativeCustomContextMenu) {
              nativeCustomContextMenu.call(this, options);
            }
            menuLibrary[type](options, this);
          }
        }
      }
    });
  }

  // If the workspace is already available, then we hook right away.
  if (workspace) {
    hook();
  } else {
    // Probably a project page outside of the editor.
    // Wait until the user sees inside before hooking since the editor object won't exist yet.
    document.body.addEventListener('click', function(e) {
      if (!hooked && e.target.closest('.see-inside-button')) {
        // The editor will be defined after Scratch's handler runs.
        setImmediate(function() {
          workspace = Blockly.getMainWorkspace();
          hook();
        });
      }
    });
  }
`
document.body.appendChild(script)

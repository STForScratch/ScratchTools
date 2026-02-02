/**
 * Command Palette Feature
 * Opens with Shift+P in the Scratch editor
 * Allows searching and inserting blocks or running commands
 */
export default async function ({ feature, console }) {
  // Track last mouse position for placing blocks and positioning palette
  let lastMouse = null;

  document.addEventListener("mousemove", (e) => {
    lastMouse = { x: e.clientX, y: e.clientY };
  });

  // ===== WORKSPACE UTILITIES =====

  /**
   * Get Blockly workspace safely via feature traps
   */
  function getWorkspace() {
    try {
      return feature.traps.blockly.getMainWorkspace();
    } catch (e) {
      return null;
    }
  }

  /**
   * Get Blockly XML utilities (prefers ScratchBlocks, falls back to global Blockly)
   */
  function getBlocklyXml() {
    try {
      const scratch = ScratchTools?.traps?.getScratchBlocks?.();
      if (scratch?.Xml?.textToDom && scratch?.Xml?.domToBlock) return scratch.Xml;
    } catch (e) {}
    if (window.Blockly?.Xml?.textToDom && window.Blockly?.Xml?.domToBlock) {
      return window.Blockly.Xml;
    }
    return null;
  }

  /**
   * Get Blockly message dictionary for localized block labels
   */
  function getBlocklyMsg() {
    try {
      const scratch = ScratchTools?.traps?.getScratchBlocks?.();
      if (scratch?.Msg) return scratch.Msg;
    } catch (e) {}
    return window.Blockly?.Msg || null;
  }

  // ===== BLOCK CREATION & PLACEMENT =====

  /**
   * Convert screen coordinates to workspace coordinates
   */
  function screenToWorkspace(ws, screenX, screenY) {
    try {
      const canvas = ws.getCanvas?.();
      const rect = canvas?.getBoundingClientRect?.();
      const metrics = ws.getMetrics?.();
      if (!rect || !metrics) return null;

      const scale = metrics.scale || 1;
      const clientX = screenX - rect.left;
      const clientY = screenY - rect.top;

      return {
        x: (metrics.viewLeft || 0) + clientX / scale,
        y: (metrics.viewTop || 0) + clientY / scale,
      };
    } catch (e) {
      return null;
    }
  }

  /**
   * Place a block at the given workspace coordinates
   */
  function placeBlockAt(block, targetX, targetY) {
    try {
      const current = block.getRelativeToSurfaceXY?.();
      if (current && typeof current.x === "number") {
        block.moveBy(targetX - current.x, targetY - current.y);
      } else {
        block.moveBy(targetX, targetY);
      }
    } catch (e) {
      console.warn("Failed to place block", e);
    }
  }

  /**
   * Place block at cursor position or fallback to default position
   */
  function placeAtCursor(block, ws) {
    if (lastMouse) {
      const wsCoords = screenToWorkspace(ws, lastMouse.x, lastMouse.y);
      if (wsCoords) {
        placeBlockAt(block, wsCoords.x, wsCoords.y);
        return;
      }
    }
    // Fallback: place at default position
    placeBlockAt(block, 100, 100);
  }

  /**
   * Create and place a block from XML definition
   */
  function insertBlock(xml, type) {
    const ws = getWorkspace();
    if (!ws) return;

    const Xml = getBlocklyXml();
    let block = null;

    try {
      if (Xml) {
        const dom = Xml.textToDom(xml);
        block = Xml.domToBlock(dom, ws);
      } else if (typeof ws.newBlock === "function") {
        block = ws.newBlock(type);
      }

      if (!block) {
        console.error("Could not create block");
        return;
      }

      block.initSvg?.();
      block.render?.();
    } catch (err) {
      console.error("Block creation failed", err);
      return;
    }

    // Try to connect to selected block, otherwise place at cursor
    const selected = ws.getSelected?.();
    if (selected?.nextConnection && block.previousConnection) {
      try {
        selected.nextConnection.connect(block.previousConnection);
      } catch (e) {
        placeAtCursor(block, ws);
      }
    } else {
      placeAtCursor(block, ws);
    }

    // Finalize and select the new block
    try {
      block.initSvg?.();
      block.render?.();
      block.select?.();
    } catch (e) {}

    // Attempt to start hover-drag
    startBlockDrag(block);
  }

  /**
   * Start a drag gesture on a block by simulating mouse events
   */
  function startBlockDrag(block) {
    if (!lastMouse || !block) return;

    try {
      // Wait for render to complete
      requestAnimationFrame(() => {
        try {
          const svgRoot = block.getSvgRoot?.() || block.svgGroup_;
          if (!svgRoot || typeof svgRoot.dispatchEvent !== "function") return;

          // Dispatch mousedown to start drag
          const mouseDownEvent = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: lastMouse.x,
            clientY: lastMouse.y,
            button: 0,
          });
          svgRoot.dispatchEvent(mouseDownEvent);

          // Small delay then dispatch mousemove to initiate drag gesture
          requestAnimationFrame(() => {
            try {
              const mouseMoveEvent = new MouseEvent("mousemove", {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: lastMouse.x + 2,
                clientY: lastMouse.y + 2,
                button: 0,
              });
              svgRoot.dispatchEvent(mouseMoveEvent);

              // Dispatch on document as well (Blockly may listen there)
              document.dispatchEvent(mouseMoveEvent);
            } catch (e) {}
          });
        } catch (e) {}
      });
    } catch (e) {}
  }

  // ===== PALETTE UI =====

  let palette = null;
  let selectedIndex = 0;
  let lastCandidates = [];
  let commandHistory = []; // Track recently used commands

  // Read keybinding settings
  const getKey = () => (feature.settings.get("key") || "P").toUpperCase();
  const getShift = () => feature.settings.get("shift") ?? true;
  const getCtrl = () => feature.settings.get("ctrl") ?? false;
  const getAlt = () => feature.settings.get("alt") ?? false;

  const KEY_OPEN = (e) => {
    const keyMatch = e.key.toUpperCase() === getKey();
    const shiftMatch = getShift() ? e.shiftKey : true;
    const ctrlMatch = getCtrl() ? (e.ctrlKey || e.metaKey) : true;
    const altMatch = getAlt() ? e.altKey : true;
    
    return keyMatch && shiftMatch && ctrlMatch && altMatch;
  };

  // Ensure hideOnDisable callback exists
  feature.self.hideOnDisable = feature.self.hideOnDisable || (() => {});

  /**
   * Create or return existing palette DOM elements
   */
  function createPalette() {
    if (palette) {
      return {
        el: palette,
        input: palette.querySelector(".ste-cp-input"),
        results: palette.querySelector(".ste-cp-results"),
      };
    }

    palette = document.createElement("div");
    palette.className = "ste-command-palette";
    palette.style.display = "none";

    const input = document.createElement("input");
    input.className = "ste-cp-input";
    input.placeholder = "Type a command or block...";
    palette.appendChild(input);

    const results = document.createElement("div");
    results.className = "ste-cp-results";
    palette.appendChild(results);

    document.body.appendChild(palette);
    feature.self.hideOnDisable(palette);

    // Input event handlers
    input.addEventListener("input", () => renderResults(input.value));

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectItem(selectedIndex + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectItem(selectedIndex - 1);
      } else if (e.key === "Tab") {
        e.preventDefault();
        selectItem(e.shiftKey ? selectedIndex - 1 : selectedIndex + 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeSelected();
      } else if (e.key === "Escape") {
        closePalette();
      }
    });

    // Click handler for result items
    results.addEventListener("click", (ev) => {
      const item = ev.target.closest(".ste-cp-item");
      if (item) {
        const idx = parseInt(item.dataset.idx, 10);
        selectItem(idx);
        executeSelected();
      }
    });

    return { el: palette, input, results };
  }

  /**
   * Open the command palette and position it near cursor
   */
  function openPalette() {
    const p = createPalette();
    p.el.style.display = null;
    p.el.style.opacity = "0";
    p.input.value = "";
    renderResults("");
    selectedIndex = 0;
    selectItem(0);

    requestAnimationFrame(() => {
      try {
        const pad = 8;
        const rect = p.el.getBoundingClientRect();
        const width = rect.width || p.el.offsetWidth || 560;
        const height = rect.height || p.el.offsetHeight || 200;
        let x, y;

        if (lastMouse) {
          const inputOffset = p.input.offsetLeft || 0;
          const inputWidth = p.input.offsetWidth || 200;
          x = Math.round(lastMouse.x - inputOffset - inputWidth / 2);
          y = lastMouse.y + 12;

          // Clamp to viewport
          x = Math.max(pad, Math.min(x, window.innerWidth - width - pad));
          y = Math.max(pad, Math.min(y, window.innerHeight - height - pad));

          p.el.style.left = x + "px";
          p.el.style.top = y + "px";
          p.el.style.transform = "none";
        } else {
          p.el.style.left = "50%";
          p.el.style.top = "18%";
          p.el.style.transform = "translateX(-50%)";
        }
      } catch (e) {}

      p.el.style.opacity = "";
      p.input.focus();
    });
  }

  /**
   * Close and hide the command palette
   */
  function closePalette() {
    if (!palette) return;
    palette.style.display = "none";
  }

  /**
   * Convert hex color to rgba string
   */
  function hexToRgba(hex, a) {
    if (!hex) return "rgba(0,0,0," + (a || 0) + ")";
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${a || 1})`;
  }

  /**
   * Clear and populate results list (uses DOM methods for security)
   */
  function setResults(list) {
    const p = createPalette();

    // Clear existing results
    while (p.results.firstChild) {
      p.results.removeChild(p.results.firstChild);
    }

    // Check if showing history (empty query)
    const showingHistory = p.input.value.trim() === "" && commandHistory.length > 0;
    const historyCount = showingHistory ? Math.min(commandHistory.length, list.length) : 0;

    list.forEach((r, idx) => {
      const item = document.createElement("div");
      item.className = "ste-cp-item";
      item.dataset.idx = idx;

      // Left section: swatch + title
      const left = document.createElement("div");
      left.className = "ste-cp-left";

      const swatch = document.createElement("span");
      swatch.className = "ste-cp-swatch";
      if (r.categoryColour) swatch.style.background = r.categoryColour;
      left.appendChild(swatch);

      const title = document.createElement("span");
      title.className = "ste-cp-title";
      title.textContent = r.text;
      left.appendChild(title);

      // Right section: type label
      const right = document.createElement("div");
      right.className = "ste-cp-right";

      const typeSpan = document.createElement("span");
      typeSpan.className = "ste-cp-type";
      // Show "Recent" for history items
      if (idx < historyCount) {
        typeSpan.textContent = "Recent";
        typeSpan.style.fontStyle = "italic";
        typeSpan.style.opacity = "0.7";
      } else {
        typeSpan.textContent = r.category || r.type || "Action";
      }
      right.appendChild(typeSpan);

      item.appendChild(left);
      item.appendChild(right);

      // Apply category color styling
      if (r.categoryColour) {
        try {
          item.dataset.catColor = r.categoryColour;
          item.style.backgroundColor = hexToRgba(r.categoryColour, 0.12);
          item.style.borderLeft = `4px solid ${r.categoryColour}`;
          item.style.paddingLeft = "4px";
        } catch (e) {}
      }

      if (idx === selectedIndex) {
        item.classList.add("ste-cp-active");
      }

      p.results.appendChild(item);
    });

    // Adjust selection bounds
    if (selectedIndex >= list.length) selectedIndex = list.length - 1;
    if (selectedIndex < 0) selectedIndex = 0;
  }

  /**
   * Update visual selection to specified index
   */
  function selectItem(idx) {
    const p = createPalette();
    const items = [...p.results.querySelectorAll(".ste-cp-item")];
    if (items.length === 0) return;

    items.forEach((it) => it.classList.remove("ste-cp-active"));
    selectedIndex = Math.max(0, Math.min(items.length - 1, idx));
    items[selectedIndex]?.classList.add("ste-cp-active");
    items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }

  /**
   * Execute the currently selected item's action
   */
  function executeSelected() {
    const p = createPalette();
    const items = [...p.results.querySelectorAll(".ste-cp-item")];
    if (!items[selectedIndex]) return;

    const idx = parseInt(items[selectedIndex].dataset.idx, 10);
    const cmd = lastCandidates[idx];
    closePalette();

    if (!cmd) return;

    // Add to history (avoid duplicates, keep most recent)
    commandHistory = commandHistory.filter((c) => c.id !== cmd.id);
    commandHistory.unshift(cmd);
    if (commandHistory.length > 10) commandHistory.pop();

    try {
      cmd.action();
    } catch (err) {
      console.error("Command action error", err);
    }
  }

  // ===== COMMANDS =====

  let pendingBlockAction = null;

  /**
   * Wait for user to click a block, then perform an action on it
   */
  function waitForBlockClick(actionName, actionFn, timeout = 5000) {
    const ws = getWorkspace();
    if (!ws) return;

    // Cancel any pending action
    if (pendingBlockAction) {
      pendingBlockAction.cancel();
    }

    // Create overlay message
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.65);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      z-index: 100000;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    overlay.textContent = `Click a block to ${actionName}... (ESC to cancel)`;
    document.body.appendChild(overlay);

    let timeoutId = null;
    let clickHandler = null;
    let keyHandler = null;

    const cancel = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (clickHandler) document.removeEventListener("mousedown", clickHandler, true);
      if (keyHandler) document.removeEventListener("keydown", keyHandler, true);
      if (overlay.parentNode) overlay.remove();
      document.body.style.cursor = "";
      pendingBlockAction = null;
    };

    // Click handler to intercept block clicks
    clickHandler = (e) => {
      // Find clicked block
      let target = e.target;
      let block = null;

      // Walk up DOM tree to find block element
      while (target && target !== document) {
        if (target.classList?.contains("blocklyDraggable")) {
          // Found a block SVG element - get the block instance
          const blockId = target.getAttribute("data-id");
          if (blockId) {
            block = ws.getBlockById(blockId);
          }
          break;
        }
        target = target.parentElement;
      }

      if (block) {
        e.preventDefault();
        e.stopPropagation();
        cancel();
        
        try {
          actionFn(block);
        } catch (err) {
          console.error(`${actionName} failed`, err);
        }
      }
    };

    // ESC to cancel
    keyHandler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      }
    };

    // Set up listeners
    document.addEventListener("mousedown", clickHandler, true);
    document.addEventListener("keydown", keyHandler, true);
    document.body.style.cursor = "pointer";

    // Timeout
    timeoutId = setTimeout(() => {
      cancel();
    }, timeout);

    pendingBlockAction = { cancel };
  }

  /**
   * Built-in editor commands
   */
  function baseCommands() {
    return [
      {
        id: "clean-up",
        text: "Clean up blocks",
        type: "Blocks",
        action: () => {
          const ws = getWorkspace();
          if (!ws) return;
          ws.cleanUp();
        },
      },
      {
        id: "collapse",
        text: "Collapse all blocks",
        type: "Blocks",
        action: () => {
          const ws = getWorkspace();
          if (!ws) return;
          ws.getTopBlocks(true).forEach((b) => {
            try { b.setCollapsed(true); } catch (e) {}
          });
        },
      },
      {
        id: "expand",
        text: "Expand all blocks",
        type: "Blocks",
        action: () => {
          const ws = getWorkspace();
          if (!ws) return;
          ws.getTopBlocks(true).forEach((b) => {
            try { b.setCollapsed(false); } catch (e) {}
          });
        },
      },
      {
        id: "duplicate",
        text: "Duplicate block...",
        type: "Blocks",
        action: () => {
          waitForBlockClick("duplicate", (block) => {
            const ws = getWorkspace();
            const Xml = getBlocklyXml();
            if (!ws || !Xml) return;
            try {
              const xml = Xml.blockToDom(block);
              const copy = Xml.domToBlock(xml, ws);
              copy.initSvg();
              copy.render();
              copy.moveBy(10, 10);
            } catch (e) {
              console.error("Duplicate failed", e);
            }
          });
        },
      },
      {
        id: "delete",
        text: "Delete block...",
        type: "Blocks",
        action: () => {
          waitForBlockClick("delete", (block) => {
            try {
              block.dispose(true);
            } catch (e) {
              console.error("Delete failed", e);
            }
          });
        },
      },
    ];
  }

  // ===== TOOLBOX BLOCK DISCOVERY =====

  /**
   * Lookup a Blockly message key
   */
  function lookupMessage(key) {
    const msg = getBlocklyMsg();
    return msg?.[key] || null;
  }

  /**
   * Substitute %1, %2, etc placeholders in a message string
   */
  function substitutePlaceholders(msg, node, type) {
    if (!msg || !/%\d+/.test(msg)) return msg;

    try {
      let doc = null;
      if (typeof node === "string") {
        doc = new DOMParser().parseFromString(node, "application/xml");
      } else if (node?.outerHTML) {
        doc = new DOMParser().parseFromString(node.outerHTML, "application/xml");
      } else if (node?.getElementsByTagName) {
        doc = node;
      }

      const vals = [];
      if (doc) {
        const fields = doc.getElementsByTagName("field") || [];
        for (let i = 0; i < fields.length; i++) {
          vals.push((fields[i].textContent || "").trim());
        }
        const shadows = doc.getElementsByTagName("shadow") || [];
        for (let i = 0; i < shadows.length; i++) {
          const fs = shadows[i].getElementsByTagName("field") || [];
          for (let j = 0; j < fs.length; j++) {
            vals.push((fs[j].textContent || "").trim());
          }
        }
      }

      let result = msg;
      const placeholderIndices = [];
      msg.replace(/%(\d+)/g, (m, n, offset) => {
        placeholderIndices.push({ match: m, index: parseInt(n, 10), offset });
      });

      // Replace placeholders with actual values or remove them
      for (let i = placeholderIndices.length - 1; i >= 0; i--) {
        const ph = placeholderIndices[i];
        const v = vals[ph.index - 1];
        
        if (v && v.length && !/^[\d\s]+$/.test(v)) {
          // Has a good value, use it
          result = result.slice(0, ph.offset) + v + result.slice(ph.offset + ph.match.length);
        } else {
          // No value or just numbers - remove placeholder and surrounding spaces
          const before = result.slice(0, ph.offset).trimEnd();
          const after = result.slice(ph.offset + ph.match.length).trimStart();
          result = before + (before && after ? " " : "") + after;
        }
      }

      return result.replace(/\s+/g, " ").trim();
    } catch (e) {
      return msg;
    }
  }

  /**
   * Resolve a human-readable label for a block type
   */
  function resolveBlockLabel(type, node) {
    const typeStr = (type || "").toString();
    const typeUp = typeStr.toUpperCase();
    const parts = typeUp.split("_");
    const suffix = parts.slice(1).join("_");
    const prefix = parts[0] || "";

    // Special handling for common operators
    const operatorMap = {
      OPERATOR_GT: "> greater than",
      OPERATOR_LT: "< less than",
      OPERATOR_EQUALS: "= equals",
      OPERATOR_AND: "and",
      OPERATOR_OR: "or",
      OPERATOR_NOT: "not",
      OPERATOR_ADD: "+ add",
      OPERATOR_SUBTRACT: "- subtract",
      OPERATOR_MULTIPLY: "* multiply",
      OPERATOR_DIVIDE: "/ divide",
      OPERATOR_MOD: "mod",
      OPERATOR_ROUND: "round",
      OPERATOR_MATHOP: "math operation",
    };

    if (operatorMap[typeUp]) {
      return operatorMap[typeUp];
    }

    // Try explicit message keys
    const candidates = [`BKY_${typeUp}`, typeUp, `${prefix}_${suffix}`, suffix].filter(Boolean);

    for (const key of candidates) {
      const v = lookupMessage(key);
      if (v && typeof v === "string" && /[A-Za-z]/.test(v)) {
        return substitutePlaceholders(v, node, typeStr);
      }
    }

    // Fuzzy scan message keys for best match
    const msg = getBlocklyMsg();
    if (msg && suffix) {
      let best = null;
      for (const k in msg) {
        const ku = k.toUpperCase();
        if (ku.endsWith(suffix) || ku.includes(`_${suffix}`) || ku.includes(suffix)) {
          const v = msg[k];
          if (typeof v !== "string" || !/[A-Za-z]/.test(v) || v.trim().length < 2) continue;
          
          // Skip unhelpful messages
          if (v.includes("already exists") || v.includes("error") || v.includes("warning")) continue;
          
          // Prefer messages without placeholders or with fewer placeholders
          const placeholderCount = (v.match(/%\d+/g) || []).length;
          const score = (v.includes(" ") ? 3 : 0) + Math.min(5, v.length / 8) - (placeholderCount * 2);
          
          if (!best || score > best.score) best = { val: v, score };
        }
      }
      if (best) {
        const result = substitutePlaceholders(best.val, node, typeStr);
        // Don't use result if it's mostly just placeholders that got removed
        if (result.length >= 3) return result;
      }
    }

    // Fallback: prettify type name
    return typeStr.split("_").slice(1).join(" ").replace(/\b\w/g, (c) => c.toUpperCase()).trim() || typeStr;
  }

  /**
   * Resolve category display name from category object or key
   */
  function resolveCategoryName(cat) {
    if (!cat) return null;
    let name = cat.name || cat || null;
    if (!name) return null;

    const m = name.match(/%\{(.+)\}/);
    if (m) {
      const v = lookupMessage(m[1]);
      if (v) return v.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      const n = m[1].replace(/^(?:BKY_)?(?:CATEGORY_)?/i, "").replace(/_/g, " ");
      return n.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }

    if (/bky|category/i.test(name)) {
      const suffix = name.split(/[ _]/).slice(-1)[0];
      return (suffix || "").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  /**
   * Get dynamic blocks (variables, lists, custom procedures)
   */
  function getDynamicBlocks() {
    const ws = getWorkspace();
    if (!ws) return [];

    const blocks = [];
    const variableColor = "#FF8C1A";
    const listColor = "#FF661A";
    const procedureColor = "#FF6680";

    // Get all variables (excluding lists)
    try {
      const variables = ws.getAllVariables?.() || [];
      for (const v of variables) {
        // Skip list variables - they're handled separately
        const varType = v.type || v.getType?.();
        if (varType === "list") continue;

        const varName = v.name || v.getName?.() || "";
        const varId = v.id || v.getId?.() || "";
        
        if (!varName) continue;

        // Reporter block (just the variable value)
        blocks.push({
          type: `data_variable_${varId}`,
          xml: `<block type="data_variable"><field name="VARIABLE" id="${varId}" variabletype="">${varName}</field></block>`,
          text: varName,
          category: "Variables",
          categoryColour: variableColor,
        });

        // Set variable block
        blocks.push({
          type: `data_setvariableto_${varId}`,
          xml: `<block type="data_setvariableto"><field name="VARIABLE" id="${varId}" variabletype="">${varName}</field><value name="VALUE"><shadow type="text"><field name="TEXT">0</field></shadow></value></block>`,
          text: `set ${varName} to`,
          category: "Variables",
          categoryColour: variableColor,
        });

        // Change variable block
        blocks.push({
          type: `data_changevariableby_${varId}`,
          xml: `<block type="data_changevariableby"><field name="VARIABLE" id="${varId}" variabletype="">${varName}</field><value name="VALUE"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>`,
          text: `change ${varName} by`,
          category: "Variables",
          categoryColour: variableColor,
        });

        // Show variable
        blocks.push({
          type: `data_showvariable_${varId}`,
          xml: `<block type="data_showvariable"><field name="VARIABLE" id="${varId}" variabletype="">${varName}</field></block>`,
          text: `show variable ${varName}`,
          category: "Variables",
          categoryColour: variableColor,
        });

        // Hide variable
        blocks.push({
          type: `data_hidevariable_${varId}`,
          xml: `<block type="data_hidevariable"><field name="VARIABLE" id="${varId}" variabletype="">${varName}</field></block>`,
          text: `hide variable ${varName}`,
          category: "Variables",
          categoryColour: variableColor,
        });
      }
    } catch (e) {}

    // Get all lists
    try {
      const allVars = ws.getAllVariables?.() || [];
      const lists = allVars.filter(v => (v.type || v.getType?.()) === "list");
      
      for (const l of lists) {
        const listName = l.name || l.getName?.() || "";
        const listId = l.id || l.getId?.() || "";
        
        if (!listName) continue;

        // List reporter
        blocks.push({
          type: `data_listcontents_${listId}`,
          xml: `<block type="data_listcontents"><field name="LIST" id="${listId}" variabletype="list">${listName}</field></block>`,
          text: listName,
          category: "Lists",
          categoryColour: listColor,
        });

        // Add to list
        blocks.push({
          type: `data_addtolist_${listId}`,
          xml: `<block type="data_addtolist"><field name="LIST" id="${listId}" variabletype="list">${listName}</field><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value></block>`,
          text: `add to ${listName}`,
          category: "Lists",
          categoryColour: listColor,
        });

        // Item of list
        blocks.push({
          type: `data_itemoflist_${listId}`,
          xml: `<block type="data_itemoflist"><field name="LIST" id="${listId}" variabletype="list">${listName}</field><value name="INDEX"><shadow type="math_integer"><field name="NUM">1</field></shadow></value></block>`,
          text: `item of ${listName}`,
          category: "Lists",
          categoryColour: listColor,
        });

        // Delete item of list
        blocks.push({
          type: `data_deleteoflist_${listId}`,
          xml: `<block type="data_deleteoflist"><field name="LIST" id="${listId}" variabletype="list">${listName}</field><value name="INDEX"><shadow type="math_integer"><field name="NUM">1</field></shadow></value></block>`,
          text: `delete item of ${listName}`,
          category: "Lists",
          categoryColour: listColor,
        });

        // Insert at list
        blocks.push({
          type: `data_insertatlist_${listId}`,
          xml: `<block type="data_insertatlist"><field name="LIST" id="${listId}" variabletype="list">${listName}</field><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value><value name="INDEX"><shadow type="math_integer"><field name="NUM">1</field></shadow></value></block>`,
          text: `insert at ${listName}`,
          category: "Lists",
          categoryColour: listColor,
        });

        // Replace item of list
        blocks.push({
          type: `data_replaceitemoflist_${listId}`,
          xml: `<block type="data_replaceitemoflist"><field name="LIST" id="${listId}" variabletype="list">${listName}</field><value name="INDEX"><shadow type="math_integer"><field name="NUM">1</field></shadow></value><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value></block>`,
          text: `replace item of ${listName}`,
          category: "Lists",
          categoryColour: listColor,
        });

        // Length of list
        blocks.push({
          type: `data_lengthoflist_${listId}`,
          xml: `<block type="data_lengthoflist"><field name="LIST" id="${listId}" variabletype="list">${listName}</field></block>`,
          text: `length of ${listName}`,
          category: "Lists",
          categoryColour: listColor,
        });

        // List contains item
        blocks.push({
          type: `data_listcontainsitem_${listId}`,
          xml: `<block type="data_listcontainsitem"><field name="LIST" id="${listId}" variabletype="list">${listName}</field><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value></block>`,
          text: `${listName} contains`,
          category: "Lists",
          categoryColour: listColor,
        });

        // Show list
        blocks.push({
          type: `data_showlist_${listId}`,
          xml: `<block type="data_showlist"><field name="LIST" id="${listId}" variabletype="list">${listName}</field></block>`,
          text: `show list ${listName}`,
          category: "Lists",
          categoryColour: listColor,
        });

        // Hide list
        blocks.push({
          type: `data_hidelist_${listId}`,
          xml: `<block type="data_hidelist"><field name="LIST" id="${listId}" variabletype="list">${listName}</field></block>`,
          text: `hide list ${listName}`,
          category: "Lists",
          categoryColour: listColor,
        });
      }
    } catch (e) {}

    // Get custom procedures (My Blocks)
    try {
      const allBlocks = ws.getAllBlocks?.(false) || [];
      const procedureDefs = allBlocks.filter(b => b.type === "procedures_definition");
      const seenProcs = new Set();
      
      for (const def of procedureDefs) {
        try {
          // Get the prototype block (child of definition)
          const children = def.getChildren?.(false) || [];
          const prototype = children.find(c => c.type === "procedures_prototype");
          
          if (!prototype) continue;

          // Try multiple methods to get procedure name
          let procName = "";
          
          // Method 1: procCode_ field (Scratch 3.0)
          if (prototype.procCode_) {
            procName = prototype.procCode_;
          }
          
          // Method 2: getProcedureCall method
          if (!procName && typeof prototype.getProcedureCall === "function") {
            procName = prototype.getProcedureCall();
          }
          
          // Method 3: Check mutation
          if (!procName) {
            const mutation = prototype.mutationToDom?.();
            if (mutation) {
              procName = mutation.getAttribute("proccode") || "";
            }
          }
          
          // Method 4: Look for field with procedure name
          if (!procName && prototype.inputList) {
            for (const input of prototype.inputList) {
              for (const field of input.fieldRow || []) {
                if (field.name === "PROCCODE" || field.name === "NAME") {
                  procName = field.getValue?.() || "";
                  if (procName) break;
                }
              }
              if (procName) break;
            }
          }
          
          if (!procName || seenProcs.has(procName)) continue;
          seenProcs.add(procName);

          // Get mutation for arguments
          let mutation = "";
          try {
            const mutationDom = prototype.mutationToDom?.();
            if (mutationDom) {
              mutation = new XMLSerializer().serializeToString(mutationDom);
            }
          } catch (e) {}

          blocks.push({
            type: `procedures_call_${procName}`,
            xml: `<block type="procedures_call">${mutation}</block>`,
            text: procName,
            category: "My Blocks",
            categoryColour: procedureColor,
          });
        } catch (e) {
          console.warn("Failed to process custom procedure", e);
        }
      }
    } catch (e) {
      console.warn("Failed to get custom procedures", e);
    }

    return blocks;
  }

  /**
   * Get all blocks from the toolbox
   */
  function getToolboxBlocks() {
    const ws = getWorkspace();
    if (!ws) return [];

    let xmlList = [];

    // Try to get XML from toolbox categories
    try {
      const tree = ws.options.languageTree;
      if (tree) {
        function walk(node, currentCategory) {
          if (!node) return;
          if (node.tagName?.toUpperCase() === "CATEGORY") {
            const catName = node.getAttribute("name") || node.getAttribute("id") || null;
            const catColour = node.getAttribute("colour") || node.getAttribute("colourvalue") || null;
            currentCategory = { name: catName, colour: catColour };
          }
          if (node.tagName?.toUpperCase() === "BLOCK") {
            xmlList.push({ node, category: currentCategory });
          }
          if (node.childNodes?.length) {
            for (let i = 0; i < node.childNodes.length; ++i) {
              walk(node.childNodes[i], currentCategory);
            }
          }
        }
        walk(tree, null);
      }
    } catch (e) {}

    // Fallback: try flyout workspace
    if (xmlList.length === 0) {
      try {
        const flyout = ws.getFlyout?.();
        if (flyout?.workspace_) {
          const flyoutBlocks = flyout.workspace_.getTopBlocks(true);
          for (const b of flyoutBlocks) {
            if (b.type) {
              xmlList.push({
                node: {
                  getAttribute: () => b.type,
                  outerHTML: `<block type="${b.type}"></block>`,
                },
                category: null,
              });
            }
          }
        }
      } catch (e) {}
    }

    return xmlList.map((entry) => {
      const node = entry.node;
      const cat = entry.category;
      const type = node.getAttribute("type") || node.getAttribute("id") || node.outerHTML;
      const xml = node.outerHTML || new XMLSerializer().serializeToString(node);
      const text = resolveBlockLabel(type, node);
      const categoryName = resolveCategoryName(cat);
      const categoryColour = cat?.colour || null;
      return { type, xml, text, category: categoryName, categoryColour };
    });
  }

  // ===== SEARCH & RESULTS =====

  /**
   * Score a candidate based on search tokens
   */
  function scoreCandidate(cand, tokens) {
    const text = (cand.text || "").toLowerCase();
    const category = (cand.category || "").toLowerCase();
    const typeStr = (cand.type || "").toLowerCase();
    let score = 0;

    // Boost dynamic blocks (variables, lists, custom blocks) for exact matches
    const isDynamic = category === "variables" || category === "lists" || category === "my blocks";

    for (const t of tokens) {
      // Exact symbol match (e.g., ">", "<", "=")
      if (t.length <= 2 && /[><=+\-*\/]/.test(t) && text.includes(t)) {
        score += 25;
      }
      
      if (text.startsWith(t) || typeStr.startsWith(t)) score += 10;
      if (text.includes(t)) score += 5;
      if (category.includes(t)) score += 12;
      
      // Exact match gets high priority, especially for dynamic blocks
      if (text === t || category === t) {
        score += isDynamic ? 30 : 20;
      }
    }

    // Boost dynamic blocks slightly to prioritize user's own variables/procedures
    if (isDynamic) score += 3;
    if (cand.type === "Insert") score += 2;
    
    return score;
  }

  /**
   * Search and render results based on query
   */
  function renderResults(query) {
    const cmds = baseCommands();
    const toolboxBlocks = getToolboxBlocks();
    const dynamicBlocks = getDynamicBlocks();
    const allBlocks = toolboxBlocks.concat(dynamicBlocks);
    const tokens = (query || "").toLowerCase().split(/\s+/).filter(Boolean);

    const blockCandidates = allBlocks.map((b) => ({
      id: b.type,
      text: b.text,
      type: "Insert",
      action: () => insertBlock(b.xml, b.type),
      category: b.category,
      categoryColour: b.categoryColour,
    }));

    const all = cmds.concat(blockCandidates);

    // If query is empty, show recent history first
    if (tokens.length === 0 && commandHistory.length > 0) {
      // Get recent history items that still exist in current command set
      const historyItems = commandHistory
        .map((h) => all.find((c) => c.id === h.id))
        .filter(Boolean);
      
      // Get remaining items not in history
      const historyIds = new Set(historyItems.map((h) => h.id));
      const remaining = all.filter((c) => !historyIds.has(c.id));
      
      // Score remaining items to maintain proper category order
      const scoredRemaining = remaining
        .map((c) => ({ c, score: scoreCandidate(c, tokens) }))
        .sort((a, b) => b.score - a.score)
        .map((s) => s.c);
      
      // Show history first, then scored remaining items
      lastCandidates = historyItems.concat(scoredRemaining).slice(0, 80);
    } else {
      // Normal search with scoring
      lastCandidates = all
        .map((c) => ({ c, score: scoreCandidate(c, tokens) }))
        .filter((s) => s.score > 0 || tokens.length === 0)
        .sort((a, b) => b.score - a.score)
        .map((s) => s.c)
        .slice(0, 80);
    }

    setResults(lastCandidates);
    selectedIndex = 0;
    selectItem(0);
  }

  // ===== EVENT LISTENERS =====

  // Global keyboard listener
  document.addEventListener("keydown", (e) => {
    if (KEY_OPEN(e)) {
      e.preventDefault();
      openPalette();
    } else if (e.key === "Escape") {
      closePalette();
    }
  });

  // Close on click outside
  window.addEventListener("click", (e) => {
    if (palette && palette.style.display !== "none" && !palette.contains(e.target)) {
      closePalette();
    }
  });

  // Expose API for testing
  window.steCommandPalette = { open: openPalette, close: closePalette, renderResults };
}

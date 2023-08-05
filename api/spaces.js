// We are temporarily using Scratch Addons' appendToSharedSpace method for compatibility reasons.

ScratchTools.appendToSharedSpace = function ({ space, element, order, scope }) {
  order += .5
  const q = document.querySelector.bind(document);
  const sharedSpaces = {
    stageHeader: {
      // Non-fullscreen stage header only
      element: () => q("[class^='stage-header_stage-size-row']"),
      from: () => [],
      until: () => [
        // Small/big stage buttons (for editor mode)
        q("[class^='stage-header_stage-size-toggle-group']"),
        // Full screen icon (for player mode)
        q("[class^='stage-header_stage-size-row']").lastChild,
      ],
    },
    fullscreenStageHeader: {
      // Fullscreen stage header only
      element: () => q("[class^='stage-header_stage-menu-wrapper']"),
      from: function () {
        let emptyDiv = this.element().querySelector(".sa-spacer");
        if (!emptyDiv) {
          emptyDiv = document.createElement("div");
          emptyDiv.style.marginLeft = "auto";
          emptyDiv.className = "sa-spacer";
          this.element().insertBefore(emptyDiv, this.element().lastChild);
        }
        return [emptyDiv];
      },
      until: () => [q("[class^='stage-header_stage-menu-wrapper']").lastChild],
    },
    afterGreenFlag: {
      element: () => q("[class^='controls_controls-container']"),
      from: () => [],
      until: () => [q("[class^='stop-all_stop-all']")],
    },
    afterStopButton: {
      element: () => q("[class^='controls_controls-container']"),
      from: () => [q("[class^='stop-all_stop-all']")],
      until: () => [],
    },
    beforeProjectActionButtons: {
      element: () => q(".flex-row.subactions > .flex-row.action-buttons"),
      from: () => [],
      until: () => [q(".report-button"), q(".action-buttons > div")],
    },
    afterCopyLinkButton: {
      element: () => q(".flex-row.subactions > .flex-row.action-buttons"),
      from: () => [q(".copy-link-button")],
      until: () => [],
    },
    afterSoundTab: {
      element: () => q("[class^='react-tabs_react-tabs__tab-list']"),
      from: () => [q("[class^='react-tabs_react-tabs__tab-list']").children[2]],
      // Element used in find-bar addon
      until: () => [q(".sa-find-bar")],
    },
    forumsBeforePostReport: {
      element: () => scope.querySelector(".postfootright > ul"),
      from: () => [],
      until: function () {
        let reportButton = scope.querySelector(
          ".postfootright > ul > li.postreport, .postfootright > ul > li.pseudopostreport"
        );
        if (!reportButton) {
          // User is logged out, so there's no report button on the post footer
          // Create a pseudo post report button as a separator between this space
          // and the forumsAfterPostReport space.
          reportButton = Object.assign(document.createElement("li"), {
            className: "pseudopostreport",
            textContent: " 🞄 ",
          });
          this.element().appendChild(reportButton);
        }
        return [reportButton];
      },
    },
    forumsAfterPostReport: {
      element: () => scope.querySelector(".postfootright > ul"),
      from: function () {
        let reportButton = scope.querySelector(
          ".postfootright > ul > li.postreport, .postfootright > ul > li.pseudopostreport"
        );
        if (!reportButton) {
          // User is logged out. See comment on forumsBeforePostReport space
          reportButton = Object.assign(document.createElement("li"), {
            className: "pseudopostreport",
            textContent: " 🞄 ",
          });
          this.element().appendChild(reportButton);
        }
        return [reportButton];
      },
      until: () => [scope.querySelector(".postfootright > ul > li.postquote")],
    },
    beforeRemixButton: {
      element: () => q(".project-buttons"),
      from: () => [],
      until: () => [
        q(".project-buttons > .remix-button:not(.sa-remix-button)"),
        q(".project-buttons > .see-inside-button"),
      ],
    },
    studioCuratorsTab: {
      element: () => q(".studio-tabs div:nth-child(2)"),
      from: () => [],
      // .commenting-status only exists if account is muted
      until: () => [
        q(".studio-tabs div:nth-child(2) > .commenting-status"),
        q(".studio-tabs div:nth-child(2) > .studio-members"),
      ],
    },
    forumToolbarTextDecoration: {
      element: () => q(".markItUpHeader > ul"),
      from: () => [q(".markItUpButton4")],
      until: () => [q(".markItUpButton4 ~ .markItUpSeparator")],
    },
    forumToolbarLinkDecoration: {
      element: () => q(".markItUpHeader > ul"),
      from: () => [q(".markItUpButton6")],
      until: () => [q(".markItUpButton6 ~ .markItUpSeparator")],
    },
    forumToolbarFont: {
      element: () => q(".markItUpHeader > ul"),
      from: () => [q(".markItUpButton7")],
      until: () => [q(".markItUpButton7 ~ .markItUpSeparator")],
    },
    forumToolbarList: {
      element: () => q(".markItUpHeader > ul"),
      from: () => [q(".markItUpButton10")],
      until: () => [q(".markItUpButton10 ~ .markItUpSeparator")],
    },
    forumToolbarDecoration: {
      element: () => q(".markItUpHeader > ul"),
      from: () => [q(".markItUpButton12")],
      until: () => [q(".markItUpButton12 ~ .markItUpSeparator")],
    },
    forumToolbarEnvironment: {
      element: () => q(".markItUpHeader > ul"),
      from: () => [q(".markItUpButton13")],
      until: () => [q(".markItUpButton13 ~ .markItUpSeparator")],
    },
    forumToolbarScratchblocks: {
      element: () => q(".markItUpHeader > ul"),
      from: () => [q(".markItUpButton14")],
      until: () => [q(".markItUpButton14 ~ .markItUpSeparator")],
    },
    forumToolbarTools: {
      element: () => q(".markItUpHeader > ul"),
      from: () => [q(".markItUpButton16")],
      until: () => [],
    },
    assetContextMenuAfterExport: {
      element: () => scope,
      from: () => {
        return Array.prototype.filter.call(
          scope.children,
          (c) =>
            c.textContent ===
            this.scratchMessage("gui.spriteSelectorItem.contextMenuExport")
        );
      },
      until: () => {
        return Array.prototype.filter.call(
          scope.children,
          (c) =>
            c.textContent ===
            this.scratchMessage("gui.spriteSelectorItem.contextMenuDelete")
        );
      },
    },
    assetContextMenuAfterDelete: {
      element: () => scope,
      from: () => {
        return Array.prototype.filter.call(
          scope.children,
          (c) =>
            c.textContent ===
            this.scratchMessage("gui.spriteSelectorItem.contextMenuDelete")
        );
      },
      until: () => [],
    },
    monitor: {
      element: () => scope,
      from: () => {
        const endOfVanilla = [
          this.scratchMessage("gui.monitor.contextMenu.large"),
          this.scratchMessage("gui.monitor.contextMenu.slider"),
          this.scratchMessage("gui.monitor.contextMenu.sliderRange"),
          this.scratchMessage("gui.monitor.contextMenu.export"),
        ];
        const potential = Array.prototype.filter.call(scope.children, (c) =>
          endOfVanilla.includes(c.textContent)
        );
        return [potential[potential.length - 1]];
      },
      until: () => [],
    },
    afterProfileCountry: {
      element: () => q("p.profile-details > .location"),
      from: () => [],
      until: () => [],
    },
  };

  const spaceInfo = sharedSpaces[space];
  const spaceElement = spaceInfo.element();
  if (!spaceElement) return false;
  const from = spaceInfo.from();
  const until = spaceInfo.until();

  element.dataset.saSharedSpaceOrder = order;

  let foundFrom = false;
  if (from.length === 0) foundFrom = true;

  // insertAfter = element whose nextSibling will be the new element
  // -1 means append at beginning of space (prepend)
  // This will stay null if we need to append at the end of space
  let insertAfter = null;

  const children = Array.from(spaceElement.children);
  for (let indexString of children.keys()) {
    const child = children[indexString];
    const i = Number(indexString);

    // Find either element from "from" before doing anything
    if (!foundFrom) {
      if (from.includes(child)) {
        foundFrom = true;
        // If this is the last child, insertAfter will stay null
        // and the element will be appended at the end of space
      }
      continue;
    }

    if (until.includes(child)) {
      // This is the first SA element appended to this space
      // If from = [] then prepend, otherwise append after
      // previous child (likely a "from" element)
      if (i === 0) insertAfter = -1;
      else insertAfter = children[i - 1];
      break;
    }

    if (child.dataset.saSharedSpaceOrder) {
      if (Number(child.dataset.saSharedSpaceOrder) > order) {
        // We found another SA element with higher order number
        // If from = [] and this is the first child, prepend.
        // Otherwise, append before this child.
        if (i === 0) insertAfter = -1;
        else insertAfter = children[i - 1];
        break;
      }
    }
  }

  if (!foundFrom) return false;
  // It doesn't matter if we didn't find an "until"

  // Separators in forum post spaces
  if (space === "forumsBeforePostReport") {
    element.appendChild(document.createTextNode(" | "));
  } else if (space === "forumsAfterPostReport") {
    element.prepend(document.createTextNode("| "));
  }

  if (insertAfter === null) {
    // This might happen with until = []
    spaceElement.appendChild(element);
  } else if (insertAfter === -1) {
    // This might happen with from = []
    spaceElement.prepend(element);
  } else {
    // Works like insertAfter but using insertBefore API.
    // nextSibling cannot be null because insertAfter
    // is always set to children[i-1], so it must exist
    spaceElement.insertBefore(element, insertAfter.nextSibling);
  }
  return true;
};

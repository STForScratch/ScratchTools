// ==UserScript==
// @name Searchable Dropdowns for Scratch 3
// @version 0.1.2
// @namespace https://github.com/forkphorus/cat-plus
// @match https://scratch.mit.edu/projects/*
// @grant GM_addStyle
// ==/UserScript==

function callback(mutationList) {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      const newNodes = mutation.addedNodes;
      for (const node of newNodes) {
        if (node.classList && node.classList.contains('blocklyDropdownMenu')) {
          addSearch();
          break;
        }
      }
    }
  }
}

function addSearch() {
  const el = document.createElement('input');
  el.type = 'text';
  el.addEventListener('input', search);
  el.classList.add('u-dropdown-searchbar');
  const container = getDropDownMenu();
  container.insertBefore(el, container.firstChild);
  el.focus();

  for (const child of getItems()) {
    child.dataset.visible = 'true';
  }
}

function search(e) {
  const value = e.target.value.toLowerCase();
  for (const child of getItems()) {
    const text = child.textContent.toLowerCase();
    const contains = text.includes(value);
    child.dataset.visible = contains.toString();
  }
}

let cachedDropDownContentElement = null;
function getDropDownContentElement() {
  if (cachedDropDownContentElement) {
    return cachedDropDownContentElement;
  }
  cachedDropDownContentElement = document.querySelector('.blocklyDropDownContent');
  return cachedDropDownContentElement;
}

function getDropDownMenu() {
  return getDropDownContentElement().querySelector('.blocklyDropdownMenu')
}

function getItems() {
  const el = getDropDownMenu();
  if (el) {
    return Array.from(el.children).filter((child) => child.tagName !== 'INPUT');
  }
  return [];
}

const observer = new MutationObserver(callback);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
function GM_addStyle(style) {
var el = document.createElement('style')
el.innerHTML = style
document.body.appendChild(el)
}
GM_addStyle(`
.u-dropdown-searchbar {
  /* seems to always fill the entire thing without making a horizontal scrollbar */
  width: calc(100% - 20px);
  /* based on styles for the title input */
  color: white;
  background-color: hsla(0, 100%, 100%, 0.25);
  border: 1px dashed hsla(0, 0%, 0%, 0.15);
  padding: .5rem;
  outline: none;
  transition: 0.25s ease-out;
  font-size: 13px;
  font-weight: bold;
  border-radius: 4px;
}
.u-dropdown-searchbar:hover {
  background-color: hsla(0, 100%, 100%, 0.5);
}
.u-dropdown-searchbar:focus {
  background-color: white;
  color: black;
}

[data-visible="false"] {
  display: none;
}

/*.goog-menuitem-highlight {
  background: transparent;
}
.goog-menuitem:hover {
  background: rgba(0, 0, 0, 0.2);
}*/
`);

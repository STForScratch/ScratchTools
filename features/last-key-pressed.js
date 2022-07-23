function addKeyPressed() {
  var lkp = document.createElement('div')
  lkp.textContent = `No Key Pressed`
  lkp.className = 'scratchtools key share-date'
  if (document.querySelector('div.scratchtools.key') === null) {
  document.querySelector('div.flex-row.subactions').prepend(lkp)
      vm.runtime.on('KEY_PRESSED', function(el) {
      document.querySelector('div.scratchtools.key').textContent = 'Last Key Pressed: '+el
  })
  }
}
if (window.location.href.startsWith('https://scratch.mit.edu/projects/')) {
  const page = document.querySelector('div.page');
  const configure = {
      attributes: true,
      childList: true,
      subtree: true
  };
  const getSpot = function(mutationList, observer) {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationList) {
          if (document.querySelector("div.flex-row.subactions") !== null) {
              observer.disconnect()
                  addKeyPressed()
          }
      }
  };
  const observer = new MutationObserver(getSpot);
  observer.observe(page, configure);
}

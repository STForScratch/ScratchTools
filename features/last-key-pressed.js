function addKeyPressed() {
    var lkp = document.createElement('div')
    lkp.textContent = `No Key Pressed`
    lkp.className = 'scratchtools key share-date'
    if (document.querySelector('div.scratchtools.key') === null) {
        document.querySelector('div.flex-row.subactions').prepend(lkp)
        vm.runtime.on('KEY_PRESSED', function(el) {
            if (document.querySelector('div.scratchtools.key') !== null) {
                document.querySelector('div.scratchtools.key').textContent = 'Last Key Pressed: ' + el
            }
        })
    }
}

function addKeyPressedEditor() {
    var div = document.createElement('div')
    div.className = 'menu-bar_file-group_1_CHX scratchtools navlastkey'
    div.innerHTML = `
<span>No Key Pressed</span>
`
    if (document.querySelector('div.scratchtools.navlastkey') === null) {
        document.querySelector('div.gui').childNodes[1].firstChild.appendChild(div)
        vm.runtime.on('KEY_PRESSED', function(el) {
            if (document.querySelector('div.scratchtools.navlastkey') !== null) {
                document.querySelector('div.scratchtools.navlastkey').querySelector('span').textContent = 'Last Key Pressed: ' + el
            }
        })
    }
}
if (window.location.href.startsWith('https://scratch.mit.edu/projects/')) {
    const page = document.querySelector('body');
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
            if (document.querySelector('div.gui') !== null) {
                observer.disconnect()
                addKeyPressedEditor()
            }
        }
    };
    const observer = new MutationObserver(getSpot);
    observer.observe(page, configure);
}

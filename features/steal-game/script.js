var enabledStealGame = true;

if (window.location.href.startsWith("https://scratch.mit.edu/projects/")) {
    if (enabledStealGame) {
        var remixButton = document.querySelector('.remix-button')
        var remixText = remixButton.querySelector('span');
        remixText.textContent = "Steal game"
    }
}

ScratchTools.setDisable("steal-game", function () {
    if (window.location.href.startsWith("https://scratch.mit.edu/projects/")) {
        enabledStealGame = false;
        var remixButton = document.querySelector('.remix-button')
        var remixText = remixButton.querySelector('span');
        remixText.textContent = "Remix"
    }
})

if (window.location.href.startsWith("https://scratch.mit.edu/projects/")) {
    var remixButton = document.querySelector('.remix-button')
    var remixText = remixButton.querySelector('span');
    remixText.textContent = "Steal game"
}

ScratchTools.setDisable("steal-game", function () {
    if (window.location.href.startsWith("https://scratch.mit.edu/projects) {
        var remixButton = document.querySelector('.remix-button')
        var remixText = remixButton.querySelector('span');
        remixText.textContent = "Remix"
    }
})

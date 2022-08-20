var addRickrollButton = function(mutationList, observer) {
    for (const mutation of mutationList) {
        if (document.querySelector("#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions") !== null) {
            observer.disconnect()
            console.log('disconnected')
            if (document.querySelector('button.button.action-button.scratchtools-rickroll-button') === null) {
                var btn = document.createElement('button')
                var style = document.createElement('style')
                style.innerHTML = `
                button.button.action-button.scratchtools-rickroll-button:before {
                    background-image: url(https://pbs.twimg.com/profile_images/1326707048478892033/Ln0v50LP_400x400.jpg);
                }
                `
                document.body.appendChild(style)
                btn.innerHTML = '<span>RR</span>'
                btn.className = 'button action-button scratchtools-rickroll-button'
                btn.onclick = function() {
                    ScratchTools.Scratch.vm.downloadProjectId(526557379)
                }
                    document.querySelector("div.flex-row.action-buttons").appendChild(btn)
            }
        }
    }
};
    var observer = new MutationObserver(addRickrollButton);
    observer.observe(document.querySelector('body'), {attributes: true,childList: true,subtree: true});
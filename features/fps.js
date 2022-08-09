var addFpsCounter = function(mutationList, observer) {
    document.querySelectorAll('div').forEach(function(el) {
        if (el.className.includes('controls_controls-container_')) {
            fpsCheck.disconnect()
    el.appendChild(bar)
    setFpsCounter()
        }
    })
};

var fpsCheck = new MutationObserver(addFpsCounter);
fpsCheck.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });

var bar = document.createElement('div')
    bar.className = "fps scratchtools"
        bar.style.margin = '0'
bar.style.marginTop = '7px'
bar.style.marginLeft = '5px'

function setFpsCounter() {
    if (document.querySelector('.scratchtools.fps') !== null) {
        document.querySelector('.scratchtools.fps').textContent = `${(Math.round(1000 / ScratchTools.Scratch.vm.runtime.currentStepTime)).toString()} FPS`
    }
}

setInterval(setFpsCounter, 150)
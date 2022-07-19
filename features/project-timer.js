if (window.location.href.includes('https://scratch.mit.edu/projects/')) {
var times = []
var stop = []
vm.runtime.on('PROJECT_RUN_START', function() {
    times = []
    stop = []
    times.push(vm.runtime.currentMSecs)
    getCurrentM()
})
vm.runtime.on('PROJECT_RUN_STOP', function() {
    stop.push('')
})
function getCurrentM() {
    if (stop.length === 0) {
    document.querySelector('div.timer.scratchtools').textContent = `${(vm.runtime.currentMSecs-times[times.length-1])/1000} secs`
    setTimeout(getCurrentM, 50)
    }
}

var bar = document.createElement('div')
    bar.className = "timer scratchtools"
        bar.style.margin = '0'
bar.style.marginTop = '7px'
bar.style.marginLeft = '5px'
        var style = document.createElement('style')
        style.innerHTML = `
    div.timer.scratchtools {
        top: 50%;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    `
        //document.body.appendChild(style)
        checkForTimerPosition()
        function checkForTimerPosition() {
        document.querySelectorAll('div').forEach(function(el) {
            if (el.className.includes('controls_controls-container_')) {
                if (document.querySelector('div.timer.scratchtools') === null) {
    el.appendChild(bar)
                bar.textContent = '0 secs'
                }
            }
        })
            if (document.querySelector('div.timer.scratchtools') === null) {
                setTimeout(checkForTimerPosition, 100)
            }
        }
    }

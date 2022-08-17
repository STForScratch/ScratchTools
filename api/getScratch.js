ScratchTools.getScratch = {}
var allCallbacks = []
ScratchTools.getScratch.waitForCommentBox = function(callback) {
    allCallbacks.push(callback)
}

function commentBoxes() {
    document.querySelectorAll('textarea').forEach(function(el) {
        if (el.name === 'content' || el.name === 'compose-comment') {
            if (!el.className.includes('scratchtoolsCheck')) {
                el.className = el.className+' scratchtoolsCheck'
                allCallbacks.forEach(function(callback) {
                    callback(el)
                })
            }
        }
    })
}

var waitForCommentBoxObserver = new MutationObserver(commentBoxes);
waitForCommentBoxObserver.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });
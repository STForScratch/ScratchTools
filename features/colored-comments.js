function getColoredComments() {
    function colorComments() {
        Object.keys(Blockly.getMainWorkspace().commentDB_).forEach(function(commentData) {
            var comment = Blockly.getMainWorkspace().commentDB_[commentData]
            if (comment.block_ !== undefined) {
                comment.foreignObject_.firstChild.firstChild.style.color = 'white'
                comment.foreignObject_.firstChild.style.backgroundColor = comment.block_.colour_
                comment.foreignObject_.parentNode.querySelector('rect').style.fill = comment.block_.colourSecondary_
            }
        })
    }
    const targetNode = document.querySelector('g.blocklyBubbleCanvas');

    // Options for the observer (which mutations to observe)
    const config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    // Callback function to execute when mutations are observed
    const callback = function(mutationList, observer) {
        // Use traditional 'for loops' for IE 11
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                colorComments()
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    var style = document.createElement('style')
    style.innerHTML = `
        textarea.scratchCommentTextarea.scratchCommentText {
            background-color: unset;
    }
    `
    document.body.appendChild(style)
    colorComments()
}
if (window.location.href.includes('https://scratch.mit.edu/projects/') && window.location.href.includes('/editor')) {
    const targetNode2 = document.querySelector('div#app');

    // Options for the observer (which mutations to observe)
    const config2 = {
        attributes: true,
        childList: true,
        subtree: true
    };

    // Callback function to execute when mutations are observed
    const callback2 = function(mutationList, observer) {
        // Use traditional 'for loops' for IE 11
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                if (document.querySelector('div.gui') !== null) {
                    observer2.disconnect()
                    getColoredComments()
                }
            }
        }
    };
    const observer2 = new MutationObserver(callback2);

    // Start observing the target node for configured mutations
    observer2.observe(targetNode2, config2);
}

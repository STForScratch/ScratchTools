
if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
    if (window.location.href.includes('editor')) {
    checkforbg()
    function checkforbg() {
        if (document.querySelector('#react-tabs-1 > div.gui_blocks-wrapper_1ccgf.box_box_2jjDp > div > div > svg.blocklySvg > g > rect.blocklyMainBackground') === null) {
            window.setTimeout(checkforbg, 50)
        } else {
            document.querySelector('#react-tabs-1 > div.gui_blocks-wrapper_1ccgf.box_box_2jjDp > div > div > svg.blocklySvg > g > rect.blocklyMainBackground').style.fill = 'white'
        }
}
    }
}

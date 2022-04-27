// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // get cookie
if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
    if (window.location.href.includes('editor')) {
if (getCookie('ST Features').includes('editorbg')) {
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
}

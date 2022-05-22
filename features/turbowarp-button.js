
if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
    if (window.location.href.includes('editor')) {
function checkFlag2() {
    if(document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH > div:nth-child(7)') === null) {
        window.setTimeout(checkFlag2, 100)
    } else {
        editor()
    }
}
function editor() {
var element = document.createElement('a')
var str = window.location.href
var apple = str.split('https://scratch.mit.edu/projects/')[1];
var apple2 = apple.split('/editor')[0];
element.href = `https://turbowarp.org/${apple2}/editor`
document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp').appendChild(element)
var el = document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH > div:nth-child(7)')
var clone = el.cloneNode(true);
document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > a').appendChild(clone)
document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > a > div > span > div > span').textContent = 'Open in Turbowarp'
document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > a > div > span > img').src = 'https://dashboard.snapcraft.io/site_media/appmedia/2021/02/512x512_Q3PveGU.png'
    }
}
}

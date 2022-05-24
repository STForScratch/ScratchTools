function checkFlag() {
    if(document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH') === null) {
       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {

      document.querySelector('#react-tabs-1 > div.gui_watermark_3vBYb.box_box_2jjDp > img').remove()
    }
}

checkFlag();

// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // get cookie
  if (getCookie('ST Features').includes('remove-editor-icons')) {
    addclick2()
  function addclick2() {
    if (document.querySelector('#react-tabs-0 > img') === null) {
      window.setTimeout(addclick2, 200)
    } else {
      document.querySelector('#react-tabs-0 > img').remove()
      document.querySelector('#react-tabs-2 > img').remove()
      document.querySelector('#react-tabs-4 > img').remove()
    }
  }
}
if (getCookie('ST Features').includes('color-slider-input')) {
  if (window.location.href.toLowerCase().includes('editor')) {
      addclick()
      addclick2()
    function addclick() {
      if (document.querySelector('#react-tabs-2') === null) {
        window.setTimeout(addclick, 200)
        console.log('not in yet')
      } else {

          console.log('in')
    document.querySelector('#react-tabs-2').onclick = function() {
        testforrange()
        function testforrange() {
            if (document.querySelector('#react-tabs-3 > div > div.asset-panel_detail-area_2KQhH.box_box_2jjDp > div > div.paint-editor_editor-container-top_2wxS3 > div:nth-child(2) > div.paint-editor_row_1oLDq.paint-editor_mod-dashed-border_1TL5q.paint-editor_mod-labeled-icon-height_CFdqo.input-group_input-group_plJaJ > div:nth-child(3) > input') === null) {
                window.setTimeout(testforrange, 100)
            } else {
                document.querySelector('#react-tabs-3 > div > div.asset-panel_detail-area_2KQhH.box_box_2jjDp > div > div.paint-editor_editor-container-top_2wxS3 > div:nth-child(2) > div.paint-editor_row_1oLDq.paint-editor_mod-dashed-border_1TL5q.paint-editor_mod-labeled-icon-height_CFdqo.input-group_input-group_plJaJ > div:nth-child(3) > input').style.width = '100px'
      document.querySelector('#react-tabs-3 > div > div.asset-panel_detail-area_2KQhH.box_box_2jjDp > div > div.paint-editor_editor-container-top_2wxS3 > div:nth-child(2) > div.paint-editor_row_1oLDq.paint-editor_mod-dashed-border_1TL5q.paint-editor_mod-labeled-icon-height_CFdqo.input-group_input-group_plJaJ > div:nth-child(3) > input').type = 'range'
      var title = document.createElement('label')
      title.textContent = '0'
      title.for = 'page'
      document.querySelector('#react-tabs-3 > div > div.asset-panel_detail-area_2KQhH.box_box_2jjDp > div > div.paint-editor_editor-container-top_2wxS3 > div:nth-child(2) > div.paint-editor_row_1oLDq.paint-editor_mod-dashed-border_1TL5q.paint-editor_mod-labeled-icon-height_CFdqo.input-group_input-group_plJaJ').appendChild(title)
      document.querySelector("#react-tabs-3 > div > div.asset-panel_detail-area_2KQhH.box_box_2jjDp > div > div.paint-editor_editor-container-top_2wxS3 > div:nth-child(2) > div.paint-editor_row_1oLDq.paint-editor_mod-dashed-border_1TL5q.paint-editor_mod-labeled-icon-height_CFdqo.input-group_input-group_plJaJ > div:nth-child(3) > input").addEventListener("change", function(){
        // Pass the value of the slider as an index to the <li> elements and get the text of the 
        // one corresponding list item.
        title.textContent = this.value
      });
    }
    }
    }
}
    }
  } else {
    console.log(window.location.href.toLowerCase())
  }
}
function checkFlag() {
    if(document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH') === null) {
       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
        if (getCookie('ST Features').includes('watermark')) {

      document.querySelector('#react-tabs-1 > div.gui_watermark_3vBYb.box_box_2jjDp > img').remove()
        }
    }
}
if (getCookie('ST Features').includes('editorbg')) {
    checkforbg()
    function checkforbg() {
        if (document.querySelector('#react-tabs-1 > div.gui_blocks-wrapper_1ccgf.box_box_2jjDp > div > div > svg.blocklySvg > g > rect.blocklyMainBackground') === null) {
            window.setTimeout(checkforbg, 100)
        } else {
            document.querySelector('#react-tabs-1 > div.gui_blocks-wrapper_1ccgf.box_box_2jjDp > div > div > svg.blocklySvg > g > rect.blocklyMainBackground').style.fill = 'white'
        }
    }
}

checkFlag();
checkFlag2();
function checkFlag2() {
    if(document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH > div:nth-child(7)') === null) {
        window.setTimeout(checkFlag2, 100)
    } else {
        editor()
    }
}
function editor() {
    if (getCookie('ST Features').includes('turbowarp')) {
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

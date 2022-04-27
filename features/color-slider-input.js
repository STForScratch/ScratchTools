// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // get cookie
if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
    if (window.location.href.includes('editor')) {
if (getCookie('ST Features').includes('color-slider-input')) {
    if (window.location.href.toLowerCase().includes('editor')) {
        addclick()
      function addclick() {
        if (document.querySelector('#react-tabs-2') === null) {
          window.setTimeout(addclick, 50)
          console.log('not in yet')
        } else {
  
            console.log('in')
      document.querySelector('#react-tabs-2').onclick = function() {
          testforrange()
          function testforrange() {
              if (document.querySelector('#react-tabs-3 > div > div.asset-panel_detail-area_2KQhH.box_box_2jjDp > div > div.paint-editor_editor-container-top_2wxS3 > div:nth-child(2) > div.paint-editor_row_1oLDq.paint-editor_mod-dashed-border_1TL5q.paint-editor_mod-labeled-icon-height_CFdqo.input-group_input-group_plJaJ > div:nth-child(3) > input') === null) {
                  window.setTimeout(testforrange, 50)
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

}
}

ScratchTools.waitForElements("[class^='stage-header_stage-menu-wrapper_']", function() {
    var input = document.querySelector("[class*='project-title-input_title-field_']")
    input.style.marginLeft = '.2rem'
    input.style.marginRight = '.2rem'
    document.querySelector("[class^='stage-header_stage-menu-wrapper_']").insertBefore(input, document.querySelector("[class*='stage-header_stage-size-row_']"));
    var style = document.createElement('style')
    style.textContent = `
    [class*='project-title-input_title-field_'] {
        color: #595959 !important;
    }
    
    [class*='menu-bar_menu-bar-item_'][class*='- menu-bar_growable_'] {
        display: none;
    }
    `
    document.body.appendChild(style)
    }, 'move project title input', false)
ScratchTools.addToSpace = function(data) {
    const spaces = {
        "afterProjectPageButton":{
            "before":false,
            "selector":"div[class^='menu-bar_main-menu_']"
        },
        "beforeEditorMyStuffButton":{
            "before":true,
            "selector":"div[class^='menu-bar_account-info-group_']"
        },
        "afterStopButton":{
            "before":false,
            "selector":"div[class^='controls_controls-container_']"
        },
        "beforeSmallStageButton":{
            "before":true,
            "selector":"div[class^='stage-header_stage-size-row_']"
        },
        "afterCopyLinkButton":{
            "before":false,
            "selector":"div.flex-row.action-buttons"
        },
        "beforeSeeInsideButton":{
            "before":true,
            "selector":"div.project-buttons"
        },
        "afterMyStuffCreateButtons":{
            "before":false,
            "selector":"#content > div.cols > div.col-12 > div > div.box-head > div"
        },
        "afterForumPreview":{
            "before":false,
            "selector":".markItUpHeader > ul"
        }
    }
    if (data.space && data.order && data.element) {
        if (spaces[data.space]) {
            var spaceToAdd = document.querySelector(spaces[data.space].selector)
            if (spaces[data.space].before) {
                data.element.dataset.saSharedSpaceOrder = data.order
                spaceToAdd.prepend(data.element)
            } else {
                data.element.dataset.saSharedSpaceOrder = data.order
                spaceToAdd.appendChild(data.element)
            }
            spaceToAdd.parentNode.querySelectorAll(spaces[data.space].selector+' > *').forEach(function(el) {
                console.log(el.dataset.saSharedSpaceOrder)
            })
        } else {
            ScratchTools.console.error("Invalid space specified.")
        }
    } else {
        ScratchTools.console.error("No space specified.")
    }
}
let remClass = [
    "sa-set-thumbnail-button",
    "studio-button",
    "copy-link-button",
    "remixtree-button",
    "scratchtools-preview-button",
    "scratchtoolspin"
]
let remTitle = [
    "Set Thumbnail",
    "Add to Studio",
    "Copy Link",
    "Remix Tree",
    "Preview Description",
    "Pin"
]
let savedElement = []
function checkIfElementHasClass(_element) {
    for (let i = 0; i < remClass.length; i++) {
        if (_element.classList.contains(remClass[i])) {
            return [true, remTitle[i]];
        }
    }
    return [false];
}
// ScratchTools.waitForElements(".preview-row .action-button", function(e) {
//     let rem = checkIfElementHasClass(e)
//     if (rem[0]) {
//         e.title = e.title + " (" + rem[1] + ")"
//         savedElement.push([e, " (" + rem[1] + ")"])
//     }
// }, "title=text", false)

var actionButtonWait = ScratchTools.waitForElements(".preview-row .action-button", function(e) {
    console.log(e)
    let rem = checkIfElementHasClass(e)
    if (rem[0]) {
        e.title = e.title + " (" + rem[1] + ")"
        savedElement.push([e, " (" + rem[1] + ")"])
    }
})

ScratchTools.setDisable("compact-buttons", function() {
    const savedElementLength = savedElement.length
    for (let i = 0; i < savedElementLength; i++) {
        let rem = savedElement.pop()
        rem[0].title = rem[0].title.slice(0, rem[0].title.length - rem[1].length)
    }
})

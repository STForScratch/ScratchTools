const themeEditor = {
    close: function(){
        document.getElementById("themeeditor").style.display = "none"
    },
    open: function(){
        document.getElementById("themeeditor").style.display = "block"
    },
    lastHeight: "220px",
    dropdown: {
        close: function(){
            document.getElementById("editor").style.display = "none"
            document.getElementById("themeeditor").style.minHeight = "31px"
            document.getElementById("themeeditor").style.maxHeight = "31px"
            document.getElementById("themeeditor").style.resize = "width"
            themeEditor.lastHeight = document.getElementById("themeeditor").style.height
            document.getElementById("themeeditor").style.height = "31px"
            document.getElementById("te-dropdown-icon").classList = "ri-arrow-up-s-fill"
            
        },
        open: function(){
            document.getElementById("editor").style.display = "block"
            document.getElementById("themeeditor").style.resize = "both"
            document.getElementById("themeeditor").style.minHeight = "220px"
            document.getElementById("themeeditor").style.height = themeEditor.lastHeight
            document.getElementById("te-dropdown-icon").classList = "ri-arrow-down-s-fill"
        },
        toggle: function(){
            if(document.getElementById("editor").style.display == "block"){
                themeEditor.dropdown.close()
            }else{
                themeEditor.dropdown.open()
            }
        }
    }
}
document.getElementById("te-close").addEventListener("click", themeEditor.close)
document.getElementById("te-dropdown").addEventListener("click", themeEditor.dropdown.toggle)
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/css");
    // Make the DIV element draggable:
dragElement(document.getElementById("themeeditor"));

function dragElement(elmnt) {
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
if (document.getElementById(elmnt.id + "header")) {
// if present, the header is where you move the DIV from:
document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
} else {
// otherwise, move the DIV from anywhere inside the DIV:
elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
e = e || window.event;
e.preventDefault();
// get the mouse cursor position at startup:
pos3 = e.clientX;
pos4 = e.clientY;
document.onmouseup = closeDragElement;
// call a function whenever the cursor moves:
document.onmousemove = elementDrag;
}

function elementDrag(e) {
e = e || window.event;
e.preventDefault();

// calculate the new cursor position:
pos1 = pos3 - e.clientX;
pos2 = pos4 - e.clientY;
pos3 = e.clientX;
pos4 = e.clientY;

// calculate the boundaries of the screen
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// calculate the new position of the element
const newTop = elmnt.offsetTop - pos2;
const newLeft = elmnt.offsetLeft - pos1;

// check if the new position is within the screen boundaries
const withinHorizontalBounds = newLeft >= 0 && newLeft + elmnt.offsetWidth <= screenWidth;
const withinVerticalBounds = newTop >= 0 && newTop + elmnt.offsetHeight <= screenHeight;

// set the element's new position if within bounds
if (withinHorizontalBounds && withinVerticalBounds) {
elmnt.style.top = newTop + "px";
elmnt.style.left = newLeft + "px";
}
}


function closeDragElement() {
// stop moving when mouse button is released:
document.onmouseup = null;
document.onmousemove = null;
}
}

function addImportantToCSSRules(cssString) {
    // Split the CSS string by semicolons to get individual rules
    var rules = cssString.split(';');

    // Iterate through each rule
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i].trim();

        // Skip empty rules
        if (rule === '') {
            continue;
        }

        // Append !important to the rule
        var importantRule = rule + ' !important';

        // Replace the original rule with the new important rule
        cssString = cssString.replace(rule, importantRule);
    }

    return cssString;
}

editor.session.on('change', function(delta) {
    document.getElementById("customtheme").innerHTML = addImportantToCSSRules(editor.getValue())
});


//listen for new elements with class st-modal and add button in innerhtml
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.addedNodes.length > 0){
            var addedNode = mutation.addedNodes[0]
            if(addedNode.classList.contains("st-modal")){
                addedNode.getElementsByClassName("st-modal__header")[0].innerHTML += `<button" id="te-open">Open Theme Editor</button>`
            }

        }
    });
});

themeEditor.close()
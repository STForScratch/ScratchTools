if (window.location.href.startsWith('https://scratch.mit.edu/projects/') && window.location.href.includes('/editor') && document.blockLog === undefined) {
document.addEventListener('keydown', function(event) {
    keydown(event)

    function keydown(e) {
        if (e.keyCode == 76 && e.shiftKey) {
            if (document.querySelector('#mydiv') === null) {
            addProjectLog()
            } else {
                document.querySelector('#mydiv').remove()
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                return false;
            }
        }
    }
})
function addProjectLog() {
var div = document.createElement('div')
div.innerHTML = `
<div id="mydivheader">Block Log<div aria-label="Close" class="close-button_close-button_lOp2G close-button_large_2oadS closescratchtools" role="button" tabindex="0"><img class="close-button_close-icon_HBCuO" src="/static/assets/cb666b99d3528f91b52f985dfb102afa.svg"></div></div>
<div class="content">
<span style="opacity: 0.5;">Empty</span>
</div>
`
div.querySelector('.closescratchtools').onclick = function() {
div.remove()
}
div.id = 'mydiv'
document.body.appendChild(div)
var style = document.createElement('style')
style.innerHTML = `
.closescratchtools {
float: right;
position: absolute;
top: 0.5rem;
right: 0.5rem;
}

.content {
padding: 3.5%;
}

#mydiv {
position: absolute;
z-index: 9999;
background-color: #f1f1f1;
border: 1px solid #d3d3d3;
text-align: left;
left: 50%;
top: 50%;
height: 50%;
width: 20%;
overflow: scroll;
border-radius: 10px;
}

#mydivheader {
font-weight: bold;
padding: 0.8rem;
cursor: move;
z-index: 10000;
background-color: #ff9f00;
color: #fff;
}

.scratchtoolsBorder {
border-bottom: 2px dotted gray;
}
`
document.body.appendChild(style)
dragElement(document.getElementById("mydiv"));

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
// set the element's new position:
elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
// stop moving when mouse button is released:
document.onmouseup = null;
document.onmousemove = null;
}
}
}


function logEvents() {
var div = document.querySelector('#mydiv')
while (div.querySelector('.content').firstChild) {
    div.querySelector('.content').firstChild.remove()
}
ScratchTools.Scratch.blockly.getMainWorkspace().undoStack_.forEach(function(el) {
    var p = document.createElement('span')
    p.textContent = `Block ${el.type}`
    p.className = 'scratchtoolsBorder'
    div.querySelector('.content').prepend(p)
    p.style.display = 'block'
    p.style.marginBottom = '2%'
})
if (ScratchTools.Scratch.blockly.getMainWorkspace().undoStack_.length === 0) {
    var span = document.createElement('span')
    span.textContent = 'Empty'
    div.querySelector('.content').appendChild(span)
    span.style.opacity = '0.5'
}
}

setInterval(logEvents, 250)
}
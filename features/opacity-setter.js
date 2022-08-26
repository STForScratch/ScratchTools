let currentlySelected = null
function addOpacityRange() {
if (document.querySelector('.scratchtoolsOpacity') === null) {
var opacity1 = document.createElement('div')
opacity1.className = 'button_button_u6SE2 labeled-icon-button_mod-edit-field_1bXYC scratchtoolsOpacity'
var input1 = document.createElement('input')
input1.type = 'range'
input1.className = 'scratchtoolsFillOpacity'
var label1 = document.createElement('span')
label1.className = 'labeled-icon-button_edit-field-title_1ZoEV'
label1.textContent = 'Opacity'
opacity1.appendChild(input1)
opacity1.appendChild(label1)
var opacity2 = document.createElement('div')
opacity2.className = 'button_button_u6SE2 labeled-icon-button_mod-edit-field_1bXYC'
var input2 = document.createElement('input')
input2.type = 'range'
input2.className = 'scratchtoolsBorderOpacity'
var label2 = document.createElement('span')
label2.className = 'labeled-icon-button_edit-field-title_1ZoEV'
label2.textContent = 'Border Opacity'
opacity2.appendChild(input2)
opacity2.appendChild(label2)
input1.style.width = '100%'
input2.style.width = '100%'
document.querySelector('.mode-tools_mode-tools_2nFfV').appendChild(opacity1)
document.querySelector('.mode-tools_mode-tools_2nFfV').appendChild(opacity2)
input1.addEventListener('input', function() {
    setOpacityOfObject(input1, false)
})
input2.addEventListener('input', function() {
    setOpacityOfObject(input2, true)
})
    function setOpacityOfObject(element, border) {
        if (ScratchTools.Scratch.scratchPaint().selectedItems.length !== 0) {
function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex

}
    var o = Number(element.value).toString()
    ScratchTools.Scratch.scratchPaint().selectedItems.forEach(function(el) {
        if (border) {
        var opacity = el.getStrokeColor()._canvasStyle
        } else {
            var opacity = el.getFillColor()._canvasStyle
        }
        function setTheColor(color) {
            if (border) {
            el.setStrokeColor(color)
            } else {
                el.setFillColor(color)
            }
            ScratchTools.Scratch.scratchPaint().selectedItems[0]._changed()
            document.querySelector('img.labeled-icon-button_edit-field-icon_3j-Pf[title="Flip Horizontal"]').parentElement.click()
            document.querySelector('img.labeled-icon-button_edit-field-icon_3j-Pf[title="Flip Horizontal"]').parentElement.click()
        }
if (opacity.split(',').length === 4) {
    var opacitySplit = opacity.split(',')
    opacitySplit.forEach(function(el, i) {
        opacitySplit[i] = el+', '
    })
    opacitySplit[3] = ')'
    opacitySplit[2] = opacitySplit[2].replace(', ', '')
    opacity = opacitySplit.join('')
    if (o === '100') {
        setTheColor(rgbToHex(opacity.replaceAll('rgba', 'rgb')))
    } else {
        setTheColor(rgbToHex(opacity.replaceAll('rgba', 'rgb'))+o)
    }
} else {
    if (o === '100') {
        setTheColor(rgbToHex(opacity))
    } else {
        setTheColor(rgbToHex(opacity)+o)
    }
}
    })
    }
}
}
}
document.body.addEventListener('click', function() {
    if (currentlySelected !== ScratchTools.Scratch.scratchPaint().selectedItems) {
        currentlySelected = ScratchTools.Scratch.scratchPaint().selectedItems
    if (document.querySelector('.scratchtoolsFillOpacity') !== null) {
    if (ScratchTools.Scratch.scratchPaint().selectedItems.length === 1) {
        if (ScratchTools.Scratch.scratchPaint().selectedItems[0].getFillColor()._canvasStyle.split(',').length === 4) 
        {
            document.querySelector('.scratchtoolsFillOpacity').value = (Number(ScratchTools.Scratch.scratchPaint().selectedItems[0].getFillColor()._canvasStyle.split(',')[3].replaceAll(', ','').replaceAll(')','').replaceAll(' ',''))*100).toString()
        } else {
            document.querySelector('.scratchtoolsFillOpacity').value = '100'
        }
        if (ScratchTools.Scratch.scratchPaint().selectedItems[0].getStrokeColor()._canvasStyle.split(',').length === 4) 
        {
            document.querySelector('.scratchtoolsBorderOpacity').value = (Number(ScratchTools.Scratch.scratchPaint().selectedItems[0].getStrokeColor()._canvasStyle.split(',')[3].replaceAll(', ','').replaceAll(')','').replaceAll(' ',''))*100).toString()
        } else {
            document.querySelector('.scratchtoolsBorderOpacity').value = '100'
        }
    } else {
        document.querySelector('.scratchtoolsBorderOpacity').value = '100'
        document.querySelector('.scratchtoolsFillOpacity').value = '100'
    }
}
    }
})
ScratchTools.waitForElements('.mode-tools_mode-tools_2nFfV', addOpacityRange, 'opacityRange', false)
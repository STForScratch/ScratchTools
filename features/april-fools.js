function old() {
	var style = document.createElement('style')
	style.innerHTML = `
.oldtimey-mode_oldtimey-mode_3HvZw {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent url(https://llk.github.io/scratch-gui/hotfix/totally-normal-2022/static/assets/2a95de3c6ac63c073266a3c914f5bae5.png) center center;
    background-size: 100% 100%;
    z-index: 500;
    pointer-events: none;
    background-filter: sepia(100%);
    -webkit-filter: sepia(100%);
}
* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
div {
    display: block;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
`
	document.body.prepend(style)
	var div = document.createElement('div')
	div.className = 'oldtimey-mode_oldtimey-mode_3HvZw'
	div.innerHTML = `<audio src="https://llk.github.io/scratch-gui/hotfix/totally-normal-2022/static/assets/8eb680be2b49c196972d47449c09c05c.mp3" autoplay="" loop=""></audio>`
	document.body.prepend(div)
	document.querySelector('div#app').className = document.querySelector('div#app').className + ' grayscaled'
	var style = document.createElement('style')
	style.innerHTML = `
    .grayscaled {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  filter: grayscale(100%);
}
`
	document.querySelector('div#app').style.height = '100vh'
	document.body.prepend(style)
	document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH > div.menu-bar_file-group_1_CHX > div:nth-child(1) > img').src = 'https://llk.github.io/scratch-gui/hotfix/totally-normal-2022/static/assets/25cd56f3ff25cce57ab8e7fcac1cec97.svg'
}

function ninety() {
	var div = document.createElement('div')
	div.className = 'nineties-mode_nineties-mode_3atEu'
	document.body.prepend(div)
	var style = document.createElement('style')
	style.innerHTML = `
body {
    filter: hue-rotate(40deg);
    height: 100vh;
}
.nineties-mode_nineties-mode_3atEu {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent url(https://llk.github.io/scratch-gui/hotfix/totally-normal-2022/static/assets/481f24625c6709dd567d0b57bb597373.svg);
    z-index: 50;
    opacity: .2;
    pointer-events: none;
}
* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
div {
    display: block;
}
`
	document.body.appendChild(style)
	document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH > div.menu-bar_file-group_1_CHX > div:nth-child(1) > img').src = 'https://llk.github.io/scratch-gui/hotfix/totally-normal-2022/static/assets/2e4f01467d2e307fe2bfca65747c0331.svg'
}

function prehistoric() {
	var div = document.createElement('div')
	div.className = 'prehistoric-mode_prehistoric-mode_30xo9'
	div.innerHTML = `<div class="prehistoric-mode_prehistoric-background_2xL8Y" style="background-position: 2826.94px 2269px;"></div><img class="prehistoric-mode_torch_2mPjO" src="https://llk.github.io/scratch-gui/hotfix/totally-normal-2022/static/assets/35a6aff5f4d65837fc6a3fa4cdc278b4.gif" style="left: 791.941px; top: 49px;">`
	document.body.prepend(div)
	var style = document.createElement('style')
	style.innerHTML = `
.prehistoric-mode_torch_2mPjO {
    position: absolute;
    pointer-events: none;
    opacity: 80%;
    z-index: 50;
    left: --positionX;
    top: --positionY;
}
* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.prehistoric-mode_prehistoric-background_2xL8Y {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 90%;
    z-index: 50;
    pointer-events: none;
    background: transparent url(https://llk.github.io/scratch-gui/hotfix/totally-normal-2022/static/assets/83b0e69764aa20c3e41a391c60aed83d.png) center center;
    -webkit-animation: prehistoric-mode_jitter_1b-1L 2.5s linear infinite;
    animation: prehistoric-mode_jitter_1b-1L 2.5s linear infinite;
}
`
	document.body.appendChild(style)
	document.querySelector('img.menu-bar_scratch-logo_2uReV.menu-bar_clickable_1g3uo').src = 'https://llk.github.io/scratch-gui/hotfix/totally-normal-2022/static/assets/0051f19c3035bdaca5117f973f571af0.svg'
	var img = document.querySelector('img.prehistoric-mode_torch_2mPjO')
	const onMouseMove = (e) => {
		img.style.left = e.pageX - 30 + 'px';
		img.style.top = e.pageY - 230 + 'px';
	}
	document.addEventListener('mousemove', onMouseMove);
}

function reset() {
	document.querySelector('div#app').className = document.querySelector('div#app').className.replaceAll('grayscaled', '')
	document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH > div.menu-bar_file-group_1_CHX > div:nth-child(1) > img').src = 'https://scratch.mit.edu/static/assets/1e9652bec24bcaacf5285be19746a750.svg'
	var style = document.createElement('style')
	style.innerHTML = `
body {
    filter: hue-rotate(0deg);
    height: 100vh;
}
`
	document.body.appendChild(style)
	if (document.querySelector('div.oldtimey-mode_oldtimey-mode_3HvZw') !== null) {
		document.querySelector('div.oldtimey-mode_oldtimey-mode_3HvZw').remove()
	}
	if (document.querySelector('div.prehistoric-mode_prehistoric-mode_30xo9') !== null) {
		document.querySelector('div.prehistoric-mode_prehistoric-mode_30xo9').remove()
	}
	if (document.querySelector('div.nineties-mode_nineties-mode_3atEu') !== null) {
		document.querySelector('div.nineties-mode_nineties-mode_3atEu').remove()
	}
}
waitforready()

ScratchTools.setDisable('april-fools', function() {
	reset()
	document.querySelector('.stmodes').remove()
})

function waitforready() {
	if (document.querySelector('div.menu-bar_main-menu_3wjWH') === null) {
		setTimeout(waitforready, 100)
	} else {
		if (document.querySelector('div.stmodes') === null) {
			var april = document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH > div.menu-bar_file-group_1_CHX > div:nth-child(3)').cloneNode(true)
			april.className = 'menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB stmodes'
			april.firstChild.firstChild.textContent = 'Mode'
			april.onclick = function() {
				var div = document.createElement('div')
				div.className = 'ReactModalPortal'
				div.innerHTML = `<div class="ReactModal__Overlay ReactModal__Overlay--after-open modal_modal-overlay_1Lcbx"><div class="ReactModal__Content ReactModal__Content--after-open modal_modal-content_1h3ll prompt_modal-content_1BfWj" tabindex="-1" role="dialog" aria-label="New Variable"><div class="box_box_2jjDp" dir="ltr" style="flex-direction: column; flex-grow: 1;"><div class="modal_header_1h7ps"><div class="modal_header-item_2zQTd modal_header-item-title_tLOU5">Change Mode</div><div class="modal_header-item_2zQTd modal_header-item-close_2XDeL"></div></div><div class="prompt_body_18Z-I box_box_2jjDp"><div class="prompt_label_tWjYZ box_box_2jjDp">Mode:</div><div class="box_box_2jjDp"><select class="modeSelectScratchTools">
<option value="default">Default</option>
<option value="ninety">Ninety</option>
<option value="old">Old Timey</option>
<option value="prehistoric">Prehistoric</option>
</select></div><div class="prompt_button-row_3Wc5Z box_box_2jjDp"><button class="prompt_ok-button_3QFdD"><span>OK</span></button></div></div></div></div></div>`
				document.body.appendChild(div)
				document.querySelector('button.prompt_ok-button_3QFdD').onclick = function() {
					var select = document.querySelector('select.modeSelectScratchTools').value
					console.log(select)
					div.remove()
					if (select === 'default') {
						reset()
					}
					if (select === 'ninety') {
						reset()
						ninety()
					}
					if (select === 'old') {
						reset()
						old()
					}
					if (select === 'prehistoric') {
						reset()
						prehistoric()
					}
				}
			}
		}

		document.querySelector('#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH').appendChild(april);
	}
}

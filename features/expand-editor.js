if (window.location.href.includes('https://scratch.mit.edu/projects/') && window.location.href.includes('/editor')) {
	if (document.querySelector('div#app.scratchtools.expand') === null) {
		document.querySelector('div#app').className = 'scratchtools expand '+document.querySelector('div#app').className
	document.addEventListener('keydown', function(event) {
		keydown(event)

		function keydown(e) {
			if (e.ctrlKey && e.keyCode == 69) {
				expandEditor()

				if (e.preventDefault) {
					e.preventDefault();
				} else {
					return false;
				}
			}
		}
	})

	function expandEditor() {
		if (document.querySelector('div#app').firstChild.lastChild.firstChild.lastChild.style.zIndex === '-100') {
			document.querySelector('div#app').firstChild.lastChild.firstChild.lastChild.style.zIndex = null
			document.querySelector('svg.blocklySvg').style.width = null
			document.querySelector('div.injectionDiv').style.width = null
			document.querySelector('g.blocklyZoom').style.display = 'block'
			document.querySelector('#react-tabs-1 > div.gui_watermark_3vBYb.box_box_2jjDp > img').style.display = null
		} else {
			document.querySelector('div#app').firstChild.lastChild.firstChild.lastChild.style.zIndex = '-100'
			document.querySelector('svg.blocklySvg').style.width = '100vw'
			document.querySelector('svg.blocklyScrollbarVertical').style.display = 'none'
			document.querySelector('div.injectionDiv').style.width = '100vw'
			document.querySelector('g.blocklyZoom').style.display = 'none'
			document.querySelector('#react-tabs-1 > div.gui_watermark_3vBYb.box_box_2jjDp > img').style.display = 'none'
		}
	}
	}
}

function changeSize() {
	document.querySelectorAll('img').forEach(function(el) {
if (el.src !== undefined) {
    if (window.location.href.match ('https://scratch.mit.edu/studios/')) {
        		if (el.src.includes('90x90')) {
    			el.style.width = '50px'
    			el.style.height = '50px'
			}
		}
    }
	})
	window.setTimeout(changeSize, 80)
}

changeSize()

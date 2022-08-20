if (window.location.href === 'https://scratch.mit.edu' || window.location.href === 'https://scratch.mit.edu/') {
	function checkForDiv() {
		if (document.querySelector('div.box.news') !== null) {
			document.querySelector('div.box.news').remove()
			document.querySelector('div.box.activity').style.width = 'calc(120% - 20px)'
		} else {
			setTimeout(checkForDiv, 100)
		}
	}
	checkForDiv()
}

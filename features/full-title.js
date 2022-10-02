ScratchTools.waitForElements('li.project > span.title > a', function(el) {
	el.title = el.textContent
}, 'full project title', false)
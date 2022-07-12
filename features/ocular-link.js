document.querySelectorAll('a').forEach(function(item) {
	if (item.href.includes('https://scratch.mit.edu/users/')) {
		if (item.className === 'black username') {
			var test = item.parentNode.cloneNode(true)
			test.firstChild.textContent = 'Open in Ocular'
			test.firstChild.href = `https://ocular.jeffalo.net/users/${item.textContent}/`
			item.parentNode.parentNode.appendChild(test)
		}
	}
})

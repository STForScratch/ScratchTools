function check() {
	if (document.querySelector('div.share-date') === null) {
		window.setTimeout(check, 50)
	} else {
		async function checkforNfe() {
			var response = await fetch(`https://tools.scratchstatus.org/nfe/${window.location.href.split('/projects/')[1].split('/')[0]}/`)
			var data = await response.json()
			var date = document.querySelector('div.share-date').lastChild
			if (!date.className.includes('scratchtools')) {
			if (data['status'] === 'notreviewed') {
				date.textContent = `${date.textContent} · 🤔 Not Rated`
				date.className = date.className+' scratchtools'
			}
			if (data['status'] === 'safe') {
				date.textContent = `${date.textContent} · ✅ Rated FE`
				date.className = date.className+' scratchtools'
			}
			if (data['status'] === 'notsafe') {
				date.textContent = `${date.textContent} · ⛔ Rated NFE`
				date.className = date.className+' scratchtools'
			}
			}
		}
		checkforNfe()
	}
}
check()

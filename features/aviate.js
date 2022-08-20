async function getTheUser() {
	var user = window.location.href.replace('https://scratch.mit.edu/users/', '').replaceAll('/', '')
	var response = await fetch('https://aviateapp.eu.org/api/' + user)
	var data = await response.json()
	if (data.success === true && data.status !== null) {
		if (document.querySelector('i.aviate.scratchtools') === null) {
			var i = document.createElement('i')
			i.textContent = data.status
			i.style.opacity = '0.5'
			i.title = "This is an Aviate Status being displayed with ScratchTools."
			i.className = 'aviate scratchtools'
			document.querySelector('div.header-text').appendChild(i)
		}
	}
}
getTheUser()

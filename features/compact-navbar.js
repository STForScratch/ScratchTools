if (document.querySelector('img.avatar') === null && document.querySelector('img.user-icon') === null) {

} else {
	if (document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)') !== null) {
		twoPointO()
	}
	if (document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)') !== null) {
		threePointO()
	}
}

function twoPointO() {
	if (document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span') !== null && document.querySelector('ul.user-nav') !== null) {

		document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span').innerHTML = document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span').innerHTML.replace(document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span').textContent, '')

		var ul = document.querySelector('ul.user-nav')
		var a = document.createElement('a')
		var li = document.createElement('li')
		a.textContent = ul.firstChild.firstChild.href.split('/users/')[1].split('/')[0]
		a.href = ul.firstChild.firstChild.href
		li.appendChild(a)
		ul.firstChild.className = 'divider'
		ul.prepend(li)
	} else {
		window.setTimeout(twoPointO, 50)
	}
}

function threePointO() {
	if (document.querySelector('ul.dropdown.production') !== null) {

		document.querySelector('#navigation > div > ul > li.link.right.account-nav > div > a').lastChild.remove()
		var ul = document.querySelector('ul.dropdown.production')
		ul.firstChild.className = 'divider'
		var a = document.createElement('a')
		var span = document.createElement('span')
		var li = document.createElement('li')
		span.textContent = ul.firstChild.firstChild.href.split('/users/')[1].split('/')[0]
		span.style.color = 'white'
		a.appendChild(span)
		a.href = `https://scratch.mit.edu/users/${span.textContent}/`
		li.appendChild(a)
		ul.prepend(li)
	} else {
		window.setTimeout(threePointO, 50)
	}
}

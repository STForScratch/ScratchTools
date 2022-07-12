async function getUser() {
	var response2 = await fetch("https://scratch.mit.edu/fragment/account-nav.json", {
		"headers": {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9",
			"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "\"macOS\"",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-requested-with": "XMLHttpRequest"
		},
		"referrer": "https://scratch.mit.edu/users/rgantzos/",
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": null,
		"method": "GET",
		"mode": "cors",
		"credentials": "include"
	});
	var data2 = await response2.json()

	var response = await fetch(`https://tools.scratchstatus.org/${window.location.href.split('/users/')[1].split('/')[0]}/isfollowing/${data2.LOGGED_IN_USER.model.username}/`)
	var data = await response.json()
	console.log(data)
	if (data['following'] === true) {
		document.querySelector('#profile-data > div.box-head > div > h2').innerHTML = `${document.querySelector('#profile-data > div.box-head > div > h2').innerHTML} <span style="color: #a3a3a3; font-size: 50%;">Follows You</span>`
	}
}
getUser()

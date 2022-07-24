async function setFeaturedProject(project, user) {
    var response = await fetch("https://scratch.mit.edu/site-api/users/all/" + user + "/", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,el;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": getCookie('scratchcsrftoken'),
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": window.location.href,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"featured_project\":" + project + ",\"featured_project_label\":\"\"}",
        "method": "PUT",
        "mode": "cors",
        "credentials": "include"
    });
    var data = await response.json()
    alert('Set Featured Project.')

    function getCookie(name) {
        var value = `; ${document.cookie}`;
        var parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}

var page = document.querySelector('div.page');
        if (document.querySelector("#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions") !== null) {
            observer.disconnect()
            if (document.querySelector('button.button.action-button.scratchtools') === null) {
                var btn = document.createElement('button')
                btn.textContent = 'Set Featured Project'
                btn.className = 'button action-button scratchtools'
                btn.onclick = function() {
                    setFeaturedProject(window.location.href.replace('https://scratch.mit.edu/projects/', '').replaceAll('/', ''), document.querySelector('div.account-nav').querySelector('ul').querySelector('a').href.replace('https://scratch.mit.edu/users/', '').replaceAll('/', ''))
                }
                if (document.querySelector('input.inplace-input') !== null) {
                    document.querySelector("div.flex-row.action-buttons").appendChild(btn)
                }
            }
        } else {
var configure = {
    attributes: true,
    childList: true,
    subtree: true
};
var getSpot = function(mutationList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationList) {
        if (document.querySelector("#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions") !== null) {
            observer.disconnect()
            if (document.querySelector('button.button.action-button.scratchtools') === null) {
                var btn = document.createElement('button')
                btn.textContent = 'Set Featured Project'
                btn.className = 'button action-button scratchtools'
                btn.onclick = function() {
                    setFeaturedProject(window.location.href.replace('https://scratch.mit.edu/projects/', '').replaceAll('/', ''), document.querySelector('div.account-nav').querySelector('ul').querySelector('a').href.replace('https://scratch.mit.edu/users/', '').replaceAll('/', ''))
                }
                if (document.querySelector('input.inplace-input') !== null) {
                    document.querySelector("div.flex-row.action-buttons").appendChild(btn)
                }
            }
        }
    }
};
var observer = new MutationObserver(getSpot);
observer.observe(page, configure);
        }

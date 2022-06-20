
var li = document.createElement('li')
var a = document.createElement('a')
a.textContent = 'Recently Viewed'
li.appendChild(a)
  li.dataset.tab = 'recent'
document.querySelector('ul#tabs').lastChild.className = ''
li.className = 'last'
document.querySelector('ul#tabs').appendChild(li)
li.onclick = function() {
    getRecent()
}

if (window.location.href === 'https://scratch.mit.edu/mystuff/#recent') {
    getRecent()
}
   
    async function getRecent() {
        function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
        var response2 = await fetch("https://scratch.mit.edu/session/", {
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
  "referrer": "https://scratch.mit.edu/mystuff/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
        var data2 = await response2.json()
var response = await fetch("https://api.scratch.mit.edu/users/"+document.querySelector('ul.user-nav').firstChild.firstChild.href.split('/users/')[1].split('/')[0]+"/projects/recentlyviewed?limit=24&offset=0", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en, en;q=0.8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-token": data2['user']['token']
  },
  "referrer": "https://scratch.mit.edu/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
    var data = await response.json()
    console.log(data)
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
    if (document.querySelector('ul.media-list') === null) {
        var ul = document.createElement('ul')
        ul.className = 'media-list'
        document.querySelector('div#main-content').appendChild(ul)
    } else {
    removeAllChildNodes(document.querySelector('ul.media-list'))
    }
        if (document.querySelector('div.inner') !== null) {
    document.querySelector('div.inner').remove()
        }
    Object.keys(data).forEach(function(project) {
        var pr = document.createElement('li')
        pr.innerHTML = `<div class="media-item-content not-shared"><div class="media-thumb"><a href="/projects/${data[project]['id']}/"><img src="${data[project]['image']}"></a></div><div class="media-info"><span class="media-info-item title"><a href="/projects/${data[project]['id']}/" class="ScratchToolsProjectTitle"></a></span></div></div>`
       pr.querySelector('a.ScratchToolsProjectTitle').textContent = data[project]['title']
        document.querySelector('ul.media-list').prepend(pr)
    })
    deleteButton()
    function deleteButton() {
        if (document.querySelector('#main-content > div.grey.button') !== undefined) {
            document.querySelector('#main-content > div.grey.button').remove()
        } else {
            setTimeout(deleteButton, 50)
        }
    }
}

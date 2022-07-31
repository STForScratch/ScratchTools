if (window.location.href.startsWith('https://scratch.mit.edu/projects/')) {
    const waitForShareDate = new MutationObserver(checkTrending);
    waitForShareDate.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });
    async function checkTrending() {
        if (document.querySelector('div.share-date') !== null) {
            waitForShareDate.disconnect()
        var response = await fetch("https://api.scratch.mit.edu/explore/projects?limit=40&offset=0&language=en&mode=trending&q=*", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,el;q=0.8",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
    },
    "referrer": "https://scratch.mit.edu/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
    });
        var data = await response.json()
        data.forEach(function(el, i) {
            if (el.id.toString() === window.location.href.replace('https://scratch.mit.edu/projects/', '').replaceAll('/', '')) {
                var span = document.createElement('span')
                span.textContent = ` • #${i+1} on Trending`
                document.querySelector('div.share-date').appendChild(span)
            }
        })
    }
    }
    checkTrending()
}

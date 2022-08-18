function removeAdvertisements() {
    document.querySelectorAll('.comment-bubble').forEach(function(el3) {
        var el = el3.firstChild
    if (!el.parentNode.parentNode.parentNode.parentNode.className.includes('scratchtoolsAd')) {
        if (el.querySelector('a') !== null) {
            var allText = ''
            var allLinks = ''
            el.querySelectorAll('a').forEach(function(el2) {
                if (el2.href.replaceAll(' ', '').startsWith('https://scratch.mit.edu/projects/') || el2.href.replaceAll(' ', '').startsWith('https://scratch.mit.edu/studios/')) {
                allText = allText+el2.textContent
                allLinks = allLinks+el2.textContent
                }
            })
            if (el.innerText.toLowerCase().replaceAll(' ', '').includes('followme') || el.innerText === allText || el.innerText.toLowerCase().replaceAll(' ', '').replaceAll('this', '').replaceAll('it', '').replaceAll('him', '').replaceAll('her', '').replaceAll('them', '').includes('checkout') || (el.innerText.toLowerCase().replaceAll(' ', '').includes('lookat') && el.querySelectorAll('a').length > 0) || (el.textContent.length-allLinks.length) < allLinks.length) {
                el.parentNode.parentNode.parentNode.parentNode.style.display = 'none'
                el.parentNode.parentNode.parentNode.parentNode.className = el.parentNode.parentNode.parentNode.parentNode.className+' scratchtoolsAd'
            }
        }
        }
    })
        document.querySelectorAll('.comment > .info > .content').forEach(function(el) {
            if (!el.parentNode.parentNode.parentNode.className.includes('scratchtoolsAd')) {
        if (el.querySelector('a') !== null) {
            var allText = ''
            var allLinks = ''
            el.querySelectorAll('a').forEach(function(el2) {
                if (el2.href.replaceAll(' ', '').startsWith('https://scratch.mit.edu/projects/') || el2.href.replaceAll(' ', '').startsWith('https://scratch.mit.edu/studios/')) {
                allText = allText+el2.textContent
                allLinks = allLinks+el2.textContent
                }
            })
            if (el.innerText.toLowerCase().replaceAll(' ', '').includes('followme') || el.innerText === allText || el.innerText.toLowerCase().replaceAll(' ', '').replaceAll('this', '').replaceAll('it', '').replaceAll('him', '').replaceAll('her', '').replaceAll('them', '').includes('checkout') || (el.innerText.toLowerCase().replaceAll(' ', '').includes('lookat') && el.querySelectorAll('a').length > 0) || (el.textContent.length-allLinks.length) < allLinks.length) {
                el.parentNode.parentNode.parentNode.style.display = 'none'
                el.parentNode.parentNode.parentNode.className = el.parentNode.parentNode.parentNode.className+' scratchtoolsAd'
            }
        }
            }
    })
    }

    var waitForCommentsForAdHider = new MutationObserver(removeAdvertisements);
    waitForCommentsForAdHider.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });
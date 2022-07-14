if (window.location.href.startsWith ('https://scratch.mit.edu/messages')) {
    const targetNode=document.querySelector('div#view')
    const config= {
        attributes: true, childList: true, subtree: true
    }
    console.log("yes")


    const callback=function(mutationList, observer) {
        for(const mutation of mutationList) {
            if (mutation.type==='childList') {
                
                if (document.querySelector('ul.messages-social-list') !==null) {
                    observer.disconnect();
                    editMessages()
                    const messageBox = document.querySelector('ul.messages-social-list');

                    const configuration= {
                        attributes: true, childList: true, subtree: true
                    }

                    ;

                    const callback=function(mutationList, observer) {
                        for(const mutation of mutationList) {
                            if (mutation.type==='childList') {
                                editMessages()
                            }
                        }
                    }

                    ;

                    const messageObserver=new MutationObserver(callback);

                    messageObserver.observe(messageBox, config);

                }
            }
        }
    }

    ;

    const observer=new MutationObserver(callback);

    observer.observe(targetNode, config);

}

async function editMessages() {
    await chrome.storage.sync.get("block", function (obj) {
            if (obj.block !== undefined) {
                var users= obj.block
                document.querySelectorAll('li.social-message').forEach(function(el) {
                        if (el.querySelector('a.social-messages-profile-link') !==null) {
                            if (users.includes(el.querySelector('a.social-messages-profile-link').textContent.toLowerCase())) {
                                console.log(el)
                                el.remove()
                            }
                        }
                    })
            }
        })
}

if (window.location.href.includes('https://scratch.mit.edu/users/')) {
    if (document.querySelector('p.profile-details') !== null) {
        createButton()
    }
    function createButton() {
    var user = window.location.href.replace('https://scratch.mit.edu/users/', '').replaceAll('/', '').toLowerCase()
    if (user.toLowerCase() !== document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > div > ul > li:nth-child(1) > a').href.replace('https://scratch.mit.edu/users/', '').replace('/', '').toLowerCase()) {
var div = document.createElement('div')
div.className = 'buttons'
div.style.right = '120px'
chrome.storage.sync.get("block", async function (obj) {
    if (obj.blocked === undefined) {
        await chrome.storage.sync.set({"block":[]})
        var blocked = []
    } else {
        var blocked = obj.block
    }
    if (blocked.includes(window.location.href.replace('https://scratch.mit.edu/users/', '').replaceAll('/', '').toLowerCase())) {
div.innerHTML = `<div class="button grey">
	<span class="follow text"><span class="follower white"></span>Unblock</span>
	
</div>`
    } else {
        div.innerHTML = `<div class="button red">
	<span class="follow text"><span class="follower white"></span>Block</span>
	
</div>`
    }
document.querySelector('div.box-head').appendChild(div)
div.onclick = async function() {
    if (div.querySelector('span.follow.text').textContent === 'Block') {
    chrome.storage.sync.get("block", async function (obj) {
        var blocked = obj.block
        blocked.push(window.location.href.replace('https://scratch.mit.edu/users/', '').replaceAll('/', '').toLowerCase())
        await chrome.storage.sync.set({ "block":blocked })
        div.querySelector('div').className = 'button grey'
        div.querySelector('span.follow.text').textContent = 'Unblock'
    })
    } else {
chrome.storage.sync.get("block", async function (obj) {
        var blocked = obj.block
        blocked[blocked.indexOf(window.location.href.replace('https://scratch.mit.edu/users/', '').replaceAll('/', '').toLowerCase())] = ''
        await chrome.storage.sync.set({ "block":blocked })
        div.querySelector('div').className = 'button red'
        div.querySelector('span.follow.text').textContent = 'Block'
    })
    }
}
var style = document.createElement('style')
style.innerHTML = `
.red {
    background-color: #db1616;
    border: 0px;
}
`
document.body.appendChild(style)
})
    }
}
}

      if (getCookie('ST Features').includes('sidebar')) {
        if (document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)') !== null) {

          document.querySelector('div#content').style.width = '80%'
document.querySelector('div#content').style.float = 'right'
document.querySelector('div#content').style.right = '0px'
document.querySelector('div#content').style.marginTop = '0px'
document.querySelector('#topnav').remove()
var sidebar = document.createElement('div')
sidebar.style.backgroundColor = '#282424'
sidebar.style.color = 'white'
sidebar.style.width = '20vw'
sidebar.style.height = '100vh'
sidebar.style.position = 'fixed'

var links = document.createElement('ul')

function createMenu(name, href, id) {
    var create = document.createElement('li')
    var createLink = document.createElement('a')
    createLink.href = href
    createLink.textContent = name
    createLink.style.color = 'white'
    createLink.style.textDecoration = 'none'
    create.style.marginTop = '3vh'
    create.style.listStyle = 'none'
    create.appendChild(createLink)
    links.appendChild(create)
    create.style.fontSize = '1.5vw'
    createLink.style.fontSize = '1.5vw'
    if (id === 'username') {
        create.style.fontSize = '2vw'
        createLink.style.fontSize = '2vw'
        create.style.float = 'right'
        create.style.marginRight = '3vw'
        create.style.marginTop = '5vh'
        var br4 = document.createElement('br')
        br4.height = '3vh'
        sidebar.appendChild(create)
        sidebar.appendChild(br4)
            var search = document.createElement('input')
    search.placeholder = 'Search'
    search.type = 'text'
    search.className = 'input st'
    search.style.height = '4vh'
    search.style.width = '14vw'
    search.style.fontSize = '1.5vw'
    search.style.marginLeft = '1.3vw'
        search.style.marginTop = '5vh'
    search.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            search()

            function search() {
                window.location.href = `https://scratch.mit.edu/search/projects?q=${document.querySelector('input.input.st').value}`
            }
        }
    });

    sidebar.appendChild(search)
    } else {
        links.appendChild(create)
    }
}

session()

async function session() {
    var response = await fetch("https://scratch.mit.edu/session/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en, en;q=0.8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://scratch.mit.edu/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });
    var data = await response.json()
    console.log(data)
    var pfp = document.createElement('img')
    pfp.src = `https://uploads.scratch.mit.edu/get_image/user/${data['user']['id']}_90x90.png`
    pfp.style.borderRadius = '3vw'
    pfp.style.width = '6vw'
    pfp.style.height = '6vw'
    pfp.style.marginLeft = '1.8vw'
    pfp.style.float = 'left'
    sidebar.appendChild(pfp)
    createMenu(data['user']['username'], `https://scratch.mit.edu/users/${data['user']['username']}/`, 'username')
    var br2 = document.createElement('br')
    br2.height = '1vh'
    sidebar.prepend(br2)
    createMenu('Home', 'https://scratch.mit.edu/')
    createMenu('Create', 'https://scratch.mit.edu/projects/editor/')
    createMenu('Explore', 'https://scratch.mit.edu/explore/')
    createMenu('Ideas', 'https://scratch.mit.edu/ideas/')
    createMenu('About', 'https://scratch.mit.edu/about/')
    var br = document.createElement('br')
    br.height = '1vh'
    links.appendChild(br)
    var response2 = await fetch(`https://api.scratch.mit.edu/users/${data['user']['username']}/messages/count/`)
    var data2 = await response2.json()
    await createMenu(`Messages (${data2['count']})`, 'https://scratch.mit.edu/messages/')
    if (data2 !== undefined) {
        var br3 = document.createElement('br')
        br3.height = '1vh'
        links.appendChild(br3)
        createMenu('My Stuff', 'https://scratch.mit.edu/mystuff/')
        createMenu('Settings', 'https://scratch.mit.edu/accounts/settings/')
        createMenu('ScratchTools', 'https://scratch.mit.edu/ScratchTools/')
    }

    sidebar.appendChild(links)
}

document.querySelector('div#pagewrapper').prepend(sidebar)
          
        }
        if (document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)') !== null) {

          document.querySelector('div.page').style.width = '80%'
document.querySelector('div.page').style.float = 'right'
document.querySelector('div.page').style.right = '0px'
document.querySelector('div#view').style.marginTop = '0px'
document.querySelector('#navigation').remove()
var sidebar = document.createElement('div')
sidebar.style.backgroundColor = '#282424'
sidebar.style.color = 'white'
sidebar.style.width = '20vw'
sidebar.style.height = '100vh'
sidebar.style.position = 'fixed'

var links = document.createElement('ul')

function createMenu(name, href, id) {
    var create = document.createElement('li')
    var createLink = document.createElement('a')
    createLink.href = href
    createLink.textContent = name
    createLink.style.color = 'white'
    create.style.listStyle = 'none'
    create.appendChild(createLink)
    links.appendChild(create)
    create.style.fontSize = '1.5vw'
    createLink.style.fontSize = '1.5vw'
    if (id === 'username') {
        create.style.fontSize = '2vw'
        createLink.style.fontSize = '2vw'
        create.style.float = 'right'
        create.style.marginRight = '1.5vw'
        create.style.marginTop = '2.2vh'
        var br4 = document.createElement('br')
        br4.height = '3vh'
        sidebar.appendChild(create)
        sidebar.appendChild(br4)
            var search = document.createElement('input')
    search.placeholder = 'Search'
    search.type = 'text'
    search.className = 'input st'
    search.style.height = '4vh'
    search.style.width = '14vw'
    search.style.fontSize = '1.5vw'
    search.style.marginLeft = '1.3vw'
        search.style.marginTop = '5vh'
    search.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            search()

            function search() {
                window.location.href = `https://scratch.mit.edu/search/projects?q=${document.querySelector('input.input.st').value}`
            }
        }
    });

    sidebar.appendChild(search)
    } else {
        links.appendChild(create)
    }
}

session()

async function session() {
    var response = await fetch("https://scratch.mit.edu/session/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en, en;q=0.8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://scratch.mit.edu/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });
    var data = await response.json()
    console.log(data)
    var pfp = document.createElement('img')
    pfp.src = `https://uploads.scratch.mit.edu/get_image/user/${data['user']['id']}_90x90.png`
    pfp.style.borderRadius = '3vw'
    pfp.style.width = '6vw'
    pfp.style.height = '6vw'
    pfp.style.marginLeft = '1.8vw'
    pfp.style.float = 'left'
    sidebar.appendChild(pfp)
    createMenu(data['user']['username'], `https://scratch.mit.edu/users/${data['user']['username']}/`, 'username')
    var br2 = document.createElement('br')
    br2.height = '1vh'
    sidebar.prepend(br2)
    createMenu('Home', 'https://scratch.mit.edu/')
    createMenu('Create', 'https://scratch.mit.edu/projects/editor/')
    createMenu('Explore', 'https://scratch.mit.edu/explore/')
    createMenu('Ideas', 'https://scratch.mit.edu/ideas/')
    createMenu('About', 'https://scratch.mit.edu/about/')
    var br = document.createElement('br')
    br.height = '1vh'
    links.appendChild(br)
    var response2 = await fetch(`https://api.scratch.mit.edu/users/${data['user']['username']}/messages/count/`)
    var data2 = await response2.json()
    await createMenu(`Messages (${data2['count']})`, 'https://scratch.mit.edu/messages/')
    if (data2 !== undefined) {
        var br3 = document.createElement('br')
        br3.height = '1vh'
        links.appendChild(br3)
        createMenu('My Stuff', 'https://scratch.mit.edu/mystuff/')
        createMenu('Settings', 'https://scratch.mit.edu/accounts/settings/')
        createMenu('ScratchTools', 'https://scratch.mit.edu/ScratchTools/')
    }

    sidebar.appendChild(links)
}

document.querySelector('div#app').prepend(sidebar)
          
        }
      }

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

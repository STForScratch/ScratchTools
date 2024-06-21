if (
    document.querySelector(
      "#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)"
    ) !== null
) {
    document.querySelector("#content").style.width = "80%";
    document.querySelector("#content").style.float = "right";
    document.querySelector("#content").style.right = "0";
    document.querySelector("#content").style.marginTop = "0px";
    var navbar = document.querySelector("#topnav");
    var pageWrapper = document.querySelector("div#pagewrapper");
    document.querySelector(".dropdown").remove()
}

if (
    document.querySelector(
      "#footer > div > div > dl:nth-child(3) > dd:nth-child(5)"
    ) !== null
) {
    document.querySelector("div.page").style.width = "84%";
    document.querySelector("div.page").style.float = "right";
    document.querySelector("div.page").style.right = "0";
    document.querySelector("main#view").style.marginTop = "0px";
    var navbar = document.querySelector("#navigation");
    var pageWrapper = document.querySelector("div#app");
}

var sidebar = document.createElement("div");
sidebar.classList = "sidebar"
pageWrapper.prepend(sidebar);
navbar.remove()

var links = document.createElement("ul");
links.classList = "links";
sidebar.appendChild(links);

CheckLogin()

async function createMenu(name, href, imageLink, id) {
    var a;
    var create = document.createElement("li");
    var createText = document.createElement("p");
    var createIcon;

    if (imageLink) {
        createIcon = document.createElement("img");
        createIcon.src = ScratchTools.Resources[imageLink];
        createIcon.classList = "createIcon";

        a = document.createElement("a")
        a.href = href
        a.width = "inherit", a.height = "inherit"
    } else if (imageLink == "profile") {
        createIcon.src = getProfile();
    }

    create.classList = "create"
    createText.textContent = name;
    createText.classList = "createText";
    links.appendChild(create);
    if (a) {
        create.append(a); 
        if (createIcon) a.appendChild(createIcon);
        a.appendChild(createText);
    } else {
        if (createIcon) create.appendChild(createIcon);
        create.appendChild(createText)
    }

    if (id == "top") {
        create.classList += " top"

        var scratchLogo = document.createElement("img");
        scratchLogo.src = "https://scratch.mit.edu/images/logo_sm.png";
        scratchLogo.classList = "SLogo";
        scratchLogo.onclick = () => {location.href = "/"};
        createText.remove();
        create.style.gap = "10px"
        create.appendChild(scratchLogo);
        create.onclick = () => {};
        create.addEventListener("mouseenter", function() {
            create.style.backgroundColor = "transparent"
        })

        var create2 = document.createElement("a");
        var create2Img = document.createElement("img")
        create2Img.src = "https://scratch.mit.edu/images/nav-notifications.png";
        create2Img.classList = "img2"
        create2.classList = "miniCreate";
        create2.href = "/messages"
        create.appendChild(create2);
        create2.appendChild(create2Img);

        var create3 = document.createElement("a");
        var create3Img = document.createElement("img")
        create3Img.src = "https://scratch.mit.edu/images/mystuff.png";
        create3Img.classList = "img"
        create3.classList = "miniCreate";
        create3.href = "/mystuff"
        create.appendChild(create3);
        create3.appendChild(create3Img);
    }

    if (id == "search") {
        createText.remove();
        create.onclick = () => {};
        var search = document.createElement("input");
        create.appendChild(search)
        search.placeholder = name;
        search.type = "text";
        search.classList = "input st";
        search.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                search();

                function search() {
                    window.location.href = `https://scratch.mit.edu/search/projects?q=${
                        document.querySelector("input.input.st").value
                    }`;
                }
            }
        })
    }

    if (id == "profile") {
        createIcon.src = imageLink;
        createIcon.classList = "createIcon";
        createIcon.style.borderRadius = "99999px";
    }

    if (id == "logout") {
        create.onclick = () => {
            logOut()
        }
    }
}

createDefault()

async function CheckLogin() {
    if ((await ScratchTools.Session()).user) {
        loggedIn()
        console.log("no")
    } else {
        NotLoggedIn()
        console.log("yes")
    }
}

function createDefault() {
    createMenu("", "", "", "top");
    createMenu("Search", "", "", "search")
    createMenu("Home Page", "/", "home", "home");
    createMenu("Create", "/", "create", "create");
    createMenu("Explore", "/", "explore", "explore");
    createMenu("Ideas", "/", "ideas", "ideas");
    createMenu("About", "/", "about", "about");
}

async function loggedIn() {
    var response = await fetch("https://scratch.mit.edu/session/", {
      headers: {
        accept: "*/*",
        "accept-language": "en, en;q=0.8",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: "https://scratch.mit.edu/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    var data = await response.json();
    var br = document.createElement("br");
    br.style.paddingTop = "60vh"
    links.appendChild(br)
    createMenu(data["user"]["username"], `https://scratch.mit.edu/users/${data["user"]["username"]}/`, `https://uploads.scratch.mit.edu/get_image/user/${data["user"]["id"]}_90x90.png`, "profile")
    createMenu("Account Settings", "/accounts/settings/", "settings", "")
    createMenu("Log Out", "", "logout", "logout")
}

async function logOut() {
    var response = await fetch("https://scratch.mit.edu/accounts/logout/", {
  "headers": {
    "x-csrftoken": ScratchTools.cookies.get("scratchcsrftoken"),
  },
  "method": "POST",
  });
    window.location.href = "/"
}

function NotLoggedIn() {
    var br2 = document.createElement("br");
    links.appendChild(br2)
    createMenu("Sign In", "/login", "signIn", "signIn")
}

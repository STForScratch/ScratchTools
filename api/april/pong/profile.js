export default async function () {
    let img = await ScratchTools.waitForElement("form#profile-avatar a img")

    let user = Scratch.INIT_DATA?.LOGGED_IN_USER?.model?.username.toLowerCase()
    let username = window.location.pathname.split("/")[2].toLowerCase()

    if (user === username) return;

    img.parentNode.removeAttribute("href")

    img.addEventListener("click", function() {
        chrome.runtime.sendMessage(ScratchTools.id, {
            msg: "openPong",
            username,
            id: Scratch.INIT_DATA.PROFILE.model.userId,
          });
    })
}
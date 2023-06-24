async function getBlockedUsers() {
var blocked = await ScratchTools.storage.get("block") || []
ScratchTools.waitForElements("li.social-message", async function(message) {
    if (message.querySelector("a.social-messages-profile-link")) {
        if (blocked.includes(message.querySelector("a.social-messages-profile-link").textContent)) {
            message.classList.add("ste-blocked-message")
        }
    }
})
}
getBlockedUsers()
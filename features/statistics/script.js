export default async function ({ feature, console }) {
    const container = await ScratchTools.waitForElement("div.box.v-tabs div#sidebar.tabs-index ul#tabs")

    let li = document.createElement("li")
    li.dataset.tab = "ste-statistics"
    li.classList.add("last")
    container.appendChild(li)

    let a = document.createElement("a")
    a.href = `https://scratchstats.com/${Scratch.INIT_DATA.LOGGED_IN_USER.model.username}`
    a.textContent = feature.msg("statistics")
    li.appendChild(a)

    feature.self.hideOnDisable(li)

    if (document.querySelector(".recent-scratchtools")) {
        document.querySelector(".recent-scratchtools").parentNode.classList.remove("last")
    }

    feature.addEventListener("enabled", function() {
        if (document.querySelector(".recent-scratchtools")) {
            document.querySelector(".recent-scratchtools").parentNode.classList.remove("last")
        }
    })

    feature.addEventListener("disabled", function() {
        if (document.querySelector(".recent-scratchtools")) {
            document.querySelector(".recent-scratchtools").parentNode.classList.add("last")
        }
    })
}
export default async function ({ feature, console }) {
    let div = await ScratchTools.waitForElement("div.box.slider-carousel-container")
    if (!document.querySelector("#profile-data")) return;

    let stats = await getStats(Scratch.INIT_DATA.PROFILE.model.username)
    
    let span = document.createElement("span")
    span.textContent = stats.loves.toLocaleString() + " loves • " + stats.favorites.toLocaleString() + " favorites • " + stats.views.toLocaleString() + " views"
    span.className = "ste-total-stats"
    feature.self.hideOnDisable(span)
    div.querySelector(".box-head").insertBefore(span, div.querySelector("a"))

    async function getProjects(user) {
        let projects = []
        let offset = 0
        let keepGoing = true

        while (keepGoing) {
            let data = await (await fetch(`https://api.scratch.mit.edu/users/${user}/projects?limit=40&offset=${offset.toString()}`)).json()

            projects.push(...data)

            if (data.length === 40) {
                offset += 40
            } else {
                keepGoing = false
            }
        }

        return projects
    }

    async function getStats(user) {
        let projects = await getProjects(user)
        let stats = {
            loves: 0,
            favorites: 0,
            remixes: 0,
            views: 0,
        }

        for (var i in projects) {
            stats.loves += projects[i].stats.loves
            stats.favorites += projects[i].stats.favorites
            stats.remixes += projects[i].stats.remixes
            stats.views += projects[i].stats.views
        }

        return stats
    }
}
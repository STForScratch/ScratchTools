async function getProjects() {
    let projects = (await chrome.storage.sync.get("watchLater"))?.watchLater || []

    projects = projects.reverse()
    
    for (var i in projects) {
        let data = await (await fetch(`https://data.scratchtools.app/projects/${projects[i]}/`)).json()
        if (!data.error) {
            let div = document.createElement("div")
            div.className = "thumbnail project"

            let a = document.createElement("a")
            a.className = "thumbnail-image"
            a.href = `https://scratch.mit.edu/projects/${projects[i]}/`
            div.appendChild(a)

            let img = document.createElement("img")
            img.src = data.image
            a.appendChild(img)

            let info = document.createElement("div")
            info.className = "thumbnail-info"
            div.appendChild(info)

            let creator = document.createElement("div")
            creator.className = "creator-image"
            info.appendChild(creator)

            let picture = document.createElement("img")
            picture.src = data.author.profile.images["90x90"]
            picture.alt = data.author.username
            creator.appendChild(picture)

            let title = document.createElement("div")
            title.className = "thumbnail-title"
            info.appendChild(title)

            let link = document.createElement("a")
            link.href = `https://scratch.mit.edu/projects/${projects[i]}/`
            link.textContent = data.title
            link.title = data.title
            title.appendChild(link)

            let author = document.createElement("div")
            author.className = "thumbnail-creator"
            title.appendChild(author)

            let profile = document.createElement("a")
            profile.href = `https://scratch.mit.edu/users/${data.author.username}/`
            profile.textContent = data.author.username
            author.appendChild(profile)

            document.querySelector(".projects").appendChild(div)
        }
    }
}

getProjects()
export default async function ({ feature, console, className }) {
    let auth = await feature.auth.fetch()
    if (!auth?.user?.username) return console.log("User not logged in.");

    let user = auth.user.username
    let profile = Scratch.INIT_DATA.PROFILE.model.username

    if (user === profile) return;

    async function getFollow(username, type, maxRequests) {
        const LIMIT = 40

        let url = `https://api.scratch.mit.edu/users/${username}/${type}`
        let follows = []

        let keepGoing = true
        let offset = 0
        let requests = 0
        while (keepGoing) {
            let data = await (await fetch(url + `?offset=${offset}&limit=${LIMIT}`)).json()
            follows.push(...data)

            requests += 1

            if (data.length < 20) {
                keepGoing = false
            }

            if (requests === maxRequests) {
                keepGoing = false
            }

            offset += LIMIT
        }

        return follows
    }

    const profileFollowing = await getFollow(profile, "following", 10)
    const profileFollowers = await getFollow(profile, "followers", 10)
    const userFollowing = await getFollow(user, "following", 5)

    const mutualFollowing = profileFollowing.filter((pF) => userFollowing.find((uF) => uF.username === pF.username))
    const mutualFollowers = profileFollowers.filter((pF) => userFollowing.find((uF) => uF.username === pF.username))

    let followingUsernames = []
    let followersUsernames = []

    for (var i in mutualFollowing) {
        followingUsernames.push(mutualFollowing[i].username)
    }

    for (var i in mutualFollowers) {
        followersUsernames.push(mutualFollowers[i].username)
    }

    const followingBox = document.querySelector(`div.box.slider-carousel-container a[href='/users/${profile}/following/']`).closest(".box")
    const followersBox = document.querySelector(`div.box.slider-carousel-container a[href='/users/${profile}/followers/']`).closest(".box")
    
    let followingContainer = Object.assign(document.createElement("div"), {
        className: className("mutual following container")
    })
    followingContainer.title = followingUsernames.join(", ")
    let followersContainer = Object.assign(document.createElement("div"), {
        className: className("mutual followers container")
    })
    followersContainer.title = followersUsernames.join(", ")
    feature.self.hideOnDisable(followingContainer)
    feature.self.hideOnDisable(followersContainer)

    followingBox.querySelector(".box-head").insertBefore(followingContainer, followingBox.querySelector(".box-head a"))
    followersBox.querySelector(".box-head").insertBefore(followersContainer, followersBox.querySelector(".box-head a"))

    for (var i in mutualFollowing) {
        if (Number(i) < 5) {
        let mF = mutualFollowing[i]
        let image = Object.assign(document.createElement("img"), {
            src: mF.profile.images["90x90"]
        })
        image.setAttribute("style", "--i:"+i)
        followingContainer.appendChild(image)
    }
    }

    if (mutualFollowing.length > 0) {
        let span = Object.assign(document.createElement("span"), {
            textContent: `Following ${mutualFollowing[0].username}${mutualFollowing.length > 1 ? ` and ${mutualFollowing.length - 1} ${mutualFollowing.length > 2 ? "others" : "other"}` : ""}`
        })
        followingContainer.appendChild(span)
    }

    for (var i in mutualFollowers) {
        let mF = mutualFollowers[i]
        let image = Object.assign(document.createElement("img"), {
            src: mF.profile.images["90x90"]
        })
        image.setAttribute("style", "--i:"+i)
        followersContainer.appendChild(image)
    }

    if (mutualFollowers.length > 0) {
        let span = Object.assign(document.createElement("span"), {
            textContent: `Followed by ${mutualFollowers[0].username}${mutualFollowers.length > 1 ? ` and ${mutualFollowers.length - 1} ${mutualFollowers.length > 2 ? "others" : "other"}` : ""}`
        })
        followersContainer.appendChild(span)
    }
}
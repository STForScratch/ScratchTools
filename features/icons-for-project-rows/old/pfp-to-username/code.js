export default async function ({ addon, console, msg }) {

    async function remB() {
        let rem_a = document.querySelector(".thumbnail-creator:not(.read)")
        // let rem = document.createElement("div")
        if (rem_a == undefined) return;
        rem_a.classList.add("read")
        let rem_b = rem_a.querySelector("a")
        // let rem_a = document.createElement("div")
        // let rem_b = document.createElement("a")
        let user
        try {
            user = await (await fetch(rem_b.href.replace("https://", "https://api."))).json()
        } catch (error) {
            // console.log(error)
        }
        if (!(user.profile == undefined)) {
            // let img = document.createElement("img")
            let img
            new Promise((resolve) => {
                img = new Image()
                img.onload = () => resolve(img)
                img.src = user.profile.images["90x90"]
            })
            let rem = document.createElement("a")
            rem.className = "SA-a-project-user-image"
            rem.href = rem_b.href
            rem.append(img)
            rem_a.insertBefore(rem, rem_b)
            rem_a.classList.add("img-added")
        }
        // console.log(rem_a, img)
    }
    if (addon.settings.get("BoxProcjetUserProfilePicture")) {
        setInterval(() => {
            remB()
        }, 50);
    }
}
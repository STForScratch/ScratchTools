export default async function ({ feature, console, className }) {
    if (document.querySelector("." + className("real profile date"))) return;

    const PROFILE = Scratch.INIT_DATA.PROFILE.model.username
    
    const data = await (await fetch(`https://api.scratch.mit.edu/users/${PROFILE}/`)).json()
    const joined = data.history.joined

    const profileDetails = document.querySelector(".profile-details")
    profileDetails.classList.add(className("real profile date"))
    const profileDetailsChildNodes = profileDetails.childNodes
    const profileLocation = profileDetails.querySelector(".location")

    const locationIndex = [...profileDetailsChildNodes].indexOf(profileLocation)
    const agoIndex = locationIndex - 1
    const dateIndex = locationIndex - 2

    const oldJoined = profileDetailsChildNodes[dateIndex].textContent

    const newAgo = Object.assign(document.createElement("span"), {
        textContent: profileDetailsChildNodes[agoIndex].textContent,
        className: className("hide ago real date")
    })

    profileDetails.insertBefore(newAgo, profileDetails.querySelector(".location"))
    profileDetailsChildNodes[agoIndex].remove()

    profileDetailsChildNodes[dateIndex].textContent = new Date(joined).toLocaleString()

    feature.addEventListener("disabled", function() {
        profileDetailsChildNodes[dateIndex].textContent = oldJoined
    })

    feature.addEventListener("enabled", function() {
        profileDetailsChildNodes[dateIndex].textContent = new Date(joined).toLocaleString()
    })
}
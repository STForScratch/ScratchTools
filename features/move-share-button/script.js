export default async function({ feature, console }) {
    let container = await ScratchTools.waitForElement(".preview > .banner-outer")
    let share = container.querySelector("button.button.banner-button")
    let buttons = await ScratchTools.waitForElement(".inner > .flex-row.preview-row.force-row > .project-buttons")
    buttons.prepend(share)
    container.style.display = "none"

    feature.addEventListener("disabled", function() {
        container.style.display = null
        container.firstChild.appendChild(share)
    })

    feature.addEventListener("enabled", function() {
        container.style.display = "none"
        buttons.prepend(share)
    })
}
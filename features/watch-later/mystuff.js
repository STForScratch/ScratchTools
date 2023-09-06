export default async function ({ feature, console }) {
    let buttons = await ScratchTools.waitForElement(".cols .box div.buttons")

    let a = document.createElement("a")
    a.href = feature.self.getResource("watch-later-page")
    a.className = "button small grey"

    let span = document.createElement("span")
    span.textContent = feature.msg("watch-later")
    span.className = "text"
    a.appendChild(span)

    buttons.appendChild(a)

    feature.self.hideOnDisable(a)
}
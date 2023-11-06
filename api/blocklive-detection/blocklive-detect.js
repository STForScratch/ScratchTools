export default async function () {
  if (document.querySelector(".ste-bl-together-bg")) return;
  let alertedBefore = await ScratchTools.storage.get("steBlAlert");
  await ScratchTools.storage.set({ key: "steBlAlert", value: false });
  await ScratchTools.waitForElement("script.blocklive-ext");
  if (!alertedBefore) {
    let div = document.createElement("div")
    div.className = "ste-bl-together-bg"

    let innerDiv = document.createElement("div")
    innerDiv.className = "ste-bl-together"
    div.appendChild(innerDiv)

    let img = document.createElement("img")
    img.src = ScratchTools.dir + "/api/blocklive-detection/extensions.svg"

    let h3 = document.createElement("h3")
    let span1 = document.createElement("span")
    span1.textContent = "You're Using"
    let span2 = document.createElement("span")
    span2.style.color = "#ff9f00"
    span2.style.fontWeight = "800"
    span2.textContent = " ScratchTools "
    let span3 = document.createElement("span")
    span3.textContent = "and"
    let span4 = document.createElement("span")
    span4.style.color = "#cf63cf"
    span4.style.fontWeight = "800"
    span4.textContent = " Blocklive "
    let span5 = document.createElement("span")
    span5.textContent = "Together!"
    h3.append(span1, span2, span3, span4, span5)

    let p = document.createElement("p")
    p.textContent = "Thanks for using both extensions! If you experience any issues, please do reach out!"

    innerDiv.appendChild(img)
    innerDiv.appendChild(h3)
    innerDiv.appendChild(p)
    document.body.appendChild(div)

    let button = document.createElement("button")
    button.addEventListener("click", async function() {
      div.remove()
      await ScratchTools.storage.set({ key: "steBlAlert", value: true });
    })
    button.textContent = "Close"
    innerDiv.appendChild(button)

    let link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = ScratchTools.dir + "/api/blocklive-detection/style.css"
    document.head.appendChild(link)

    setInterval(function() {
      div.style.backgroundImage = `linear-gradient(${Math.round(Date.now() / 20) - (Math.floor(Math.round(Date.now() / 20) / 360) * 360).toString()}deg, #cf63cf, #cf63cf20, #ff9f00, #ff9f0020)`
    }, 10)
  }
}

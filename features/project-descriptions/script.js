export default async function ({ feature, console }) {
    ScratchTools.waitForElements(".flex-row.project-notes", function(notes) {
        if (notes.querySelector(".project-textlabel")) {
            let description = notes.querySelector(".project-description")

            if (description.textContent.replaceAll(" ", "")) {
                let label = notes.querySelector(".project-textlabel")

                let img = document.createElement("img")
                img.src = feature.self.getResource("ai-star")
                img.className = "ai-star"
                label.appendChild(img)

                img.addEventListener("click", async function() {
                    img.remove()
                    notes.innerHTML = ""
                    
                    let div = document.createElement("div")
                    div.className = "description-block ai-description"

                    let inner = document.createElement("div")
                    inner.className = "project-description"
                    inner.textContent = "Loading summarization..."
                    div.appendChild(inner)
                    notes.appendChild(div)

                    let data = await (await fetch(`https://data.scratchtools.app/description/${window.location.pathname.split("/")[2]}/`)).json()
                    inner.textContent = data.response

                    let p = document.createElement("p")
                    p.textContent = "AI description provided by ScratchTools."
                    div.appendChild(p)
                })
            }
        }
    })
}
export default async function ({ feature, console }) {
    window.feature = feature

    ScratchTools.waitForElements("div[class*='sprite-info_row_']:nth-child(2) > div[class*='sprite-info_group_']:nth-child(1)", function (button) {
        button.addEventListener("mouseover", function () {
            if (feature.traps.vm.editingTarget.isStage || button.querySelector(".ste-layers")) return;

            button.style.position = "relative"

            let div = document.createElement("div")
            div.className = "ste-layers"

            let h3 = document.createElement("h3")
            h3.textContent = "Layers"
            div.appendChild(h3)

            div.appendChild(buildDiagram())

            if (div.querySelector("div").childNodes.length > 12) {
                div.classList.add("ste-long-layers")
            }

            let p = document.createElement("p")
            p.textContent = "Layers to the left are to the front. Bright blue indicates the current sprite, and light blue indicates any of its clones."
            div.appendChild(p)

            button.appendChild(div)
        })

        button.addEventListener("mouseout", function () {
            button.querySelector(".ste-layers")?.remove()
            button.style.position = null
        })
    })

    function buildDiagram() {
        let targets = feature.traps.vm.runtime.targets

        let div = document.createElement("div")
        let elements = []

        for (var i in targets) {
            let place = document.createElement("div")
            place.style.width = `calc(${(100 / targets.length).toString()}% - .1rem)`
            elements.push(place)
        }

        for (var i in targets) {
            if (targets[i].sprite.name === feature.traps.vm.editingTarget.sprite.name) {
                if (targets[i].isOriginal) {
                    elements[targets[i].getLayerOrder() - 1].style.backgroundColor = "#034efc"
                } else {
                    elements[targets[i].getLayerOrder() - 1].style.backgroundColor = "#034efc70"
                }
            }
        }

        div.append(...elements)
        return div
    }
}
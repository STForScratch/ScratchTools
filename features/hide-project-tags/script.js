export default async function ({ feature, console }) {
    let ALL_TAGS = []

    ScratchTools.waitForElements('.project-description a[href*="/search/projects?q="]:not(.scratchtoolsTag)', function (tag) {
        if (tag.textContent?.startsWith("#")) {
            ALL_TAGS.push({
                tag,
                content: tag.textContent.toLowerCase(),
            })

            update()
        }
    })

    function update() {
        if (feature.self.enabled) {
            let dupesOnly = feature.settings.get("remove-dupes")

            if (dupesOnly) {
                for (var i in ALL_TAGS) {
                    if (ALL_TAGS.filter((tag) => tag.content === ALL_TAGS[i].content)[0].tag === ALL_TAGS[i].tag) {
                        if (ALL_TAGS[i].tag?.style) {
                            ALL_TAGS[i].tag.style.display = null
                        }
                    } else {
                        if (ALL_TAGS[i].tag?.style) {
                            ALL_TAGS[i].tag.style.display = "none"
                        }
                    }
                }
            } else {
                for (var i in ALL_TAGS) {
                    if (ALL_TAGS[i].tag?.style) {
                        ALL_TAGS[i].tag.style.display = "none"
                    }
                }
            }
        } else {
            for (var i in ALL_TAGS) {
                if (ALL_TAGS[i].tag?.style) {
                    ALL_TAGS[i].tag.style.display = null
                }
            }
        }
    }

    feature.settings.addEventListener("changed", update)
    feature.addEventListener("disabled", update)
    feature.addEventListener("enabled", update)
}
export default async function({ feature, console }) {
    let ELEMENTS = []
    let type = feature.settings.get("custom-explore-tab") || "Animations"

    ScratchTools.waitForElements("a[href='/explore/projects/'], a[href='/explore/projects'], a[href='/explore/projects/all'], a[href='/explore/projects/all/']", function(a) {
        if (a.parentElement.className.includes("sub-nav categories")) return;
        ELEMENTS.push(a)

        a.href = feature.self.enabled ? `/explore/projects/${type.toLowerCase()}/` : "/explore/projects/"
    })
    
    function updateRedirects() {
        for (var i in ELEMENTS) {
            ELEMENTS[i].href = feature.self.enabled ? `/explore/projects/${type.toLowerCase()}/` : "/explore/projects/"
        }
    }

    feature.addEventListener("disabled", updateRedirects)
    feature.addEventListener("enabled", updateRedirects)
    feature.settings.addEventListener("changed", function({ value }) {
        type = value
        updateRedirects()
    })
}
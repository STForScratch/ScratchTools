export default async function ({ feature, console }) {
    let MONITORS = []

    feature.page.waitForElements("div.monitor-overlay[class*='monitor-list_monitor-list_']", function(monitors) {
        MONITORS.push(monitors)

        monitors.style.opacity = feature.self.enabled ? (((feature.settings.get("monitor-opacity")) || 0) / 100).toString() : "100%"
    })

    function updateMonitors(opacity) {
        for (var i in MONITORS) {
            MONITORS[i].style.opacity = feature.self.enabled ? (((feature.settings.get("monitor-opacity")) || 0) / 100).toString() : "100%"
        }
    }

    feature.addEventListener("enabled", updateMonitors)
    feature.addEventListener("disabled", updateMonitors)
    feature.settings.addEventListener("changed", updateMonitors)
}
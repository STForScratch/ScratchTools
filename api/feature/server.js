export default function (id) {
    return {
        url: "https://data.scratchtools.app",
        endpoint: function(path) {
            return "https://data.scratchtools.app" + path
        },
    }
}
const fs = require("fs")
let features = JSON.parse(fs.readFileSync("./features/features.json"))
let manifest = JSON.parse(fs.readFileSync("./manifest.json"))
let permissions = ["https://api.scratch.mit.edu"]

for (var i in features) {
    if (features[i].version === 2) {
        let feature = JSON.parse(fs.readFileSync(`./features/${features[i].id}/data.json`))
        if (feature.permissions) {
            permissions.push(...feature.permissions.filter((perm) => !permissions.includes(perm)))
        }
    }
}

manifest.optional_permissions = permissions.filter((perm) => !checkUrl(perm))
manifest.optional_host_permissions = permissions.filter((perm) => checkUrl(perm))
fs.writeFileSync("./manifest.json", JSON.stringify(manifest, null, 2), 'utf8');

function checkUrl(perm) {
    try {
        new URL(perm);
        return true;
    } catch (_) {
        return false;
    }
}
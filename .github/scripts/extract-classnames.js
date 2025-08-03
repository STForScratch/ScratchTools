const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "../../features");
const outputFile = path.resolve(__dirname, "../../class-names.json");

let collected = new Set();

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      traverseDir(fullPath);
    } else if (stat.isFile() && file.endsWith(".js")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const regex = /className\(["'`](.*?)["'`]\)/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        collected.add({
          className: "ste-" + match[1].replaceAll(" ", "-"),
          features: [
            dir.split("/features/")[1].split("/")[0].replaceAll(".js", ""),
          ],
        });
      }
    }
  }
}

traverseDir(rootDir);

const mergedFeatures = Object.values(
    [...collected].reduce((acc, item) => {
      if (!acc[item.className]) {
        acc[item.className] = { className: item.className, features: new Set() };
      }
      item.features.forEach(f => acc[item.className].features.add(f));
      return acc;
    }, {})
  ).map(obj => ({ className: obj.className, features: [...obj.features] }));

fs.writeFileSync(outputFile, JSON.stringify(mergedFeatures, null, 2));

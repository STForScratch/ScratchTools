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
        collected.add("ste-" + match[1].replaceAll(" ", "-"));
      }
    }
  }
}

traverseDir(rootDir);

// Write results
fs.writeFileSync(outputFile, JSON.stringify([...collected], null, 2));
console.log(`✅ Extracted ${collected.size} class names to ${outputFile}`);

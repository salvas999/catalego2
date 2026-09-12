const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const output = path.join(root, "dist");

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const filename of ["index.html", "styles-v7.css", "app-v7.js"]) {
  fs.copyFileSync(path.join(root, filename), path.join(output, filename));
}

fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
console.log("PACK24 pronto em dist/");

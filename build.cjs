const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const output = path.join(root, "dist");

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const filename of ["index.html", "sobre.html", "contactos.html", "styles-v7.css", "brand.css", "app.js"]) {
  fs.copyFileSync(path.join(root, filename), path.join(output, filename));
}

fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });

// The operations dashboard reads this small public feed so the VAT, sale
// prices and returnable-container values always match the catalogue.
const catalogueSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const productsStart = catalogueSource.indexOf("const products = ");
const productsEnd = catalogueSource.indexOf("\n];", productsStart);
if (productsStart < 0 || productsEnd < 0) throw new Error("Não foi possível gerar os preços do catálogo.");
const productsLiteral = catalogueSource.slice(productsStart + "const products = ".length, productsEnd + 2);
const products = Function(`"use strict"; return (${productsLiteral});`)();
const pricingFeed = products.filter(product => !product.comingSoon).map(({ id, name, short, packUnits, exVat, incVat, vat, volta }) => ({
  id, name, short, packUnits, exVat, incVat, vat, volta: Boolean(volta),
  voltaPerPack: volta ? Number((0.10 * Number(packUnits)).toFixed(2)) : 0
}));
fs.writeFileSync(path.join(output, "catalog-prices.json"), `${JSON.stringify(pricingFeed, null, 2)}\n`);
console.log("PACK24 pronto em dist/");

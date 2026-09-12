const { JSDOM, VirtualConsole } = require("jsdom");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function parseEuro(text) {
  return Number(text.replace(/[^\d,.-]/g, "").replace(".", "").replace(",", "."));
}

(async () => {
  const browserErrors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", error => browserErrors.push(error.message));
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  const script = fs.readFileSync(path.join(__dirname, "app-v5.js"), "utf8");
  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    url: "https://pack24-private.test/",
    virtualConsole
  });
  dom.window.eval(script);
  const { document } = dom.window;
  const click = selector => document.querySelector(selector).click();
  const count = selector => document.querySelectorAll(selector).length;

  assert.equal(count(".product-card"), 24, "Mostra as 24 referências atuais do catálogo");
  assert.match(document.querySelector("#result-count").textContent, /24 produtos/);
  assert.equal(document.querySelector('[data-product="chupachups"]'), null, "Expositor Chupa Chups removido");
  assert.equal(document.querySelector('[data-product="h2ope-33"]'), null, "Água 33cl removida");

  const search = document.querySelector("#search");
  search.value = "coca";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  assert.equal(count(".product-card"), 2, "Pesquisa sem recarregar");
  search.value = "";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));

  [...document.querySelectorAll("[data-category]")].find(el => el.dataset.category === "Águas").click();
  assert.equal(count(".product-card"), 3, "Filtro por categoria");
  [...document.querySelectorAll("[data-category]")].find(el => el.dataset.category === "Todos").click();

  click('[data-product="coca-cola"] [data-add]');
  click('[data-product="seven-up"] [data-add]');
  click('[data-product="seven-up"] [data-increase]');
  assert.equal(document.querySelector("[data-cart-count]").textContent, "3", "Contador soma packs");

  click(".cart-trigger--top");
  assert.equal(document.querySelector("#cart-shell").hidden, false, "Pedido abre");
  assert.equal(document.querySelector("#cart-empty").hidden, true, "Aviso de carrinho vazio fica oculto quando há produtos");
  assert.equal(parseEuro(document.querySelector("#subtotal-ex").textContent), 38.16, "Subtotal sem IVA correto");
  assert.equal(parseEuro(document.querySelector("#vat-total").textContent), 8.78, "IVA correto");
  assert.equal(parseEuro(document.querySelector("#total-inc").textContent), 46.94, "Total com IVA correto");

  document.querySelector("#customer-name").value = "Café Teste";
  document.querySelector("#customer-location").value = "Sobreda";
  let waUrl = "";
  dom.window.open = url => { waUrl = url; };
  click("#whatsapp-action");
  const message = decodeURIComponent(waUrl.split("?text=")[1]);
  assert.match(waUrl, /^https:\/\/wa\.me\/351938113585\?text=/, "WhatsApp correto");
  assert.match(message, /2× 7Up/);
  assert.match(message, /Subtotal sem IVA: 38,16/);
  assert.match(message, /IVA: 8,78/);
  assert.match(message, /Total com IVA e depósitos: 46,94/);
  assert.match(message, /Café Teste/);
  assert.match(message, /Sobreda/);

  click('[data-remove="coca-cola"]');
  assert.equal(document.querySelector("[data-cart-count]").textContent, "2", "Remover atualiza contador");
  click('[data-decrease="seven-up"]');
  click('[data-decrease="seven-up"]');
  assert.equal(document.querySelector("#cart-empty").hidden, false, "Estado vazio aparece");

  const water = dom.window.PACK24_TEST.products.find(product => product.id === "h2ope-50");
  assert.equal(dom.window.PACK24_TEST.unitIncVat(water), 4.34, "IVA de água a 13% correto");
  assert.equal(dom.window.PACK24_TEST.voltaDeposit(water), 2.40, "Depósito VOLTA de 0,10 € por unidade correto");
  const allPricesComplete = dom.window.PACK24_TEST.products.every(product => [product.exVat, product.incVat, product.unitEx, product.unitInc].every(Number.isFinite));
  assert.equal(allPricesComplete, true, "Todos os produtos têm preço de pack e unitário");
  const allPhotosExist = dom.window.PACK24_TEST.products.every(product => fs.existsSync(path.join(__dirname, "assets", "products", `${product.id}.png`)));
  assert.equal(allPhotosExist, true, "Todos os produtos têm fotografia");

  let leadRequest = null;
  dom.window.fetch = async (url, options) => {
    leadRequest = { url, options };
    return { ok: true };
  };
  document.querySelector("#lead-business").value = "Restaurante Teste";
  document.querySelector("#lead-contact").value = "teste@example.pt";
  document.querySelector("#lead-consent").checked = true;
  document.querySelector("#lead-form").dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
  await new Promise(resolve => dom.window.setTimeout(resolve, 0));
  assert.equal(leadRequest.url, "https://api.pack24.pt/api/promotion-leads");
  const leadPayload = JSON.parse(leadRequest.options.body);
  assert.equal(leadPayload.business_name, "Restaurante Teste");
  assert.equal(leadPayload.contact, "teste@example.pt");
  assert.equal(leadPayload.consent, true);
  assert.match(document.querySelector("#lead-status").textContent, /contacto foi guardado/);
  assert.deepEqual(browserErrors, [], `Erros no navegador: ${browserErrors.join(", ")}`);
  console.log("PASS: 24 produtos com fotos, pesquisa, carrinho, IVA, VOLTA, WhatsApp e captação consentida validados.");
  dom.window.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});

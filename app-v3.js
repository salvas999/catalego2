const products = [
  { id: "coca-cola", name: "Coca-Cola", detail: "33 cl · pack 24", packUnits: 24, category: "Refrigerantes", exVat: 13.20, incVat: 16.24, unitEx: .55, unitInc: .68, vat: .23, color: "#d21f26", bg: "#f4dadd", short: "Coca-Cola" },
  { id: "coca-cola-zero", name: "Coca-Cola Zero", detail: "33 cl · pack 24", packUnits: 24, category: "Refrigerantes", exVat: 13.20, incVat: 16.24, unitEx: .55, unitInc: .68, vat: .23, color: "#141414", bg: "#e0e0dd", short: "Coca Zero" },
  { id: "lipton-limao", name: "Lipton Limão", detail: "33 cl · pack 24", packUnits: 24, category: "Ice Tea", exVat: 13.92, incVat: 17.12, unitEx: .58, unitInc: .71, vat: .23, volta: true, color: "#e0b900", bg: "#f5eccb", short: "Lipton" },
  { id: "lipton-pessego", name: "Lipton Pêssego", detail: "33 cl · pack 24", packUnits: 24, category: "Ice Tea", exVat: 13.92, incVat: 17.12, unitEx: .58, unitInc: .71, vat: .23, volta: true, color: "#e68a4b", bg: "#f7e4d7", short: "Lipton" },
  { id: "lipton-manga", name: "Lipton Manga", detail: "33 cl · pack 24", packUnits: 24, category: "Ice Tea", exVat: 13.92, incVat: 17.12, unitEx: .58, unitInc: .71, vat: .23, volta: true, color: "#e6a319", bg: "#f7e9cf", short: "Lipton" },
  { id: "seven-up", name: "7Up", detail: "33 cl · pack 24", packUnits: 24, category: "Refrigerantes", exVat: 12.48, incVat: 15.35, unitEx: .52, unitInc: .64, vat: .23, color: "#149447", bg: "#d9eee0", short: "7UP" },
  { id: "guarana", name: "Guaraná", detail: "33 cl · pack 24", packUnits: 24, category: "Refrigerantes", exVat: 13.20, incVat: 16.24, unitEx: .55, unitInc: .68, vat: .23, volta: true, color: "#c82333", bg: "#f2dddd", short: "Guaraná" },
  { id: "h2ope-50", name: "Água 50cl H2OPE Caramulo", detail: "50 cl · pack 24", packUnits: 24, category: "Águas", exVat: 3.84, incVat: 4.34, unitEx: .16, unitInc: .18, vat: .13, volta: true, color: "#3889c5", bg: "#dcecf5", short: "H2OPE" },
  { id: "h2ope-150", name: "Água 1,5L H2OPE Caramulo", detail: "1,5 L · pack 6", packUnits: 6, category: "Águas", exVat: 1.74, incVat: 1.97, unitEx: .29, unitInc: .33, vat: .13, volta: true, color: "#2f80bc", bg: "#dcecf5", short: "H2OPE" },
  { id: "pedras", name: "Água das Pedras", detail: "25 cl · pack 24", packUnits: 24, category: "Águas", exVat: 10.32, incVat: 11.66, unitEx: .43, unitInc: .49, vat: .13, color: "#216c51", bg: "#dcebe3", short: "Pedras" },
  { id: "pedras-limao", name: "Água das Pedras Limão", detail: "25 cl · pack 24", packUnits: 24, category: "Águas Sabores", exVat: 10.80, incVat: 13.28, unitEx: .45, unitInc: .55, vat: .23, color: "#72a92a", bg: "#e6efd8", short: "Pedras" },
  { id: "revo", name: "Revo", detail: "25 cl · pack 24", packUnits: 24, category: "Energéticas", exVat: 9.60, incVat: 11.81, unitEx: .40, unitInc: .49, vat: .23, color: "#172715", bg: "#dce7d8", short: "REVO" },
  { id: "red-bull", name: "Red Bull", detail: "25 cl · pack 24", packUnits: 24, category: "Energéticas", exVat: 22.80, incVat: 28.04, unitEx: .95, unitInc: 1.17, vat: .23, color: "#3154c6", bg: "#dce3f5", short: "Red Bull" },
  { id: "fanta", name: "Fanta", detail: "33 cl · pack 24", packUnits: 24, category: "Refrigerantes", exVat: 12.72, incVat: 15.65, unitEx: .53, unitInc: .65, vat: .23, color: "#ee7519", bg: "#f8e4cf", short: "Fanta" },
  { id: "sumol-laranja", name: "Sumol Laranja", detail: "33 cl · pack 24", packUnits: 24, category: "Refrigerantes", exVat: 13.92, incVat: 17.12, unitEx: .58, unitInc: .71, vat: .23, volta: true, color: "#ed6f1a", bg: "#f7e3d4", short: "Sumol" },
  { id: "sumol-ananas", name: "Sumol Ananás", detail: "33 cl · pack 24", packUnits: 24, category: "Refrigerantes", exVat: 13.92, incVat: 17.12, unitEx: .58, unitInc: .71, vat: .23, volta: true, color: "#5e941d", bg: "#e5eed7", short: "Sumol" },
  { id: "sagres-media", name: "Sagres Média 33cl", detail: "33 cl · pack 24", packUnits: 24, category: "Cerveja", exVat: 14.88, incVat: 18.30, unitEx: .62, unitInc: .76, vat: .23, color: "#bf4b31", bg: "#f3e2d6", short: "Sagres" },
  { id: "super-bock-media", name: "Super Bock Média 33cl", detail: "33 cl · pack 24", packUnits: 24, category: "Cerveja", exVat: 14.16, incVat: 17.42, unitEx: .59, unitInc: .73, vat: .23, color: "#a7271e", bg: "#f0ded5", short: "Super Bock" },
  { id: "sagres-mini", name: "Sagres Mini 25cl", detail: "25 cl · pack 30", packUnits: 30, category: "Cerveja", exVat: 12.90, incVat: 15.87, unitEx: .43, unitInc: .53, vat: .23, color: "#b83b2b", bg: "#f3ded4", short: "Sagres Mini" },
  { id: "super-bock-mini", name: "Super Bock Mini 20cl", detail: "20 cl · pack 24", packUnits: 24, category: "Cerveja", exVat: 9.36, incVat: 11.51, unitEx: .39, unitInc: .48, vat: .23, color: "#8c1d18", bg: "#eedbd3", short: "Super Bock" },
  { id: "sagres-1l", name: "Sagres 1L", detail: "1 L · pack 6", packUnits: 6, category: "Cerveja", exVat: 8.34, incVat: 10.26, unitEx: 1.39, unitInc: 1.71, vat: .23, color: "#b74028", bg: "#f0dfd5", short: "Sagres" },
  { id: "heineken", name: "Heineken 25cl", detail: "25 cl · pack 24", packUnits: 24, category: "Cerveja", exVat: 12.48, incVat: 15.35, unitEx: .52, unitInc: .64, vat: .23, color: "#176f3d", bg: "#dceadf", short: "Heineken" },
  { id: "frize-limao", name: "Frize Limão", detail: "25 cl · pack 24", packUnits: 24, category: "Águas Sabores", exVat: 11.04, incVat: 13.58, unitEx: .46, unitInc: .57, vat: .23, color: "#94bd45", bg: "#edf2db", short: "Frize" },
  { id: "ucal", name: "Ucal Leite com Chocolate", detail: "200 ml · pack 24", packUnits: 24, category: "Leite", exVat: 14.40, incVat: 15.26, unitEx: .60, unitInc: .64, vat: .06, color: "#8d674c", bg: "#eee4dc", short: "Ucal" }
];

const state = {
  category: "Todos",
  query: "",
  cart: loadCart()
};

const euro = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });
const grid = document.querySelector("#product-grid");
const filters = document.querySelector("#filters");
const resultCount = document.querySelector("#result-count");
const search = document.querySelector("#search");
const emptyState = document.querySelector("#empty-state");
const shell = document.querySelector("#cart-shell");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartCheckout = document.querySelector("#cart-checkout");
const mobileCart = document.querySelector(".mobile-cart");
const toast = document.querySelector("#toast");

function money(value) {
  return euro.format(roundMoney(value));
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function unitIncVat(product) {
  return product.incVat;
}

function voltaDeposit(product, quantity = 1) {
  return product.volta ? roundMoney(.10 * product.packUnits * quantity) : 0;
}

function filteredProducts() {
  const query = normalize(state.query.trim());
  return products.filter(product => {
    const categoryMatch = state.category === "Todos" || product.category === state.category;
    const searchMatch = !query || normalize(`${product.name} ${product.detail} ${product.category}`).includes(query);
    return categoryMatch && searchMatch;
  });
}

function cartQuantity(id) {
  return state.cart[id] || 0;
}

function renderFilters() {
  const categories = ["Todos", ...new Set(products.map(product => product.category))];
  filters.innerHTML = categories.map(category => `
    <button class="filter-button ${category === state.category ? "is-active" : ""}" type="button" data-category="${category}" aria-pressed="${category === state.category}">
      ${category}
    </button>`).join("");
}

function renderProducts() {
  const shown = filteredProducts();
  resultCount.textContent = `${shown.length} ${shown.length === 1 ? "produto" : "produtos"}`;
  emptyState.hidden = shown.length !== 0;
  grid.hidden = shown.length === 0;
  grid.innerHTML = shown.map(product => {
    const qty = cartQuantity(product.id);
    return `
      <article class="product-card" data-product="${product.id}">
        <div class="product-visual product-visual--photo" style="--product-bg:${product.bg};--product-color:${product.color}">
          <img class="product-photo" src="assets/products/${product.id}.png" alt="${product.name}" loading="lazy" />
        </div>
        <div class="product-meta"><span>${product.detail}</span><span class="vat-badge ${product.volta ? "vat-badge--volta" : ""}">${product.volta ? "↻ VOLTA +0,10€/un." : `IVA ${Math.round(product.vat * 100)}%`}</span></div>
        <h3>${product.name}</h3>
        <div class="price-row">
          <div class="price-main"><span>Sem IVA</span><strong>${money(product.exVat)}</strong></div>
          <div class="price-inc"><span>Com IVA</span><strong>${money(unitIncVat(product))}</strong></div>
        </div>
        <div class="unit-row"><span>Preço por unidade</span><strong>${money(product.unitEx)} s/ IVA · ${money(product.unitInc)} c/ IVA</strong></div>
        <div class="product-action">
          ${qty === 0 ? `
            <button class="add-button" type="button" data-add="${product.id}">Adicionar</button>
          ` : `
            <div class="stepper" aria-label="Quantidade de ${product.name}">
              <button type="button" data-decrease="${product.id}" aria-label="Retirar um pack">−</button>
              <strong>${qty} ${qty === 1 ? "pack" : "packs"}</strong>
              <button type="button" data-increase="${product.id}" aria-label="Adicionar um pack">+</button>
            </div>
          `}
        </div>
      </article>`;
  }).join("");
}

function cartSummary() {
  return Object.entries(state.cart).reduce((summary, [id, qty]) => {
    const product = products.find(item => item.id === id);
    if (!product || qty <= 0) return summary;
    const exVat = roundMoney(product.exVat * qty);
    const incVat = roundMoney(unitIncVat(product) * qty);
    const volta = voltaDeposit(product, qty);
    summary.quantity += qty;
    summary.exVat = roundMoney(summary.exVat + exVat);
    summary.incVat = roundMoney(summary.incVat + incVat);
    summary.volta = roundMoney(summary.volta + volta);
    summary.total = roundMoney(summary.incVat + summary.volta);
    summary.lines.push({ product, qty, exVat, incVat, volta });
    return summary;
  }, { quantity: 0, exVat: 0, incVat: 0, volta: 0, total: 0, lines: [] });
}

function renderCart() {
  const summary = cartSummary();
  document.querySelectorAll("[data-cart-count]").forEach(element => element.textContent = summary.quantity);
  document.querySelector("[data-mobile-count]").textContent = summary.quantity;
  document.querySelector("[data-mobile-label]").textContent = summary.quantity === 1 ? "pack" : "packs";
  document.querySelector("[data-mobile-total]").textContent = money(summary.total);
  mobileCart.hidden = summary.quantity === 0;
  cartEmpty.hidden = summary.quantity !== 0;
  cartCheckout.hidden = summary.quantity === 0;
  cartItems.hidden = summary.quantity === 0;

  cartItems.innerHTML = summary.lines.map(({ product, qty, incVat, volta }) => `
    <div class="cart-line">
      <div><h3>${product.name}</h3><p>${product.detail} · ${money(unitIncVat(product))} c/ IVA${volta ? ` + ${money(volta)} VOLTA` : ""}</p></div>
      <strong>${money(roundMoney(incVat + volta))}</strong>
      <div class="cart-line-actions">
        <div class="mini-stepper">
          <button type="button" data-decrease="${product.id}" aria-label="Retirar um pack de ${product.name}">−</button>
          <strong>${qty}</strong>
          <button type="button" data-increase="${product.id}" aria-label="Adicionar um pack de ${product.name}">+</button>
        </div>
        <button class="remove-button" type="button" data-remove="${product.id}">Remover</button>
      </div>
    </div>`).join("");

  document.querySelector("#subtotal-ex").textContent = money(summary.exVat);
  document.querySelector("#vat-total").textContent = money(roundMoney(summary.incVat - summary.exVat));
  document.querySelector("#volta-total").textContent = money(summary.volta);
  document.querySelector("#volta-total-row").hidden = summary.volta === 0;
  document.querySelector("#total-inc").textContent = money(summary.total);
}

function updateQuantity(id, change) {
  const current = cartQuantity(id);
  const next = Math.max(0, Math.min(99, current + change));
  if (next === 0) delete state.cart[id];
  else state.cart[id] = next;
  saveCart();
  renderProducts();
  renderCart();
  if (change > 0 && current === 0) showToast("Produto adicionado ao pedido");
}

function saveCart() {
  try { localStorage.setItem("pack24-cart", JSON.stringify(state.cart)); } catch (_) {}
}

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem("pack24-cart") || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) { return {}; }
}

function openCart() {
  shell.hidden = false;
  document.body.classList.add("drawer-open");
  window.setTimeout(() => shell.querySelector("[data-close-cart]").focus(), 20);
}

function closeCart() {
  shell.hidden = true;
  document.body.classList.remove("drawer-open");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1700);
}

function buildWhatsAppMessage() {
  const summary = cartSummary();
  const name = document.querySelector("#customer-name").value.trim();
  const location = document.querySelector("#customer-location").value.trim();
  const lines = ["Olá PACK24! Gostaria de pedir:", ""];
  summary.lines.forEach(({ product, qty, incVat, volta }) => {
    lines.push(`• ${qty}× ${product.name} (${product.detail}) — ${money(incVat)}${volta ? ` + ${money(volta)} depósito VOLTA` : ""}`);
  });
  lines.push("", `Subtotal sem IVA: ${money(summary.exVat)}`, `IVA: ${money(roundMoney(summary.incVat - summary.exVat))}`);
  if (summary.volta) lines.push(`Depósito VOLTA: ${money(summary.volta)}`);
  lines.push(`Total com IVA e depósitos: ${money(summary.total)}`);
  if (name || location) {
    lines.push("");
    if (name) lines.push(`Nome/estabelecimento: ${name}`);
    if (location) lines.push(`Localidade: ${location}`);
  }
  lines.push("", "Podem confirmar disponibilidade e entrega? Obrigado.");
  return lines.join("\n");
}

function prepareWhatsApp() {
  const summary = cartSummary();
  if (!summary.quantity) return;
  const url = `https://wa.me/351938113585?text=${encodeURIComponent(buildWhatsAppMessage())}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const LEAD_API_URL = "https://operacoes.pack24.pt/api/promotion-leads";

async function savePromotionLead(event) {
  event.preventDefault();
  const form = document.querySelector("#lead-form");
  const contact = document.querySelector("#lead-contact").value.trim();
  const business = document.querySelector("#lead-business").value.trim();
  const consent = document.querySelector("#lead-consent").checked;
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector("#lead-status");
  if (!contact || !consent) {
    form.reportValidity();
    return;
  }

  button.disabled = true;
  button.textContent = "A guardar…";
  status.textContent = "";
  status.className = "lead-status";

  try {
    const response = await fetch(LEAD_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_name: business,
        contact,
        consent: true,
        source: "pack24.pt",
        website: ""
      })
    });
    if (!response.ok) throw new Error("Pedido recusado");

    localStorage.setItem("pack24-promo-sent", "1");
    status.textContent = "Obrigado! O seu contacto foi guardado.";
    status.classList.add("is-success");
    form.reset();
    window.setTimeout(() => {
      document.querySelector("#promo-popup").hidden = true;
    }, 1800);
  } catch (_) {
    status.textContent = "Não foi possível guardar o contacto. Tente novamente.";
    status.classList.add("is-error");
  } finally {
    button.disabled = false;
    button.textContent = "Quero receber promoções";
  }
}

function schedulePromoPopup() {
  if (localStorage.getItem("pack24-promo-sent") || sessionStorage.getItem("pack24-promo-dismissed")) return;
  window.setTimeout(() => {
    const popup = document.querySelector("#promo-popup");
    popup.hidden = false;
  }, 6500);
}

document.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");
  const remove = event.target.closest("[data-remove]");
  const category = event.target.closest("[data-category]");
  if (add) updateQuantity(add.dataset.add, 1);
  if (increase) updateQuantity(increase.dataset.increase, 1);
  if (decrease) updateQuantity(decrease.dataset.decrease, -1);
  if (remove) updateQuantity(remove.dataset.remove, -cartQuantity(remove.dataset.remove));
  if (category) {
    state.category = category.dataset.category;
    renderFilters();
    renderProducts();
  }
  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]")) closeCart();
});

search.addEventListener("input", () => { state.query = search.value; renderProducts(); });
document.querySelector("#clear-filters").addEventListener("click", () => {
  state.query = "";
  state.category = "Todos";
  search.value = "";
  renderFilters();
  renderProducts();
  search.focus();
});
document.querySelector("#whatsapp-action").addEventListener("click", prepareWhatsApp);
document.querySelector("#lead-form").addEventListener("submit", savePromotionLead);
document.querySelector("#promo-close").addEventListener("click", () => {
  document.querySelector("#promo-popup").hidden = true;
  sessionStorage.setItem("pack24-promo-dismissed", "1");
});
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    closeCart();
    document.querySelector("#catalogo").scrollIntoView();
    search.focus({ preventScroll: true });
  }
  if (event.key === "Escape" && !shell.hidden) closeCart();
});

renderFilters();
renderProducts();
renderCart();
schedulePromoPopup();

window.PACK24_TEST = { products, roundMoney, unitIncVat, voltaDeposit, cartSummary, buildWhatsAppMessage, state };

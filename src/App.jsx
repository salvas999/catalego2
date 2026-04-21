import { useMemo, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Coca-Cola", price: 13.5, img: "/images/cocacola.png", category: "Refrigerantes", description: "Pack de 24 unidades" },
  { id: 2, name: "Coca-Cola Zero", price: 13.5, img: "/images/cocacola-zero.png", category: "Refrigerantes", description: "Pack de 24 unidades" },
  { id: 3, name: "Nestea Limão", price: 14.5, img: "/images/nestea.png", category: "Chás e Sumos", description: "Pack de 24 unidades" },
  { id: 4, name: "Guaraná", price: 14.5, img: "/images/guarana.png", category: "Refrigerantes", description: "Pack de 24 unidades" },
  { id: 5, name: "Fanta", price: 13.15, img: "/images/fanta.png", category: "Refrigerantes", description: "Pack de 24 unidades" },
  { id: 6, name: "7Up", price: 13.15, img: "/images/7up.png", category: "Refrigerantes", description: "Pack de 24 unidades" },
  { id: 7, name: "Revo", price: 12, img: "/images/revo.png", category: "Energéticas", description: "Pack de 24 unidades" },
];

const PHONE = "351933499207";
const PHONE_DISPLAY = "933 499 207";
const IVA = 1.23;
const CATEGORIES = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];

const colors = {
  bg: "#030303",
  panel: "#0a0a0a",
  panel2: "#0f0f0f",
  border: "rgba(255,255,255,0.08)",
  white: "#ffffff",
  text: "#efefef",
  muted: "#b8b8b8",
  lime: "#d7ff00",
  limeBorder: "rgba(215,255,0,0.45)",
};

const formatPrice = (value) => `€${value.toFixed(2)}`;

const sectionCard = {
  background: colors.panel,
  border: `1px solid ${colors.border}`,
  borderRadius: 24,
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
};

const productCard = {
  background: "linear-gradient(180deg, #0a0a0a 0%, #080808 100%)",
  border: `1px solid ${colors.border}`,
  borderRadius: 18,
  boxShadow: "0 12px 30px rgba(0,0,0,0.28)",
};

function Header({ currentPage, setCurrentPage }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        padding: "6px 6px 20px",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 1 }}>
        <span style={{ color: colors.white }}>PACK</span>
        <span style={{ color: colors.white, marginLeft: 8 }}>24</span>
      </div>

      <nav style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => setCurrentPage("inicio")}
          style={{
            background: "transparent",
            border: "none",
            color: currentPage === "inicio" ? colors.lime : colors.white,
            fontWeight: 800,
            fontSize: 18,
            paddingBottom: 10,
            borderBottom: currentPage === "inicio" ? `3px solid ${colors.lime}` : "3px solid transparent",
            cursor: "pointer",
          }}
        >
          INÍCIO
        </button>
        <button
          onClick={() => setCurrentPage("catalogo")}
          style={{
            background: "transparent",
            border: "none",
            color: currentPage === "catalogo" ? colors.lime : colors.white,
            fontWeight: 800,
            fontSize: 18,
            paddingBottom: 10,
            borderBottom: currentPage === "catalogo" ? `3px solid ${colors.lime}` : "3px solid transparent",
            cursor: "pointer",
          }}
        >
          CATÁLOGO
        </button>
        <a href="#contactos" style={{ color: colors.white, textDecoration: "none", fontWeight: 700, fontSize: 18 }}>
          CONTACTO
        </a>
      </nav>

      <button
        onClick={() => window.open(`https://wa.me/${PHONE}`, "_blank")}
        style={{
          background: "transparent",
          color: colors.white,
          border: `2px solid ${colors.limeBorder}`,
          borderRadius: 14,
          padding: "14px 22px",
          fontWeight: 800,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 20 }}></span>
        {PHONE_DISPLAY}
      </button>
    </header>
  );
}

function LandingPage({ setCurrentPage }) {
  return (
    <>
      <section
        id="inicio"
        style={{
          ...sectionCard,
          marginTop: 18,
          overflow: "hidden",
          minHeight: 620,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        }}
      >
        <div style={{ padding: "58px 40px 40px" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(40px,7vw,84px)", lineHeight: 0.95, fontWeight: 900, letterSpacing: "-0.08em", textTransform: "uppercase" }}>
            Fornecimento
            <br />
            de <span style={{ color: colors.white }}>bebidas</span>
            <br />
            para o seu negócio
          </h1>

          <div style={{ width: 140, height: 4, background: colors.white, borderRadius: 999, marginTop: 24 }} />

          <p style={{ margin: "28px 0 0", maxWidth: 560, color: colors.text, fontSize: 18, lineHeight: 1.7 }}>
            Packs de 24 unidades com os melhores preços e entrega rápida na sua zona.
          </p>

          <button
            onClick={() => setCurrentPage("catalogo")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              marginTop: 30,
              background: colors.white,
              color: "#060606",
              border: "none",
              borderRadius: 16,
              padding: "18px 26px",
              fontWeight: 900,
              fontSize: 18,
              boxShadow: "0 14px 32px rgba(215,255,0,0.22)",
              cursor: "pointer",
            }}
          >
            <span></span>
            VER CATÁLOGO
            <span style={{ fontSize: 22 }}>→</span>
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 18, marginTop: 38 }}>
            {[
              ["", "PACKS", "DE 24 UNIDADES"],
              ["", "ENTREGA", "RÁPIDA"],
              ["", "PREÇOS", "COMPETITIVOS"],
            ].map(([icon, a, b]) => (
              <div key={a} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 34, color: colors.white }}>{icon}</div>
                <div style={{ fontWeight: 800, lineHeight: 1.2, fontSize: 16 }}>
                  <div>{a}</div>
                  <div>{b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", minHeight: 620 }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 35%, rgba(215,255,0,0.18) 0%, rgba(215,255,0,0.04) 35%, transparent 62%)" }} />
          <div style={{ position: "absolute", right: 10, top: 78, width: 340, height: 340, border: `2px solid ${colors.limeBorder}`, borderRadius: 42, transform: "skew(-28deg)" }} />
          <div style={{ display: "flex", alignItems: "end", justifyContent: "center", gap: "clamp(10px,2vw,24px)", width: "100%", position: "relative", zIndex: 1 }}>
            <img src="/images/guarana.png" alt="guaraná" style={{ height: 320, maxWidth: "20%", objectFit: "contain", filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.5))" }} />
            <img src="/images/revo.png" alt="revo" style={{ height: 420, maxWidth: "20%", objectFit: "contain", filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.5))" }} />
            <img src="/images/cocacola.png" alt="coca cola" style={{ height: 360, maxWidth: "20%", objectFit: "contain", filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.5))" }} />
            <img src="/images/nestea.png" alt="nestea" style={{ height: 390, maxWidth: "20%", objectFit: "contain", filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.5))" }} />
          </div>
        </div>
      </section>

      <section style={{ ...sectionCard, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 0, marginTop: 20, overflow: "hidden" }}>
        {[
          ["", "ZONA DE ENTREGA", "Costa da Caparica e Almada"],
          ["", "ENCOMENDAS", "Encomende de forma rápida e simples pelo WhatsApp"],
          ["", "HORÁRIO", "Segunda a Sábado 8h00 – 20h00"],
          ["", "PAGAMENTO", "Pagamento na entrega ou por transferência"],
        ].map(([icon, title, text], index) => (
          <div key={title} style={{ padding: 28, display: "flex", gap: 16, alignItems: "flex-start", borderRight: index < 3 ? `1px solid ${colors.border}` : "none" }}>
            <div style={{ fontSize: 34, color: colors.white }}>{icon}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, textTransform: "uppercase" }}>{title}</div>
              <div style={{ marginTop: 8, fontSize: 16, lineHeight: 1.6, color: colors.text }}>{text}</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function CatalogPage({
  filteredProducts,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
  add,
}) {
  return (
    <section id="catalogo" style={{ marginTop: 34 }}>
      <div style={{ ...sectionCard, padding: 24, marginBottom: 24, background: "#101010" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(30px,5vw,46px)", fontWeight: 900, letterSpacing: "-0.05em", textTransform: "uppercase" }}>Catálogo profissional</h2>
            <p style={{ margin: "8px 0 0", color: colors.muted, fontSize: 17 }}>Todos os produtos são vendidos por pack de 24 unidades.</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", width: "100%", maxWidth: 760 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar produto..."
              style={{ height: 52, minWidth: 0, flex: "1 1 260px", borderRadius: 16, border: `1px solid ${colors.border}`, background: "#141414", color: colors.white, padding: "0 16px", fontSize: 15, outline: "none" }}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    borderRadius: 999,
                    padding: "11px 16px",
                    border: selectedCategory === category ? `1px solid ${colors.lime}` : `1px solid ${colors.border}`,
                    background: selectedCategory === category ? colors.lime : "transparent",
                    color: selectedCategory === category ? "#050505" : colors.white,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ ...productCard, padding: 20, background: "#0f0f0f", borderRadius: 20 }}>
            <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, background: "linear-gradient(180deg, #101010 0%, #0b0b0b 100%)", borderRadius: 18 }}>
              <img src={product.img} alt={product.name} style={{ maxWidth: "100%", maxHeight: 190, objectFit: "contain", filter: "drop-shadow(0 24px 26px rgba(0,0,0,0.5))" }} />
            </div>
            <div style={{ color: colors.white, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>{product.category}</div>
            <h3 style={{ margin: "10px 0 0", fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>{product.name}</h3>
            <p style={{ margin: "8px 0 0", color: colors.text, fontSize: 16 }}>{product.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 18, gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ color: colors.muted, fontSize: 13 }}>Sem IVA</div>
                <div style={{ color: colors.white, fontSize: 32, fontWeight: 900 }}>{formatPrice(product.price)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: colors.muted, fontSize: 13 }}>Com IVA</div>
                <div style={{ color: colors.white, fontSize: 18, fontWeight: 800 }}>{formatPrice(product.price * IVA)}</div>
              </div>
            </div>
            <button
              onClick={() => add(product)}
              style={{ width: "100%", marginTop: 18, background: "transparent", color: colors.white, border: `1px solid ${colors.border}`, borderRadius: 14, padding: "14px 16px", fontWeight: 900, fontSize: 16, cursor: "pointer" }}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contactos" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginTop: 38 }}>
      <div style={{ ...sectionCard, padding: 28 }}>
        <div style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-0.08em", marginBottom: 14 }}>
          <span style={{ color: colors.white }}>PACK</span>
          <span style={{ color: colors.white, marginLeft: 8 }}>24</span>
        </div>
        <p style={{ margin: 0, color: colors.text, fontSize: 18, lineHeight: 1.75 }}>
          Fornecimento de bebidas em packs de 24 unidades para cafés, restaurantes, bares e outros estabelecimentos.
        </p>
      </div>

      <div style={{ ...sectionCard, padding: 28 }}>
        <h3 style={{ margin: 0, color: colors.white, fontSize: 28, fontWeight: 900, textTransform: "uppercase" }}>Contactos</h3>
        <div style={{ display: "grid", gap: 14, marginTop: 18, fontSize: 18 }}>
          <div>Telefone: {PHONE_DISPLAY}</div>
          <div> {PHONE_DISPLAY}</div>
          <div> Costa da Caparica e Almada</div>
        </div>
      </div>

      <div style={{ ...sectionCard, padding: 28 }}>
        <h3 style={{ margin: 0, color: colors.white, fontSize: 28, fontWeight: 900, textTransform: "uppercase" }}>Informação</h3>
        <div style={{ display: "grid", gap: 14, marginTop: 18, fontSize: 17, color: colors.text, lineHeight: 1.7 }}>
          <div>Todos os produtos são vendidos por pack de 24 unidades.</div>
          <div>Entrega rápida mediante confirmação por WhatsApp.</div>
          <div>Preços apresentados sem IVA e com IVA na zona de catálogo.</div>
        </div>
      </div>
    </section>
  );
}

function CatalogSection({
  filteredProducts,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
  add,
  cart,
  removeItem,
  decreaseQty,
  increaseQty,
  clientName,
  setClientName,
  notes,
  setNotes,
  totalWithoutVat,
  totalWithVat,
  sendWhatsApp,
  clearCart,
}) {
  return (
    <section id="catalogo" style={{ marginTop: 34 }}>
      <div style={{ ...sectionCard, padding: 24, marginBottom: 24, background: "#101010" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(30px,5vw,46px)", fontWeight: 900, letterSpacing: "-0.05em", textTransform: "uppercase" }}>Catálogo profissional</h2>
            <p style={{ margin: "8px 0 0", color: colors.muted, fontSize: 17 }}>Selecione os packs e envie o pedido diretamente por WhatsApp.</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", width: "100%", maxWidth: 760 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar produto..."
              style={{ height: 52, minWidth: 0, flex: "1 1 260px", borderRadius: 14, border: `1px solid ${colors.border}`, background: "#141414", color: colors.white, padding: "0 16px", fontSize: 15, outline: "none" }}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    borderRadius: 999,
                    padding: "10px 14px",
                    border: selectedCategory === category ? `1px solid ${colors.lime}` : `1px solid ${colors.border}`,
                    background: selectedCategory === category ? colors.lime : "transparent",
                    color: selectedCategory === category ? "#050505" : colors.white,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.8fr) minmax(320px, 0.8fr)", gap: 22, alignItems: "start" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{ ...productCard, padding: 22, background: "#0d0d0d", borderRadius: 16 }}>
              <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, background: "#111111", borderRadius: 14 }}>
                <img src={product.img} alt={product.name} style={{ maxWidth: "100%", maxHeight: 180, objectFit: "contain", filter: "drop-shadow(0 20px 24px rgba(0,0,0,0.45))" }} />
              </div>
              <div style={{ color: colors.muted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>{product.category}</div>
              <h3 style={{ margin: "10px 0 0", fontSize: 22, fontWeight: 800 }}>{product.name}</h3>
              <p style={{ margin: "8px 0 0", color: colors.text, fontSize: 15 }}>{product.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 18, gap: 12 }}>
                <div>
                  <div style={{ color: colors.muted, fontSize: 12 }}>Sem IVA</div>
                  <div style={{ color: colors.white, fontSize: 28, fontWeight: 800 }}>{formatPrice(product.price)}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: colors.muted, fontSize: 12 }}>Com IVA</div>
                  <div style={{ color: colors.muted, fontSize: 16, fontWeight: 700 }}>{formatPrice(product.price * IVA)}</div>
                </div>
              </div>
              <button
                onClick={() => add(product)}
                style={{ width: "100%", marginTop: 18, background: colors.white, color: "#050505", border: "none", borderRadius: 12, padding: "14px 16px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>

        <aside style={{ ...sectionCard, padding: 22, position: "sticky", top: 20, background: "#0e0e0e" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ color: colors.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Carrinho</div>
              <h3 style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 800 }}>Resumo do pedido</h3>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 999, background: "#181818", border: `1px solid ${colors.border}`, fontWeight: 700 }}>
              {cart.reduce((sum, item) => sum + item.qty, 0)} packs
            </div>
          </div>

          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {cart.length === 0 ? (
              <div style={{ padding: 16, borderRadius: 14, background: colors.panel2, border: `1px solid ${colors.border}`, color: colors.muted }}>
                Ainda não adicionou produtos.
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} style={{ padding: 16, borderRadius: 14, background: colors.panel2, border: `1px solid ${colors.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{item.name}</div>
                      <div style={{ color: colors.muted, fontSize: 13 }}>Pack de 24 unidades</div>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ background: "transparent", color: "#fca5a5", border: "none", cursor: "pointer" }}>Remover</button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, gap: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => decreaseQty(item.id)} style={{ background: "transparent", color: colors.white, border: `1px solid ${colors.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer" }}>−</button>
                      <span style={{ minWidth: 24, textAlign: "center", fontWeight: 800 }}>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)} style={{ background: "transparent", color: colors.white, border: `1px solid ${colors.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer" }}>+</button>
                    </div>
                    <div style={{ fontWeight: 700 }}>{formatPrice(item.price * item.qty)}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
            <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Nome" style={{ height: 50, borderRadius: 12, border: `1px solid ${colors.border}`, background: colors.panel2, color: colors.white, padding: "0 14px", fontSize: 14, outline: "none" }} />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas do pedido, morada, horário de entrega, referência, etc." style={{ minHeight: 100, borderRadius: 12, border: `1px solid ${colors.border}`, background: colors.panel2, color: colors.white, padding: 14, fontSize: 14, outline: "none", resize: "vertical" }} />
          </div>

          <div style={{ marginTop: 18, padding: 16, borderRadius: 16, background: "#ffffff", color: "#0f172a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748b" }}>
              <span>Total sem IVA</span>
              <span style={{ fontWeight: 700 }}>{formatPrice(totalWithoutVat)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 10 }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Total com IVA</span>
              <span style={{ fontSize: 30, fontWeight: 800 }}>{formatPrice(totalWithVat)}</span>
            </div>
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            <button onClick={sendWhatsApp} style={{ background: colors.white, color: "#050505", border: "none", borderRadius: 12, padding: "16px 18px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Enviar pedido por WhatsApp</button>
            <button onClick={clearCart} style={{ background: "transparent", color: colors.white, border: `1px solid ${colors.border}`, borderRadius: 12, padding: "14px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Limpar encomenda</button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("inicio");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const add = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  const decreaseQty = (id) => setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item)).filter((item) => item.qty > 0));
  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const totalWithoutVat = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalWithVat = totalWithoutVat * IVA;

  const sendWhatsApp = () => {
    if (!cart.length) return;
    let msg = "Olá, quero fazer uma encomenda:%0A%0A";
    cart.forEach((item) => {
      const subtotal = item.price * item.qty;
      const subtotalVat = subtotal * IVA;
      msg += `• ${item.name} — ${item.qty} pack(s) de 24 unidades — ${formatPrice(subtotal)} sem IVA / ${formatPrice(subtotalVat)} com IVA%0A`;
    });
    msg += `%0ATotal sem IVA: ${formatPrice(totalWithoutVat)}`;
    msg += `%0ATotal com IVA: ${formatPrice(totalWithVat)}`;
    if (clientName.trim()) msg += `%0ANome: ${encodeURIComponent(clientName.trim())}`;
    if (notes.trim()) msg += `%0ANotas: ${encodeURIComponent(notes.trim())}`;
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.text, fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1500, margin: "0 auto", padding: 18 }}>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {currentPage === "inicio" ? (
          <LandingPage setCurrentPage={setCurrentPage} />
        ) : (
          <CatalogSection
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            search={search}
            setSearch={setSearch}
            add={add}
            cart={cart}
            removeItem={removeItem}
            decreaseQty={decreaseQty}
            increaseQty={increaseQty}
            clientName={clientName}
            setClientName={setClientName}
            notes={notes}
            setNotes={setNotes}
            totalWithoutVat={totalWithoutVat}
            totalWithVat={totalWithVat}
            sendWhatsApp={sendWhatsApp}
            clearCart={clearCart}
          />
        )}

        <ContactSection />

        <footer style={{ textAlign: "center", color: colors.muted, fontSize: 15, padding: "26px 8px 6px", borderTop: `1px solid ${colors.border}`, marginTop: 26 }}>
          © 2024 pack24.pt – Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}

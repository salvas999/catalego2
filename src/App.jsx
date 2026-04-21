import { useMemo, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Coca-Cola", price: 13.5, img: "/images/cocacola.png", category: "Refrigerantes", featured: true, description: "Pack de 24 unidades." },
  { id: 2, name: "Coca-Cola Zero", price: 13.5, img: "/images/cocacola-zero.png", category: "Refrigerantes", featured: true, description: "Pack de 24 unidades." },
  { id: 3, name: "Nestea Limão", price: 14.5, img: "/images/nestea.png", category: "Chás e Sumos", featured: true, description: "Pack de 24 unidades." },
  { id: 4, name: "Guaraná", price: 14.5, img: "/images/guarana.png", category: "Refrigerantes", featured: true, description: "Pack de 24 unidades." },
  { id: 5, name: "Fanta", price: 13.15, img: "/images/fanta.png", category: "Refrigerantes", featured: false, description: "Pack de 24 unidades." },
  { id: 6, name: "7Up", price: 13.15, img: "/images/7up.png", category: "Refrigerantes", featured: false, description: "Pack de 24 unidades." },
  { id: 7, name: "Revo", price: 12, img: "/images/revo.png", category: "Energéticas", featured: true, description: "Pack de 24 unidades." },
];

const IVA = 1.23;
const PHONE = "351933499207";
const PHONE_DISPLAY = "933 499 207";
const BRAND = "PACK24";
const DELIVERY_DAYS = [
  { day: "Terça-feira", time: "14:00 - 19:00" },
  { day: "Sexta-feira", time: "09:00 - 18:00" },
];
const SERVICE_AREAS = ["Costa da Caparica", "Almada", "Margem Sul"];
const CATEGORIES = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];

const colors = {
  bg: "#050505",
  panel: "#0c0c0c",
  panelSoft: "#111111",
  border: "rgba(255,255,255,0.08)",
  text: "#f8fafc",
  muted: "#a1a1aa",
  neon: "#d9ff00",
  neonSoft: "rgba(217,255,0,0.18)",
};

const formatPrice = (value) => `€${value.toFixed(2)}`;

export default function App() {
  const [currentPage, setCurrentPage] = useState("info");
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
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const decreaseQty = (id) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p)).filter((p) => p.qty > 0));
  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
  const totalIVA = total * IVA;
  const totalPacks = cart.reduce((sum, p) => sum + p.qty, 0);

  const sendWhatsApp = () => {
    if (cart.length === 0) return;
    let msg = `Olá, quero fazer uma encomenda na ${BRAND}:%0A%0A`;
    cart.forEach((p) => {
      const subtotal = p.price * p.qty;
      const subtotalIVA = subtotal * IVA;
      msg += `• ${p.name} — ${p.qty} pack(s) de 24 unidades — ${formatPrice(subtotal)} sem IVA / ${formatPrice(subtotalIVA)} com IVA%0A`;
    });
    msg += `%0ATotal sem IVA: ${formatPrice(total)}`;
    msg += `%0ATotal com IVA: ${formatPrice(totalIVA)}`;
    if (clientName.trim()) msg += `%0ANome: ${encodeURIComponent(clientName)}`;
    if (notes.trim()) msg += `%0ANotas: ${encodeURIComponent(notes)}`;
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
  };

  const card = {
    background: colors.panel,
    border: `1px solid ${colors.border}`,
    borderRadius: 28,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  };

  const buttonPrimary = {
    background: colors.neon,
    color: "#0a0a0a",
    border: "none",
    borderRadius: 16,
    padding: "16px 22px",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: `0 0 0 1px ${colors.neonSoft}, 0 14px 34px rgba(217,255,0,0.24)`,
  };

  const buttonGhost = {
    background: "transparent",
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: 16,
    padding: "16px 22px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.text, fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: 16 }}>
        <header
          style={{
            ...card,
            position: "sticky",
            top: 10,
            zIndex: 20,
            background: "rgba(12,12,12,0.92)",
            backdropFilter: "blur(12px)",
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, letterSpacing: "-0.08em" }}>
              <span style={{ color: colors.text }}>PACK</span>
              <span style={{ color: colors.neon, marginLeft: 8 }}>24</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", width: "100%", maxWidth: 620, justifyContent: "flex-end" }}>
            <button
              onClick={() => setCurrentPage("info")}
              style={{
                ...buttonGhost,
                background: currentPage === "info" ? colors.neon : "transparent",
                color: currentPage === "info" ? "#0a0a0a" : colors.text,
                border: currentPage === "info" ? `1px solid ${colors.neon}` : `1px solid ${colors.border}`,
                flex: "1 1 130px",
              }}
            >
              Início
            </button>
            <button
              onClick={() => setCurrentPage("catalogo")}
              style={{
                ...buttonGhost,
                background: currentPage === "catalogo" ? colors.neon : "transparent",
                color: currentPage === "catalogo" ? "#0a0a0a" : colors.text,
                border: currentPage === "catalogo" ? `1px solid ${colors.neon}` : `1px solid ${colors.border}`,
                flex: "1 1 130px",
              }}
            >
              Catálogo
            </button>
            <button onClick={() => window.open(`https://wa.me/${PHONE}`, "_blank")} style={{ ...buttonPrimary, flex: "1 1 190px" }}>
              {PHONE_DISPLAY}
            </button>
          </div>
        </header>

        {currentPage === "info" ? (
          <>
            <section
              style={{
                ...card,
                padding: 32,
                marginBottom: 22,
                overflow: "hidden",
                position: "relative",
                background: "linear-gradient(135deg, #080808 0%, #0e0e0e 55%, #111111 100%)",
              }}
            >
              <div style={{ position: "absolute", right: -120, top: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(217,255,0,0.08)", filter: "blur(20px)" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, alignItems: "center", position: "relative", zIndex: 1 }}>
                <div>
                  <div style={{ display: "inline-flex", padding: "8px 12px", borderRadius: 999, background: "rgba(217,255,0,0.08)", color: colors.neon, fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Fornecimento para o seu negócio
                  </div>
                  <h1 style={{ margin: "18px 0 0", fontSize: "clamp(38px,7vw,76px)", lineHeight: 0.95, fontWeight: 900, letterSpacing: "-0.08em" }}>
                    Packs de
                    <br />
                    <span style={{ color: colors.neon }}>24 unidades</span>
                  </h1>
                  <p style={{ margin: "18px 0 0", maxWidth: 700, color: "#d4d4d8", fontSize: 18, lineHeight: 1.75 }}>
                    Bebidas para cafés, restaurantes, bares e outros negócios, com encomenda simples, preços claros e confirmação rápida por WhatsApp.
                  </p>

                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
                    <button onClick={() => setCurrentPage("catalogo")} style={buttonPrimary}>Ver catálogo</button>
                    <button onClick={() => window.open(`https://wa.me/${PHONE}`, "_blank")} style={buttonGhost}>Pedir informações</button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginTop: 28 }}>
                    {[
                      "Packs de 24 unidades",
                      "Preços sem IVA e com IVA",
                      "Entrega combinada por WhatsApp",
                    ].map((item) => (
                      <div key={item} style={{ padding: 16, borderRadius: 20, border: `1px solid ${colors.border}`, background: colors.panelSoft, color: colors.text, fontWeight: 700 }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gap: 18 }}>
                  <div style={{ ...card, background: colors.panelSoft, padding: 22 }}>
                    <p style={{ margin: 0, color: colors.neon, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Dias de entrega</p>
                    <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                      {DELIVERY_DAYS.map((d) => (
                        <div key={d.day} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: 14, borderRadius: 18, background: "rgba(255,255,255,0.03)", border: `1px solid ${colors.border}` }}>
                          <span style={{ fontWeight: 800 }}>{d.day}</span>
                          <span style={{ color: colors.muted }}>{d.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...card, background: colors.panelSoft, padding: 22 }}>
                    <p style={{ margin: 0, color: colors.neon, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Zona de entrega</p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                      {SERVICE_AREAS.map((area) => (
                        <div key={area} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(217,255,0,0.08)", color: colors.text, border: `1px solid ${colors.neonSoft}`, fontWeight: 700 }}>
                          {area}
                        </div>
                      ))}
                    </div>
                    <p style={{ margin: "16px 0 0", color: colors.muted, lineHeight: 1.7 }}>
                      Após o pedido, entramos em contacto para confirmar disponibilidade e combinar a melhor entrega consigo.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
              {[
                {
                  title: "Encomenda simples",
                  text: "Escolha os produtos, veja os valores por pack e envie o pedido em poucos cliques.",
                },
                {
                  title: "Informação clara",
                  text: "Todos os produtos indicam que a venda é feita por pack de 24 unidades.",
                },
                {
                  title: "Contacto rápido",
                  text: `Se tiver dúvidas, pode falar connosco diretamente pelo número ${PHONE_DISPLAY}.`,
                },
              ].map((item) => (
                <div key={item.title} style={{ ...card, padding: 24, background: colors.panelSoft }}>
                  <h3 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: "-0.05em" }}>{item.title}</h3>
                  <p style={{ margin: "12px 0 0", color: colors.muted, lineHeight: 1.8 }}>{item.text}</p>
                </div>
              ))}
            </section>
          </>
        ) : (
          <>
            <section style={{ ...card, padding: 22, marginBottom: 22, background: colors.panel }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "clamp(28px,5vw,40px)", fontWeight: 900, letterSpacing: "-0.06em" }}>Catálogo</h2>
                  <p style={{ margin: "8px 0 0", color: colors.muted }}>Todos os produtos são vendidos em packs de 24 unidades.</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", width: "100%", maxWidth: 760 }}>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar produto..."
                    style={{
                      height: 50,
                      minWidth: 0,
                      flex: "1 1 220px",
                      borderRadius: 16,
                      border: `1px solid ${colors.border}`,
                      padding: "0 16px",
                      fontSize: 15,
                      outline: "none",
                      background: colors.panelSoft,
                      color: colors.text,
                    }}
                  />
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                          borderRadius: 999,
                          padding: "11px 16px",
                          border: selectedCategory === category ? `1px solid ${colors.neon}` : `1px solid ${colors.border}`,
                          background: selectedCategory === category ? colors.neon : "transparent",
                          color: selectedCategory === category ? "#0a0a0a" : colors.text,
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
            </section>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 22, alignItems: "start" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{ ...card, padding: 20, background: colors.panelSoft, transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 22px 40px rgba(0,0,0,0.34)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0px)";
                      e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.35)";
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: colors.muted, textTransform: "uppercase", letterSpacing: "0.14em" }}>{p.category}</div>
                      {p.featured && <div style={{ padding: "7px 10px", borderRadius: 999, background: colors.neon, color: "#0a0a0a", fontSize: 12, fontWeight: 900 }}>Destaque</div>}
                    </div>

                    <div style={{ height: 210, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #111111 0%, #0b0b0b 100%)", borderRadius: 24, marginBottom: 18, border: `1px solid ${colors.border}` }}>
                      <img src={p.img} alt={p.name} style={{ maxWidth: "100%", maxHeight: 165, objectFit: "contain", filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.45))" }} />
                    </div>

                    <h3 style={{ margin: 0, fontSize: "clamp(24px,4vw,30px)", fontWeight: 900, letterSpacing: "-0.05em" }}>{p.name}</h3>
                    <p style={{ margin: "8px 0 0", color: colors.neon, fontSize: 15, fontWeight: 800 }}>Pack de 24 unidades</p>
                    <p style={{ margin: "10px 0 0", color: colors.muted, lineHeight: 1.65 }}>{p.description}</p>

                    <div style={{ marginTop: 16, padding: 16, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: `1px solid ${colors.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12, flexWrap: "wrap" }}>
                        <div>
                          <p style={{ margin: 0, fontSize: 12, color: colors.muted, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Sem IVA</p>
                          <p style={{ margin: "6px 0 0", fontSize: "clamp(24px,4vw,32px)", fontWeight: 900, letterSpacing: "-0.06em" }}>{formatPrice(p.price)}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ margin: 0, fontSize: 12, color: colors.muted, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Com IVA</p>
                          <p style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 800 }}>{formatPrice(p.price * IVA)}</p>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => add(p)} style={{ ...buttonPrimary, width: "100%", marginTop: 16 }}>
                      Adicionar pack
                    </button>
                  </div>
                ))}
              </div>

              <aside>
                <div style={{ ...card, background: colors.panel, padding: 22, position: "sticky", top: 84 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <p style={{ margin: 0, color: colors.muted, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>Resumo</p>
                      <h3 style={{ margin: "8px 0 0", fontSize: "clamp(28px,5vw,38px)", fontWeight: 900, letterSpacing: "-0.05em" }}>A sua encomenda</h3>
                    </div>
                    <div style={{ padding: "10px 14px", borderRadius: 16, background: colors.neon, color: "#0a0a0a", fontWeight: 900 }}>{totalPacks} packs</div>
                  </div>

                  <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
                    {cart.length === 0 ? (
                      <div style={{ padding: 18, borderRadius: 20, background: "rgba(255,255,255,0.03)", color: colors.muted, border: `1px solid ${colors.border}` }}>
                        Ainda não adicionou produtos.
                      </div>
                    ) : (
                      cart.map((p) => {
                        const subtotal = p.price * p.qty;
                        const subtotalIVA = subtotal * IVA;
                        return (
                          <div key={p.id} style={{ padding: 16, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: `1px solid ${colors.border}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                              <div>
                                <h4 style={{ margin: 0, fontSize: 18 }}>{p.name}</h4>
                                <p style={{ margin: "6px 0 0", color: colors.muted, fontSize: 14 }}>Pack de 24 unidades</p>
                              </div>
                              <button onClick={() => removeItem(p.id)} style={{ background: "transparent", color: "#fca5a5", border: "none", cursor: "pointer", fontWeight: 700 }}>Remover</button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, gap: 12, flexWrap: "wrap" }}>
                              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <button onClick={() => decreaseQty(p.id)} style={{ ...buttonGhost, padding: "10px 12px" }}>−</button>
                                <div style={{ minWidth: 42, textAlign: "center", fontWeight: 900 }}>{p.qty}</div>
                                <button onClick={() => increaseQty(p.id)} style={{ ...buttonGhost, padding: "10px 12px" }}>+</button>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontWeight: 800 }}>{formatPrice(subtotal)}</div>
                                <div style={{ fontSize: 13, color: colors.muted }}>{formatPrice(subtotalIVA)} com IVA</div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                    <input
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Nome"
                      style={{ height: 52, borderRadius: 16, border: `1px solid ${colors.border}`, background: colors.panelSoft, color: colors.text, padding: "0 16px", fontSize: 15, outline: "none" }}
                    />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Notas do pedido, morada, horário de entrega, referência, etc."
                      style={{ minHeight: 110, borderRadius: 16, border: `1px solid ${colors.border}`, background: colors.panelSoft, color: colors.text, padding: 16, fontSize: 15, outline: "none", resize: "vertical" }}
                    />
                  </div>

                  <div style={{ marginTop: 18, padding: 18, borderRadius: 20, background: "#ffffff", color: "#0f172a" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b", fontSize: 14 }}>
                      <span>Total sem IVA</span>
                      <span style={{ fontWeight: 800 }}>{formatPrice(total)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 10 }}>
                      <span style={{ color: "#64748b", fontSize: 14 }}>Total com IVA</span>
                      <span style={{ fontWeight: 900, fontSize: 34, letterSpacing: "-0.05em" }}>{formatPrice(totalIVA)}</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                    <button onClick={sendWhatsApp} style={{ ...buttonPrimary, width: "100%", fontSize: 18, padding: "18px 22px" }}>
                      Enviar pedido por WhatsApp
                    </button>
                    <button onClick={clearCart} style={{ ...buttonGhost, width: "100%" }}>
                      Limpar encomenda
                    </button>
                  </div>

                  <div style={{ marginTop: 16, padding: 16, borderRadius: 18, background: "rgba(217,255,0,0.08)", color: colors.text, lineHeight: 1.7, fontSize: 14, border: `1px solid ${colors.neonSoft}` }}>
                    Todos os produtos correspondem a <strong>packs de 24 unidades</strong>. Após o envio do pedido, entraremos em contacto para confirmar disponibilidade e entrega.
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Coca-Cola", price: 13.5, img: "/images/cocacola.png", category: "Refrigerantes", featured: true, description: "Coca-Cola original." },
  { id: 2, name: "Coca-Cola Zero", price: 13.5, img: "/images/cocacola-zero.png", category: "Refrigerantes", featured: true, description: "Coca-Cola Zero açúcar." },
  { id: 3, name: "Nestea Limão", price: 14.5, img: "/images/nestea.png", category: "Chás e Sumos", featured: true, description: "Nestea limão refrescante." },
  { id: 4, name: "Guaraná", price: 14.5, img: "/images/guarana.png", category: "Refrigerantes", featured: true, description: "Guaraná Antarctica." },
  { id: 5, name: "Fanta", price: 13.15, img: "/images/fanta.png", category: "Refrigerantes", featured: false, description: "Fanta laranja." },
  { id: 6, name: "7Up", price: 13.15, img: "/images/7up.png", category: "Refrigerantes", featured: false, description: "7Up lima-limão." },
  { id: 7, name: "Revo", price: 12, img: "/images/revo.png", category: "Energéticas", featured: true, description: "Bebida energética Revo." },
];

const IVA = 1.23;
const PHONE = "351933499207";
const DELIVERY_DAYS = [
  { day: "Terça-feira", time: "14:00 - 19:00" },
  { day: "Sexta-feira", time: "09:00 - 18:00" },
];
const SERVICE_AREAS = ["Costa da Caparica", "Almada", "Margem Sul"];
const CATEGORIES = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#0f172a",
  },
  container: {
    maxWidth: 1440,
    margin: "0 auto",
    padding: "24px",
  },
  card: {
    background: "#ffffff",
    borderRadius: 28,
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
  },
  buttonPrimary: {
    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
    color: "white",
    border: "none",
    borderRadius: 16,
    padding: "16px 22px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 12px 28px rgba(34,197,94,0.28)",
  },
  buttonDark: {
    background: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: 16,
    padding: "15px 20px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  },
  buttonLight: {
    background: "white",
    color: "#0f172a",
    border: "1px solid #dbe3ee",
    borderRadius: 16,
    padding: "15px 20px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  },
};

const formatPrice = (value) => `€${value.toFixed(2)}`;

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <header
      style={{
        ...styles.card,
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
        position: "sticky",
        top: 14,
        zIndex: 10,
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.92)",
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700 }}>
          Produtos disponíveis B2B
        </p>
        <h1 style={{ margin: "6px 0 0", fontSize: 34, fontWeight: 900, letterSpacing: "-0.05em" }}>Pedido Direto</h1>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => setCurrentPage("info")}
          style={{
            ...styles.buttonLight,
            background: currentPage === "info" ? "#0f172a" : "white",
            color: currentPage === "info" ? "white" : "#0f172a",
            border: currentPage === "info" ? "1px solid #0f172a" : "1px solid #dbe3ee",
          }}
        >
          Informações
        </button>
        <button
          onClick={() => setCurrentPage("catalogo")}
          style={{
            ...styles.buttonLight,
            background: currentPage === "catalogo" ? "#0f172a" : "white",
            color: currentPage === "catalogo" ? "white" : "#0f172a",
            border: currentPage === "catalogo" ? "1px solid #0f172a" : "1px solid #dbe3ee",
          }}
        >
          Catálogo
        </button>
        <button onClick={() => window.open(`https://wa.me/${PHONE}`, "_blank")} style={styles.buttonPrimary}>
          Falar no WhatsApp
        </button>
      </div>
    </header>
  );
}

function InfoPage({ setCurrentPage }) {
  return (
    <>
      <section
        style={{
          ...styles.card,
          padding: 38,
          marginBottom: 22,
          background: "linear-gradient(135deg, #0f172a 0%, #111827 55%, #1e293b 100%)",
          color: "white",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -70, top: -70, width: 240, height: 240, borderRadius: "50%", background: "rgba(34,197,94,0.14)", filter: "blur(12px)" }} />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.25fr 0.85fr", gap: 24, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", padding: "8px 12px", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 13, fontWeight: 700 }}>
              Encomendas rápidas para o seu negócio
            </div>
            <h2 style={{ margin: "20px 0 0", fontSize: 58, lineHeight: 1.03, fontWeight: 900, letterSpacing: "-0.06em", maxWidth: 760 }}>
              Bebidas por pack de 24, com encomenda simples e entrega combinada consigo.
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 18, lineHeight: 1.75, color: "#cbd5e1", maxWidth: 760 }}>
              Veja os produtos, escolha as quantidades e envie o pedido em segundos. Todos os preços são apresentados por pack para facilitar a sua decisão.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
              <button onClick={() => setCurrentPage("catalogo")} style={styles.buttonPrimary}>
                Ver catálogo
              </button>
              <button onClick={() => window.open(`https://wa.me/${PHONE}`, "_blank")} style={{ ...styles.buttonLight, background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.12)" }}>
                Pedir informações
              </button>
            </div>
          </div>

          <div style={{ ...styles.card, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "none", padding: 22, color: "white" }}>
            <p style={{ margin: 0, fontSize: 13, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Informação importante</p>
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {[
                "Venda em packs de 24 unidades.",
                "Preços apresentados sem IVA e com IVA.",
                "Após o pedido, confirmamos disponibilidade por WhatsApp.",
                "Tentamos ajustar as entregas à sua disponibilidade.",
              ].map((item) => (
                <div key={item} style={{ padding: 14, borderRadius: 18, background: "rgba(255,255,255,0.06)", color: "#e2e8f0", lineHeight: 1.6 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 22, marginBottom: 22 }}>
        <div style={{ ...styles.card, padding: 28 }}>
          <h3 style={{ margin: 0, fontSize: 34, fontWeight: 900, letterSpacing: "-0.05em" }}>Como fazer a sua encomenda</h3>
          <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
            {[
              { title: "1. Escolhe os produtos", text: "Aceda ao catálogo e veja todos os produtos disponíveis." },
              { title: "2. Adiciona packs ao carrinho", text: "Cada produto indica claramente que é vendido por pack de 24 unidades." },
              { title: "3. Envia a encomenda", text: "Envie o pedido por WhatsApp com os valores já calculados para confirmação rápida." },
            ].map((step) => (
              <div key={step.title} style={{ padding: 18, borderRadius: 22, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <h4 style={{ margin: 0, fontSize: 21, fontWeight: 800 }}>{step.title}</h4>
                <p style={{ margin: "8px 0 0", color: "#475569", lineHeight: 1.7 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 22 }}>
          <div style={{ ...styles.card, padding: 24 }}>
            <h3 style={{ margin: 0, fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em" }}>Dias disponíveis para entrega</h3>
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {DELIVERY_DAYS.map((d) => (
                <div key={d.day} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: 14, borderRadius: 18, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 800 }}>{d.day}</span>
                  <span style={{ color: "#475569" }}>{d.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...styles.card, padding: 24 }}>
            <h3 style={{ margin: 0, fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em" }}>Zona de entrega</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
              {SERVICE_AREAS.map((area) => (
                <div key={area} style={{ padding: "10px 14px", borderRadius: 999, background: "#f1f5f9", color: "#0f172a", fontWeight: 700, fontSize: 14 }}>
                  {area}
                </div>
              ))}
            </div>
            <p style={{ margin: "16px 0 0", color: "#475569", lineHeight: 1.7 }}>
              Após o seu pedido, combinamos consigo a melhor forma e horário de entrega.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function CatalogPage({ cart, setCart, search, setSearch, selectedCategory, setSelectedCategory, clientName, setClientName, notes, setNotes }) {
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

    let msg = "Olá, quero fazer uma encomenda:%0A%0A";
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

  return (
    <>
      <section style={{ ...styles.card, padding: 22, marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 34, fontWeight: 900, letterSpacing: "-0.05em" }}>Catálogo</h3>
            <p style={{ margin: "8px 0 0", color: "#64748b" }}>Todos os produtos são vendidos em packs de 24 unidades.</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar produto..."
              style={{ height: 50, minWidth: 240, borderRadius: 16, border: "1px solid #dbe3ee", padding: "0 16px", fontSize: 15, outline: "none" }}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    borderRadius: 999,
                    padding: "11px 16px",
                    border: selectedCategory === category ? "1px solid #0f172a" : "1px solid #dbe3ee",
                    background: selectedCategory === category ? "#0f172a" : "white",
                    color: selectedCategory === category ? "white" : "#0f172a",
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
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.9fr", gap: 22 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18 }}>
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              style={{ ...styles.card, padding: 20, transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 36px rgba(15,23,42,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(15,23,42,0.06)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.14em" }}>{p.category}</div>
                {p.featured && <div style={{ padding: "7px 10px", borderRadius: 999, background: "#fef3c7", color: "#92400e", fontSize: 12, fontWeight: 800 }}>Destaque</div>}
              </div>

              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", borderRadius: 24, marginBottom: 18 }}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ maxWidth: "100%", maxHeight: 160, objectFit: "contain", filter: "drop-shadow(0 20px 24px rgba(15,23,42,0.18))" }}
                />
              </div>

              <h4 style={{ margin: 0, fontSize: 30, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.04 }}>{p.name}</h4>
              <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 15, fontWeight: 700 }}>Pack de 24 unidades</p>
              <p style={{ margin: "10px 0 0", color: "#475569", lineHeight: 1.65 }}>{p.description}</p>

              <div style={{ marginTop: 16, padding: 16, borderRadius: 20, background: "#f8fafc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Sem IVA</p>
                    <p style={{ margin: "6px 0 0", fontSize: 32, fontWeight: 900, letterSpacing: "-0.06em" }}>{formatPrice(p.price)}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Com IVA</p>
                    <p style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{formatPrice(p.price * IVA)}</p>
                  </div>
                </div>
              </div>

              <button onClick={() => add(p)} style={{ ...styles.buttonDark, width: "100%", marginTop: 16 }}>
                Adicionar pack
              </button>
            </div>
          ))}
        </div>

        <aside>
          <div style={{ ...styles.card, background: "#0f172a", color: "white", padding: 22, position: "sticky", top: 98 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}>
              <div>
                <p style={{ margin: 0, color: "#94a3b8", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>Resumo da encomenda</p>
                <h3 style={{ margin: "8px 0 0", fontSize: 38, fontWeight: 900, letterSpacing: "-0.05em" }}>A sua encomenda</h3>
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 16, background: "rgba(255,255,255,0.08)", fontWeight: 800 }}>{totalPacks} packs</div>
            </div>

            <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
              {cart.length === 0 ? (
                <div style={{ padding: 18, borderRadius: 20, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Ainda não adicionou produtos.</div>
              ) : (
                cart.map((p) => {
                  const subtotal = p.price * p.qty;
                  const subtotalIVA = subtotal * IVA;
                  return (
                    <div key={p.id} style={{ padding: 16, borderRadius: 20, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: 18 }}>{p.name}</h4>
                          <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 14 }}>Pack de 24 unidades</p>
                        </div>
                        <button onClick={() => removeItem(p.id)} style={{ background: "transparent", color: "#fca5a5", border: "none", cursor: "pointer", fontWeight: 700 }}>Remover</button>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, gap: 12 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <button onClick={() => decreaseQty(p.id)} style={{ ...styles.buttonLight, padding: "10px 12px", background: "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.12)" }}>−</button>
                          <div style={{ minWidth: 42, textAlign: "center", fontWeight: 800 }}>{p.qty}</div>
                          <button onClick={() => increaseQty(p.id)} style={{ ...styles.buttonLight, padding: "10px 12px", background: "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.12)" }}>+</button>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 800 }}>{formatPrice(subtotal)}</div>
                          <div style={{ fontSize: 13, color: "#94a3b8" }}>{formatPrice(subtotalIVA)} com IVA</div>
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
                style={{ height: 52, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", padding: "0 16px", fontSize: 15, outline: "none" }}
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notas (morada, horário de entrega, referência, etc.)"
                style={{ minHeight: 110, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", padding: 16, fontSize: 15, outline: "none", resize: "vertical" }}
              />
            </div>

            <div style={{ marginTop: 18, padding: 18, borderRadius: 20, background: "white", color: "#0f172a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b", fontSize: 14 }}>
                <span>Total sem IVA</span>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>{formatPrice(total)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 10 }}>
                <span style={{ color: "#64748b", fontSize: 14 }}>Total com IVA</span>
                <span style={{ fontWeight: 900, fontSize: 34, letterSpacing: "-0.05em" }}>{formatPrice(totalIVA)}</span>
              </div>
            </div>

            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              <button onClick={sendWhatsApp} style={{ ...styles.buttonPrimary, width: "100%", fontSize: 18, padding: "18px 22px" }}>
                Enviar pedido por WhatsApp
              </button>
              <button onClick={clearCart} style={{ ...styles.buttonLight, width: "100%", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.16)" }}>
                Limpar encomenda
              </button>
            </div>

            <div style={{ marginTop: 16, padding: 16, borderRadius: 18, background: "rgba(255,255,255,0.06)", color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 }}>
              Todos os produtos correspondem a <strong>packs de 24 unidades</strong>. Após o envio do pedido, entraremos em contacto para confirmar disponibilidade e entrega.
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("info");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {currentPage === "info" ? (
          <InfoPage setCurrentPage={setCurrentPage} />
        ) : (
          <CatalogPage
            cart={cart}
            setCart={setCart}
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            clientName={clientName}
            setClientName={setClientName}
            notes={notes}
            setNotes={setNotes}
          />
        )}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Clock3,
  CreditCard,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Truck,
  Menu,
  X,
  Instagram,
} from "lucide-react";

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
const IVA = 0.23;
const CATEGORIES = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];

const colors = {
  bg: "#030303",
  panel: "#070707",
  panelSoft: "#0c0c0c",
  panelMuted: "#101010",
  border: "rgba(255,255,255,0.04)",
  text: "#f2f2f2",
  muted: "#b8b8b8",
  lime: "#b8d400",
  limeBorder: "rgba(184,212,0,0.32)",
  limeSoft: "rgba(184,212,0,0.08)",
};

const formatPrice = (value) => `€${Number(value).toFixed(2)}`;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    document.title = "PACK24";
  }, []);

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

  const increaseQty = (id) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  };

  const decreaseQty = (id) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item)).filter((item) => item.qty > 0));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalWithoutVat = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalWithVat = totalWithoutVat * (1 + IVA);

  const sendWhatsApp = () => {
    if (!cart.length) return;

    let msg = "Olá, quero fazer uma encomenda:%0A%0A";

    cart.forEach((item) => {
      const subtotalWithoutVat = item.price * item.qty;
      const subtotalWithVat = subtotalWithoutVat * (1 + IVA);

      msg += `• ${item.name} — ${item.qty} pack(s) de 24 unidades%0A`;
      msg += `  Sem IVA: ${formatPrice(subtotalWithoutVat)}%0A`;
      msg += `  Com IVA: ${formatPrice(subtotalWithVat)}%0A%0A`;
    });

    msg += `Total sem IVA: ${formatPrice(totalWithoutVat)}%0A`;
    msg += `Total com IVA: ${formatPrice(totalWithVat)}%0A`;

    if (clientName.trim()) msg += `Nome: ${encodeURIComponent(clientName.trim())}%0A`;
    if (notes.trim()) msg += `Morada / Notas: ${encodeURIComponent(notes.trim())}%0A`;

    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
  };

  const shellCard = {
    background: colors.panel,
    border: `1px solid ${colors.border}`,
    borderRadius: isMobile ? 20 : 28,
    boxShadow: "0 14px 34px rgba(0,0,0,0.28)",
  };

  const navButtonStyle = (active) => ({
    background: "transparent",
    border: "none",
    color: active ? colors.lime : colors.text,
    fontWeight: 800,
    fontSize: isMobile ? 16 : 18,
    padding: isMobile ? "10px 0" : "0 0 12px",
    borderBottom: active && !isMobile ? `4px solid ${colors.lime}` : "4px solid transparent",
    cursor: "pointer",
    width: isMobile ? "100%" : "auto",
    textAlign: isMobile ? "left" : "center",
  });

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.text, fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1420, margin: "0 auto", padding: isMobile ? 12 : 18 }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            padding: "2px 4px 18px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ fontSize: isMobile ? 34 : 46, fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 1 }}>
            <span style={{ color: colors.text }}>PACK</span>
            <span style={{ color: colors.lime, marginLeft: 10 }}>24</span>
          </div>

          {isMobile ? (
            <>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  background: "transparent",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 12,
                  width: 44,
                  height: 44,
                  color: colors.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {menuOpen && (
                <div style={{ width: "100%", ...shellCard, padding: 18, background: colors.panelSoft }}>
                  <nav style={{ display: "grid", gap: 6 }}>
                    <button onClick={() => { setCurrentPage("inicio"); setMenuOpen(false); }} style={navButtonStyle(currentPage === "inicio")}>INÍCIO</button>
                    <button onClick={() => { setCurrentPage("catalogo"); setMenuOpen(false); }} style={navButtonStyle(currentPage === "catalogo")}>CATÁLOGO</button>
                    <a href="#contactos" onClick={() => setMenuOpen(false)} style={{ color: colors.text, textDecoration: "none", fontWeight: 800, fontSize: 16, padding: "10px 0" }}>CONTACTO</a>
                    <button
                      onClick={() => window.open(`https://wa.me/${PHONE}`, "_blank")}
                      style={{
                        marginTop: 10,
                        background: "transparent",
                        color: colors.text,
                        border: `1px solid ${colors.limeBorder}`,
                        borderRadius: 14,
                        padding: "14px 16px",
                        fontWeight: 800,
                        fontSize: 15,
                        width: "100%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        cursor: "pointer",
                      }}
                    >
                      <MessageCircle size={18} color={colors.lime} />
                      {PHONE_DISPLAY}
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <>
              <nav style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
                <button onClick={() => setCurrentPage("inicio")} style={navButtonStyle(currentPage === "inicio")}>INÍCIO</button>
                <button onClick={() => setCurrentPage("catalogo")} style={navButtonStyle(currentPage === "catalogo")}>CATÁLOGO</button>
                <a href="#contactos" style={{ color: colors.text, textDecoration: "none", fontWeight: 800, fontSize: 18, paddingBottom: 12 }}>CONTACTO</a>
              </nav>

              <button
                onClick={() => window.open(`https://wa.me/${PHONE}`, "_blank")}
                style={{
                  background: "transparent",
                  color: colors.text,
                  border: `2px solid ${colors.limeBorder}`,
                  borderRadius: 18,
                  padding: "12px 18px",
                  fontWeight: 800,
                  fontSize: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <MessageCircle size={18} color={colors.lime} />
                {PHONE_DISPLAY}
              </button>
            </>
          )}
        </header>

        {currentPage === "inicio" ? (
          <>
            <section
              style={{
                ...shellCard,
                marginTop: 22,
                overflow: "hidden",
                background: "radial-gradient(circle at 78% 34%, rgba(184,212,0,0.14), transparent 30%), linear-gradient(90deg, #050505 0%, #050505 47%, #0a0d04 100%)",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) minmax(460px, 0.9fr)", minHeight: isMobile ? "auto" : 620 }}>
                <div style={{ padding: isMobile ? "34px 20px 28px" : "56px 42px 38px" }}>
                  <h1
                    style={{
                      margin: 0,
                      fontSize: isMobile ? "clamp(36px,10vw,52px)" : "clamp(46px,5.6vw,82px)",
                      lineHeight: 0.92,
                      fontWeight: 900,
                      letterSpacing: "-0.08em",
                      textTransform: "uppercase",
                      maxWidth: 780,
                    }}
                  >
                    FORNECIMENTO
                    <br />
                    DE <span style={{ color: colors.lime }}>BEBIDAS</span>
                    <br />
                    PARA O SEU NEGÓCIO
                  </h1>

                  <div style={{ width: isMobile ? 110 : 140, height: 4, background: colors.lime, borderRadius: 999, marginTop: 24 }} />

                  <p style={{ margin: "24px 0 0", color: colors.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7, maxWidth: 640 }}>
                    Packs de 24 unidades com os melhores preços
                    <br />
                    e entrega rápida na sua zona.
                  </p>

                  <button
                    onClick={() => setCurrentPage("catalogo")}
                    style={{
                      marginTop: 28,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      background: colors.lime,
                      color: "#050505",
                      border: "none",
                      borderRadius: 16,
                      padding: isMobile ? "14px 18px" : "16px 22px",
                      fontWeight: 900,
                      fontSize: isMobile ? 15 : 18,
                      cursor: "pointer",
                      boxShadow: "0 12px 28px rgba(215,255,0,0.2)",
                    }}
                  >
                    <Package size={18} />
                    VER CATÁLOGO
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14, marginTop: 28 }}>
                    {[
                      [Package, "PACKS", "DE 24 UNIDADES"],
                      [Truck, "ENTREGA", "RÁPIDA"],
                      [ShieldCheck, "PREÇOS", "COMPETITIVOS"],
                    ].map(([Icon, title, text]) => (
                      <div key={title} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: colors.panelSoft, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={20} color={colors.lime} />
                        </div>
                        <div>
                          <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05 }}>{title}</div>
                          <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05 }}>{text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ position: "relative", minHeight: isMobile ? 260 : 620, padding: isMobile ? "0 12px 24px" : 0 }}>
                  {!isMobile && <div style={{ position: "absolute", right: 36, top: 86, width: 440, height: 420, border: `2px solid ${colors.limeBorder}`, borderRadius: 48, transform: "skew(-28deg)" }} />}
                  <div style={{ position: "absolute", left: isMobile ? 20 : 40, bottom: isMobile ? 10 : 40, width: isMobile ? 280 : 520, height: isMobile ? 90 : 180, borderRadius: "50%", background: "rgba(0,0,0,0.48)", filter: "blur(16px)" }} />
                  <img src="/images/refrigerantes.png" alt="Refrigerantes" style={{ position: isMobile ? "relative" : "absolute", right: isMobile ? "auto" : 10, bottom: isMobile ? "auto" : 48, margin: isMobile ? "0 auto" : 0, display: "block", maxWidth: isMobile ? "100%" : "92%", maxHeight: isMobile ? 260 : 500, objectFit: "contain", filter: "drop-shadow(0 28px 26px rgba(0,0,0,0.6))" }} />
                </div>
              </div>
            </section>

            <section style={{ ...shellCard, marginTop: 24, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", background: colors.panelSoft }}>
                {[
                  [MapPin, "ZONA DE ENTREGA", "Costa da Caparica\ne Almada"],
                  [MessageCircle, "ENCOMENDAS", "Encomende de forma rápida\ne simples pelo WhatsApp"],
                  [Clock3, "HORÁRIO", "Segunda a Sábado\n8h00 – 20h00"],
                  [CreditCard, "PAGAMENTO", "Pagamento na entrega\nou por transferência"],
                ].map(([Icon, title, text], index, arr) => (
                  <div key={title} style={{ padding: isMobile ? 20 : 28, display: "flex", gap: 16, alignItems: "flex-start", minHeight: isMobile ? "auto" : 136, borderRight: !isMobile && index < arr.length - 1 ? `1px solid ${colors.border}` : "none", borderBottom: isMobile && index < arr.length - 1 ? `1px solid ${colors.border}` : "none" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: colors.panel, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color={colors.lime} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</div>
                      <div style={{ marginTop: 8, fontSize: 15, lineHeight: 1.6, color: colors.text, whiteSpace: "pre-line" }}>{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section id="catalogo" style={{ marginTop: 40 }}>
            <div style={{ textAlign: "center", marginBottom: 26 }}>
              <h2 style={{ margin: 0, fontSize: isMobile ? "clamp(28px,8vw,38px)" : "clamp(34px,4.2vw,50px)", fontWeight: 900, letterSpacing: "-0.06em", textTransform: "uppercase" }}>CATÁLOGO</h2>
              <div style={{ width: 120, height: 4, background: colors.lime, borderRadius: 999, margin: "14px auto 0" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.55fr) minmax(320px, 0.85fr)", gap: 20, alignItems: "start" }}>
              <div>
                <div style={{ ...shellCard, padding: 22, marginBottom: 22, background: colors.panelSoft }}>
                  <div style={{ display: "grid", gap: 12, alignItems: "start" }}>
                    <div style={{ position: "relative", width: "100%" }}>
                      <Search size={16} color={colors.muted} style={{ position: "absolute", left: 14, top: 18 }} />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Pesquisar produto..."
                        style={{ height: 52, width: "100%", borderRadius: 14, border: `1px solid ${colors.border}`, background: colors.panel, color: colors.text, padding: "0 16px 0 42px", fontSize: 15, outline: "none" }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          style={{
                            borderRadius: 999,
                            padding: "10px 14px",
                            border: `1px solid ${selectedCategory === category ? colors.limeBorder : colors.border}`,
                            background: selectedCategory === category ? colors.limeSoft : "transparent",
                            color: colors.text,
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

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                  {filteredProducts.map((product) => {
                    const priceWithoutVat = product.price;
                    const priceWithVat = product.price * (1 + IVA);

                    return (
                      <div key={product.id} style={{ ...shellCard, padding: isMobile ? 14 : 20, background: colors.panelSoft, borderRadius: 18 }}>
                        <div style={{ height: isMobile ? 150 : 220, display: "flex", alignItems: "center", justifyContent: "center", background: colors.panel, borderRadius: 16, border: `1px solid ${colors.border}`, marginBottom: 14 }}>
                          <img src={product.img} alt={product.name} style={{ maxWidth: "100%", maxHeight: isMobile ? 120 : 190, objectFit: "contain", filter: "drop-shadow(0 24px 26px rgba(0,0,0,0.5))" }} />
                        </div>

                        <h3 style={{ margin: 0, fontSize: isMobile ? 15 : 18, fontWeight: 800, textTransform: "uppercase", minHeight: isMobile ? 36 : 48 }}>{product.name}</h3>
                        <p style={{ margin: "8px 0 0", color: colors.text, fontSize: isMobile ? 13 : 15, lineHeight: 1.5, minHeight: isMobile ? 34 : 48 }}>{product.description}</p>

                        <div style={{ marginTop: 12 }}>
                          <div style={{ color: colors.muted, fontSize: isMobile ? 12 : 13 }}>{formatPrice(priceWithoutVat)} (sem IVA)</div>
                          <div style={{ color: colors.lime, fontSize: isMobile ? 16 : 18, fontWeight: 800, marginTop: 4 }}>{formatPrice(priceWithVat)} (com IVA)</div>
                        </div>

                        <button
                          onClick={() => add(product)}
                          style={{ width: "100%", marginTop: 14, background: "transparent", color: colors.lime, border: `1px solid ${colors.limeBorder}`, borderRadius: 12, padding: isMobile ? "12px 10px" : "14px 16px", fontWeight: 800, fontSize: isMobile ? 13 : 15, cursor: "pointer" }}
                        >
                          ADICIONAR
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside style={{ ...shellCard, padding: isMobile ? 18 : 24, position: isMobile ? "static" : "sticky", top: 20, background: colors.panelSoft }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div>
                    <div style={{ color: colors.muted, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>Carrinho</div>
                    <h3 style={{ margin: "8px 0 0", fontSize: isMobile ? 24 : 30, fontWeight: 800 }}>Resumo do pedido</h3>
                  </div>
                  <div style={{ padding: "9px 13px", borderRadius: 999, background: colors.panel, border: `1px solid ${colors.border}`, fontWeight: 700 }}>
                    {cart.reduce((sum, item) => sum + item.qty, 0)} packs
                  </div>
                </div>

                <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                  {cart.length === 0 ? (
                    <div style={{ padding: 16, borderRadius: 14, background: colors.panel, border: `1px solid ${colors.border}`, color: colors.muted }}>
                      Ainda não adicionou produtos.
                    </div>
                  ) : (
                    cart.map((item) => {
                      const subtotalWithoutVat = item.price * item.qty;
                      const subtotalWithVat = subtotalWithoutVat * (1 + IVA);

                      return (
                        <div key={item.id} style={{ padding: 16, borderRadius: 14, background: colors.panel, border: `1px solid ${colors.border}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div>
                              <div style={{ fontWeight: 700 }}>{item.name}</div>
                              <div style={{ color: colors.muted, fontSize: 13 }}>Pack de 24 unidades</div>
                            </div>
                            <button onClick={() => removeItem(item.id)} style={{ background: "transparent", color: "#fca5a5", border: "none", cursor: "pointer" }}>Remover</button>
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <button onClick={() => decreaseQty(item.id)} style={{ background: "transparent", color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer" }}>−</button>
                              <span style={{ minWidth: 24, textAlign: "center", fontWeight: 800 }}>{item.qty}</span>
                              <button onClick={() => increaseQty(item.id)} style={{ background: "transparent", color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer" }}>+</button>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ color: colors.muted, fontSize: 12 }}>{formatPrice(subtotalWithoutVat)} sem IVA</div>
                              <div style={{ fontWeight: 700, color: colors.lime, marginTop: 2 }}>{formatPrice(subtotalWithVat)} com IVA</div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                  <label style={{ fontSize: 13, color: colors.muted, fontWeight: 700 }}>Cliente / Estabelecimento</label>
                  <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Nome do cliente ou do estabelecimento" style={{ height: 50, borderRadius: 12, border: `1px solid ${colors.border}`, background: colors.panel, color: colors.text, padding: "0 14px", fontSize: 14, outline: "none" }} />
                  <label style={{ fontSize: 13, color: colors.muted, fontWeight: 700 }}>Morada e indicações de entrega</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Morada de entrega, horário pretendido, referência do pedido ou outras indicações" style={{ minHeight: 100, borderRadius: 12, border: `1px solid ${colors.border}`, background: colors.panel, color: colors.text, padding: 14, fontSize: 14, outline: "none", resize: "vertical" }} />
                </div>

                <div style={{ marginTop: 18, padding: 18, borderRadius: 18, background: colors.text, color: "#0f172a" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748b" }}>
                    <span>Total sem IVA</span>
                    <span style={{ fontWeight: 700 }}>{formatPrice(totalWithoutVat)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 10 }}>
                    <span style={{ fontSize: 13, color: "#64748b" }}>Total com IVA</span>
                    <span style={{ fontSize: isMobile ? 26 : 32, fontWeight: 800 }}>{formatPrice(totalWithVat)}</span>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                  <button onClick={sendWhatsApp} style={{ background: colors.lime, color: "#050505", border: "none", borderRadius: 14, padding: "16px 18px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Enviar pedido por WhatsApp</button>
                  <button onClick={clearCart} style={{ background: "transparent", color: colors.text, border: `1px solid rgba(255,255,255,0.16)`, borderRadius: 14, padding: "14px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Limpar encomenda</button>
                </div>
              </aside>
            </div>
          </section>
        )}

        <section id="contactos" style={{ marginTop: 42 }}>
          <div style={{ ...shellCard, padding: isMobile ? 20 : 34 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.95fr 0.7fr 0.9fr", gap: 26, alignItems: "start" }}>
              <div>
                <div style={{ fontSize: isMobile ? 34 : 46, fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 1 }}>
                  <span style={{ color: colors.text }}>PACK</span>
                  <span style={{ color: colors.lime, marginLeft: 10 }}>24</span>
                </div>
                <p style={{ margin: "18px 0 0", color: colors.text, fontSize: isMobile ? 16 : 18, lineHeight: 1.8, maxWidth: 420 }}>
                  Fornecimento de bebidas em packs de 24 unidades para cafés, restaurantes, bares e outros estabelecimentos.
                </p>
                <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
                  {[MessageCircle, Mail, Phone].map((Icon, index) => (
                    <div key={index} style={{ width: 46, height: 46, borderRadius: 999, border: `1px solid ${colors.limeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.lime }}>
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ margin: 0, color: colors.lime, fontSize: isMobile ? 24 : 30, fontWeight: 900, textTransform: "uppercase" }}>CONTACTOS</h3>
                <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17 }}><Phone size={18} color={colors.lime} />{PHONE_DISPLAY}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17 }}><MessageCircle size={18} color={colors.lime} />{PHONE_DISPLAY}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17 }}><Mail size={18} color={colors.lime} />geral@pack24.pt</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17 }}><MapPin size={18} color={colors.lime} />Costa da Caparica e Almada</div>
                </div>
              </div>

              <div>
                <h3 style={{ margin: 0, color: colors.lime, fontSize: isMobile ? 24 : 30, fontWeight: 900, textTransform: "uppercase" }}>PÁGINAS</h3>
                <div style={{ display: "grid", gap: 14, marginTop: 20, fontSize: isMobile ? 15 : 17, color: colors.text }}>
                  <div>Início</div>
                  <div>Catálogo</div>
                  <div>Contacto</div>
                </div>
              </div>

              <div>
                <h3 style={{ margin: 0, color: colors.lime, fontSize: isMobile ? 24 : 30, fontWeight: 900, textTransform: "uppercase" }}>SIGA-NOS</h3>
                <p style={{ margin: "20px 0 0", color: colors.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7 }}>
                  Acompanhe as novidades e promoções no Instagram.
                </p>
                <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, border: `1px solid ${colors.limeBorder}`, color: colors.lime, fontWeight: 800 }}>
                  <Instagram size={18} />
                  @pack24.pt
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ textAlign: "center", color: colors.muted, fontSize: 15, padding: "28px 8px 8px", borderTop: `1px solid ${colors.border}`, marginTop: 28 }}>
          © 2026 pack24.pt – Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}

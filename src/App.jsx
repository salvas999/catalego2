import React, { useEffect, useMemo, useState } from "react";

const IconBase = ({ children, size = 20, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

const ArrowRight = (props) => <IconBase {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></IconBase>;
const Clock3 = (props) => <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></IconBase>;
const CreditCard = (props) => <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></IconBase>;
const Mail = (props) => <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></IconBase>;
const MapPin = (props) => <IconBase {...props}><path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></IconBase>;
const Menu = (props) => <IconBase {...props}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></IconBase>;
const MessageCircle = (props) => <IconBase {...props}><path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-5.1A8.5 8.5 0 1 1 21 11.5z" /></IconBase>;
const Package = (props) => <IconBase {...props}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M4 7.5 12 12l8-4.5" /><path d="M12 12v9" /></IconBase>;
const Phone = (props) => <IconBase {...props}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9z" /></IconBase>;
const Search = (props) => <IconBase {...props}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></IconBase>;
const ShieldCheck = (props) => <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></IconBase>;
const Truck = (props) => <IconBase {...props}><path d="M3 7h11v8H3z" /><path d="M14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></IconBase>;
const X = (props) => <IconBase {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></IconBase>;

const PRODUCTS = [
  { id: 1, name: "Coca-Cola", price: 13.2, units: 24, img: "/images/cocacola.png", category: "Refrigerantes" },
  { id: 2, name: "Coca-Cola Zero", price: 13.2, units: 24, img: "/images/cocacola-zero.png", category: "Refrigerantes" },
  { id: 3, name: "Lipton Limão", price: 13.68, units: 24, img: "/images/lipton-limao.png", category: "Ice Tea" },
  { id: 4, name: "Lipton Pêssego", price: 13.68, units: 24, img: "/images/lipton-pessego.png", category: "Ice Tea" },
  { id: 5, name: "Lipton Manga", price: 13.68, units: 24, img: "/images/lipton-manga.png", category: "Ice Tea" },
  { id: 6, name: "7Up", price: 12, units: 24, img: "/images/7up.png", category: "Refrigerantes" },
  { id: 7, name: "Guaraná", price: 12.96, units: 24, img: "/images/guarana.png", category: "Refrigerantes" },
  { id: 8, name: "Água", price: 3.12, units: 24, img: "/images/agua.png", category: "Águas" },
  { id: 9, name: "Água das Pedras", price: 10.08, units: 24, img: "/images/agua-pedras.png", category: "Águas" },
  { id: 10, name: "Revo", price: 10.32, units: 24, img: "/images/revo.png", category: "Energéticas" },
  { id: 11, name: "Red Bull", price: 22.8, units: 24, img: "/images/redbull.png", category: "Energéticas" },
  { id: 12, name: "Nestea Limão", price: 9.6, units: 24, img: "/images/nestea.png", category: "Ice Tea" },
  { id: 13, name: "Nestea Maracujá", price: 9.6, units: 24, img: "/images/nestea-maracuja.png", category: "Ice Tea" },
  { id: 14, name: "Fanta", price: 11.28, units: 24, img: "/images/fanta.png", category: "Refrigerantes" },
  { id: 15, name: "Super Bock 1L", price: 7.8, units: 6, img: "/images/superbock-1l.png", category: "Cervejas" },
];

const PHONE = "351933499207";
const PHONE_DISPLAY = "933 499 207";
const PHONE_2 = "351938113585";
const PHONE_DISPLAY_2 = "938 113 585";
const ORDER_PHONE = PHONE_2;
const IVA = 0.23;
const CATEGORIES = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];

const colors = {
  bg: "#030303",
  panel: "#070707",
  panelSoft: "#0c0c0c",
  border: "rgba(255,255,255,0.05)",
  text: "#f2f2f2",
  muted: "#b8b8b8",
  lime: "#A3E635",
  limeBorder: "rgba(163,230,53,0.32)",
  limeSoft: "rgba(163,230,53,0.08)",
};

const formatPrice = (value) => `€${Number(value).toFixed(2)}`;
const productDescription = (product) => `Pack de ${product.units} unidades`;

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
    const normalizedSearch = search.toLowerCase().trim();
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
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

    let message = "Olá, quero fazer uma encomenda:\n\n";

    cart.forEach((item) => {
      const subtotalWithoutVat = item.price * item.qty;
      const subtotalWithVat = subtotalWithoutVat * (1 + IVA);
      message += `• ${item.name} — ${item.qty} pack(s) de ${item.units} unidades\n`;
      message += `  Sem IVA: ${formatPrice(subtotalWithoutVat)}\n`;
      message += `  Com IVA: ${formatPrice(subtotalWithVat)}\n\n`;
    });

    message += `Total sem IVA: ${formatPrice(totalWithoutVat)}\n`;
    message += `Total com IVA: ${formatPrice(totalWithVat)}\n`;

    if (clientName.trim()) message += `Nome: ${clientName.trim()}\n`;
    if (notes.trim()) message += `Morada / Notas: ${notes.trim()}\n`;

    window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
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
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { background: #000; overflow-x: hidden; }
        body { margin: 0; }
        @keyframes floatCan {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

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
                        onClick={() => window.open(`https://wa.me/${ORDER_PHONE}`, "_blank")}
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
                        {PHONE_DISPLAY_2}
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
                  onClick={() => window.open(`https://wa.me/${ORDER_PHONE}`, "_blank")}
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
                  {PHONE_DISPLAY_2}
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
                  background: "radial-gradient(circle at 78% 34%, rgba(163,230,53,0.14), transparent 30%), linear-gradient(90deg, #050505 0%, #050505 47%, #0a0d04 100%)",
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
                        boxShadow: "0 12px 28px rgba(163,230,53,0.2)",
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
                    <img
                      src="/images/refrigerantes.png"
                      alt="Refrigerantes"
                      onClick={() => setCurrentPage("catalogo")}
                      style={{
                        position: isMobile ? "relative" : "absolute",
                        right: isMobile ? "auto" : 10,
                        bottom: isMobile ? "auto" : 48,
                        margin: isMobile ? "0 auto" : 0,
                        display: "block",
                        maxWidth: isMobile ? "100%" : "92%",
                        maxHeight: isMobile ? 260 : 500,
                        objectFit: "contain",
                        filter: "drop-shadow(0 28px 26px rgba(0,0,0,0.6)) drop-shadow(0 0 25px rgba(163,230,53,0.15))",
                        cursor: "pointer",
                        animation: "floatCan 4s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
              </section>

              <section style={{ ...shellCard, marginTop: 24, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", background: colors.panelSoft }}>
                  {[
                    [MapPin, "ZONA DE ENTREGA", "Costa da Caparica\ne Margem Sul"],
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
                            <img src={product.img} alt={product.name} loading="lazy" style={{ maxWidth: "100%", maxHeight: isMobile ? 120 : 190, objectFit: "contain", filter: "drop-shadow(0 24px 26px rgba(0,0,0,0.5))" }} />
                          </div>

                          <h3 style={{ margin: 0, fontSize: isMobile ? 15 : 18, fontWeight: 800, textTransform: "uppercase", minHeight: isMobile ? 36 : 48 }}>{product.name}</h3>
                          <p style={{ margin: "8px 0 0", color: colors.text, fontSize: isMobile ? 13 : 15, lineHeight: 1.5, minHeight: isMobile ? 34 : 48 }}>{productDescription(product)}</p>

                          <div style={{ marginTop: 12 }}>
                            <div style={{ color: colors.muted, fontSize: isMobile ? 12 : 13 }}>{formatPrice(priceWithoutVat)} (sem IVA)</div>
                            <div style={{ color: colors.lime, fontSize: isMobile ? 16 : 18, fontWeight: 800, marginTop: 4 }}>{formatPrice(priceWithVat)} (com IVA)</div>
                            <div style={{ color: colors.muted, fontSize: isMobile ? 11 : 12, marginTop: 5 }}>
                              {formatPrice(priceWithoutVat / product.units)} / un. sem IVA · {formatPrice(priceWithVat / product.units)} / un. com IVA
                            </div>
                          </div>

                          <button
                            onClick={() => add(product)}
                            style={{ width: "100%", marginTop: 14, background: colors.lime, color: "#050505", border: `1px solid ${colors.lime}`, borderRadius: 12, padding: isMobile ? "12px 10px" : "14px 16px", fontWeight: 800, fontSize: isMobile ? 13 : 15, cursor: "pointer" }}
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
                                <div style={{ color: colors.muted, fontSize: 13 }}>Pack de {item.units} unidades</div>
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

                  <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
                    <a href={`tel:+${PHONE}`} style={{ display: "flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17, textDecoration: "none" }}>
                      <Phone size={18} color={colors.lime} />
                      {PHONE_DISPLAY}
                    </a>
                    <a href={`tel:+${PHONE_2}`} style={{ display: "flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17, textDecoration: "none" }}>
                      <Phone size={18} color={colors.lime} />
                      {PHONE_DISPLAY_2}
                    </a>
                    <a href={`https://wa.me/${ORDER_PHONE}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17, textDecoration: "none" }}>
                      <MessageCircle size={18} color={colors.lime} />
                      WhatsApp
                    </a>
                    <a href="mailto:geral@pack24.pt" style={{ display: "flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17, textDecoration: "none" }}>
                      <Mail size={18} color={colors.lime} />
                      geral@pack24.pt
                    </a>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, color: colors.text, fontSize: isMobile ? 15 : 17 }}>
                      <MapPin size={18} color={colors.lime} />
                      Costa da Caparica & Margem Sul
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: 0, color: colors.lime, fontSize: isMobile ? 24 : 30, fontWeight: 900, textTransform: "uppercase" }}>PÁGINAS</h3>
                  <div style={{ display: "grid", gap: 14, marginTop: 20, fontSize: isMobile ? 15 : 17, color: colors.text }}>
                    <button onClick={() => setCurrentPage("inicio")} style={{ background: "transparent", border: "none", color: colors.text, textAlign: "left", cursor: "pointer", fontSize: isMobile ? 15 : 17 }}>Início</button>
                    <button onClick={() => setCurrentPage("catalogo")} style={{ background: "transparent", border: "none", color: colors.text, textAlign: "left", cursor: "pointer", fontSize: isMobile ? 15 : 17 }}>Catálogo</button>
                    <a href="#contactos" style={{ color: colors.text, textDecoration: "none" }}>Contacto</a>
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: 0, color: colors.lime, fontSize: isMobile ? 24 : 30, fontWeight: 900, textTransform: "uppercase" }}>SIGA-NOS</h3>
                  <p style={{ margin: "20px 0 0", color: colors.text, fontSize: isMobile ? 15 : 17, lineHeight: 1.7 }}>
                    Acompanhe as novidades e promoções no Instagram.
                  </p>
                  <a href="https://instagram.com/pack24.pt" target="_blank" rel="noreferrer" style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, border: `1px solid ${colors.limeBorder}`, color: colors.lime, fontWeight: 800, textDecoration: "none" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                    </svg>
                    @pack24.pt
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer style={{ textAlign: "center", color: colors.muted, fontSize: 15, padding: "28px 8px 8px", borderTop: `1px solid ${colors.border}`, marginTop: 28 }}>
            © 2026 pack24.pt – Todos os direitos reservados.
          </footer>
        </div>
      </div>
    </>
  );
}

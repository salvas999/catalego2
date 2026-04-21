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
const IVA = 1.23;
const CATEGORIES = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];

const colors = {
  bg: "#020202",
  panel: "#060606",
  panelSoft: "#0b0b0b",
  panelMuted: "#101010",
  border: "rgba(255,255,255,0.08)",
  text: "#f5f5f5",
  muted: "#c9c9c9",
  lime: "#d7ff00",
  limeBorder: "rgba(215,255,0,0.50)",
  limeSoft: "rgba(215,255,0,0.12)",
};

const formatPrice = (value) => `€${value.toFixed(2)}`;

const shellCard = {
  background: colors.panel,
  border: `1px solid ${colors.border}`,
  borderRadius: 28,
  boxShadow: "0 18px 48px rgba(0,0,0,0.34)",
};

function Brand() {
  return (
    <div style={{ fontSize: "clamp(34px,4vw,56px)", fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 1 }}>
      <span style={{ color: colors.text }}>PACK</span>
      <span style={{ color: colors.lime, marginLeft: 10 }}>24</span>
    </div>
  );
}

function Header({ currentPage, setCurrentPage }) {
  const navButton = (active) => ({
    background: "transparent",
    border: "none",
    color: active ? colors.lime : colors.text,
    fontWeight: 800,
    fontSize: 18,
    padding: "0 0 12px",
    borderBottom: active ? `4px solid ${colors.lime}` : "4px solid transparent",
    cursor: "pointer",
  });

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        flexWrap: "wrap",
        padding: "2px 4px 18px",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Brand />

      <nav style={{ display: "flex", gap: 42, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => setCurrentPage("inicio")} style={navButton(currentPage === "inicio")}>INÍCIO</button>
        <button onClick={() => setCurrentPage("catalogo")} style={navButton(currentPage === "catalogo")}>CATÁLOGO</button>
        <a href="#contactos" style={{ color: colors.text, textDecoration: "none", fontWeight: 800, fontSize: 18, paddingBottom: 12 }}>
          CONTACTO
        </a>
      </nav>

      <button
        onClick={() => window.open(`https://wa.me/${PHONE}`, "_blank")}
        style={{
          background: "transparent",
          color: colors.text,
          border: `2px solid ${colors.limeBorder}`,
          borderRadius: 18,
          padding: "14px 22px",
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
    </header>
  );
}

function Hero({ setCurrentPage }) {
  return (
    <section
      style={{
        ...shellCard,
        marginTop: 22,
        overflow: "hidden",
        background: "radial-gradient(circle at 78% 34%, rgba(215,255,0,0.18), transparent 30%), linear-gradient(90deg, #050505 0%, #050505 47%, #0a0d04 100%)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(560px, 0.95fr)", minHeight: 740 }}>
        <div style={{ padding: "76px 56px 46px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(68px,7vw,114px)",
              lineHeight: 0.88,
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

          <div style={{ width: 180, height: 5, background: colors.lime, borderRadius: 999, marginTop: 34 }} />

          <p style={{ margin: "38px 0 0", color: colors.text, fontSize: 19, lineHeight: 1.7, maxWidth: 640 }}>
            Packs de 24 unidades com os melhores preços
            <br />
            e entrega rápida na sua zona.
          </p>

          <button
            onClick={() => setCurrentPage("catalogo")}
            style={{
              marginTop: 38,
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              background: colors.lime,
              color: "#050505",
              border: "none",
              borderRadius: 18,
              padding: "18px 26px",
              fontWeight: 900,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 12px 28px rgba(215,255,0,0.2)",
            }}
          >
            <Package size={18} />
            VER CATÁLOGO
            <ArrowRight size={20} />
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, marginTop: 54 }}>
            {[
              [Package, "PACKS", "DE 24 UNIDADES"],
              [Truck, "ENTREGA", "RÁPIDA"],
              [ShieldCheck, "PREÇOS", "COMPETITIVOS"],
            ].map(([Icon, title, text]) => (
              <div key={title} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: colors.panelSoft, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color={colors.lime} />
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05 }}>{title}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05 }}>{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", minHeight: 740 }}>
          <div style={{ position: "absolute", right: 28, top: 108, width: 520, height: 520, border: `2px solid ${colors.limeBorder}`, borderRadius: 56, transform: "skew(-28deg)" }} />
          <div style={{ position: "absolute", left: 20, bottom: 50, width: 640, height: 240, borderRadius: "50%", background: "rgba(0,0,0,0.58)", filter: "blur(18px)" }} />
          <img src="/images/guarana.png" alt="Guaraná" style={{ position: "absolute", left: 88, bottom: 84, height: 380, filter: "drop-shadow(0 34px 30px rgba(0,0,0,0.62))" }} />
          <img src="/images/revo.png" alt="Revo" style={{ position: "absolute", left: 350, top: 302, height: 170, transform: "rotate(-18deg)", filter: "drop-shadow(0 28px 24px rgba(0,0,0,0.6))" }} />
          <img src="/images/cocacola.png" alt="Coca-Cola" style={{ position: "absolute", right: 210, top: 364, height: 188, filter: "drop-shadow(0 28px 24px rgba(0,0,0,0.6))" }} />
          <img src="/images/nestea.png" alt="Nestea" style={{ position: "absolute", right: 56, top: 346, height: 198, filter: "drop-shadow(0 28px 24px rgba(0,0,0,0.6))" }} />
        </div>
      </div>
    </section>
  );
}

function InfoStrip() {
  const items = [
    { icon: MapPin, title: "ZONA DE ENTREGA", text: "Costa da Caparica\ne Almada" },
    { icon: MessageCircle, title: "ENCOMENDAS", text: "Encomende de forma rápida\ne simples pelo WhatsApp" },
    { icon: Clock3, title: "HORÁRIO", text: "Segunda a Sábado\n8h00 – 20h00" },
    { icon: CreditCard, title: "PAGAMENTO", text: "Pagamento na entrega\nou por transferência" },
  ];

  return (
    <section style={{ ...shellCard, marginTop: 24, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", background: colors.panelSoft }}>
        {items.map(({ icon: Icon, title, text }, index) => (
          <div key={title} style={{ padding: 28, display: "flex", gap: 16, alignItems: "flex-start", minHeight: 136, borderRight: index < items.length - 1 ? `1px solid ${colors.border}` : "none" }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: colors.panel, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={22} color={colors.lime} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</div>
              <div style={{ marginTop: 8, fontSize: 16, lineHeight: 1.6, color: colors.text, whiteSpace: "pre-line" }}>{text}</div>
            </div>
          </div>
        ))}
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
    <section id="catalogo" style={{ marginTop: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <h2 style={{ margin: 0, fontSize: "clamp(40px,5vw,60px)", fontWeight: 900, letterSpacing: "-0.06em", textTransform: "uppercase" }}>CATÁLOGO</h2>
        <div style={{ width: 120, height: 4, background: colors.lime, borderRadius: 999, margin: "14px auto 0" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.7fr) minmax(340px, 0.8fr)", gap: 22, alignItems: "start" }}>
        <div>
          <div style={{ ...shellCard, padding: 22, marginBottom: 22, background: colors.panelSoft }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: "1 1 280px" }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 22 }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{ ...shellCard, padding: 20, background: colors.panelSoft, borderRadius: 18 }}>
                <div style={{ height: 270, display: "flex", alignItems: "center", justifyContent: "center", background: colors.panel, borderRadius: 16, border: `1px solid ${colors.border}`, marginBottom: 18 }}>
                  <img src={product.img} alt={product.name} style={{ maxWidth: "100%", maxHeight: 190, objectFit: "contain", filter: "drop-shadow(0 24px 26px rgba(0,0,0,0.5))" }} />
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, textTransform: "uppercase", minHeight: 48 }}>{product.name}</h3>
                <p style={{ margin: "10px 0 0", color: colors.text, fontSize: 15, lineHeight: 1.5, whiteSpace: "pre-line", minHeight: 48 }}>{product.subtitle || product.description}</p>
                <div style={{ marginTop: 14, color: colors.lime, fontSize: 20, fontWeight: 900 }}>{formatPrice(product.price)}</div>
                <button
                  onClick={() => add(product)}
                  style={{ width: "100%", marginTop: 18, background: "transparent", color: colors.lime, border: `1px solid ${colors.limeBorder}`, borderRadius: 14, padding: "14px 16px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}
                >
                  ADICIONAR
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside style={{ ...shellCard, padding: 24, position: "sticky", top: 20, background: colors.panelSoft }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ color: colors.muted, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>Carrinho</div>
              <h3 style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 800 }}>Resumo do pedido</h3>
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
              cart.map((item) => (
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
                    <div style={{ fontWeight: 700 }}>{formatPrice(item.price * item.qty)}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
            <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Nome" style={{ height: 50, borderRadius: 12, border: `1px solid ${colors.border}`, background: colors.panel, color: colors.text, padding: "0 14px", fontSize: 14, outline: "none" }} />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas do pedido, morada, horário de entrega, referência, etc." style={{ minHeight: 100, borderRadius: 12, border: `1px solid ${colors.border}`, background: colors.panel, color: colors.text, padding: 14, fontSize: 14, outline: "none", resize: "vertical" }} />
          </div>

          <div style={{ marginTop: 18, padding: 18, borderRadius: 18, background: colors.text, color: "#0f172a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748b" }}>
              <span>Total sem IVA</span>
              <span style={{ fontWeight: 700 }}>{formatPrice(totalWithoutVat)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 10 }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Total com IVA</span>
              <span style={{ fontSize: 32, fontWeight: 800 }}>{formatPrice(totalWithVat)}</span>
            </div>
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            <button onClick={sendWhatsApp} style={{ background: colors.lime, color: "#050505", border: "none", borderRadius: 14, padding: "16px 18px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Enviar pedido por WhatsApp</button>
            <button onClick={clearCart} style={{ background: "transparent", color: colors.text, border: `1px solid rgba(255,255,255,0.16)`, borderRadius: 14, padding: "14px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Limpar encomenda</button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <section id="contactos" style={{ marginTop: 42 }}>
      <div style={{ ...shellCard, padding: 34 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.95fr 0.7fr 0.9fr", gap: 26, alignItems: "start" }}>
          <div>
            <Brand />
            <p style={{ margin: "18px 0 0", color: colors.text, fontSize: 18, lineHeight: 1.8, maxWidth: 420 }}>
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
            <h3 style={{ margin: 0, color: colors.lime, fontSize: 30, fontWeight: 900, textTransform: "uppercase" }}>CONTACTOS</h3>
            <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.text, fontSize: 17 }}>
                <Phone size={18} color={colors.lime} />
                {PHONE_DISPLAY}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.text, fontSize: 17 }}>
                <MessageCircle size={18} color={colors.lime} />
                {PHONE_DISPLAY}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.text, fontSize: 17 }}>
                <Mail size={18} color={colors.lime} />
                geral@pack24.pt
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.text, fontSize: 17 }}>
                <MapPin size={18} color={colors.lime} />
                Costa da Caparica e Almada
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ margin: 0, color: colors.lime, fontSize: 30, fontWeight: 900, textTransform: "uppercase" }}>PÁGINAS</h3>
            <div style={{ display: "grid", gap: 14, marginTop: 20, fontSize: 17, color: colors.text }}>
              <div>Início</div>
              <div>Catálogo</div>
              <div>Contacto</div>
            </div>
          </div>

          <div>
            <h3 style={{ margin: 0, color: colors.lime, fontSize: 30, fontWeight: 900, textTransform: "uppercase" }}>SIGA-NOS</h3>
            <p style={{ margin: "20px 0 0", color: colors.text, fontSize: 17, lineHeight: 1.7 }}>
              Acompanhe as novidades e promoções no Instagram.
            </p>
            <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, border: `1px solid ${colors.limeBorder}`, color: colors.lime, fontWeight: 800 }}>
              <span style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${colors.lime}`, display: "inline-block" }} />
              @pack24.pt
            </div>
          </div>
        </div>
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
      <div style={{ maxWidth: 1560, margin: "0 auto", padding: 18 }}>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {currentPage === "inicio" ? (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <InfoStrip />
          </>
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

        <FooterSection />

        <footer style={{ textAlign: "center", color: colors.muted, fontSize: 15, padding: "28px 8px 8px", borderTop: `1px solid ${colors.border}`, marginTop: 28 }}>
          © 2026 pack24.pt – Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}

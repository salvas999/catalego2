import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Coca-Cola", price: 13.5, img: "/images/cocacola.png" },
  { id: 2, name: "Coca-Cola Zero", price: 13.5, img: "/images/cocacola-zero.png" },
  { id: 3, name: "Nestea Limão", price: 14.5, img: "/images/nestea.png" },
  { id: 4, name: "Guaraná", price: 14.5, img: "/images/guarana.png" },
  { id: 5, name: "Fanta", price: 13.15, img: "/images/fanta.png" },
  { id: 6, name: "7Up", price: 13.15, img: "/images/7up.png" },
  { id: 7, name: "Revo", price: 12, img: "/images/revo.png" },
];

const IVA = 1.23;
const PHONE = "351933499207";

export default function App() {
  const [cart, setCart] = useState([]);

  const add = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
  const totalIVA = total * IVA;

  const sendWhatsApp = () => {
    if (cart.length === 0) return;

    let msg = "Olá, quero fazer uma encomenda:%0A%0A";

    cart.forEach((p) => {
      msg += `• ${p.name} x${p.qty} - €${(p.price * p.qty).toFixed(2)} sem IVA / €${(p.price * p.qty * IVA).toFixed(2)} com IVA%0A`;
    });

    msg += `%0ATotal: €${total.toFixed(2)} sem IVA / €${totalIVA.toFixed(2)} com IVA`;

    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20, background: "#f5f5f5" }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Pedido Direto</h1>

      <div style={{ display: "flex", gap: 20 }}>
        
        <div style={{ flex: 3, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{ background: "white", padding: 15, borderRadius: 15 }}>
              <img src={p.img} style={{ height: 120, objectFit: "contain", display: "block", margin: "auto" }} />
              <h3>{p.name}</h3>
              <p>€{p.price} (sem IVA)</p>
              <p>€{(p.price * IVA).toFixed(2)} (com IVA)</p>

              <button
                onClick={() => add(p)}
                style={{
                  marginTop: 10,
                  width: "100%",
                  padding: 10,
                  borderRadius: 10,
                  background: "black",
                  color: "white",
                  border: "none"
                }}
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, background: "black", color: "white", padding: 20, borderRadius: 15 }}>
          <h2>Carrinho</h2>

          {cart.map((p) => (
            <div key={p.id}>{p.name} x{p.qty}</div>
          ))}

          <hr />

          <p>Total sem IVA: €{total.toFixed(2)}</p>
          <p>Total com IVA: €{totalIVA.toFixed(2)}</p>

          <button
            onClick={sendWhatsApp}
            style={{
              marginTop: 20,
              width: "100%",
              padding: 15,
              borderRadius: 10,
              background: "#25D366",
              color: "white",
              border: "none",
              fontWeight: "bold"
            }}
          >
            Enviar para WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}
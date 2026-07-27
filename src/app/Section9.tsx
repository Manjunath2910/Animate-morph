import crossborder from "@/imports/sec9/crossborder.png";
import sendmoney from "@/imports/sec9/sendmoney.png";

// ─── Section 9 — Cross-border finance + Send Money Globally (exact images) ────
export default function Section9() {
  const img: React.CSSProperties = { width: "100%", height: "auto", display: "block" };
  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2", overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <img src={crossborder} alt="Cross-border finance built for growing businesses" style={img} />
        <img src={sendmoney} alt="Send Money Globally" style={img} />
      </div>
    </section>
  );
}

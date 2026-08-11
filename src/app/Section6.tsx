import cards from "@/imports/section6/cards.png";

// ─── Section 6 — "One card. Every country you call home." ─────────────────────
const PLUM = "#3F0831";
const CREAM = "#FFFBF2";
const font = "'Plus Jakarta Sans', sans-serif";

export default function Section6() {
  return (
    <section style={{ width: "100%", height: 1024, backgroundColor: CREAM, display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", textAlign: "center", boxSizing: "border-box" }}>
        <div
          style={{
            display: "inline-block", background: "#FFF3D8", border: "1.5px solid #DAC491",
            borderRadius: 999, padding: "9px 26px", marginBottom: 20,
            fontFamily: font, fontWeight: 600, fontSize: 17, letterSpacing: "0.06em", color: PLUM,
          }}
        >
          COMING SOON
        </div>
        <h2
          style={{
            fontFamily: font, fontWeight: 700, fontSize: 48, lineHeight: 1.2,
            color: PLUM, margin: 0,
          }}
        >
          One card. Every country you call home.
        </h2>
        <p
          style={{
            fontFamily: font, fontWeight: 500, fontSize: 18, color: PLUM,
            opacity: 0.85, margin: "12px 0 0 0",
          }}
        >
          We brings everything together so you can send, spend, save, and grow
        </p>
      </div>

      {/* Three-card row — spans the full 1440 section width (cream side margins are baked
          into the image, matching the section background). */}
      <div style={{ width: "100%", margin: "24px auto 0" }}>
        <img src={cards} alt="Spend anywhere, Smarter currency conversion, Everyday payments" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </section>
  );
}

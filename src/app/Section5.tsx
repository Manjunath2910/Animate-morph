import cards from "@/imports/section5/cards.png";

// ─── Section 5 — "Everything your money needs. One simple platform." ──────────
const PLUM = "#3F0831";
const CREAM = "#FFFBF2";
const font = "'Plus Jakarta Sans', sans-serif";

export default function Section5() {
  return (
    <section style={{ width: "100%", height: 1024, backgroundColor: CREAM, display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1188, margin: "0 auto", padding: "0 24px", textAlign: "center", boxSizing: "border-box" }}>
        <h2
          style={{
            fontFamily: font, fontWeight: 700, fontSize: 48, lineHeight: 1.2,
            color: PLUM, margin: 0, whiteSpace: "pre-line",
          }}
        >
          {"Everything your money needs.\nOne simple platform."}
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

      {/* Three-card row — the image spans the full 1440 section width (it already has the
          cream side margins baked in, matching the section background). */}
      <div style={{ width: "100%", margin: "36px auto 0" }}>
        <img src={cards} alt="Send, Bank, Spend" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </section>
  );
}

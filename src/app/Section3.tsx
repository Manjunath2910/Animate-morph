// ─── Section 3 — "Why thousands are choosing Zolt" ────────────────────────────
// Exact Figma values:
//   Heading  : Plus Jakarta Sans 700, 48px, line-height 124%, colour #3F0831, centred
//   Card title: "GC North Sans" ExtraBold(800), 36px, line-height 126%, +2% tracking, UPPERCASE, #3F0831
//   Cards    : bg #F8EFE7 (sides) / #F4E1D2 (middle), radius 15, padding 32/28, 372×450, space-between
const PLUM = "#3F0831";
const MAGENTA = "#750558";
const CREAM = "#FFFBF2";
const HEAD_FONT = "'Plus Jakarta Sans', sans-serif";
// "GC North Sans" is the brand display font (not a free web font) — falls back to Plus Jakarta.
const TITLE_FONT = "'GC North Sans', 'GC North Sans Display', 'Plus Jakarta Sans', sans-serif";

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <path d="M12 3 L21 8 L3 8 Z" fill="#fff" />
      <rect x="5" y="9.2" width="2" height="6.6" fill="#fff" rx="0.4" />
      <rect x="9" y="9.2" width="2" height="6.6" fill="#fff" rx="0.4" />
      <rect x="13" y="9.2" width="2" height="6.6" fill="#fff" rx="0.4" />
      <rect x="17" y="9.2" width="2" height="6.6" fill="#fff" rx="0.4" />
      <rect x="3.5" y="16.6" width="17" height="2" fill="#fff" rx="0.6" />
    </svg>
  );
}

function IconCircle() {
  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: "50%", backgroundColor: MAGENTA,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}
    >
      <BankIcon />
    </div>
  );
}

function Card({ bg, title, footer }: { bg: string; title: string; footer: React.ReactNode }) {
  return (
    <div
      style={{
        flex: 1, backgroundColor: bg, borderRadius: 15, padding: "32px 28px",
        minHeight: 450, display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}
    >
      <div>
        <IconCircle />
        <h3
          style={{
            fontFamily: TITLE_FONT, fontWeight: 800, fontSize: 36, lineHeight: 1.26,
            textTransform: "uppercase", color: PLUM, margin: "40px 0 0 0",
            letterSpacing: "0.02em", whiteSpace: "pre-line",
          }}
        >
          {title}
        </h3>
      </div>
      <div>{footer}</div>
    </div>
  );
}

export default function Section3() {
  return (
    <section style={{ width: "100%", backgroundColor: CREAM }}>
      {/* Heading + cards */}
      <div style={{ maxWidth: 1188, margin: "0 auto", padding: "74px 24px 64px", boxSizing: "border-box" }}>
        <h2
          style={{
            fontFamily: HEAD_FONT, fontWeight: 700, fontSize: 48, lineHeight: 1.24,
            color: PLUM, textAlign: "center", margin: 0,
          }}
        >
          Why thousands are choosing Zolt
        </h2>
        <p
          style={{
            fontFamily: HEAD_FONT, fontWeight: 500, fontSize: 18, color: PLUM,
            textAlign: "center", margin: "8px 0 0 0", opacity: 0.85,
          }}
        >
          Because your financial life shouldn't be split across five different apps.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 44, alignItems: "stretch" }}>
          <Card
            bg="#F8EFE7"
            title={"One Account.\nOne App.\nOne Financial Experience."}
            footer={
              <span style={{ fontFamily: HEAD_FONT, fontWeight: 500, fontSize: 15, color: PLUM, opacity: 0.75 }}>
                Beyond just transfers.
              </span>
            }
          />
          <Card
            bg="#F4E1D2"
            title={"Start by Sending Money."}
            footer={
              <button
                style={{
                  backgroundColor: MAGENTA, color: "#fff", border: "none", borderRadius: 999,
                  padding: "15px 34px", fontFamily: HEAD_FONT, fontWeight: 700, fontSize: 16,
                  cursor: "pointer", width: "100%",
                }}
              >
                Get Started
              </button>
            }
          />
          <Card
            bg="#F8EFE7"
            title={"No Hidden Fees.\nNo Confusing Rates."}
            footer={
              <span style={{ fontFamily: HEAD_FONT, fontWeight: 500, fontSize: 15, color: PLUM, opacity: 0.75 }}>
                Know exactly what you're paying for.
              </span>
            }
          />
        </div>
      </div>

      {/* Magenta stats band */}
      <div style={{ width: "100%", backgroundColor: MAGENTA }}>
        <div
          style={{
            maxWidth: 1100, margin: "0 auto", padding: "44px 30px", boxSizing: "border-box",
            display: "flex", justifyContent: "space-around", textAlign: "center", color: "#fff",
          }}
        >
          {[
            { n: "$500M+", l: "USD Transferred" },
            { n: "344k+", l: "Transactions" },
            { n: "40,000", l: "Happy Customers" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontFamily: TITLE_FONT, fontWeight: 800, fontSize: 46, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: HEAD_FONT, fontWeight: 500, fontSize: 16, marginTop: 10, opacity: 0.9 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

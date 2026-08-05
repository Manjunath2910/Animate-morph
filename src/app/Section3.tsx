import bankCircle from "@/imports/section3/bank_circle.png";

// ─── Section 3 — "Why thousands are choosing Zolt" ────────────────────────────
// Exact Figma values:
//   Heading  : Plus Jakarta Sans 700, 48px, line-height 124%, colour #3F0831, centred
//   Card title: "GC North Sans" ExtraBold(800), 36px, line-height 126%, +2% tracking, UPPERCASE, #3F0831
//   Cards    : bg #F8EFE7 (sides) / #F4E1D2 (middle), radius 15, padding 32/28, 372×450, space-between
const PLUM = "#3F0831";
const MAGENTA = "#750558";
const CREAM = "#FFFBF2";
const HEAD_FONT = "'Plus Jakarta Sans', sans-serif";
// "GC North Sans Display" is the brand display font (proprietary — not on the site or the live
// zoltmoney.com). Montserrat 800 is the closest free match (and the font the live site uses).
// GC North Sans stays first so it wins automatically if the real font file is ever added.
const TITLE_FONT = "'GC North Sans Display', 'GC North Sans', 'Montserrat', 'Plus Jakarta Sans', sans-serif";

// Exact icon supplied from the Figma design (magenta circle + white bank icon, 68px).
function IconCircle() {
  return (
    <img src={bankCircle} alt="" width={68} height={68} style={{ display: "block", flexShrink: 0 }} />
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
              <span style={{ fontFamily: HEAD_FONT, fontWeight: 500, fontSize: 16, color: "#000000" }}>
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
                  backgroundColor: MAGENTA, color: "#FFF2FE", border: "none", borderRadius: 999,
                  padding: "11.44px 22.88px", fontFamily: HEAD_FONT, fontWeight: 600, fontSize: 22.88,
                  lineHeight: 1.3, cursor: "pointer", width: "100%",
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
              <span style={{ fontFamily: HEAD_FONT, fontWeight: 500, fontSize: 16, color: "#000000" }}>
                Know exactly what you're paying for.
              </span>
            }
          />
        </div>
      </div>

      {/* Magenta stats band */}
      <div style={{ width: "100%", backgroundColor: MAGENTA }}>
        {/* Figma: full-width band, 41px top/bottom + 150px side padding, 3 stats centered with 94px gap */}
        <div
          style={{
            padding: "41px 150px", boxSizing: "border-box",
            display: "flex", justifyContent: "center", gap: 94, textAlign: "center", color: "#fff",
          }}
        >
          {[
            { n: "$500M+", l: "USD Transferred" },
            { n: "344k+", l: "Transactions" },
            { n: "40,000", l: "Happy Customers" },
          ].map((s) => (
            <div key={s.l}>
              {/* Figma: Plus Jakarta Sans 700 / 44px / #F6E9F3 */}
              <div style={{ fontFamily: HEAD_FONT, fontWeight: 700, fontSize: 44, lineHeight: 1, color: "#F6E9F3" }}>{s.n}</div>
              {/* Figma: Plus Jakarta Sans 400 / 16px / #F6E9F3 */}
              <div style={{ fontFamily: HEAD_FONT, fontWeight: 400, fontSize: 16, marginTop: 12, color: "#F6E9F3" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

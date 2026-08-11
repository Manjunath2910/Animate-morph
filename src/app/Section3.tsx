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

// Feature-card icons — Phosphor (regular/outline), white on a 68px magenta circle,
// matching the Figma design: bank, paper-plane (send), eye.
const ICON_SEND = "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z";
const ICON_EYE = "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z";

function CircleIcon({ path }: { path: string }) {
  return (
    <div style={{ width: 68, height: 68, borderRadius: 999, background: MAGENTA, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="34" height="34" viewBox="0 0 256 256" fill="#fff"><path d={path} /></svg>
    </div>
  );
}

function Card({ bg, icon, title, footer }: { bg: string; icon: React.ReactNode; title: string; footer: React.ReactNode }) {
  return (
    <div
      style={{
        flex: 1, backgroundColor: bg, borderRadius: 15, padding: "32px 28px",
        height: 583, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}
    >
      {icon}
        <h3
          style={{
            fontFamily: TITLE_FONT, fontWeight: 800, fontSize: 36, lineHeight: 1.26,
            textTransform: "uppercase", color: PLUM, margin: 0,
            letterSpacing: "0.02em", whiteSpace: "pre-line",
          }}
        >
          {title}
        </h3>
      <div>{footer}</div>
    </div>
  );
}

export default function Section3() {
  return (
    <section style={{ width: "100%", height: 1024, backgroundColor: CREAM, display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
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
            icon={<img src={bankCircle} alt="" width={68} height={68} style={{ display: "block", flexShrink: 0 }} />}
            title={"One Account.\nOne App.\nOne Financial Experience."}
            footer={
              <span style={{ fontFamily: HEAD_FONT, fontWeight: 500, fontSize: 16, color: "#000000" }}>
                Beyond just transfers.
              </span>
            }
          />
          <Card
            bg="#F4E1D2"
            icon={<CircleIcon path={ICON_SEND} />}
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
            icon={<CircleIcon path={ICON_EYE} />}
            title={"No Hidden Fees.\nNo Confusing Rates."}
            footer={
              <span style={{ fontFamily: HEAD_FONT, fontWeight: 500, fontSize: 16, color: "#000000" }}>
                Know exactly what you're paying for.
              </span>
            }
          />
        </div>
      </div>
    </section>
  );
}

import lockPhoto from "@/imports/sec7/lock_photo.png";
import easePhoto from "@/imports/sec7/ease_photo_s.png";
import easeCard from "@/imports/sec7/ease_card.png";

// ─── Section 7 — Zolt Lock / Zolt Ease 2×2 grid (Figma 887-1995) ───────────────
// Black section, 1440×776, split into four 720×388 quadrants:
//   [ hat photo + rate card ] [ ZOLT LOCK text ]
//   [ ZOLT EASE text ]        [ airport photo + schedule card ]
// Followed by the full-width "More coming soon" band.
const FONT = "'Plus Jakarta Sans', sans-serif";
const TITLE_FONT = "'GC North Sans Display', 'GC North Sans', 'Montserrat', 'Plus Jakarta Sans', sans-serif";
const PLUM = "#3F0831";
const MAGENTA = "#750558";

function Btn() {
  return (
    <button
      style={{
        marginTop: 32, alignSelf: "flex-start", background: MAGENTA, color: "#FFF2FE",
        border: "none", borderRadius: 999, padding: "13px 64px", fontFamily: FONT,
        fontWeight: 600, fontSize: 22, cursor: "pointer",
      }}
    >
      Get Started
    </button>
  );
}

function TextCell({ padLeft, title, sub, desc }: { padLeft: number; title: string; sub: string; desc: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 40px 0 ${padLeft}px`, boxSizing: "border-box" }}>
      <div style={{ fontFamily: TITLE_FONT, fontWeight: 800, fontSize: 36, textTransform: "uppercase", color: PLUM, letterSpacing: "0.02em", lineHeight: 1 }}>
        {title}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 27, color: PLUM, marginTop: 36, lineHeight: 1.15, whiteSpace: "pre-line" }}>
        {sub}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 17, color: PLUM, opacity: 0.72, marginTop: 16 }}>
        {desc}
      </div>
      <Btn />
    </div>
  );
}

export default function Section7() {
  const photo: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2" }}>
      {/* Frame 2147240696 — exact 1440×1024 (header + grid) */}
      <div style={{ width: 1440, height: 1024, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      {/* Header — COMING SOON pill + heading + subtitle */}
      <div style={{ flex: 1, textAlign: "center", padding: "32px 0 0" }}>
        <div
          style={{
            display: "inline-block", background: "#FFF3D8", border: "1.5px solid #DAC491",
            borderRadius: 999, padding: "9px 26px",
            fontFamily: FONT, fontWeight: 600, fontSize: 17, letterSpacing: "0.06em", color: PLUM,
          }}
        >
          COMING SOON
        </div>
        <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 48, lineHeight: 1.2, color: PLUM, margin: "20px 0 0" }}>
          Beyond money transfers
        </h2>
        <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 18, color: PLUM, opacity: 0.85, margin: "10px 0 0" }}>
          Powerful tools to save time, money, and effort.
        </p>
      </div>

      <div
        style={{
          width: 1440, height: 776, flexShrink: 0, backgroundColor: "#FFFBF2",
          display: "grid", gridTemplateColumns: "720px 720px", gridTemplateRows: "388px 388px",
        }}
      >
        {/* TL — hat photo with rate card (baked into image) */}
        <div style={{ overflow: "hidden" }}>
          <img src={lockPhoto} alt="Zolt Lock — lock in a great exchange rate" style={photo} />
        </div>

        {/* TR — ZOLT LOCK text */}
        <TextCell
          padLeft={66}
          title="Zolt Lock"
          sub={"Found a great exchange rate?\nLock it in today."}
          desc="Transfer later with confidence."
        />

        {/* BL — ZOLT EASE text */}
        <TextCell
          padLeft={150}
          title="Zolt Ease"
          sub="Steady, automated saving."
          desc="Automate recurring currency conversions."
        />

        {/* BR — airport photo with schedule-payment card */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={easePhoto} alt="Zolt Ease — steady, automated saving" style={photo} />
          <img src={easeCard} alt="" style={{ position: "absolute", left: 194, top: 69, width: 209, height: "auto", display: "block" }} />
        </div>
      </div>
      </div>
    </section>
  );
}

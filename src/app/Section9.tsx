import businessPhoto from "@/imports/sec9/business_photo2.png";
import businessBadge from "@/imports/sec9/business_badge.png";
import flagIn from "@/imports/sec9/flag_in.png";
import flagVn from "@/imports/sec9/flag_vn.png";
import flagPh from "@/imports/sec9/flag_ph.png";
import seoLinks from "@/imports/sec9/seo_links.png";

const PLUM = "#3F0831";
const DESTS: [string, string][] = [
  [flagIn, "Send Money to India"],
  [flagVn, "Send Money to Vietnam"],
  [flagPh, "Send Money to Philippinesh"],
];

// ─── Section 9 — "ZoltMoney Business" (Figma 887-2084) ─────────────────────────
// Black section (1440×1024) with a centered rounded photo card. Overlaid on the
// photo: the ZoltMoney Business badge (top-right), a white heading and an
// "Explore Solutions" button (bottom-left).
const FONT = "'Plus Jakarta Sans', sans-serif";
const MAGENTA = "#750558";

export default function Section9() {
  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2" }}>
      <div style={{ position: "relative", width: 1440, height: 1024, margin: "0 auto", backgroundColor: "#FFFBF2" }}>
        {/* Rounded photo card */}
        <div style={{ position: "absolute", left: 150, top: 180, width: 1140, height: 664, borderRadius: 24, overflow: "hidden" }}>
          <img src={businessPhoto} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

          {/* ZoltMoney Business badge — top-right */}
          <img src={businessBadge} alt="ZoltMoney Business" style={{ position: "absolute", top: 46, right: 26, width: 232, height: "auto", display: "block" }} />

          {/* Heading + button — bottom-left */}
          <div style={{ position: "absolute", left: 54, bottom: 42 }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 52, lineHeight: 1.06, color: "#ffffff", margin: 0 }}>
              Cross-border<br />built for growing<br />businesses.
            </h2>
            <button
              style={{
                marginTop: 26, background: MAGENTA, color: "#FFF2FE", border: "none", borderRadius: 999,
                padding: "16px 40px", fontFamily: FONT, fontWeight: 600, fontSize: 22, cursor: "pointer",
              }}
            >
              Explore Solutions
            </button>
          </div>
        </div>
      </div>

      {/* Send Money Globally (Figma 887-2124) — its own 1440×1024 frame */}
      <div style={{ width: "100%", height: 1024, display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 0 0", textAlign: "center", boxSizing: "border-box", overflow: "hidden" }}>
        <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 48, color: PLUM, margin: 0 }}>
          Send Money Globally
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 56 }}>
          {DESTS.map(([flag, label]) => (
            <div key={label} style={{ width: 190, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src={flag} alt="" style={{ width: 56, height: 56, borderRadius: 12, display: "block" }} />
              <a href="#" style={{ marginTop: 20, fontFamily: FONT, fontWeight: 500, fontSize: 18, color: PLUM, textDecoration: "underline", lineHeight: 1.35, whiteSpace: label.includes("Philippines") ? "normal" : "nowrap" }}>
                {label}
              </a>
            </div>
          ))}
        </div>
        {/* SEO link columns — pinned to the bottom of the 1024 frame */}
        <img src={seoLinks} alt="" style={{ width: "100%", maxWidth: 1440, height: "auto", display: "block", marginTop: "auto" }} />
      </div>
    </section>
  );
}

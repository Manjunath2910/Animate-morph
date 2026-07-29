import { useState, useEffect } from "react";
import couple from "@/imports/section2/couple.png";
import flagUs from "@/imports/section2/flag_us.png";
import flagIn from "@/imports/section2/flag_india.png";
import remitlyLogo from "@/imports/section2/remitly_logo.png";
import zLogo from "@/imports/section2/z_logo.png";
import googleG from "@/imports/section2/google_g.png";

// ─── Section 2 — "See exactly what your family receives" ──────────────────────
// Exact Figma spec (Frame 2147227800): 1200×688 rounded card (radius 24), the
// couple photo fills the whole card, a light translucent feature bar sits along
// the bottom, the headline overlays bottom-left, and a floating white calculator
// card (499×512, left 671, top 50) sits over the right side.
const CARD_W = 1200;
const CARD_H = 688;
const FONT = "'Plus Jakarta Sans', sans-serif";
const BOX = "#F8EFE7";
const PLUM = "#750558";
const GREY = "#8a8a8a";
const ICON = "#C81E78"; // magenta feature-bar icons
const REMITLY_MARGIN = 0.1228;

const WISE_RATE_URL = "http://localhost:3001/rate?source=USD&target=INR";
const FALLBACK_RATE_URL = "https://open.er-api.com/v6/latest/USD";
const pickRate = (d: any): number | undefined => d?.rate ?? d?.[0]?.rate ?? d?.rates?.INR;

const Chevron = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 9l6 6 6-6" stroke="#2f2f2f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckBadge = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M12 1.7l2.5 1.9 3.1-.2 .9 3 2.5 1.9-1 3 1 3-2.5 1.9-.9 3-3.1-.2L12 22.3l-2.5-1.9-3.1.2-.9-3L3 15.7l1-3-1-3 2.5-1.9.9-3 3.1.2z" fill="#CF7FB8" />
    <path d="M8.6 12l2.2 2.2 4.4-4.7" stroke="#fff" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Plane = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Feature-bar icons — magenta line icons on the light translucent bar.
const featIcon: React.CSSProperties = { flexShrink: 0 };
const IconDelivery = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={featIcon}>
    <circle cx="12" cy="13" r="8" stroke={ICON} strokeWidth="1.7" />
    <path d="M12 13V9M12 13l3 2M9 2h6" stroke={ICON} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const IconRate = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={featIcon}>
    <path d="M4 8h13l-3-3M20 16H7l3 3" stroke={ICON} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconFees = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={featIcon}>
    <rect x="4" y="3" width="16" height="18" rx="2" stroke={ICON} strokeWidth="1.7" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke={ICON} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export default function Section2() {
  const [sendText, setSendText] = useState("0.00");
  const [rate, setRate] = useState(94.55);

  const amount = parseFloat(sendText.replace(/[^0-9.]/g, "")) || 0;
  const receive = amount * rate;
  const remitlyDiff = receive * REMITLY_MARGIN;

  useEffect(() => {
    let ok = true;
    const apply = (d: any) => { const r = pickRate(d); if (ok && typeof r === "number") { setRate(r); return true; } return false; };
    const load = () =>
      fetch(WISE_RATE_URL).then((r) => r.json()).then((d) => { if (!apply(d)) throw new Error("no wise"); })
        .catch(() => fetch(FALLBACK_RATE_URL).then((r) => r.json()).then(apply).catch(() => {}));
    load();
    const id = window.setInterval(load, 60 * 1000);
    return () => { ok = false; window.clearInterval(id); };
  }, []);

  // Western grouping to match the design (e.g. 187,806.84), not Indian lakhs.
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const boxStyle: React.CSSProperties = {
    width: "100%", height: 72, background: BOX, borderRadius: 36,
    display: "flex", alignItems: "center", padding: "0 22px 0 22px", boxSizing: "border-box",
  };
  const ccy: React.CSSProperties = { fontFamily: FONT, fontSize: 23, fontWeight: 500, color: "#3a3a3a", marginLeft: 10, marginRight: 4 };
  const numStyle: React.CSSProperties = {
    marginLeft: "auto", fontFamily: FONT, fontWeight: 500, fontSize: 29, color: "#454545",
    textAlign: "right", background: "transparent", border: "none", outline: "none", width: 220, overflow: "hidden", whiteSpace: "nowrap",
  };
  const flag: React.CSSProperties = { width: 40, height: 40, borderRadius: "50%", flexShrink: 0, objectFit: "cover" };
  const labelStyle: React.CSSProperties = { fontFamily: FONT, fontSize: 18, fontWeight: 400, color: GREY, marginBottom: 8 };
  const feat: React.CSSProperties = { display: "flex", alignItems: "center", gap: 11, color: "#2f2f2f", fontFamily: FONT, fontSize: 19, fontWeight: 500, whiteSpace: "nowrap" };

  return (
    <section style={{ backgroundColor: "#FFFBF2", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "80px 24px", boxSizing: "border-box" }}>
      <div style={{ position: "relative", width: CARD_W, height: CARD_H, borderRadius: 24, overflow: "hidden" }}>
        {/* Photo fills the entire card */}
        <img src={couple} alt="A couple checking their phone" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 22%" }} />

        {/* Headline on the photo */}
        <div style={{ position: "absolute", left: 30, top: 442, fontFamily: FONT, fontSize: 42, fontWeight: 700, lineHeight: 1.18, color: "#fff", letterSpacing: "-0.01em" }}>
          See exactly what your<br />family receives.
        </div>

        {/* Feature bar — light translucent (#FFFFFF 55%) */}
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 83, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderTop: "1px solid rgba(255,255,255,0.55)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", boxSizing: "border-box" }}>
          <div style={feat}><IconDelivery />Delivery estimate up front</div>
          <div style={feat}><IconRate />Real exchange rate, shown live</div>
          <div style={feat}><IconFees />Fees and total before you confirm</div>
        </div>

        {/* Floating white calculator card */}
        <div style={{ position: "absolute", left: 671, top: 50, width: 499, height: 512, background: "#fff", border: "1px solid #FBEFEF", borderRadius: 23, boxShadow: "0 24px 60px rgba(50,30,45,0.14)", padding: "23px 26px", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
          {/* Rate pill */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#FFF2FE", border: "1.5px solid #E7B9DB", borderRadius: 999, padding: "5px 14px", fontFamily: FONT, fontSize: 15, fontWeight: 600, color: PLUM, whiteSpace: "nowrap" }}>
              <img src={zLogo} alt="" style={{ height: 21 }} />
              <span>1&nbsp;USD&nbsp;=</span>
              <img src={googleG} alt="" style={{ height: 17 }} />
              <span style={{ fontWeight: 700 }}>{rate.toFixed(2)}</span>
              <span>INR&nbsp;+&nbsp;1INR</span>
              <CheckBadge />
            </div>
          </div>

          {/* You Send */}
          <div style={{ marginTop: 24 }}>
            <div style={labelStyle}>You Send</div>
            <div style={boxStyle}>
              <img src={flagUs} alt="USD" style={flag} />
              <span style={ccy}>USD</span>
              <Chevron />
              <input
                value={sendText}
                inputMode="decimal"
                aria-label="You send amount in USD"
                onFocus={(e) => e.target.select()}
                onBlur={() => setSendText(fmt(amount))}
                onChange={(e) => setSendText(e.target.value)}
                style={{ ...numStyle, caretColor: PLUM, cursor: "text" }}
              />
            </div>
          </div>

          {/* You Receive */}
          <div style={{ marginTop: 18 }}>
            <div style={labelStyle}>You Receive</div>
            <div style={boxStyle}>
              <img src={flagIn} alt="INR" style={flag} />
              <span style={ccy}>INR</span>
              <Chevron />
              <div style={numStyle}>{fmt(receive)}</div>
            </div>
          </div>

          {/* Remitly comparison */}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: FONT, fontSize: 18, whiteSpace: "nowrap" }}>
            <span style={{ color: GREY }}>With us</span>
            <span style={{ color: PLUM, fontWeight: 700 }}>INR {Math.round(remitlyDiff).toLocaleString("en-US")}</span>
            <span style={{ color: GREY }}>more than</span>
            <img src={remitlyLogo} alt="Remitly" style={{ height: 26 }} />
          </div>

          {/* Send Money */}
          <button style={{ marginTop: 18, width: "100%", height: 72, background: PLUM, border: "none", borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 13, color: "#fff", fontFamily: FONT, fontSize: 24, fontWeight: 700, cursor: "pointer" }}>
            <Plane /> Send Money
          </button>
        </div>
      </div>
    </section>
  );
}

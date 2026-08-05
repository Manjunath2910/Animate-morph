import { useState, useEffect } from "react";
import couple from "@/imports/section2/couple_v2.png";
import flagUs from "@/imports/section2/flag_us.png";
import flagIn from "@/imports/section2/flag_india.png";
import remitlyLogo from "@/imports/section2/remitly_logo.png";
import zLogo from "@/imports/section2/z_logo.png";
import googleG from "@/imports/section2/google_g.png";

// ─── Section 2 — "See exactly what your family receives" ──────────────────────
const CARD_W = 1200;
const CARD_H = 688;
const FONT = "'Plus Jakarta Sans', sans-serif";
const BOX = "#F8EFE7";
const PLUM = "#750558";
const GREY = "#8a8a8a";
const ICON = "#C81E78";
const REMITLY_MARGIN = 0.1228;

// Currency options (same as the live site) and their round flags.
const FLAGS: Record<string, string> = {
  USD: flagUs, EUR: "https://flagcdn.com/w80/eu.png", GBP: "https://flagcdn.com/w80/gb.png",
  INR: flagIn, PHP: "https://flagcdn.com/w80/ph.png", VND: "https://flagcdn.com/w80/vn.png",
};
const SEND_CURS = ["USD", "EUR", "GBP"];
const RECV_CURS = ["INR", "PHP", "VND"];

const Chevron = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 9l6 6 6-6" stroke="#2f2f2f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: "auto", flexShrink: 0 }}>
    <path d="M5 12l5 5 9-11" stroke={PLUM} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
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
  const [sendCur, setSendCur] = useState("USD");
  const [recvCur, setRecvCur] = useState("INR");
  const [drop, setDrop] = useState<null | "send" | "recv">(null);

  const amount = parseFloat(sendText.replace(/[^0-9.]/g, "")) || 0;
  const receive = amount * rate;
  const remitlyDiff = receive * REMITLY_MARGIN;

  // Live rate for the currently-selected pair (re-fetches when either currency changes).
  useEffect(() => {
    let ok = true;
    const apply = (r: any) => { if (ok && typeof r === "number") setRate(r); };
    const load = () =>
      fetch(`http://localhost:3001/rate?source=${sendCur}&target=${recvCur}`).then((r) => r.json())
        .then((d) => { const r = d?.rate ?? d?.[0]?.rate; if (typeof r === "number") apply(r); else throw new Error("no wise"); })
        .catch(() => fetch(`https://open.er-api.com/v6/latest/${sendCur}`).then((r) => r.json())
          .then((d) => apply(d?.rates?.[recvCur])).catch(() => {}));
    load();
    const id = window.setInterval(load, 60 * 1000);
    return () => { ok = false; window.clearInterval(id); };
  }, [sendCur, recvCur]);

  // Close any open dropdown when clicking elsewhere.
  useEffect(() => {
    if (!drop) return;
    const h = () => setDrop(null);
    window.addEventListener("click", h);
    return () => window.removeEventListener("click", h);
  }, [drop]);

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
  const selector: React.CSSProperties = { display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" };
  const dropStyle: React.CSSProperties = {
    position: "absolute", top: "calc(100% + 6px)", left: 0, minWidth: 176, background: "#fff",
    border: "1px solid #EFE3EC", borderRadius: 16, boxShadow: "0 16px 40px rgba(50,30,45,0.18)", padding: 6, zIndex: 30,
  };
  const optStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", borderRadius: 10, cursor: "pointer",
    fontFamily: FONT, fontSize: 20, fontWeight: 500, color: "#3a3a3a", whiteSpace: "nowrap",
  };
  const flagSm: React.CSSProperties = { width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0 };

  const menu = (which: "send" | "recv", curs: string[], selected: string, choose: (c: string) => void) => (
    drop === which && (
      <div style={dropStyle} onClick={(e) => e.stopPropagation()}>
        {curs.map((c) => (
          <div key={c} onClick={() => { choose(c); setDrop(null); }} style={optStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FBF1F8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <img src={FLAGS[c]} alt="" style={flagSm} />
            <span>{c}</span>
            {c === selected && <Check />}
          </div>
        ))}
      </div>
    )
  );

  // Exact Figma spec (Frame 2147227846): 1440×866 section, white background (design uses
  // #FFFDF7 but the user wants pure white), with the 1200×688 card centered — 120px side
  // margins and 89px top/bottom.
  return (
    <section style={{ backgroundColor: "#ffffff", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "89px 0", boxSizing: "border-box" }}>
      <div style={{ position: "relative", width: CARD_W, height: CARD_H, borderRadius: 24, overflow: "hidden" }}>
        {/* Photo positioned exactly as the Figma image fill (Scale: Crop):
            1467.04×745.22 at left -231.13, top -65.24 inside the 1200×688 card. */}
        <img src={couple} alt="A couple checking their phone" style={{ position: "absolute", width: 1467.04, height: 745.22, left: -231.13, top: -65.24, maxWidth: "none", objectFit: "cover", display: "block" }} />
        {/* Dark gradient at the bottom for headline legibility (matches the Figma gradient overlay). */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,1,8,0) 46%, rgba(10,1,8,0.55) 100%)", pointerEvents: "none" }} />

        {/* Headline on the photo */}
        <div style={{ position: "absolute", left: 30, top: 442, fontFamily: FONT, fontSize: 42, fontWeight: 700, lineHeight: 1.18, color: "#fff", letterSpacing: "-0.01em" }}>
          See exactly what your<br />family receives.
        </div>

        {/* Feature bar */}
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
              <span>1&nbsp;{sendCur}&nbsp;=</span>
              <img src={googleG} alt="" style={{ height: 17 }} />
              <span style={{ fontWeight: 700 }}>{rate.toFixed(2)}</span>
              <span>{recvCur}&nbsp;+&nbsp;1{recvCur}</span>
              <CheckBadge />
            </div>
          </div>

          {/* You Send */}
          <div style={{ marginTop: 24, position: "relative" }}>
            <div style={labelStyle}>You Send</div>
            <div style={boxStyle}>
              <div style={selector} onClick={(e) => { e.stopPropagation(); setDrop(drop === "send" ? null : "send"); }}>
                <img src={FLAGS[sendCur]} alt={sendCur} style={flag} />
                <span style={ccy}>{sendCur}</span>
                <Chevron />
              </div>
              <input
                value={sendText}
                inputMode="decimal"
                aria-label="You send amount"
                onFocus={(e) => e.target.select()}
                onBlur={() => setSendText(fmt(amount))}
                onChange={(e) => setSendText(e.target.value)}
                style={{ ...numStyle, caretColor: PLUM, cursor: "text" }}
              />
            </div>
            {menu("send", SEND_CURS, sendCur, setSendCur)}
          </div>

          {/* You Receive */}
          <div style={{ marginTop: 18, position: "relative" }}>
            <div style={labelStyle}>You Receive</div>
            <div style={boxStyle}>
              <div style={selector} onClick={(e) => { e.stopPropagation(); setDrop(drop === "recv" ? null : "recv"); }}>
                <img src={FLAGS[recvCur]} alt={recvCur} style={flag} />
                <span style={ccy}>{recvCur}</span>
                <Chevron />
              </div>
              <div style={numStyle}>{fmt(receive)}</div>
            </div>
            {menu("recv", RECV_CURS, recvCur, setRecvCur)}
          </div>

          {/* Remitly comparison */}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: FONT, fontSize: 18, whiteSpace: "nowrap" }}>
            <span style={{ color: GREY }}>With us</span>
            <span style={{ color: PLUM, fontWeight: 700 }}>{recvCur} {Math.round(remitlyDiff).toLocaleString("en-US")}</span>
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

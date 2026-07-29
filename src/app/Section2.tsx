import { useState, useEffect } from "react";
import cardImg from "@/imports/section2/card_clean.png";
import remitlyLogo from "@/imports/section2/remitly_logo.png";

// How much more the recipient gets with Zolt vs Remitly, as a fraction of the received amount
// (matches the design's ₹23,060 more on a $2,000 send).
const REMITLY_MARGIN = 0.1228;

// ─── Section 2 — "See exactly what your family receives" ───────────────────────
// The card artwork stays exactly as designed; we overlay a live, editable converter
// on the "You Send" / "You Receive" boxes. The input-box fill is #F8EFE7, so the
// overlays blend seamlessly. USD→INR uses a live mid-market rate (the "real exchange
// rate" the card advertises); falls back to the design rate if the request fails.
// USD→INR rate: try your Wise proxy first (server/wise-proxy.mjs holds the key and returns
// Wise's daily rate), then fall back to a free live mid-market feed if the proxy isn't running.
const WISE_RATE_URL = "http://localhost:3001/rate?source=USD&target=INR";
const FALLBACK_RATE_URL = "https://open.er-api.com/v6/latest/USD";
const pickRate = (d: any): number | undefined => d?.rate ?? d?.[0]?.rate ?? d?.rates?.INR;

const CARD_W = 1200;
const CARD_H = 688; // 1200 * (1376/2400)
const BOX_FILL = "#F8EFE7";
const NUM_FONT = "'Plus Jakarta Sans', sans-serif";

export default function Section2() {
  const [sendText, setSendText] = useState("0.00");
  const [rate, setRate] = useState(94.55); // design fallback until the live rate loads

  const amount = parseFloat(sendText.replace(/[^0-9.]/g, "")) || 0;
  const receive = amount * rate;
  const remitlyDiff = receive * REMITLY_MARGIN; // how much more than Remitly, for this amount

  useEffect(() => {
    let ok = true;
    const apply = (d: any) => {
      const r = pickRate(d);
      if (ok && typeof r === "number") { setRate(r); return true; }
      return false;
    };
    // Wise proxy first; if it's not running / errors, use the free live feed.
    const load = () => {
      fetch(WISE_RATE_URL)
        .then((r) => r.json())
        .then((d) => { if (!apply(d)) throw new Error("no wise rate"); })
        .catch(() => fetch(FALLBACK_RATE_URL).then((r) => r.json()).then(apply).catch(() => {}));
    };
    load();
    // Keep it current: refresh hourly, and whenever the tab is re-opened/focused.
    const id = window.setInterval(load, 60 * 60 * 1000);
    const onVisible = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { ok = false; window.clearInterval(id); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // px positions inside the fixed 1200×688 card. Each overlay reproduces the RIGHT
  // portion of its input box exactly — full box height, matching rounded right corners,
  // right edge on the box edge — so it blends with no visible seam.
  // Numbers are erased from the base image, so these overlays are just transparent
  // text sitting inside the (empty) boxes — no cream cover, nothing to poke out.
  const numBase: React.CSSProperties = {
    position: "absolute",
    left: 690,
    width: 465, // right edge at 1155 — clears the box's pill-shaped right curve so the number sits comfortably inside
    height: 80,
    background: "transparent",
    color: "#454545",
    fontFamily: NUM_FONT,
    fontWeight: 500,
    fontSize: 28,
    lineHeight: "80px",
    textAlign: "center",
    boxSizing: "border-box",
    overflow: "hidden",         // never let a long value spill past the box
    whiteSpace: "nowrap",
  };

  return (
    <section
      style={{
        backgroundColor: "#FFFBF2",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "56px 24px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative", width: CARD_W, height: CARD_H, margin: "0 auto" }}>
        <img
          src={cardImg}
          alt="See exactly what your family receives"
          style={{ width: CARD_W, height: CARD_H, borderRadius: 40, display: "block" }}
        />

        {/* You Send — editable */}
        <input
          value={sendText}
          inputMode="decimal"
          aria-label="You send amount in USD"
          onFocus={(e) => e.target.select()}
          onBlur={() => setSendText(fmt(parseFloat(sendText.replace(/[^0-9.]/g, "")) || 0))}
          onChange={(e) => setSendText(e.target.value)}
          style={{ ...numBase, top: 173, border: "none", outline: "none", caretColor: "#750558", cursor: "text" }}
        />

        {/* You Receive — computed */}
        <div style={{ ...numBase, top: 313 }}>
          {fmt(receive)}
        </div>

        {/* Live rate inside the pill (covers the static "94.55") */}
        <div
          style={{
            position: "absolute",
            left: 905,
            top: 74,
            width: 68,
            height: 32.5,
            background: "#FFF2FE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#750558",
            fontFamily: NUM_FONT,
            fontWeight: 700,
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          {rate.toFixed(2)}
        </div>

        {/* "With us INR ___ more than Remitly" — live (the number scales with the amount) */}
        <div
          style={{
            position: "absolute",
            left: 671,
            width: 505,
            top: 410,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            fontFamily: NUM_FONT,
            fontSize: 22,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "#838383" }}>With us</span>
          <span style={{ color: "#750558", fontWeight: 700 }}>INR {Math.round(remitlyDiff).toLocaleString("en-IN")}</span>
          <span style={{ color: "#838383" }}>more than</span>
          <img src={remitlyLogo} alt="Remitly" style={{ height: 30, display: "block" }} />
        </div>
      </div>
    </section>
  );
}

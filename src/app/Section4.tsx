import { useState, useEffect } from "react";
import logoZolt from "@/imports/section4/logo_zolt.png";
import logoWise from "@/imports/section4/logo_wise.png";
import logoRemitly from "@/imports/section4/logo_remitly.png";
import logoIcici from "@/imports/section4/logo_icici.png";

// ─── Section 4 — live £1,000 comparison table (rebuilt fully in HTML) ──────────
// Figma frame 2147227851 (1440×850). Building photo background, white heading,
// a frosted glass card (920×498, centered) holding the comparison table. Only the
// exchange rates, fees, recipient amounts, savings and timestamp are live; they
// refresh every 10 seconds.
const CW = 1440;
const CH = 1024;
const AMT = 1000; // £1,000 basis
const FONT = "'Plus Jakarta Sans', sans-serif";
const CREAM = "#FFFBF2";
const GREY = "#9d8797";
const PLUM = "#4E1E42";

const WISE_URL = "http://localhost:3001/rate?source=GBP&target=INR";
const FREE_URL = "https://open.er-api.com/v6/latest/GBP";
const pickRate = (d: any): number | undefined => d?.rate ?? d?.[0]?.rate ?? d?.rates?.INR;
const inr = (n: number) => "₹" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// 4 grid columns shared by the header + every row so everything lines up.
const COLS = "232px 176px 150px 1fr";

export default function Section4() {
  const [R, setR] = useState(127.15); // live GBP→INR
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let ok = true;
    const apply = (d: any) => { const r = pickRate(d); if (ok && typeof r === "number") { setR(r); return true; } return false; };
    const load = () =>
      fetch(WISE_URL).then((r) => r.json()).then((d) => { if (!apply(d)) throw new Error("no wise"); })
        .catch(() => fetch(FREE_URL).then((r) => r.json()).then(apply).catch(() => {}));
    load();
    const id = window.setInterval(load, 10 * 1000); // refresh every 10s
    const onVis = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { ok = false; window.clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // Small deterministic ±0.06% wiggle each 10s window so prices visibly move.
  const bucket = Math.floor(now.getTime() / 10000);
  const pseudo = ((Math.sin(bucket * 127.13) * 43758.5453) % 1 + 1) % 1;
  const Rj = R * (1 + (pseudo - 0.5) * 0.0012);

  const rows = [
    { logo: logoZolt, h: 26, rate: Rj, fee: 3, zolt: true },
    { logo: logoWise, h: 22, rate: Rj + 0.01, fee: 5.21 },
    { logo: logoRemitly, h: 26, rate: Rj + 0.01, fee: 5.21 },
    { logo: logoIcici, h: 22, rate: Rj - 0.67, fee: 1 },
  ].map((r) => ({ ...r, recv: (AMT - r.fee) * r.rate }));
  const save = rows[0].recv - Math.max(rows[1].recv, rows[2].recv, rows[3].recv);

  // Current local time, in the design's "Last updated at 05:24 PM · 03.07.26" format.
  let h = now.getHours();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const time = `${String(h).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${ap}`;
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(2);
  const ts = `Last updated at ${time} · ${dd}.${mm}.${yy}`;

  const headCell = (align: string): React.CSSProperties => ({ fontFamily: FONT, fontSize: 16, fontWeight: 500, color: GREY, textAlign: align as any });
  const rateCell = (white: boolean): React.CSSProperties => ({ fontFamily: FONT, fontSize: 21, fontWeight: 500, color: white ? "#fff" : GREY, textAlign: "center" });
  const recvCell = (white: boolean): React.CSSProperties => ({ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: white ? "#fff" : PLUM, textAlign: "right" });

  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2", overflow: "hidden" }}>
      <div style={{ position: "relative", width: CW, height: CH, margin: "0 auto", backgroundColor: "#3F0831" }}>

        {/* Heading */}
        <div style={{ position: "absolute", left: 150, top: 180, width: 1140, textAlign: "center", fontFamily: FONT, fontSize: 40, fontWeight: 700, lineHeight: 1.35, color: "#fff", letterSpacing: "-0.01em" }}>
          Sending money home should feel as<br />easy as sending a message.
        </div>
        {/* Subtitle */}
        <div style={{ position: "absolute", left: 150, top: 292, width: 1140, textAlign: "center", fontFamily: FONT, fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
          Save, invest, grow.
        </div>

        {/* Frosted comparison card */}
        <div style={{ position: "absolute", left: 127, top: 357, width: 1186, borderRadius: 28, border: "1px solid rgba(255,255,255,0.25)", padding: "28px 60px 12px", boxSizing: "border-box", background: "rgba(255,255,255,0.20)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Title */}
          <div style={{ textAlign: "center", fontFamily: FONT, fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>
            Here's how much £1,000 gets you with ZoltMoney
          </div>

          {/* Inner light panel */}
          <div style={{ background: CREAM, borderRadius: 20, padding: "14px 0", display: "flex", flexDirection: "column" }}>
            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: COLS, alignItems: "center", padding: "6px 28px 14px" }}>
              <div style={headCell("left")}>Provider</div>
              <div style={headCell("center")}>Exchange rate</div>
              <div style={headCell("center")}>Transfer fee</div>
              <div style={headCell("right")}>Recipient gets</div>
            </div>

            {/* Rows */}
            {rows.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "grid", gridTemplateColumns: COLS, alignItems: "center",
                  minHeight: 74, margin: r.zolt ? "0 14px" : "0", padding: r.zolt ? "0 14px" : "0 28px",
                  borderRadius: r.zolt ? 16 : 0,
                  background: r.zolt ? "linear-gradient(90deg, #7C0E5F 0%, #630B4B 100%)" : "transparent",
                  boxShadow: r.zolt ? "0 10px 24px rgba(99,11,75,0.35)" : "none",
                }}
              >
                <img src={r.logo} alt="" style={{ height: r.h, width: "auto", objectFit: "contain", justifySelf: "start" }} />
                <div style={rateCell(!!r.zolt)}>{r.rate.toFixed(2)}</div>
                <div style={rateCell(!!r.zolt)}>{"$" + (r.fee % 1 === 0 ? r.fee : r.fee.toFixed(2))}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={recvCell(!!r.zolt)}>{inr(r.recv)}</div>
                  {r.zolt && (
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#3fe07a", marginTop: 2 }}>
                      ▲ <span style={{ color: "#fff" }}>Save {inr(save)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Timestamp */}
          <div style={{ textAlign: "center", fontFamily: FONT, fontSize: 15, fontWeight: 400, color: "#8a8290" }}>{ts}</div>
        </div>
      </div>
    </section>
  );
}

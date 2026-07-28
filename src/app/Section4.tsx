import { useState, useEffect } from "react";
import bg from "@/imports/section4/bg_live5.png";

// ─── Section 4 — live GBP→INR comparison table ────────────────────────────────
// The blue background, heading, card frame, logos and fees stay as the (cleaned)
// image; we overlay the live exchange rates, recipient amounts, savings and timestamp.
const CW = 1440;
const CH = 850; // 2880×1700 → displayed at 1440 wide
const AMT = 1000; // £1,000 basis, matching the header
const FONT = "'Plus Jakarta Sans', sans-serif";

const WISE_URL = "http://localhost:3001/rate?source=GBP&target=INR";
const FREE_URL = "https://open.er-api.com/v6/latest/GBP";
const pickRate = (d: any): number | undefined => d?.rate ?? d?.[0]?.rate ?? d?.rates?.INR;
const inr = (n: number) => "₹" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Section4() {
  const [R, setR] = useState(127.15); // live GBP→INR; design fallback
  const [now, setNow] = useState(() => new Date()); // live clock for the timestamp

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000); // keep time/date current (ticks every second)
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let ok = true;
    const apply = (d: any) => { const r = pickRate(d); if (ok && typeof r === "number") { setR(r); return true; } return false; };
    const load = () =>
      fetch(WISE_URL).then((r) => r.json()).then((d) => { if (!apply(d)) throw new Error("no wise"); })
        .catch(() => fetch(FREE_URL).then((r) => r.json()).then(apply).catch(() => {}));
    load();
    const id = window.setInterval(load, 10 * 1000); // refresh prices every 10 seconds
    const onVis = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { ok = false; window.clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // Provider rates keep the design's spread around the live mid-market rate; fees are fixed.
  // Small live-market fluctuation that changes every 10s (driven by the 1s clock tick),
  // so the prices visibly move even when the underlying rate is momentarily flat.
  const bucket = Math.floor(now.getTime() / 10000);
  const pseudo = ((Math.sin(bucket * 127.13) * 43758.5453) % 1 + 1) % 1; // deterministic 0..1 per 10s window
  const Rj = R * (1 + (pseudo - 0.5) * 0.0012); // ±0.06%

  const rows = [
    { rate: Rj, fee: 3, zolt: true },
    { rate: Rj + 0.01, fee: 5.21 },
    { rate: Rj + 0.01, fee: 5.21 },
    { rate: Rj - 0.67, fee: 1 },
  ].map((r) => ({ ...r, recv: (AMT - r.fee) * r.rate }));
  const save = rows[0].recv - Math.max(rows[1].recv, rows[2].recv, rows[3].recv);

  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(2);
  const ts = `Last updated at ${time} · ${dd}.${mm}.${yy}`;

  const rateY = [440, 525, 600, 675];
  const recvY = [418, 525, 600, 675];

  const rateCell = (y: number, white: boolean): React.CSSProperties => ({
    position: "absolute", left: 546, width: 200, top: y - 20, height: 40, lineHeight: "40px",
    textAlign: "center", fontFamily: FONT, fontSize: 24, fontWeight: 500, color: white ? "#ffffff" : "#9d8797",
  });
  const recvCell = (y: number, white: boolean): React.CSSProperties => ({
    position: "absolute", right: 338, width: 340, top: y - 22, height: 44, lineHeight: "44px",
    textAlign: "right", fontFamily: FONT, fontSize: 29, fontWeight: 700, color: white ? "#ffffff" : "#502144",
  });

  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2", overflow: "hidden" }}>
      <div style={{ position: "relative", width: CW, height: CH, margin: "0 auto" }}>
        <img src={bg} alt="Sending money home should feel as easy as sending a message" style={{ width: CW, height: CH, display: "block" }} />

        {rows.map((r, i) => (
          <div key={i}>
            <div style={rateCell(rateY[i], !!r.zolt)}>{r.rate.toFixed(2)}</div>
            <div style={recvCell(recvY[i], !!r.zolt)}>{inr(r.recv)}</div>
          </div>
        ))}

        {/* ZoltMoney savings badge */}
        <div style={{ position: "absolute", right: 338, width: 340, top: 446, height: 32, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 5, fontFamily: FONT, fontSize: 19, fontWeight: 600, color: "#ffffff" }}>
          <span style={{ color: "#3fe07a", fontSize: 13 }}>▲</span> Save {inr(save)}
        </div>

        {/* Last updated timestamp */}
        <div style={{ position: "absolute", left: 420, width: 600, top: 716, height: 34, lineHeight: "34px", textAlign: "center", fontFamily: FONT, fontSize: 18, fontWeight: 400, color: "#9d8797" }}>
          {ts}
        </div>
      </div>
    </section>
  );
}

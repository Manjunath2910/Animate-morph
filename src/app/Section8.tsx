import { useRef } from "react";
import avatar from "@/imports/sec8/avatar_saket.png";
import flagIn from "@/imports/sec8/flag_round.png";
import quoteIcon from "@/imports/sec8/quote_icon.png";

// ─── Section 8 — "Built for people building lives across borders" (Figma 887-1105) ──
// Centered heading + subtext, a scrollable row of review cards, prev/next arrows,
// and a full-width magenta stats bar ($500M+ / 344k+ / 40,000).
const FONT = "'Plus Jakarta Sans', sans-serif";
const PLUM = "#3F0831";      // heading
const MAGENTA = "#750558";   // accents + stats bar
const GREY = "#5A5560";      // body / location

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

const ReviewCard = () => (
  <div style={{ width: 316, flexShrink: 0, background: "#fff", borderRadius: 16, padding: 24, boxShadow: "2px 3px 8px rgba(63,8,49,0.08)", boxSizing: "border-box", display: "flex", flexDirection: "column", height: 437 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <img src={quoteIcon} alt="" style={{ width: 36, height: 36, display: "block", flexShrink: 0 }} />
      <img src={flagIn} alt="India" style={{ width: 32, height: 32, borderRadius: 999, objectFit: "cover", flexShrink: 0 }} />
    </div>
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", margin: "18px 0" }}>
      <p style={{ fontFamily: FONT, fontSize: 20, fontWeight: 400, lineHeight: 1.3, color: PLUM, textAlign: "left", margin: 0, width: "100%" }}>
        I've used ZoltMoney for a long time &amp; uninstalled all other remittance apps. Best rates, fast transfers—my go-to!
      </p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <img src={avatar} alt="" style={{ width: 44, height: 44, borderRadius: 999, display: "block" }} />
      <div>
        <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 700, color: MAGENTA, lineHeight: 1.2 }}>Saket Verma</div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: GREY, marginTop: 2 }}>Berlin, Germany</div>
      </div>
    </div>
  </div>
);

export default function Section8() {
  const track = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => track.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section style={{ width: "100%", height: 1024, backgroundColor: "#FFFBF2", overflow: "hidden", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "84px 0 0" }}>
        <h2 style={{ fontFamily: FONT, fontSize: 48, fontWeight: 700, color: PLUM, textAlign: "center", lineHeight: 1.24, margin: 0 }}>
          Built for people building lives<br />across borders.
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 18, fontWeight: 500, color: MAGENTA, textAlign: "center", margin: "12px 0 0" }}>
          Save, invest, grow.
        </p>

        {/* Review cards — horizontal carousel */}
        <div ref={track} style={{ display: "flex", gap: 24, marginTop: 48, padding: "8px 150px", boxSizing: "border-box", overflowX: "auto", scrollbarWidth: "none" }}>
          {Array.from({ length: 6 }).map((_, i) => <ReviewCard key={i} />)}
        </div>

        {/* Prev / next arrows */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 36 }}>
          <button onClick={() => scrollBy(-340)} aria-label="Previous" style={{ width: 70, height: 53, borderRadius: 999, background: "rgba(117,5,88,0.40)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Chevron dir="left" /></button>
          <button onClick={() => scrollBy(340)} aria-label="Next" style={{ width: 70, height: 53, borderRadius: 999, background: MAGENTA, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Chevron dir="right" /></button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: MAGENTA, marginTop: "auto", padding: "42px 0", display: "flex", justifyContent: "center", gap: 130 }}>
        {[["$500M+", "USD Transferred"], ["344k+", "Transactions"], ["40,000", "Happy Customers"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: FONT, fontSize: 44, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{n}</div>
            <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.85)", marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

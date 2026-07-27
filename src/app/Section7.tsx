import lock from "@/imports/sec7/lock.png";
import ease from "@/imports/sec7/ease.png";
import more from "@/imports/sec7/more.png";

// ─── Section 7 — Zolt Lock / Zolt Ease + "More coming soon" band ──────────────
export default function Section7() {
  const img: React.CSSProperties = { width: "100%", height: "auto", display: "block" };
  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <img src={lock} alt="Zolt Lock — lock in a great exchange rate" style={img} />
        <img src={ease} alt="Zolt Ease — steady, automated saving" style={img} />
      </div>

      {/* "More coming soon" dark band */}
      <div style={{ maxWidth: 1440, margin: "24px auto 0" }}>
        <img src={more} alt="More coming soon — save, invest, grow" style={img} />
      </div>
    </section>
  );
}

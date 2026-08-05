import lock from "@/imports/sec7/lock.png";
import ease from "@/imports/sec7/ease.png";
import more from "@/imports/sec7/more.png";

// ─── Section 7 — Zolt Lock / Zolt Ease + "More coming soon" band ──────────────
// The three images each span the full 1440 width. Zolt Lock and Zolt Ease carry
// their own cream (#FFFBF2) padding baked in, and "More coming soon" is a full
// dark band — so they stack contiguously with no extra gap or padding. Section
// height = the exact sum of the three image heights (540 + 524 + 554 design px).
export default function Section7() {
  const img: React.CSSProperties = { width: "100%", height: "auto", display: "block" };
  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2" }}>
      <img src={lock} alt="Zolt Lock — lock in a great exchange rate" style={img} />
      <img src={ease} alt="Zolt Ease — steady, automated saving" style={img} />
      <img src={more} alt="More coming soon — save, invest, grow" style={img} />
    </section>
  );
}

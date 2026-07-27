import testimonials from "@/imports/sec8/testimonials.png";

// ─── Section 8 — "Built for people building lives across borders" (reviews) ────
export default function Section8() {
  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2", overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <img
          src={testimonials}
          alt="Built for people building lives across borders — customer reviews"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </section>
  );
}

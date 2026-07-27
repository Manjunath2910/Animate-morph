import cardImg from "@/imports/section2/card.png";

// ─── Section 2 — "See exactly what your family receives" ───────────────────────
// Cream band with the transfer-preview card centred inside it.
export default function Section2() {
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
      <img
        src={cardImg}
        alt="See exactly what your family receives"
        style={{
          width: "100%",
          maxWidth: 1200,
          height: "auto",
          borderRadius: 40,
          display: "block",
          margin: "0 auto",
        }}
      />
    </section>
  );
}

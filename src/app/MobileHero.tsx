import family from "@/imports/Component9-1/dbdee0f2309cac6408de59ba3d77502698a7be1b.png";

// Portrait hero shown only on phones. Keeps the family photo + headline readable
// and full-height, instead of the desktop 1440×800 hero shrunk to a thin strip.
export default function MobileHero() {
  const font = "'Plus Jakarta Sans', sans-serif";
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: 560,
        overflow: "hidden",
        backgroundColor: "#3F0831",
      }}
    >
      <img
        src={family}
        alt="A family together at home"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%" }}
      />
      {/* Legibility gradient — dark at top (nav) and bottom (headline) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(20,2,15,0.55) 0%, rgba(20,2,15,0) 22%, rgba(20,2,15,0) 46%, rgba(20,2,15,0.88) 100%)",
        }}
      />

      {/* Top nav */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
        }}
      >
        <span style={{ fontFamily: font, fontWeight: 800, fontSize: 22, color: "#fff", letterSpacing: "-0.01em" }}>
          Zolt<span style={{ fontWeight: 500 }}>Money</span>
        </span>
        <a
          href="#"
          style={{
            fontFamily: font,
            fontWeight: 700,
            fontSize: 13,
            color: "#3F0831",
            background: "#fff",
            borderRadius: 999,
            padding: "9px 16px",
            textDecoration: "none",
          }}
        >
          Download App
        </a>
      </div>

      {/* Headline */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 22px 40px" }}>
        <h1
          style={{
            fontFamily: font,
            fontWeight: 800,
            fontSize: "clamp(28px, 8.5vw, 40px)",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "#F7E4F0",
            margin: 0,
          }}
        >
          One financial home for life across borders.
        </h1>
      </div>
    </section>
  );
}

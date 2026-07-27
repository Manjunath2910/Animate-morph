import footer from "@/imports/sec10/footer.png";

// ─── Section 10 — Footer (SEO links + magenta ZoltMoney footer) ───────────────
export default function Section10() {
  return (
    <footer style={{ width: "100%", backgroundColor: "#FFFBF2" }}>
      <img
        src={footer}
        alt="ZoltMoney — send money to India, Vietnam, and the Philippines"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </footer>
  );
}

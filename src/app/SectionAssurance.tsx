import subwayPhoto from "@/imports/sec_assurance/subway_photo.png";
import notification from "@/imports/sec_assurance/assurance_notification.png";
import shieldIcon from "@/imports/sec_assurance/shield_icon.png";
import iconThumb from "@/imports/sec_assurance/card_thumb.png";
import iconSwap from "@/imports/sec_assurance/card_swap.png";
import iconSend from "@/imports/sec_assurance/card_send.png";

// ─── Zolt Assurance — "Transfer with Confidence" (Figma 887-1850) ──────────────
// Cream section (1440×1024, 150px padding): shield heading + subtitle, a large rounded
// photo with a notification overlay on the left, three cream feature cards on the right.
const FONT = "'Plus Jakarta Sans', sans-serif";
const CW = 1440;
const CH = 1024;
const PLUM = "#3F0831";      // card titles
const GREY = "#5A5560";      // subtitle + card descriptions
const CARD_BG = "#F5E9DE";   // feature-card background

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div style={{ height: 172, background: CARD_BG, borderRadius: 24, display: "flex", alignItems: "center", gap: 20, padding: "0 32px", boxSizing: "border-box" }}>
      <img src={icon} alt="" style={{ width: 64, height: 64, display: "block", flexShrink: 0 }} />
      <div>
        <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: PLUM, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 400, color: GREY, lineHeight: 1.35, marginTop: 8 }}>{desc}</div>
      </div>
    </div>
  );
}

export default function SectionAssurance() {
  return (
    <section style={{ width: "100%", backgroundColor: "#FFFBF2", overflow: "hidden" }}>
      <div style={{ position: "relative", width: CW, height: CH, margin: "0 auto", backgroundColor: "#FFFBF2" }}>

        {/* Header — shield + heading + subtitle, centered */}
        <div style={{ position: "absolute", top: 150, left: 0, width: CW, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={shieldIcon} alt="" style={{ width: 74, height: "auto", display: "block" }} />
            <span style={{ fontFamily: FONT, fontSize: 54, fontWeight: 700, color: "#3F0831", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
              Zolt Assurance, Transfer with Confidence
            </span>
          </div>
          <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 400, color: "#3F0831" }}>
            If transfer is delayed, we'll automatically refund your fee. No claims or paperwork required.
          </div>
        </div>

        {/* Left photo */}
        <div style={{ position: "absolute", left: 150, top: 300, width: 647, height: 565, borderRadius: 28, overflow: "hidden" }}>
          <img src={subwayPhoto} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        {/* Notification overlay */}
        <img src={notification} alt="" style={{ position: "absolute", left: 300, top: 693, width: 342, height: "auto", display: "block" }} />

        {/* Right feature cards */}
        <div style={{ position: "absolute", left: 841, top: 300, width: 449, display: "flex", flexDirection: "column", gap: 24 }}>
          <FeatureCard icon={iconThumb} title="Guaranteed Transfers" desc="On-time delivery for every eligible transfer." />
          <FeatureCard icon={iconSwap} title="No-Hassle Refunds" desc="Delayed delivery triggers an automatic fee refund." />
          <FeatureCard icon={iconSend} title="Send Stress-Free" desc="Transfer money confidently with built-in delivery assurance." />
        </div>

      </div>
    </section>
  );
}

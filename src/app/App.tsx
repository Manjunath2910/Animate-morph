import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import SectionAssurance from "./SectionAssurance";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8";
import Section9 from "./Section9";
import Section10 from "./Section10";
import ScaleToFit from "./ScaleToFit";
import svgPaths from "@/imports/Component9-1/svg-crb9wqbx6m";
import zoltLogoWhite from "@/imports/section2/zoltmoney_white.png";
import imgImage1 from "@/imports/Component9-1/family_v2.png";
import img746B3D from "@/imports/Component9-1/f61e95b32e992ccbeeb665551752926ac4f715e6.png";
import imgElderly from "@/imports/Component9-1/frame3_v2.png";

type Slide = 1 | 2 | 3;

const DUR = 0.72;
const EASE: [number, number, number, number] = [0.45, 0, 0.15, 1]; // smooth glide (gentle ease-in-out)
const T = { duration: DUR, ease: EASE };

// ─── Panda Money logo ─────────────────────────────────────────────────────────
// The imported component wraps each SVG group in `display:contents` divs, which
// means they are invisible to layout — all three SVG containers are positioned
// FLAT relative to the 165.394×39.602 root, not nested.
// Verification: each inset resolves to exactly the viewBox dimensions:
//   Top row   → 74.114 × 23.277 ≈ viewBox 74.1274 × 23.2742
//   Bottom row → 44.515 × 17.577 ≈ viewBox 44.5108 × 17.5755
//   Icon mark  → 24.239 × 24.230 ≈ viewBox 24.2531 × 24.2281
function PandaLogo({ fill }: { fill: string }) {
  return (
    <div style={{ height: 39.602, overflow: "hidden", position: "relative", width: 165.394, flexShrink: 0 }}>
      {/* Top row: MBNZO wordmark */}
      <div className="absolute" style={{ top: "24.81%", right: "3.79%", bottom: "16.42%", left: "51.4%" }}>
        <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74.1274 23.2742">
          <path d={svgPaths.p1832d100} fill={fill} />
          <path d={svgPaths.p8b3ccf2}  fill={fill} />
          <path d={svgPaths.p5a09d00}  fill={fill} />
          <path d={svgPaths.pf095f00}  fill={fill} />
          <path d={svgPaths.p10c6a780} fill={fill} />
        </svg>
      </div>
      {/* Bottom row: supplementary mark */}
      <div className="absolute" style={{ top: "24.81%", right: "50.62%", bottom: "30.81%", left: "22.47%" }}>
        <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.5108 17.5755">
          <path d={svgPaths.p295ea700} fill={fill} />
          <path d={svgPaths.p2d00f80}  fill={fill} />
          <path d={svgPaths.p1bc91f00} fill={fill} />
          <path d={svgPaths.p1e4e7b80} fill={fill} />
        </svg>
      </div>
      {/* Left icon mark */}
      <div className="absolute" style={{ top: "16.41%", right: "81.55%", bottom: "22.41%", left: "3.79%" }}>
        <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.2531 24.2281">
          <path d={svgPaths.p2fd33900} fill={fill} />
          <path d={svgPaths.p1bd05b80} fill={fill} />
          <path d={svgPaths.p2aae1d40} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

// ─── Money label ──────────────────────────────────────────────────────────────
function MoneyLabel({ amount, label, visible, top = 441 }: { amount: string; label: string; visible: boolean; top?: number }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center text-white uppercase text-center pointer-events-none"
      style={{ left: "50%", width: 226, gap: 2 }}
      initial={false}
      animate={{ top, x: "-50%", opacity: visible ? 1 : 0 }}
      transition={{ duration: DUR, ease: EASE }}
    >
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "69.168px", lineHeight: "84.538px", whiteSpace: "nowrap" }}>
        {amount}
      </p>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "25.61px", lineHeight: "31.301px", whiteSpace: "nowrap" }}>
        {label}
      </p>
    </motion.div>
  );
}

// ─── Phone frame ─────────────────────────────────────────────────────────────
function PhoneFrame({
  left, leftStart, topTarget, visible, img, imgSize, imgOffset, notchTop, amount, label, amountVisible, amountTop, transition, height = 514.468,
}: {
  left: number; leftStart: number; topTarget: number; visible: boolean; img: string;
  imgSize: { w: number; h: number }; imgOffset: { l: number; t: number }; notchTop: number;
  amount: string; label: string; amountVisible: boolean; amountTop: number;
  transition: { duration: number; ease: [number, number, number, number] }; height?: number;
}) {
  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{ width: 387.985, height, borderTopLeftRadius: 44, borderTopRightRadius: 44, backgroundColor: "#717171", zIndex: 1 }}
      animate={{ left: visible ? left : leftStart, top: topTarget, opacity: visible ? 1 : 0, scale: visible ? 1 : 0.82 }}
      transition={transition}
    >
      <div className="absolute overflow-hidden pointer-events-none"
           style={{ width: imgSize.w, height: imgSize.h, left: imgOffset.l, top: imgOffset.t }}>
        <img alt="" src={img} className="absolute max-w-none"
             style={{ width: "99.97%", height: "99.95%", top: "0.03%", left: "0.01%" }} />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
      </div>
      {/* notch bar */}
      <div className="absolute bg-white"
           style={{ width: 92.204, height: 30.337, top: notchTop, left: "calc(50% + 2.01px)", transform: "translateX(-50%)", borderRadius: 55.736 }} />
      {/* amount */}
      <motion.div
        className="absolute flex flex-col items-center text-white uppercase text-center"
        style={{ top: amountTop, left: "50%", transform: "translateX(-50%)", width: 226, gap: 2 }}
        animate={{ opacity: amountVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "69.168px", lineHeight: "84.538px", whiteSpace: "nowrap" }}>{amount}</p>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "25.61px",  lineHeight: "31.301px", whiteSpace: "nowrap" }}>{label}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [slide, setSlide] = useState<Slide>(1);
  const [layout, setLayout] = useState({ scale: 1, ox: 0, oy: 0 });
  const [userZoom, setUserZoom] = useState(1);

  // Press + / - (or =) to zoom the whole page in and out; 0 resets. Applied as one scale on
  // the page wrapper, so every section scales together and stays perfectly aligned.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "+" || e.key === "=") { e.preventDefault(); setUserZoom((z) => Math.min(3, Math.round((z + 0.1) * 100) / 100)); }
      else if (e.key === "-" || e.key === "_") { e.preventDefault(); setUserZoom((z) => Math.max(0.3, Math.round((z - 0.1) * 100) / 100)); }
      else if (e.key === "0") { e.preventDefault(); setUserZoom(1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const calc = () => {
      const cw = document.documentElement.clientWidth || window.innerWidth;   // usable width (excludes the scrollbar) → no horizontal overflow
      // Render the whole page at a fixed 1000px wide (the 1440 design scaled to 1000). On screens
      // narrower than 1000px it scales down further to fit; wider screens centre it with margins.
      const s = Math.min(1000, cw) / 1440;
      setLayout({ scale: s, ox: 0, oy: 0 });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // One scroll = one frame, with the smooth morph the user approved. Each scroll notch
  // advances a single frame (1→2→3 going down, 3→2→1 going back up at the top), holding
  // the page in place until the frames are done; only then does the page scroll on to the
  // next section. The morph itself still plays over the smooth DUR glide.
  const prevSlide = useRef<Slide>(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<Slide>(1);
  const lockRef = useRef(false);
  useEffect(() => { slideRef.current = slide; }, [slide]);
  useEffect(() => {
    const LOCK_MS = DUR * 1000 + 150;   // one step per scroll: ignore extra scroll until the morph finishes
    const step = (dir: 1 | -1) => {
      if (lockRef.current) return false;
      const s = slideRef.current;
      const next = Math.min(3, Math.max(1, s + dir)) as Slide;
      if (next === s) return false;
      lockRef.current = true;
      setSlide(next);
      window.setTimeout(() => { lockRef.current = false; }, LOCK_MS);
      return true;
    };
    const onWheel = (e: WheelEvent) => {
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const s = slideRef.current;
      const atTop = window.scrollY <= 1;
      if (dir === 1 && s < 3) { e.preventDefault(); step(1); }              // scroll down → next frame, hold page
      else if (dir === -1 && s > 1 && atTop) { e.preventDefault(); step(-1); } // scroll up at top → previous frame
      // else: let the page scroll normally (down once on frame 3, up when already on frame 1)
    };
    // Touch: swipe up = next frame, swipe down = previous frame (same one-step behaviour).
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchY - e.touches[0].clientY;   // >0 => swipe up => forward
      if (Math.abs(dy) < 10) return;
      const s = slideRef.current;
      const atTop = window.scrollY <= 1;
      if (dy > 0 && s < 3) { e.preventDefault(); if (step(1)) touchY = e.touches[0].clientY; }
      else if (dy < 0 && s > 1 && atTop) { e.preventDefault(); if (step(-1)) touchY = e.touches[0].clientY; }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const isPurple = slide >= 3;

  // Mask fill is the cream page colour on every frame (Figma frame 3 / node 887-710
  // is cream #FFFBF2, not magenta) so the background stays consistent through the morph.
  const maskD    = slide <= 2 ? svgPaths.p32a00 : svgPaths.p3aa52400;
  const maskFill = "#FFFBF2";

  // All frame transitions use the same smooth, gentle glide so the motion feels continuous on scroll.
  const involvesHero = slide === 1 || prevSlide.current === 1;
  const T = { duration: involvesHero ? DUR : DUR * 1.25, ease: EASE };
  // Cards fan out only when arriving on frame 3; when leaving they disappear instantly (no reverse-shrink).
  const cardT = { duration: slide === 3 ? DUR * 1.25 : 0, ease: EASE };
  useEffect(() => { prevSlide.current = slide; }, [slide]);

  // Headline position: slides 3 & 4 move up to top
  const hlTop = slide <= 2 ? (slide === 1 ? 786 : 777) : 181.61;


  return (
    <>
    {/* Scale the whole 1440 design to the viewport width (transform-based, iOS-safe) so the
        hero and every section scale together and stay aligned on any screen including iPhone —
        the mobile hero is the same full desktop design, just scaled down like every other section. */}
    <ScaleToFit scale={layout.scale * userZoom}>
      <div
        ref={heroRef}
        className="overflow-hidden"
        style={{ position: "relative", width: 1440, height: 1024, backgroundColor: "#FFFBF2" }}
      >
      <div
        className="absolute overflow-hidden"
        style={{ width: 1440, height: 1024, left: 0, top: 0 }}
      >
        {/* ── Background — cream base (#FFFBF2, matches Figma) ── */}
        <div className="absolute inset-0" style={{ backgroundColor: "#FFFBF2" }} />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#750558",
            opacity: isPurple ? 1 : 0,
            transition: `opacity ${DUR}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          }}
        />

        {/* ── Family photo — fixed full-bleed 1440×1024 stage; the img animates its own crop.
            Frame 1: native full source (Figma 887-557). Frames 2/3: design BG 1719×1146 placed
            like node 887-599, zoomed to the family. The SVG mask forms the card windows. ── */}
        <div className="absolute overflow-hidden" style={{ width: 1440, height: 1024, left: 0, top: 0 }}>
          <motion.img alt="Family" src={imgImage1} className="absolute max-w-none"
               animate={{
                 // Frame 2: design BG (887-599). Frame 3 centre card: design image 66 (887-711),
                 // a wider, more zoomed-out crop of the same family.
                 width:  slide === 1 ? 1536 : slide === 2 ? 1719 : 1427.63,
                 height: slide === 1 ? 1024 : slide === 2 ? 1146 : 951.8,
                 left:   slide === 1 ? -48 : slide === 2 ? -133 : 6.19,
                 top:    slide === 1 ? 0 : slide === 2 ? 60 : 220,
               }}
               transition={T}
               style={{ display: "block" }} />
          <div className="absolute inset-0"
               style={{ background: "linear-gradient(to top, rgba(0,2,4,0.51) 0%, rgba(204,175,72,0) 94.883%)" }} />
        </div>

        {/* ── SVG Mask — Smart Animate path morph (1440×1024) ───────────────── */}
        <svg className="absolute pointer-events-none" preserveAspectRatio="none"
             viewBox="0 0 1440 1024" style={{ position: "absolute", left: -2, top: -2, width: 1444, height: 1028 }}>
          <motion.path
            initial={{ d: svgPaths.p32a00, opacity: 0, fill: "#ffffff" }}
            animate={{ d: maskD, opacity: slide === 1 ? 0 : 1, fill: maskFill }}
            transition={T}
          />
        </svg>

        {/* ── White pill — top notch of the centre family card (frame 3) ────── */}
        <motion.div
          className="absolute bg-white"
          style={{ width: 92.204, height: 30.337, top: 425, left: "50%", transform: "translateX(-50%)", borderRadius: 55.736 }}
          animate={{ opacity: isPurple ? 1 : 0 }}
          transition={T}
        />

        {/* ── Navigation — frosted pill bar (Figma node 887-558) ───────────────
            Container: 1010.79×71, centered, top 44, radius 16, padding 13.4,
            bg rgba(33,33,33,0.20) + backdrop blur. Left group: logo + Personal
            pill + Business. Right group: About Us · About Us · Download App pill. */}
        <div
          className="absolute"
          style={{
            top: 44, left: "50%", transform: "translateX(-50%)",
            width: 1010.79, height: 71, borderRadius: 16, padding: "0 13.4px",
            boxSizing: "border-box", backgroundColor: "rgba(33,33,33,0.20)",
            backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            zIndex: 10, fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {/* Left group — logo + Personal/Business segmented toggle */}
          <div className="flex items-center" style={{ gap: 12 }}>
            <img src={zoltLogoWhite} alt="ZoltMoney" style={{ height: 27, width: "auto", display: "block" }} />
            {/* Toggle track (Figma Frame 82: bg #000000 @16%, radius 10, gap 4) */}
            <div className="flex items-center" style={{ gap: 4, background: "rgba(0,0,0,0.16)", borderRadius: 16 }}>
              <div style={{ padding: "8px 20px", borderRadius: 16, background: "#ffffff", color: "#750558", fontWeight: 600, fontSize: 16, lineHeight: 1 }}>Personal</div>
              <div style={{ padding: "8px 20px 8px 12px", color: "#FFFBF2", fontWeight: 500, fontSize: 16, lineHeight: 1 }}>Business</div>
            </div>
          </div>
          {/* Right group */}
          <div className="flex items-center" style={{ gap: 26 }}>
            <span style={{ color: "#ffffff", fontWeight: 500, fontSize: 16 }}>About Us</span>
            <span style={{ color: "#ffffff", fontWeight: 500, fontSize: 16 }}>About Us</span>
            <div style={{ padding: "11px 22px", borderRadius: 999, background: "#ffffff", color: "#750558", fontWeight: 700, fontSize: 16, lineHeight: 1 }}>Download App</div>
          </div>
        </div>

        {/* ── Headline — forced 2-line break: "ONE FINANCIAL HOME FOR" / "LIFE ACROSS BORDERS." */}
        <motion.p
          className="absolute text-center uppercase pointer-events-none"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "61px", lineHeight: "73px", letterSpacing: "-0.5px",
            width: 1200,
            left: "50%", transform: "translateX(-50%)",
          }}
          animate={{ top: hlTop, color: slide === 3 ? "#3F0831" : "#e3cdde" }}
          transition={T}
        >
          One financial home for<br />life across borders.
        </motion.p>

        {/* ── Money labels ──────────────────────────────────────────────────── */}
        {/* Centre family card shows $1500 SENT HOME in both frame 2 and 3 (Figma 887-596 / 887-710) */}
        <MoneyLabel amount="$ 1500" label="Sent Home" top={slide === 2 ? 505 : 648} visible={slide === 2 || slide === 3} />

        {/* ── Phone frames ──────────────────────────────────────────────────── */}
        {/* Side cards — exact Figma sizes: fe1 388×634 @ (76,456), fe2 388×664 @ (977,447) */}
        <PhoneFrame
          left={76} leftStart={532} topTarget={456} height={634} visible={slide === 3}
          img={imgElderly}
          imgSize={{ w: 1061, h: 707.69 }} imgOffset={{ l: -410, t: -27 }}
          notchTop={33.41}
          amount="$ 800" label="Sent to Family" amountVisible={slide === 3} amountTop={300}
          transition={cardT}
        />
        <PhoneFrame
          left={977} leftStart={532} topTarget={447} height={664} visible={slide === 3}
          img={img746B3D}
          imgSize={{ w: 1196, h: 662 }} imgOffset={{ l: -391.5, t: -13 }}
          notchTop={22.41}
          amount="$ 2000" label="Sent for STUDY" amountVisible={slide === 3} amountTop={300}
          transition={cardT}
        />

        {/* ── Zolt Assurance pill (slide 4) ─────────────────────────────────── */}
        <motion.div
          className="absolute flex items-center"
          style={{
            left: "calc(50% + 6.47px)", top: 815, transform: "translateX(-50%)",
            backgroundColor: "rgba(255,255,255,0.31)", borderRadius: 15, gap: 5.615, padding: "6px 12px",
          }}
          animate={{ opacity: slide >= 3 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Zolt Assurance logo — glossy 3D magenta shield (light-pink rim + silver lightning bolt) */}
          <div style={{ width: 30, height: 30, position: "relative", flexShrink: 0 }}>
            <svg width="30" height="30" viewBox="0 0 94 93" fill="none">
              <defs>
                <linearGradient id="zaBody" x1="24" y1="10" x2="70" y2="84" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EA00A2" />
                  <stop offset="1" stopColor="#BF0088" />
                </linearGradient>
                <linearGradient id="zaBolt" x1="36" y1="24" x2="58" y2="70" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#D9D9D9" />
                </linearGradient>
                <filter id="zaSh" x="-25%" y="-20%" width="150%" height="155%">
                  <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#5f4458" floodOpacity="0.38" />
                </filter>
              </defs>
              <g filter="url(#zaSh)">
                {/* light-pink rim */}
                <path d="M21 7 H73 Q81 7 81 15 V45 Q81 71 47 88 Q13 71 13 45 V15 Q13 7 21 7 Z" fill="#F2ABDE" />
                {/* magenta body */}
                <path d="M25 14 H69 Q75 14 75 20 V45 Q75 66 47 80 Q19 66 19 45 V20 Q19 14 25 14 Z" fill="url(#zaBody)" />
                {/* lightning bolt */}
                <path d="M52.9 22 L28.8 52.9 H42.9 L39.4 72 L65.2 39.7 H50.5 Z" fill="url(#zaBolt)" />
              </g>
            </svg>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#ffffff", whiteSpace: "nowrap", lineHeight: "29.335px" }}>
            Zolt Assurance
          </span>
        </motion.div>

      </div>
      </div>
      <Section2 />
      <Section3 />
      <Section8 />{/* "Built for people building lives across borders" + $500M stats (Figma 887-1105) sits right after Section 3 */}
      <Section4 />
      <Section5 />
      <SectionAssurance />{/* "Zolt Assurance, Transfer with Confidence" (Figma 887-1850) — after section 6 */}
      <Section6 />
      <Section7 />
      <Section9 />
      <Section10 />
    </ScaleToFit>
    </>
  );
}
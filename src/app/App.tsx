import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import svgPaths from "@/imports/Component9-1/svg-crb9wqbx6m";
import imgImage1 from "@/imports/Component9-1/dbdee0f2309cac6408de59ba3d77502698a7be1b.png";
import imgPremiumPhoto from "@/imports/Component9-1/16a8882261213fd28e74883e457af281e75a728f.png";
import img746B3D from "@/imports/Component9-1/f61e95b32e992ccbeeb665551752926ac4f715e6.png";

type Slide = 1 | 2 | 3;

const DUR = 0.38;
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
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
function MoneyLabel({ amount, label, visible }: { amount: string; label: string; visible: boolean }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center text-white uppercase text-center pointer-events-none"
      style={{ top: 441, left: "50%", transform: "translateX(-50%)", width: 226, gap: 2 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45 }}
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
  left, leftStart, topTarget, visible, img, imgSize, imgOffset, notchTop, amount, label, amountVisible, amountTop, transition,
}: {
  left: number; leftStart: number; topTarget: number; visible: boolean; img: string;
  imgSize: { w: number; h: number }; imgOffset: { l: number; t: number }; notchTop: number;
  amount: string; label: string; amountVisible: boolean; amountTop: number;
  transition: { duration: number; ease: [number, number, number, number] };
}) {
  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{ width: 387.985, height: 514.468, borderTopLeftRadius: 44, borderTopRightRadius: 44, backgroundColor: "#717171", zIndex: 1 }}
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

  useEffect(() => {
    const calc = () => {
      const s = Math.min(window.innerWidth / 1440, window.innerHeight / 800);
      setLayout({ scale: s, ox: Math.max(0, (window.innerWidth - 1440 * s) / 2), oy: Math.max(0, (window.innerHeight - 800 * s) / 2) });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Move between frames (throttled). dir 1 = next, -1 = previous.
  const lastAct = useRef(0);
  const touchStartY = useRef(0);
  const prevSlide = useRef<Slide>(1);
  const go = (dir: 1 | -1) => {
    const now = Date.now();
    if (now - lastAct.current < 380) return;   // throttle: one gesture = one frame
    lastAct.current = now;
    setSlide(s => ((((s - 1 + dir + 3) % 3) + 1) as Slide));
  };

  // Desktop mouse-wheel / trackpad scroll
  useEffect(() => {
    const onWheel = (e: WheelEvent) => { if (Math.abs(e.deltaY) >= 4) go(e.deltaY > 0 ? 1 : -1); };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const isPurple = slide >= 3;

  // Nav colours — white on frame 1 (over the photo) and frame 3 (over the magenta bg); magenta on frame 2 (over the white card)
  const navWhite  = slide === 1 || slide === 3;
  const logoFill  = navWhite ? "#ffffff" : "#750558";
  const linkColor = navWhite ? "#ffffff" : "#750558";
  const btnBg     = navWhite ? "#ffffff" : "#750558";
  const btnText   = navWhite ? "#36052a" : "#ffffff";

  // Mask — slides 3 & 4 both use exactly #750558; bg div matches so there's
  // never a colour mismatch between the two purple slides
  const maskD    = slide <= 2 ? svgPaths.p32a00 : svgPaths.p3aa52400;
  const maskFill = slide === 3 ? "#750558" : "#ffffff";

  // Any transition into or out of frame 1 (the full family hero) snaps fast; the rest use the normal morph speed.
  const involvesHero = slide === 1 || prevSlide.current === 1;
  const T = { duration: involvesHero ? 0 : DUR, ease: EASE };
  // Cards fan out only when arriving on frame 3; when leaving they disappear instantly (no reverse-shrink).
  const cardT = { duration: slide === 3 ? DUR : 0, ease: EASE };
  useEffect(() => { prevSlide.current = slide; }, [slide]);

  // Hero
  const heroW   = slide === 1 ? 1452.933 : 1134.735;
  const heroH   = slide === 1 ? 838.379  : 654.77;
  const heroTop = slide === 1 ? -17 : slide === 2 ? 166.61 : 205.61;

  // Headline position: slides 3 & 4 move up to top
  const hlTop = slide <= 2 ? (slide === 1 ? 614 : 607) : 141.61;


  return (
    <div
      className="w-full h-screen bg-black overflow-hidden"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
      onPointerDown={(e) => { touchStartY.current = e.clientY; }}
      onPointerUp={(e) => {
        const dy = touchStartY.current - e.clientY;
        if (Math.abs(dy) >= 30) go(dy > 0 ? 1 : -1);   // swipe up = next, down = previous
      }}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          width: 1440, height: 800,
          transform: `scale(${layout.scale})`,
          transformOrigin: "top left",
          left: layout.ox, top: layout.oy,
        }}
      >
        {/* ── Background — white base; slides 3 & 4 add solid purple underneath ── */}
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#750558",
            opacity: isPurple ? 1 : 0,
            transition: `opacity ${DUR}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          }}
        />

        {/* ── Hero image ────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ left: "calc(50% + 6.47px)", transform: "translateX(-50%)" }}
          animate={{ width: heroW, height: heroH, top: heroTop }}
          transition={T}
        >
          <img alt="Family" src={imgImage1} className="absolute max-w-none"
               style={{ width: "100%", height: "100.19%", top: "-0.19%", left: 0 }} />
          <div className="absolute inset-0"
               style={{ background: "linear-gradient(to top, rgba(0,2,4,0.51) 0%, rgba(204,175,72,0) 94.883%)" }} />
        </motion.div>

        {/* ── SVG Mask — Smart Animate path morph ───────────────────────────── */}
        <svg className="absolute pointer-events-none" preserveAspectRatio="none"
             viewBox="0 0 1440 800" style={{ position: "absolute", inset: 0, width: 1440, height: 800 }}>
          <motion.path
            initial={{ d: svgPaths.p32a00, opacity: 0, fill: "#ffffff" }}
            animate={{ d: maskD, opacity: slide === 1 ? 0 : 1, fill: maskFill }}
            transition={T}
          />
        </svg>

        {/* ── White pill — top of cutout window (slides 3 & 4 only) ─────────── */}
        <motion.div
          className="absolute bg-white"
          style={{ width: 92.204, height: 30.337, top: 323.32, left: "50%", transform: "translateX(-50%)", borderRadius: 55.736 }}
          animate={{ opacity: isPurple ? 1 : 0 }}
          transition={T}
        />

        {/* ── Navigation ────────────────────────────────────────────────────── */}
        <div
          className="absolute flex items-center"
          style={{ left: "calc(50% + 0.2px)", top: "calc(50% - 346px)", transform: "translate(-50%, -50%)", gap: 88, zIndex: 10 }}
        >
          <div className="flex items-center shrink-0" style={{ gap: 48 }}>
            {/* Logo + brand label */}
            <div className="flex items-center shrink-0">
              <PandaLogo fill={logoFill} />
              <motion.p
                className="shrink-0 whitespace-nowrap"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 16.8, lineHeight: "25.302px", color: logoFill }}
                animate={{ color: logoFill }}
                transition={T}
              >
                Personal
              </motion.p>
            </div>
            {/* Nav links */}
            <motion.div
              className="flex items-center shrink-0"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: "27.842px", gap: 24, color: linkColor }}
              animate={{ color: linkColor }}
              transition={T}
            >
              <span style={{ width: 93 }}>Business</span>
              <span style={{ width: 96 }}>About Us</span>
              <span style={{ width: 49 }}>Blog</span>
            </motion.div>
          </div>

          {/* CTA button */}
          <motion.div
            className="flex items-center shrink-0"
            style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, borderRadius: 999, backgroundColor: btnBg }}
            animate={{ backgroundColor: btnBg }}
            transition={T}
          >
            <motion.span
              className="whitespace-nowrap"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: "27.842px", color: btnText }}
              animate={{ color: btnText }}
              transition={T}
            >
              Download App
            </motion.span>
          </motion.div>
        </div>

        {/* ── Headline — forced 2-line break: "ONE FINANCIAL HOME FOR" / "LIFE ACROSS BORDERS." */}
        <motion.p
          className="absolute text-center uppercase pointer-events-none"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "61px", lineHeight: "73px", letterSpacing: "-0.5px",
            color: "#e3cdde", width: 1200,
            left: "50%", transform: "translateX(-50%)",
          }}
          animate={{ top: hlTop }}
          transition={T}
        >
          One financial home for<br />life across borders.
        </motion.p>

        {/* ── Money labels ──────────────────────────────────────────────────── */}
        <MoneyLabel amount="$ 1500" label="Sent Home"      visible={slide === 2} />
        <MoneyLabel amount="$ 800"  label="Sent to family" visible={slide === 3} />

        {/* ── Phone frames ──────────────────────────────────────────────────── */}
        <PhoneFrame
          left={76} leftStart={532} topTarget={312} visible={slide === 3}
          img={imgPremiumPhoto}
          imgSize={{ w: 846.709, h: 538.792 }} imgOffset={{ l: -237.81, t: -21.31 }}
          notchTop={33.41}
          amount="$ 1500" label="Sent to Home" amountVisible={slide === 3} amountTop={213}
          transition={cardT}
        />
        <PhoneFrame
          left={987} leftStart={532} topTarget={312} visible={slide === 3}
          img={img746B3D}
          imgSize={{ w: 931.3, h: 516 }} imgOffset={{ l: -271.66, t: -1 }}
          notchTop={22.41}
          amount="$ 2000" label="Sent for STUDY" amountVisible={slide === 3} amountTop={213}
          transition={cardT}
        />

        {/* ── Zolt Assurance pill (slide 4) ─────────────────────────────────── */}
        <motion.div
          className="absolute flex items-center"
          style={{
            left: "calc(50% + 6.47px)", top: 592, transform: "translateX(-50%)",
            backgroundColor: "rgba(255,255,255,0.31)", borderRadius: 15, gap: 5.615, padding: "6px 12px",
          }}
          animate={{ opacity: slide >= 3 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Zolt logo icon */}
          <div style={{ width: 30.323, height: 30, position: "relative", overflow: "hidden" }}>
            {/* Polygon shell */}
            <div className="absolute" style={{ left: -2.01, top: -3.59, width: 33.144, height: 35.507 }}>
              <div className="absolute flex items-center justify-center"
                   style={{ left: -0.45, top: -0.75, width: 30.022, height: 29.813 }}>
                <div style={{ transform: "scaleY(-1) rotate(9.44deg) skewX(-5.02deg)" }}>
                  <div style={{ width: 23.542, height: 26.794, position: "relative" }}>
                    <div className="absolute" style={{ top: "0.28%", left: 0, right: "-2.64%", bottom: "-5.93%" }}>
                      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.1625 28.3067">
                        <path d={svgPaths.p35a83d00} fill="#CA119A" />
                        <path d={svgPaths.p6f86c00} stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="2.06406" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Lightning bolt */}
              <div className="absolute" style={{ top: "16.42%", left: "22.23%", right: "27.23%", bottom: "23.38%" }}>
                <div className="absolute" style={{ top: "3.11%", left: "15.62%", right: "15.64%", bottom: "3.13%" }}>
                  <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5341 16.9339">
                    <defs>
                      <linearGradient id="bolt-g" x1="3.768" x2="5.267" y1="-3.845" y2="16.934" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#A4B3AE" /><stop offset="1" stopColor="#ffffff" />
                      </linearGradient>
                    </defs>
                    <path d={svgPaths.p3c71d300} fill="url(#bolt-g)" stroke="#E2E2E2" strokeWidth="0.17" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#ffffff", whiteSpace: "nowrap", lineHeight: "29.335px" }}>
            Zolt Assurance
          </span>
        </motion.div>

      </div>
    </div>
  );
}

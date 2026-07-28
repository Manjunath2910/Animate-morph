import { useState, useEffect, type ReactNode } from "react";

// Scales the fixed 1440px desktop design to the viewport width using CSS `zoom`,
// so it lays out exactly like Figma (same grid/alignment as the hero) at any width
// and stays fully responsive. `zoom` scales both layout and paint, so the page
// auto-sizes — no manual height and nothing gets clipped.
export default function ScaleToFit({ children, width = 1440 }: { children: ReactNode; width?: number }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let lastDPR = window.devicePixelRatio;
    const recalc = () => setZoom(window.innerWidth / width);
    recalc();
    const onResize = () => {
      // Ignore Ctrl +/- browser zoom (it changes devicePixelRatio) so the page magnifies normally instead of re-fitting to width.
      if (window.devicePixelRatio !== lastDPR) { lastDPR = window.devicePixelRatio; return; }
      recalc();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [width]);

  return <div style={{ zoom }}>{children}</div>;
}

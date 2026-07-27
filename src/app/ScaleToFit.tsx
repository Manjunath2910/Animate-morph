import { useState, useEffect, type ReactNode } from "react";

// Scales the fixed 1440px desktop design to the viewport width using CSS `zoom`,
// so it lays out exactly like Figma (same grid/alignment as the hero) at any width
// and stays fully responsive. `zoom` scales both layout and paint, so the page
// auto-sizes — no manual height and nothing gets clipped.
export default function ScaleToFit({ children, width = 1440 }: { children: ReactNode; width?: number }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const recalc = () => setZoom(window.innerWidth / width);
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [width]);

  return <div style={{ zoom }}>{children}</div>;
}

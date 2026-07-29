import { useRef, useState, useLayoutEffect, type ReactNode } from "react";

// Scales the fixed 1440-wide design down to the viewport width using CSS transform.
// Unlike `zoom`, transform is reliable on iOS Safari, so the whole page fits and stays
// aligned on iPhone. We measure the content and set the outer height so the page still
// flows normally and nothing overflows sideways.
export default function ScaleToFit({ scale, children }: { scale: number; children: ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const measure = () => { if (inner.current) setHeight(inner.current.offsetHeight * scale); };
    measure();
    let ro: ResizeObserver | undefined;
    if (inner.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(measure);
      ro.observe(inner.current);
    }
    window.addEventListener("resize", measure);
    return () => { ro?.disconnect(); window.removeEventListener("resize", measure); };
  }, [scale]);

  // Outer takes the scaled size: at fit-scale it equals the viewport width; when zoomed in
  // it's wider (page scrolls sideways); when zoomed out it's narrower and centered.
  return (
    <div style={{ width: 1440 * scale, height, margin: "0 auto", overflow: "hidden" }}>
      <div ref={inner} style={{ width: 1440, transformOrigin: "top left", transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

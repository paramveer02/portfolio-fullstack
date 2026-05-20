import { useEffect, useRef } from "react";

/**
 * Magnetic pixel cursor: a Win95 arrow that tracks the mouse 1:1, plus a
 * trailing ring that lerps behind it and snaps "hot" over interactive targets.
 * Renders nothing on touch / reduced-motion (handled by the caller).
 */
export function Cursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("sys-cursor-active");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate(${target.x}px, ${target.y}px)`;
      }
      const hot = !!(e.target as HTMLElement)?.closest(
        "a, button, [role='button'], .sys-hot, input, textarea"
      );
      ringRef.current?.classList.toggle("hot", hot);
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("sys-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="sys-cursor-ring" aria-hidden />
      <div ref={arrowRef} className="sys-cursor" aria-hidden />
    </>
  );
}

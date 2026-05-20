/** Full-screen CRT glass: scanlines, vignette, sweep beam, flicker. DOM-only,
 *  sits above content so it tints the whole experience. */
export function CRTOverlay({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="crt-overlay" aria-hidden>
      {!reducedMotion && <div className="crt-scanbeam" />}
      {!reducedMotion && <div className="crt-flicker" />}
    </div>
  );
}

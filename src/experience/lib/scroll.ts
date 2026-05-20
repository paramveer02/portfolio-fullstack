// Module-level scroll store. Lenis writes to it on every scroll event; the R3F
// render loop reads it inside useFrame. Kept outside React state on purpose so
// scroll updates never trigger re-renders.
export const scrollState = {
  /** 0 → 1 progress through the whole document */
  progress: 0,
  /** raw pixels scrolled */
  scroll: 0,
  /** instantaneous scroll velocity (px/frame-ish), smoothed by Lenis */
  velocity: 0,
};

/** Lenis instance, registered by ScrollSync so anything can drive smooth scroll. */
interface LenisLike {
  scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void;
}
let lenis: LenisLike | null = null;
export const setLenis = (l: LenisLike | null) => {
  lenis = l;
};

/** Smoothly scroll to an element id (honouring Lenis when present). */
export const scrollToId = (id: string) => {
  const sel = id.startsWith("#") ? id : `#${id}`;
  if (lenis) {
    lenis.scrollTo(sel, { offset: 0, duration: 1.6 });
  } else {
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
  }
};

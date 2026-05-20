import { useEffect, useState } from "react";

export interface Environment {
  /** viewport < 768px */
  isMobile: boolean;
  /** touch-primary device (no fine pointer) */
  isTouch: boolean;
  /** user asked for reduced motion */
  reducedMotion: boolean;
  /** mobile OR reduced motion — drop the heavy WebGL layer */
  lite: boolean;
}

function read(): Environment {
  if (typeof window === "undefined") {
    return { isMobile: false, isTouch: false, reducedMotion: false, lite: false };
  }
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return { isMobile, isTouch, reducedMotion, lite: isMobile || reducedMotion };
}

export function useEnvironment(): Environment {
  const [env, setEnv] = useState<Environment>(read);

  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    const update = () => setEnv(read());
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return env;
}

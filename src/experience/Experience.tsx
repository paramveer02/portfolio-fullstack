import { useState, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEnvironment } from "./lib/useEnvironment";
import { scrollState, setLenis } from "./lib/scroll";
import { CanvasLayer } from "./scene/CanvasLayer";
import { CRTOverlay } from "./overlay/CRTOverlay";
import { Cursor } from "./Cursor";
import { Boot } from "./Boot";
import { Desktop } from "./Desktop";
import { ProjectsRoom } from "./rooms/ProjectsRoom";
import { SkillsRoom } from "./rooms/SkillsRoom";
import { AboutRoom } from "./rooms/AboutRoom";
import { ContactRoom } from "./rooms/ContactRoom";
import { SysFooter } from "./ui/SysFooter";
import "./experience.css";

gsap.registerPlugin(ScrollTrigger);

/** Pipes Lenis scroll into the module store + keeps ScrollTrigger in sync. */
function ScrollSync() {
  const lenis = useLenis((l) => {
    scrollState.scroll = l.scroll;
    scrollState.progress = l.progress;
    scrollState.velocity = l.velocity;
    ScrollTrigger.update();
  });
  useEffect(() => {
    setLenis(lenis ?? null);
    return () => setLenis(null);
  }, [lenis]);
  return null;
}

export function Experience() {
  const env = useEnvironment();
  const [booted, setBooted] = useState(false);
  const showCursor = !env.isTouch && !env.reducedMotion;

  useEffect(() => {
    document.documentElement.style.background = "#05060a";
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        smoothWheel: !env.reducedMotion,
        wheelMultiplier: 1,
      }}
    >
      <ScrollSync />

      {!env.lite && <CanvasLayer />}
      {env.lite && <div className="sys-canvas-layer" style={{ background: "radial-gradient(circle at 50% 30%, #0a2030, #05060a 70%)" }} aria-hidden />}

      {!booted && <Boot onDone={() => setBooted(true)} reducedMotion={env.reducedMotion} />}

      <div className="sys-content" style={{ opacity: booted ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Desktop />
        <ProjectsRoom />
        <SkillsRoom />
        <AboutRoom />
        <ContactRoom />
        <SysFooter />
      </div>

      <CRTOverlay reducedMotion={env.reducedMotion} />
      {showCursor && <Cursor />}
    </ReactLenis>
  );
}

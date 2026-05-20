import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Window } from "./Window";
import { useEnvironment } from "../lib/useEnvironment";

/** Each room enters/exits along its own vector so scrolling feels like moving
 *  through space, not down a column. Keyframes map to the section's pass
 *  through the viewport: [enter, settled-in, settled-out, exit]. */
export type MotionVariant = "left" | "right" | "flip" | "rise" | "zoom";

const KF = [0, 0.3, 0.7, 1];
const VARIANTS: Record<
  MotionVariant,
  { x: number[]; y: number[]; rotate: number[]; rotateY: number[]; scale: number[] }
> = {
  left:  { x: [-260, 0, 0, 200], y: [0, 0, 0, 0],    rotate: [-5, 0, 0, 4],  rotateY: [0, 0, 0, 0],     scale: [0.92, 1, 1, 0.95] },
  right: { x: [260, 0, 0, -200], y: [0, 0, 0, 0],    rotate: [5, 0, 0, -4],  rotateY: [0, 0, 0, 0],     scale: [0.92, 1, 1, 0.95] },
  flip:  { x: [0, 0, 0, 0],      y: [40, 0, 0, -40], rotate: [0, 0, 0, 0],   rotateY: [22, 0, 0, -18],  scale: [0.9, 1, 1, 0.95] },
  rise:  { x: [0, 0, 0, 0],      y: [170, 0, 0, -130], rotate: [3, 0, 0, -3], rotateY: [0, 0, 0, 0],    scale: [0.88, 1, 1, 0.95] },
  zoom:  { x: [0, 0, 0, 0],      y: [70, 0, 0, -70], rotate: [0, 0, 0, 0],   rotateY: [0, 0, 0, 0],     scale: [0.7, 1, 1, 0.86] },
};

interface RoomProps {
  id: string;
  title: string;
  children: ReactNode;
  maxWidth?: number;
  icon?: ReactNode;
  variant?: MotionVariant;
}

export function Room({ id, title, children, maxWidth = 920, icon, variant = "left" }: RoomProps) {
  const ref = useRef<HTMLElement>(null);
  const env = useEnvironment();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // dampen lateral motion on phones so it never feels seasick
  const k = env.isMobile ? 0.45 : 1;
  const v = VARIANTS[variant];
  const x = useTransform(scrollYProgress, KF, v.x.map((n) => n * k));
  const y = useTransform(scrollYProgress, KF, v.y.map((n) => n * k));
  const rotate = useTransform(scrollYProgress, KF, v.rotate);
  const rotateY = useTransform(scrollYProgress, KF, v.rotateY.map((n) => n * k));
  const scale = useTransform(scrollYProgress, KF, v.scale);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  const animate: Record<string, MotionValue<number>> = env.reducedMotion
    ? {}
    : { x, y, rotate, rotateY, scale, opacity };

  return (
    <section
      ref={ref}
      id={id}
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "14vh 16px 10vh",
        perspective: 1300,
      }}
    >
      <motion.div
        style={{
          width: `min(${maxWidth}px, 94vw)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...animate,
        }}
        initial={env.reducedMotion ? { opacity: 0 } : false}
        whileInView={env.reducedMotion ? { opacity: 1 } : undefined}
        viewport={env.reducedMotion ? { once: true } : undefined}
      >
        <Window title={title} icon={icon}>
          {children}
        </Window>
      </motion.div>
    </section>
  );
}

/** Big phosphor section heading used inside rooms. */
export function RoomHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontFamily: "var(--font-term)",
          fontSize: "clamp(0.95rem, 2.4vw, 1.2rem)",
          letterSpacing: "0.18em",
          color: "#bfefff",
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "clamp(1.2rem, 4.2vw, 2.1rem)",
          color: "var(--phosphor)",
          textShadow: "0 0 10px rgba(65,255,119,0.5)",
          marginTop: 8,
          lineHeight: 1.25,
        }}
      >
        {title}
      </div>
    </div>
  );
}

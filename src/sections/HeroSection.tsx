import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { SketchProfileImage } from "../components/SketchProfileImage";

interface HeroSectionProps {
  scrollProgress: MotionValue<number>;
}

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Hero parallax / fade
  const y = useTransform(scrollProgress, [0, 0.3], [0, -200]);
  const opacity = useTransform(scrollProgress, [0, 0.2, 0.3], [1, 0.5, 0]);
  const scale = useTransform(scrollProgress, [0, 0.3], [1, 0.8]);

  // Background parallax
  const bgY = useTransform(sectionProgress, [0, 1], [0, 200]);
  const bgRotate = useTransform(sectionProgress, [0, 1], [0, 5]);
  const particleY = useTransform(sectionProgress, [0, 1], [0, -100]);

  // Static particle positions
  const particles = useMemo(
    () =>
      [...Array(10)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <motion.section
      ref={ref}
      id="hero"
      style={!isMobile && !shouldReduceMotion ? { y, opacity, scale } : undefined}
      className={`flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 ${
        isMobile ? "min-h-screen" : "min-h-[120vh]"
      }`}
    >
      {/* Background Grid & Particles */}
      {!isMobile && !shouldReduceMotion && (
        <>
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{ y: bgY, rotate: bgRotate }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] bg-[size:100px_100px]" />
          </motion.div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: particleY }}
          >
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1] }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                }}
              />
            ))}
          </motion.div>
        </>
      )}

      {/* Foreground Content */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-24 xl:gap-32 items-stretch">
          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-left lg:pt-4 xl:pt-8"
          >
            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 border border-white bg-white/5 text-[10px] sm:text-xs tracking-[0.24em] uppercase font-semibold"
            >
              Full-Stack Developer · AI Automation Consultant
            </motion.div>

            {/* Name */}
            <h1
              className="mb-5 sm:mb-6 md:mb-8 leading-[0.9] font-bold tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 12vw, 9rem)" }}
            >
              PARAMVIR
              <br />
              MARWAH
            </h1>

            {/* Vision Lines */}
            <div className="mb-7 sm:mb-9 md:mb-11 space-y-4 sm:space-y-5 md:space-y-6">
              {/* Line 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex gap-4 justify-center lg:justify-start items-start"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white translate-y-[8px] sm:translate-y-[9px]" />
                <p
                  className="font-bold tracking-tight leading-tight text-left"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                >
                  Modern web apps, dashboards & internal tools for founders and
                  small teams
                </p>
              </motion.div>

              {/* Line 2 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex gap-4 justify-center lg:justify-start items-start"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white translate-y-[8px] sm:translate-y-[9px]" />
                <p
                  className="font-bold tracking-tight leading-tight text-left"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                >
                  AI-assisted development to ship faster and automate repetitive
                  workflows
                </p>
              </motion.div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start mt-6 sm:mt-8">
              {[
                {
                  Icon: Github,
                  href: "https://github.com/paramveer02",
                  label: "GitHub",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/paramveer-marwah/",
                  label: "LinkedIn",
                },
                {
                  Icon: Mail,
                  href: "mailto:service@monpro-ai.com",
                  label: "Email",
                },
              ].map(({ Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, rotateY: -30, y: 50 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative preserve-3d w-full h-full flex items-center justify-center pt-4 pb-0 sm:pt-6 sm:pb-4 md:py-12"
          >
            <div
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg"
              style={{ minHeight: isMobile ? "380px" : "500px" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <SketchProfileImage />

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white text-black px-4 py-3 sm:px-6 sm:py-4 border-3 sm:border-4 border-white shadow-2xl z-10"
                  >
                    <div className="text-[10px] sm:text-xs font-semibold tracking-[0.2em]">
                      AI-POWERED
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                      PRODUCT BUILDER
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </motion.div>
      )}
    </motion.section>
  );
}

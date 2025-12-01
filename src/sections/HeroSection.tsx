import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useMemo } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { SketchProfileImage } from "../components/SketchProfileImage";

interface HeroSectionProps {
  scrollProgress: any;
}

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const shouldReduceMotion = useReducedMotion();

  const y = useTransform(scrollProgress, [0, 0.3], [0, -200]);
  const opacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.3],
    [1, 0.5, 0],
  );
  const scale = useTransform(
    scrollProgress,
    [0, 0.3],
    [1, 0.8],
  );

  // Parallax for background
  const bgY = useTransform(sectionProgress, [0, 1], [0, 200]);
  const bgRotate = useTransform(
    sectionProgress,
    [0, 1],
    [0, 5],
  );

  // Memoize particle positions to prevent re-computation on each render
  const particles = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <motion.section
      ref={ref}
      id="hero"
      style={{ y, opacity, scale }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden perspective-2000 px-4 sm:px-6 lg:px-8 pt-24 md:pt-28"
    >
      {/* Background Grid with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: bgY, rotate: bgRotate }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:100px_100px]" />
      </motion.div>

      {/* Floating Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: useTransform(sectionProgress, [0, 1], [0, -100]),
        }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.5, 1],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                  }
            }
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-20 sm:gap-24 lg:gap-32 xl:gap-40 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="border border-white bg-white text-black inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 text-[10px] sm:text-xs tracking-widest font-semibold"
            >
              FULL STACK DEVELOPERR
            </motion.div> */}

            <h1 className="mb-3 sm:mb-4 md:mb-6 leading-none text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
              PARAMVIR
              <br />
              MARWAH
            </h1>

            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 justify-center lg:justify-start">
              <div className="h-px bg-white w-8 sm:w-12 md:w-16" />
              <p className="text-sm sm:text-base md:text-lg tracking-wide">
                FULL-STACK DEVELOPER & AI AUTOMATION
              </p>
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-12 max-w-xl text-gray-400 leading-relaxed mx-auto lg:mx-0">
              Building modern web apps and automation systems for small businesses and startups with JavaScript, React, Node.js, and AI-assisted workflows.
            </p>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
              {[
                { Icon: Github, href: "https://github.com/paramveer02" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/paramveer-marwah/" },
                { Icon: Mail, href: "mailto:service@monpro-ai.com" },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* 3D Profile Card with Sketch Effects */}
          <motion.div
            initial={{ opacity: 0, rotateY: -30 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative preserve-3d w-full max-w-lg mx-auto lg:max-w-xl"
          >
            <SketchProfileImage />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </motion.div>
    </motion.section>
  );
}

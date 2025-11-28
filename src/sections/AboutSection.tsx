import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import DecryptedText from "../components/DecryptedText";

export function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects similar to hero
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Individual parallax for text and stats
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -150],
  );
  const statsY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 150],
  );

  // Background parallax - moves opposite direction
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.2],
  );

  const stats = [
    { number: "50+", label: "PROJECTS", delay: 0.1 },
    { number: "30+", label: "CLIENTS", delay: 0.2 },
    { number: "4", label: "LIVE SITES", delay: 0.3 },
    {
      number: "100%",
      label: "SATISFACTION",
      delay: 0.4,
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen relative overflow-hidden bg-white text-black flex items-center px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle Background Pattern with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: bgY, scale: bgScale }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(black_1px,transparent_1px),linear-gradient(90deg,black_1px,transparent_1px)] bg-[size:100px_100px]" />
      </motion.div>

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
        }}
      >
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-black/10"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 border-2 border-black/10"
          animate={{ rotate: -360 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-7xl mx-auto py-16 sm:py-24 md:py-32 w-full relative z-10"
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border border-black inline-block px-4 sm:px-6 py-2 mb-12 sm:mb-16 md:mb-20 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]"
        >
          <DecryptedText
            text="ABOUT"
            animateOn="view"
            speed={30}
            maxIterations={15}
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          style={{ y: textY }}
          className="mb-16 sm:mb-20 md:mb-24 max-w-5xl leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          CRAFTING DIGITAL
          <br />
          EXPERIENCES WITH
          <br />
          PRECISION & PASSION
        </motion.h2>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            style={{ y: textY }}
            className="space-y-8 sm:space-y-12 md:space-y-16"
          >
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl md:text-3xl leading-relaxed border-l-4 sm:border-l-8 border-black pl-4 sm:pl-6 md:pl-8"
            >
              With over 4 years of experience in full-stack
              development, I specialize in building scalable web
              applications that combine beautiful design with
              robust functionality.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-600 pl-4 sm:pl-6 md:pl-8"
            >
              My expertise spans modern JavaScript frameworks,
              backend technologies, and cloud infrastructure —
              delivering end-to-end solutions that drive
              business growth.
            </motion.p>

            {/* Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="h-0.5 sm:h-1 bg-black origin-left"
            />
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div
            style={{ y: statsY }}
            className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-12"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotateZ: -5,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotateZ: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: stat.delay,
                }}
                viewport={{ once: true }}
                className="border-2 sm:border-4 border-black p-6 sm:p-8 md:p-12 hover:bg-black hover:text-white transition-all duration-500 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 tracking-tighter">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] opacity-70 group-hover:opacity-100">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import DecryptedText from "../components/DecryptedText";
import { Server, Layout, Plug, Database, FlaskConical, UploadCloud, Code2, Workflow, Zap } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
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
  const shapesY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const workflowCards = [
    { title: "Backend logic", Icon: Server, delay: 0.1 },
    { title: "Frontend scaffolding", Icon: Layout, delay: 0.2 },
    { title: "API integrations", Icon: Plug, delay: 0.3 },
    { title: "Database setup", Icon: Database, delay: 0.4 },
    { title: "Repetitive testing", Icon: FlaskConical, delay: 0.5 },
    { title: "Deployment routines", Icon: UploadCloud, delay: 0.6 },
  ];

  const valueProps = [
    { icon: Code2, label: "Classical Engineering" },
    { icon: Workflow, label: "AI-Assisted Tools" },
    { icon: Zap, label: "Automation First" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen relative overflow-hidden bg-white text-black flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
    >
      {/* Subtle Background Pattern with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: bgY, scale: bgScale }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(black_1px,transparent_1px),linear-gradient(90deg,black_1px,transparent_1px)] bg-[size:100px_100px]" />
      </motion.div>

      {/* Floating Geometric Shapes */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            y: shapesY,
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
      )}

      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 w-full relative z-10"
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="inline-block px-4 sm:px-6 py-2 mb-10 sm:mb-12 md:mb-16 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]"
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#ffffff',
            backgroundColor: '#000000',
            color: '#ffffff',
            transition: 'all 0.3s ease'
          }}
        >
          <DecryptedText
            text="HOW I WORK"
            animateOn="view"
            speed={30}
            maxIterations={15}
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          style={{ y: textY }}
          className="mb-12 sm:mb-16 md:mb-20 max-w-5xl leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-right font-black"
        >
          I DON&apos;T JUST CODE.
          <br />
          I BUILD SYSTEMS.
        </motion.h2>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-32 items-start">
          {/* Left Column - Visual Content */}
          <motion.div
            style={{ y: textY }}
            className="space-y-8 sm:space-y-10 md:space-y-12 text-right"
          >
            {/* Core Identity */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="border-r-8 border-black pr-6 sm:pr-8 md:pr-10"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                WORKFLOW ENGINEER
                <br />
                <span className="text-gray-600">Not Just a Developer</span>
              </h3>
              <div className="text-base sm:text-lg md:text-xl text-gray-500 font-semibold tracking-wide">
                Germany • Full-Stack • AI-Powered
              </div>
            </motion.div>

            {/* Value Proposition Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-end gap-3 sm:gap-4"
            >
              {valueProps.map(({ icon: Icon, label }, idx) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Process Flow Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative p-8 sm:p-10 md:p-12 border-4 border-black bg-gradient-to-br from-white to-gray-50"
            >
              <div className="absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-black" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-r-4 border-t-4 border-black" />
              
              <div className="space-y-6 text-right">
                <div className="flex items-center justify-end gap-4">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black">SPOT BOTTLENECKS</div>
                  <div className="w-3 h-3 bg-black rotate-45" />
                </div>
                <div className="h-px bg-black/20 my-4" />
                <div className="flex items-center justify-end gap-4">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black">AUTOMATE RUTHLESSLY</div>
                  <div className="w-3 h-3 bg-black rotate-45" />
                </div>
                <div className="h-px bg-black/20 my-4" />
                <div className="flex items-center justify-end gap-4">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-black">SHIP FASTER</div>
                  <div className="w-4 h-4 bg-black" />
                </div>
              </div>
            </motion.div>

            {/* Outcome Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3 sm:gap-4"
            >
              {[
                { metric: "5X", desc: "Faster" },
                { metric: "$$$", desc: "Savings" },
                { metric: "100%", desc: "Scalable" },
              ].map(({ metric, desc }) => (
                <div
                  key={metric}
                  className="border-2 border-black p-4 sm:p-5 text-center hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-black mb-1">{metric}</div>
                  <div className="text-xs sm:text-sm font-semibold">{desc}</div>
                </div>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              viewport={{ once: true }}
              className="h-1 bg-black origin-right ml-auto w-3/4"
            />
          </motion.div>

          {/* Right Column - Workflow Cards */}
          <motion.div
            style={{ y: statsY }}
            className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6"
          >
            {workflowCards.map(({ title, Icon, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true }}
                className="relative overflow-hidden border-2 border-black p-5 sm:p-6 md:p-7 bg-white hover:bg-black hover:text-white transition-all duration-400 group"
                whileHover={{ scale: 1.04, rotate: 0.5 }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-black/5 border-l-[20px] border-l-transparent group-hover:border-t-white/10" />
                
                <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform group-hover:scale-110" />
                  <div className="text-sm sm:text-base md:text-lg font-semibold tracking-tight leading-tight">
                    {title}
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

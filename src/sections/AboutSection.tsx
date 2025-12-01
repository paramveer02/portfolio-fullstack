import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import DecryptedText from "../components/DecryptedText";
import { Layout, FlaskConical, UploadCloud, Code2, Workflow} from "lucide-react";

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

  // Individual parallax for text
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -150],
  );

  // Background parallax - moves opposite direction
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.2],
  );
  const shapesY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const architectureNodes = [
    { title: "Discovery", note: "Product goals, constraints, founder priorities", Icon: Workflow },
    { title: "Blueprint", note: "AI-assisted schematics + interface contracts", Icon: Code2 },
    { title: "Delivery Tracks", note: "Web, mobile, and API surfaces sequenced", Icon: Layout },
    { title: "Automation Fabric", note: "QA bots, records, observability wired in", Icon: FlaskConical },
    { title: "Release Loop", note: "Deployment rituals that keep iteration safe", Icon: UploadCloud },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen relative overflow-hidden bg-white text-black flex items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12"
    >
      {/* Subtle Background Pattern with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: bgY, scale: bgScale }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(black_2px,transparent_2px),linear-gradient(90deg,black_2px,transparent_2px)] bg-[size:100px_100px]" />
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
        className="max-w-7xl mx-auto py-6 sm:py-8 md:py-10 w-full relative z-10"
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
          className="mb-3 sm:mb-4 md:mb-6 max-w-4xl leading-tight text-3xl sm:text-4xl md:text-5xl text-center font-black mx-auto"
        >
          SYSTEM ARCHITECT
          <br />
          <span className="text-gray-700 font-semibold text-lg sm:text-xl md:text-2xl">
            Building Products with Precision
          </span>
        </motion.h2>
        <p className="text-sm sm:text-base md:text-lg text-center text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          Architecture and automation designed so founders can focus on product and innovation—not repetitive setup, testing, or release overhead.
        </p>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 md:gap-16 lg:gap-20 items-start">
          {/* Left Column - Narrative */}
          <motion.div
            style={{ y: textY }}
            className="space-y-6 sm:space-y-8 md:space-y-10 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3 items-center lg:items-start"
            >
              <div className="text-base sm:text-lg font-semibold tracking-[0.25em] uppercase text-gray-500">
                Full-Stack • Cloud-Native • AI-Assisted
              </div>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-xl">
                Delivery runs on rails so you can stay focused on brand and product. AI handles the scaffolding and regression, automation records every event, and releases continue smoothly without tying your team up in repetitive work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="relative overflow-hidden border-4 border-black bg-white"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-black">
                {["Strategy", "Execution", "Automation"].map((label, idx) => (
                  <div
                    key={label}
                    className={`px-6 py-4 text-sm sm:text-base font-semibold tracking-wide ${
                      idx < 2 ? "border-b sm:border-b-0 sm:border-r border-black" : ""
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <p className="px-6 py-4 text-sm sm:text-base text-gray-600">
                The stack is mapped like an architectural illustration—strategy frames the system, execution reuses proven patterns, and automation keeps the structure breathing masterminded by my Human Brain.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Flow diagram */}
          <motion.div
            style={{ y: textY }}
            className="space-y-6 sm:space-y-8 md:space-y-10"
          >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 md:p-9 border-4 border-black bg-white"
          >
            <h3 className="text-base sm:text-lg font-semibold tracking-[0.2em] uppercase mb-4 text-gray-600 text-center sm:text-left">
              Architecture Diagram
            </h3>
            <div className="relative pl-8">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-black/20" />
              {architectureNodes.map((node, idx) => (
                <div key={node.title} className="relative pb-8 last:pb-0">
                  <div className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full border-2 border-black bg-white flex items-center justify-center">
                    <node.Icon className="w-3 h-3" />
                  </div>
                  {idx !== architectureNodes.length - 1 && (
                    <div className="absolute left-4 top-6 w-px h-[calc(100%-0.5rem)] bg-black/20" />
                  )}
                  <div className="ml-8 text-left">
                    <p className="text-sm sm:text-base font-semibold">{node.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-5">{node.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white text-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Parallax Background Grid */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY, opacity: 0.11 }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(black_1px,transparent_1px),linear-gradient(90deg,black_1px,transparent_1px)] bg-[size:120px_120px]" />
      </motion.div>

      <div className="relative w-full max-w-6xl mx-auto border border-black/10 bg-white/70 shadow-[0_40px_120px_rgba(0,0,0,0.08)] px-4 sm:px-8 md:px-10 py-8 sm:py-10">
        {/* Section Label */}
        <div className="mb-6 sm:mb-8">
          <span
            className="inline-flex items-center px-4 py-1.5 text-[11px] font-semibold
                       tracking-[0.22em] uppercase bg-black text-white border border-white/20"
          >
            About
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.12em] uppercase mb-8 sm:mb-10">
          Five years in. Still building.
        </h2>

        {/* Two paragraphs */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
            I started writing software development code  in 2020. Since then I have shipped web
            apps, dashboards, internal tools, and automation systems for
            founders, small teams, and my own businesses. The work spans
            full-stack development, API integrations, and increasingly,
            AI-assisted workflows. This portfolio
            is the developer record. For consulting conversations, MonPro-AI is
            the door.
          </p>
          <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
            In 2025 I started MonPro-AI — a consulting practice focused on AI
            automation for founder-led teams and Shopify merchants. The work pulled me toward automation. The most useful thing I could do for a client was rarely a new feature — it was removing a manual step they had been living with for months. That pattern repeated often enough that I started a consulting practice around it. 
          </p>
        </div>

        {/* Three stat blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-black/10">
          <div className="py-6 sm:py-8 pr-0 sm:pr-8 border-b sm:border-b-0 sm:border-r border-black/10">
            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-1">
              5 YEARS
            </div>
            <div className="text-sm text-gray-900">Software Development</div>
          </div>
          <div className="py-6 sm:py-8 sm:px-8 border-b sm:border-b-0 sm:border-r border-black/10">
            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-1">
              LEIPZIG
            </div>
            <div className="text-sm text-gray-900">Germany · EU</div>
          </div>
          <div className="py-6 sm:py-8 pl-0 sm:pl-8">
            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-1">
              MONPRO-AI
            </div>
            <a
              href="https://monpro-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-900 hover:underline underline-offset-4 decoration-1"
            >
              Active Consulting Practice ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

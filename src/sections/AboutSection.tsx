import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Simple parallax only for the background grid
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const stepTitles = [
    "Discovery",
    "Architecture & Plan",
    "Build & Integrate",
    "Automation & Observability",
    "Launch & Iterate",
  ];

  const stepDescriptions = [
    "We map your product idea, business model, and tools, then decide what should be built, integrated, or automated.",
    "A lean technical blueprint: stack, data flow, API contracts, and automation points—tailored to your budget and team.",
    "Frontend, backend, and integrations are implemented in tight loops with real environments deployed early for review.",
    "Workflows, alerts, and reports are wired in so repeatable tasks run automatically and important issues never go unnoticed.",
    "We launch with a stable core, then improve based on real usage—adding features, refining flows, and extending automation.",
  ];

  const executionPillars = [
    {
      title: "Strategy",
      description:
        "We define clear outcomes, constraints, and guardrails: who this is for, what “success” looks like, and which parts of the business must never break.",
    },
    {
      title: "Execution",
      description:
        "I implement battle-tested patterns for data, APIs, and UI so the product stays maintainable, fast, and ready for future features.",
    },
    {
      title: "Automation",
      description:
        "AI and automation are applied where they remove manual work: onboarding, reporting, notifications, and quality checks—so your team’s time goes back to customers and strategy.",
    },
  ];

  return (
    <section
      id="how-i-work"
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

      {/* Inner Shell – slightly transparent so grid shows through */}
      <div className="relative w-full max-w-6xl mx-auto border border-black/10 bg-white/70 shadow-[0_40px_120px_rgba(0,0,0,0.08)] px-4 sm:px-8 md:px-10 py-8 sm:py-10">
        {/* Section Label */}
        <div className="mb-6 sm:mb-8">
          <span
            className="inline-flex items-center px-4 py-1.5 text-[11px] font-semibold 
                       tracking-[0.22em] uppercase bg-black text-white border border-white/20"
          >
            How I Work
          </span>
        </div>

        {/* Title + Intro */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.16em] uppercase">
            System Architect
          </h2>
          <p className="mt-3 text-sm sm:text-base tracking-[0.18em] uppercase text-gray-700">
            Building Products with Precision
          </p>
          <p className="mt-5 max-w-3xl mx-auto text-sm sm:text-base text-gray-900 leading-relaxed">
            I design and ship systems so founders can stay focused on vision,
            product, and customers. Architecture, development, and automation
            are handled end-to-end—without you getting pulled into technical
            noise or delivery overhead.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:items-start">
          {/* LEFT: Narrative + Strategy Card */}
          <div className="space-y-6">
            {/* Narrative Card – Soft Premium Hover */}
            <div
              className="
                group border border-black/10 bg-gradient-to-br from-white via-gray-50 to-white 
                p-4 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.08)]
                transition-all duration-500 
                md:hover:bg-black/95 md:hover:bg-none md:hover:border-black/40 
                md:hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                md:hover:scale-[1.01]
              "
            >
              <p
                className="
                  text-[11px] sm:text-xs tracking-[0.26em] uppercase text-gray-700 mb-3 
                  transition-colors duration-500 
                  md:group-hover:text-white/70
                "
              >
                Full-Stack · Cloud-Native · AI-Assisted
              </p>
              <p
                className="
                  text-sm sm:text-base text-gray-900 leading-relaxed 
                  transition-colors duration-500 
                  md:group-hover:text-white
                "
              >
                I work like a small, focused product team in one person:
                architecting the stack, building the UI, wiring the APIs, and
                layering in AI and automation where it actually moves the
                needle—never as a gimmick. Repetitive work is delegated to
                reliable systems, while decisions stay human and aligned with
                your brand.
              </p>
            </div>

            {/* Strategy / Execution / Automation Card – MATCHED BASE + HOVER */}
            <div
              className="
                group border border-black/10 bg-gradient-to-br from-white via-gray-50 to-white 
                text-black overflow-hidden 
                shadow-[0_25px_70px_rgba(0,0,0,0.18)] 
                transition-all duration-500 
                md:hover:bg-black/95 md:hover:bg-none md:hover:text-white 
                md:hover:border-black/40 
                md:hover:shadow-[0_30px_80px_rgba(0,0,0,0.28)]
                md:hover:scale-[1.01]
              "
            >
              {/* Mobile layout */}
              <div className="grid grid-cols-1 divide-y divide-black/10 sm:hidden overflow-hidden">
                {executionPillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="px-4 py-5 flex flex-col gap-3 text-gray-900 text-sm leading-relaxed transition-colors duration-500 md:group-hover:text-white"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-600 transition-colors duration-500 md:group-hover:text-white/70">
                      {pillar.title}
                    </p>
                    <p>{pillar.description}</p>
                  </div>
                ))}
              </div>

              {/* Tablet/Desktop layout */}
              <div className="hidden sm:block">
                {/* Header row */}
                <div
                  className="
                    grid grid-cols-3 border-b border-black/10 
                    text-[11px] md:text-[11px] lg:text-xs 
                    font-semibold uppercase 
                    tracking-[0.18em] md:tracking-[0.22em]
                    text-gray-600 transition-colors duration-500 
                    md:group-hover:text-white/70 md:group-hover:border-white/20
                  "
                >
                  {executionPillars.map((pillar, idx) => (
                    <div
                      key={pillar.title}
                      className={[
                        "px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-5",
                        "text-left",
                        idx === 0
                          ? ""
                          : "border-l border-black/10 md:group-hover:border-white/25",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {pillar.title}
                    </div>
                  ))}
                </div>

                {/* Body row */}
                <div
                  className="
                    grid grid-cols-3
                    text-sm
                    leading-relaxed md:leading-6 text-gray-900
                  "
                >
                  {executionPillars.map((pillar, idx) => (
                    <div
                      key={pillar.title}
                      className={[
                        "px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6",
                        "transition-colors duration-500 md:group-hover:text-white",
                        idx === 0
                          ? ""
                          : "border-l border-black/10 md:group-hover:border-white/25",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {pillar.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Process / Architecture Diagram – Soft Premium Hover */}
          <div
            className="
              group relative border border-black/80 bg-white text-black 
              shadow-[0_24px_80px_rgba(0,0,0,0.16)] 
              px-4 sm:px-8 py-6 sm:py-8 overflow-hidden 
              transition-all duration-500 
              md:hover:bg-black/95 md:hover:text-white 
              md:hover:border-white/40 
              md:hover:shadow-[0_30px_90px_rgba(0,0,0,0.25)]
              md:hover:scale-[1.01]
            "
          >
            <div className="hidden sm:block absolute inset-y-6 left-6 w-px bg-gradient-to-b from-black via-black/60 to-transparent md:group-hover:from-white md:group-hover:via-white/60 md:group-hover:to-transparent transition-all duration-500 pointer-events-none" />

            <h3
              className="
                text-[11px] sm:text-xs tracking-[0.24em] uppercase text-gray-800 mb-5 
                transition-colors duration-500
                md:group-hover:text-white/70
              "
            >
              Delivery Blueprint
            </h3>

            <ol className="space-y-6 text-sm text-gray-900 relative pl-0 sm:pl-6">
              {stepTitles.map((title, idx) => (
                <li key={title} className="flex flex-col gap-2">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Simple number label, no circle */}
                    <span
                      className="
                        text-[11px] sm:text-xs font-semibold tracking-[0.24em]
                        text-gray-600 mt-1
                        transition-colors duration-500 md:group-hover:text-white/70
                      "
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold transition-colors duration-500 md:group-hover:text-white">
                        {title}
                      </p>
                      <p className="text-sm text-gray-900 leading-relaxed transition-colors duration-500 md:group-hover:text-white/80">
                        {stepDescriptions[idx]}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

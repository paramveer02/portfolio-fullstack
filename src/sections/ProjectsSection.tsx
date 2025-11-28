import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import DecryptedText from "../components/DecryptedText";
import { projects } from "../constants/projectsData";

export function ProjectsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Track current project based on scroll
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * projects.length),
        projects.length - 1,
      );
      setCurrentProjectIndex(Math.max(0, index));
    });
  }, [scrollYProgress]);

  const currentProject = projects[currentProjectIndex];

  // Parallax for backgrounds
  const leftBgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightBgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-white text-black"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Split Layout */}
        <div className="w-full h-full flex flex-col lg:flex-row">
          {/* LEFT SIDE - Dynamic Text */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center bg-black text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Background Pattern with Parallax */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{ y: leftBgY }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] bg-[size:80px_80px]" />
            </motion.div>

            {/* Animated Diagonal Lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -200]),
                rotate: 45,
              }}
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-white"
                  style={{
                    width: "200%",
                    top: `${i * 25}%`,
                    left: "-50%",
                  }}
                />
              ))}
            </motion.div>

            <motion.div className="relative z-10 w-full max-w-2xl">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="border border-white inline-block px-4 sm:px-6 py-2 mb-8 sm:mb-12 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]"
              >
                <DecryptedText
                  text="FEATURED WORK"
                  animateOn="view"
                  speed={30}
                  maxIterations={15}
                />
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] font-bold mb-4 sm:mb-6 md:mb-8"
              >
                <DecryptedText
                  text="SELECTED"
                  animateOn="view"
                  speed={40}
                  maxIterations={12}
                />
                <br />
                <DecryptedText
                  text="PROJECTS"
                  animateOn="view"
                  speed={40}
                  maxIterations={12}
                />
              </motion.h2>

              {/* Dynamic Project Info - Fixed Container */}
              <div
                className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 relative"
                style={{ minHeight: "250px" }}
              >
                <motion.div
                  key={currentProjectIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 space-y-4 sm:space-y-6"
                >
                  {/* Project Number */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold opacity-50">
                      {currentProject.number}
                    </div>
                    <div className="h-px flex-1 bg-white opacity-30" />
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    {currentProject.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 tracking-wide leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 pt-2 sm:pt-3 md:pt-4">
                    {currentProject.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="border border-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Progress Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12"
              >
                <div className="flex gap-1.5 sm:gap-2">
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className={`h-0.5 sm:h-1 transition-all duration-500 ${
                        index === currentProjectIndex
                          ? "w-12 sm:w-16 bg-white"
                          : "w-6 sm:w-8 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] opacity-50">
                  {currentProjectIndex + 1} / {projects.length}
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Scrolling Projects Rail */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden bg-white">
            {/* Parallax Background Effect */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{ y: rightBgY }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(black_2px,transparent_2px),linear-gradient(90deg,black_2px,transparent_2px)] bg-[size:80px_80px]" />
            </motion.div>

            {/* Projects Rail Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-12 lg:p-20">
              {projects.map((project, index) => {
                // Calculate progress for each project
                const start = index / projects.length;
                const end = (index + 1) / projects.length;

                const projectY = useTransform(
                  scrollYProgress,
                  [start, end],
                  ["100%", "-100%"],
                );
                const projectOpacity = useTransform(
                  scrollYProgress,
                  [start, start + 0.05, end - 0.05, end],
                  [0, 1, 1, 0],
                );
                const projectScale = useTransform(
                  scrollYProgress,
                  [start, start + 0.1, end - 0.1, end],
                  [0.8, 1, 1, 0.8],
                );
                const projectRotate = useTransform(
                  scrollYProgress,
                  [start, end],
                  [5, -5],
                );

                return (
                  <motion.div
                    key={project.title}
                    style={{
                      y: projectY,
                      opacity: projectOpacity,
                      scale: projectScale,
                      rotateZ: projectRotate,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full group">
                      {/* Project Card */}
                      <div className="relative w-full h-full border-2 sm:border-4 md:border-6 lg:border-8 border-black overflow-hidden shadow-2xl">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 text-white">
                          <div className="mb-3 sm:mb-4 md:mb-6">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 md:mb-4">
                              {project.title}
                            </h3>
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mb-2 sm:mb-3 md:mb-4 lg:mb-6 line-clamp-2">
                              {project.description}
                            </p>
                          </div>

                          {/* Tech Stack */}
                          <div className="flex gap-1 sm:gap-2 md:gap-3 flex-wrap">
                            {project.tech.map((tech: string) => (
                              <span
                                key={tech}
                                className="border border-white px-2 sm:px-3 md:px-4 lg:px-6 py-0.5 sm:py-1 md:py-1.5 lg:py-2 text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-wider hover:bg-white hover:text-black transition-all"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* View Project Button */}
                          <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 flex items-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wider">
                              VIEW PROJECT
                            </span>
                            <div className="flex-1 h-px bg-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

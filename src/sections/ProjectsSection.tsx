import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import DecryptedText from "../components/DecryptedText";
import { projects } from "../constants/projectsData";
import Magnet from "../components/Magnet";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiNextdotjs,
  SiStripe,
  SiMongodb,
  SiFirebase,
  SiVuedotjs,
  SiExpress,
  SiMysql,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiDjango,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";
import { IconType } from "react-icons";

// Map technology names to their icons
const techIconMap: { [key: string]: IconType } = {
  React: SiReact,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  "Next.js": SiNextdotjs,
  Stripe: SiStripe,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  "Vue.js": SiVuedotjs,
  Express: SiExpress,
  MySQL: SiMysql,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Django: SiDjango,
  "Tailwind CSS": SiTailwindcss,
  Supabase: SiSupabase,
};

// mobile-specific screenshots by project title
const mobileImageMap: Record<string, string[]> = {
  "BALANCE APP": [
    "/mobile-images/balance/1.png",
    "/mobile-images/balance/2.png",
    "/mobile-images/balance/3.png",
    "/mobile-images/balance/4.png",
    "/mobile-images/balance/5.png",
  ],
  "EVENTSPARK - AI CITY GUIDE": [
    "/mobile-images/eventSpark/1.png",
    "/mobile-images/eventSpark/2.png",
    "/mobile-images/eventSpark/3.png",
    "/mobile-images/eventSpark/4.png",
  ],
  JOBFIX: [
    "/mobile-images/jobfix/1.png",
    "/mobile-images/jobfix/2.png",
    "/mobile-images/jobfix/3.png",
  ],
  "TIC-TAC-TOE": [
    "/mobile-images/tic-tac-toe/1.png",
    "/mobile-images/tic-tac-toe/2.png",
    "/mobile-images/tic-tac-toe/3.png",
  ],
  "CHEZ GOPI — ITALIAN RESTAURANT": [
    "/mobile-images/chez-gopi/1.png",
    "/mobile-images/chez-gopi/2.png",
    "/mobile-images/chez-gopi/3.png",
    "/mobile-images/chez-gopi/4.png",
  ],
  "SMART AI DASHBOARD": [
    "/mobile-images/chez-gopi/Admin-1.png",
    "/mobile-images/chez-gopi/Admin-2.png",
    "/mobile-images/chez-gopi/Admin-3.png",
    "/mobile-images/chez-gopi/Admin-4.png",
  ],
};

// shared disclaimer text
const PORTFOLIO_DISCLAIMER =
  "These demos use free-tier hosting, which may briefly spin up on first load.\nThey are privately deployed portfolio websites — and are intended only for evaluation.";

// Individual project card
interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  currentProjectIndex: number;
  currentImageIndex: { [key: number]: number };
  onImageChange: (
    projectIndex: number,
    direction: 1 | -1,
    total: number,
  ) => void;
  images: string[];
}

function ProjectCard({
  project,
  index,
  scrollYProgress,
  currentProjectIndex,
  currentImageIndex,
  onImageChange,
  images,
}: ProjectCardProps) {
  const imageSet =
    images.length > 0
      ? images
      : project.images
      ? project.images
      : project.image
      ? [project.image]
      : [];
  const totalImages = imageSet.length;
  const shouldReduceMotion = useReducedMotion();
  const totalProjects = projects.length;
  const start = index / totalProjects;
  const end = (index + 1) / totalProjects;

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
    shouldReduceMotion ? [1, 1, 1, 1] : [0.95, 1, 1, 0.95],
  );
  const projectRotate = useTransform(
    scrollYProgress,
    [start, end],
    shouldReduceMotion ? [0, 0] : [2, -2],
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [hasActivated, setHasActivated] = useState(index === 0);

  useEffect(() => {
    if (Math.abs(currentProjectIndex - index) <= 1) {
      setHasActivated(true);
    }
  }, [currentProjectIndex, index]);

  const handleTouchStart = () => {
    setIsTouched(true);
    setTimeout(() => setIsTouched(false), 3000);
  };

  const shouldRenderImages = hasActivated && imageSet.length > 0;

  return (
    <motion.div
      style={{
        y: projectY,
        opacity: projectOpacity,
        scale: projectScale,
        rotateZ: projectRotate,
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="relative w-full h-full group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onClick={() => {
          if (!project.link) return;
          window.open(project.link, "_blank", "noopener,noreferrer");
        }}
      >
        {/* Project Card */}
        <div className="relative w-full h-full border-2 sm:border-4 md:border-6 lg:border-8 border-black overflow-hidden shadow-2xl">
          {/* Grid bg */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] bg-[size:100px_100px] opacity-5" />
          </div>

          {/* Mobile Tap Indicator */}
          <div className="absolute top-4 right-4 md:hidden z-30">
            <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <span>Tap to view</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>

          {/* Image Slideshow */}
          <div className="relative w-full h-full">
            {shouldRenderImages ? (
              <>
                {imageSet.map((img: string, imgIndex: number) => (
                  <div
                    key={imgIndex}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                      opacity:
                        (currentImageIndex[index] || 0) === imgIndex ? 1 : 0,
                      zIndex:
                        (currentImageIndex[index] || 0) === imgIndex ? 1 : 0,
                    }}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} - ${imgIndex + 1}`}
                      className="w-full h-full object-contain"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                      width={800}
                      height={600}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-xs tracking-[0.2em] uppercase">
                Loading preview…
              </div>
            )}

            {/* Mobile arrows for rail (hidden >= md) */}
            {totalImages > 1 && shouldRenderImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageChange(index, -1, totalImages);
                  }}
                  className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/40 bg-black/75 text-white flex items-center justify-center text-base shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white z-30"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageChange(index, 1, totalImages);
                  }}
                  className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-black/20 bg-white/95 text-black flex items-center justify-center text-base shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black z-30"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}

            {/* Stripe effect */}
            {index === currentProjectIndex && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10">
                {[...Array(40)].map((_, i) => {
                  const isLeftSide = i < 20;
                  const stripeIndex = isLeftSide ? i : 39 - i;
                  const centerDistance = Math.abs(stripeIndex - 19.5);

                  return (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 bg-black group-hover:[animation-play-state:running]"
                      style={{
                        left: `${(i / 40) * 100}%`,
                        width: "2.5%",
                        transformOrigin: "center",
                        transform: "scaleX(0)",
                        animation: `stripeReveal 0.5s ease-out ${
                          centerDistance * 0.015
                        }s forwards`,
                        animationPlayState:
                          isHovered || isTouched ? "running" : "paused",
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Overlay + CTA */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500"
            style={{ opacity: isHovered || isTouched ? 0.7 : 0.6 }}
          />

          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"
            style={{ opacity: isHovered || isTouched ? 1 : 0 }}
          >
            <Magnet padding={80} magnetStrength={8}>
              <button
                className="neon-pulse-btn px-8 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5 md:py-6 backdrop-blur-md bg-black/40 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 rounded disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => {
                  if (!project.link) return;
                  window.open(project.link, "_blank", "noopener,noreferrer");
                }}
                disabled={!project.link}
                aria-label={`View ${project.title} project`}
              >
                <p className="text-cyan-400 text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.15em] uppercase font-['Space_Grotesk',_sans-serif]">
                  {project.link ? "EXPERIENCE LIVE" : "PRIVATE DEMO"}
                </p>
              </button>
            </Magnet>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const [isMobileDevice, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});

  const getImageSet = (project?: (typeof projects)[0]) => {
    if (!project) return [];
    const fallback = project.images ?? (project.image ? [project.image] : []);
    if (isMobileDevice) {
      const mobileSet = mobileImageMap[project.title];
      if (mobileSet?.length) return mobileSet;
    }
    return fallback;
  };

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Track scroll -> current project (desktop only)
  useEffect(() => {
    if (isMobileDevice) return;
    return scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * projects.length),
        projects.length - 1,
      );
      setCurrentProjectIndex(Math.max(0, index));
    });
  }, [scrollYProgress, isMobileDevice]);

  // Auto slideshow for desktop rail
  useEffect(() => {
    if (isMobileDevice) return;
    const project = projects[currentProjectIndex];
    const images =
      project?.images ?? (project?.image ? [project.image] : []);
    const intervalTime = 3500;

    if (!shouldReduceMotion && isInView && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => ({
          ...prev,
          [currentProjectIndex]:
            ((prev[currentProjectIndex] || 0) + 1) % images.length,
        }));
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [currentProjectIndex, shouldReduceMotion, isInView, isMobileDevice]);

  const currentProject = projects[currentProjectIndex];

  const handleImageChange = (
    projectIndex: number,
    direction: 1 | -1,
    total: number,
  ) => {
    if (total <= 0) return;
    setCurrentImageIndex((prev) => {
      const current = prev[projectIndex] || 0;
      const next = (current + direction + total) % total;
      return { ...prev, [projectIndex]: next };
    });
  };

  const leftBgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightBgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const diagonalY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobileDevice ? -50 : -200],
  );

  /* ---------------- MOBILE LAYOUT ---------------- */
  if (isMobileDevice) {
    return (
      <section
        id="projects"
        className="bg-white text-black py-12 sm:py-16 px-4 sm:px-6"
      >
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          <div className="text-center space-y-3">
            <p className="inline-block px-4 py-2 border border-black bg-black text-white text-xs tracking-[0.3em] uppercase">
              Featured Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Web &amp; Mobile experiences ready for launch.
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              A curated set of builds pairing modern stacks with automation so
              releases stay predictable.
            </p>
            {/* mobile disclaimer, near the top */}
            <p className="mt-2 text-[10px] sm:text-xs text-gray-500 leading-relaxed max-w-md mx-auto text-center flex items-start justify-center gap-1">
              <span className="mt-[2px] text-gray-400">✶</span>
              <span>{PORTFOLIO_DISCLAIMER}</span>
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {projects.map((project, idx) => {
              const imageSet = getImageSet(project);
              const totalImages = imageSet.length;
              const currentIdx = currentImageIndex[idx] || 0;
              const displayedImage =
                imageSet[currentIdx] ?? imageSet[0] ?? project.image ?? "";

              return (
                <div
                  key={project.title}
                  className="border-2 border-black bg-white shadow-lg flex flex-col gap-4 p-5 sm:p-6"
                >
                  {/* IMAGE + SIDE CONTROLS ON MOBILE */}
                  <div className="relative w-full h-56 sm:h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <ImageWithFallback
                      src={displayedImage}
                      alt={project.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />

                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={() =>
                            handleImageChange(idx, -1, totalImages)
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 text-white flex items-center justify-center text-base shadow-md border border-white/40"
                          aria-label="Previous image"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() =>
                            handleImageChange(idx, 1, totalImages)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-base shadow-md border border-black/40"
                          aria-label="Next image"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  {/* TEXT + TAGS */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-500">
                      <span>{project.number}</span>
                      <div className="flex-1 mx-3 h-px bg-gray-200" />
                      <span>{project.tech.slice(0, 2).join(" • ")}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => {
                      const Icon = techIconMap[tech];
                      return (
                        <span
                          key={tech}
                          className="flex items-center gap-1 px-3 py-1 border border-black text-xs font-medium"
                        >
                          {Icon && <Icon className="w-3.5 h-3.5" />} {tech}
                        </span>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      if (!project.link) return;
                      window.open(
                        project.link,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    disabled={!project.link}
                    className="mt-2 inline-flex items-center justify-center w-full border border-black bg-black text-white py-2 text-sm font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {project.link ? "EXPERIENCE LIVE" : "PRIVATE DEMO"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- DESKTOP LAYOUT ---------------- */
  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-white text-black"
      style={{
        height: shouldReduceMotion
          ? "280vh"
          : isMobileDevice
          ? "320vh"
          : "380vh",
      }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full h-full flex flex-col md:flex-row">
          {/* LEFT: TEXT */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center bg-black text-white relative overflow-hidden px-4 sm:px-6 md:px-8">
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{ y: shouldReduceMotion ? 0 : leftBgY }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] bg-[size:100px_100px]" />
            </motion.div>

            {!shouldReduceMotion && !isMobileDevice && (
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{ y: diagonalY, rotate: 45 }}
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
            )}

            <motion.div className="relative z-10 w-full max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="inline-block px-4 sm:px-6 py-2 mb-8 sm:mb-12 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]"
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#000000",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  transition: "all 0.3s ease",
                }}
              >
                <DecryptedText
                  text="FEATURED WORK"
                  animateOn="view"
                  speed={30}
                  maxIterations={15}
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] font-bold mb-4 sm:mb-6 md:mb-8"
              >
                <DecryptedText
                  text="DEPLOYED"
                  animateOn="view"
                  speed={40}
                  maxIterations={12}
                />
                <br />
                <DecryptedText
                  text="WEBSITES"
                  animateOn="view"
                  speed={40}
                  maxIterations={12}
                />
              </motion.h2>

              {/* desktop disclaimer: subtle line under heading, left side */}
              <p className="mb-4 sm:mb-5 md:mb-6 text-[10px] sm:text-xs text-gray-400 leading-relaxed max-w-sm flex items-start gap-1">
                <span className="mt-[2px] text-gray-500">✶</span>
                <span>{PORTFOLIO_DISCLAIMER}</span>
              </p>

              <div
                className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 relative"
                style={{ minHeight: "280px" }}
              >
                <motion.div
                  key={currentProjectIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 space-y-3 sm:space-y-4 md:space-y-5"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold opacity-50 flex-shrink-0 min-w-[4rem] sm:min-w-[5rem] md:min-w-[6rem]">
                      {currentProject.number}
                    </div>
                    <div className="h-px flex-1 bg-white opacity-30" />
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    {currentProject.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg text-gray-400 tracking-wide leading-relaxed">
                    {currentProject.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 pt-1 sm:pt-2">
                    {currentProject.tech.map((tech: string) => {
                      const Icon = techIconMap[tech];
                      return (
                        <span
                          key={tech}
                          className="border border-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-1.5 sm:gap-2"
                        >
                          {Icon && (
                            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                          )}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: RAIL */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-white">
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{ y: shouldReduceMotion ? 0 : rightBgY }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(black_2px,transparent_2px),linear-gradient(90deg,black_2px,transparent_2px)] bg-[size:100px_100px]" />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-12 lg:p-20">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  currentProjectIndex={currentProjectIndex}
                  currentImageIndex={currentImageIndex}
                  onImageChange={handleImageChange}
                  images={getImageSet(project)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

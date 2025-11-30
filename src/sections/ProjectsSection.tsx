import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
  SiTailwindcss
} from "react-icons/si";
import { IconType } from "react-icons";

// Map technology names to their icons
const techIconMap: { [key: string]: IconType } = {
  "React": SiReact,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  "PostgreSQL": SiPostgresql,
  "Next.js": SiNextdotjs,
  "Stripe": SiStripe,
  "MongoDB": SiMongodb,
  "Firebase": SiFirebase,
  "Vue.js": SiVuedotjs,
  "Express": SiExpress,
  "MySQL": SiMysql,
  "JavaScript": SiJavascript,
  "TypeScript": SiTypescript,
  "Python": SiPython,
  "Django": SiDjango,
  "Tailwind CSS": SiTailwindcss,
};

export function ProjectsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Track current project based on scroll
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * projects.length),
        projects.length - 1,
      );
      setCurrentProjectIndex(Math.max(0, index));
    });
  }, [scrollYProgress]);

  // Image slideshow for each project - Only run for current active project
  useEffect(() => {
    const project = projects[currentProjectIndex];
    
    if (project && project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [currentProjectIndex]: ((prev[currentProjectIndex] || 0) + 1) % project.images!.length
        }));
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [currentProjectIndex]);

  const currentProject = projects[currentProjectIndex];

  // Memoized parallax transforms to reduce redundant calculations
  const leftBgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightBgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const diagonalY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-white text-black"
      style={{ height: "800vh" }}
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
                y: diagonalY,
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
                className="inline-block px-4 sm:px-6 py-2 mb-8 sm:mb-12 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#000000',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  transition: 'all 0.3s ease'
                }}
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
                    {currentProject.tech.map((tech: string) => {
                      const Icon = techIconMap[tech];
                      return (
                        <span
                          key={tech}
                          className="border border-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-1.5 sm:gap-2"
                        >
                          {Icon && <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />}
                          {tech}
                        </span>
                      );
                    })}
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
                    <div className="relative w-full h-full group cursor-pointer">
                      {/* Project Card */}
                      <div className="relative w-full h-full border-2 sm:border-4 md:border-6 lg:border-8 border-black overflow-hidden shadow-2xl">
                        {/* Image Slideshow Container */}
                        <div className="relative w-full h-full">
                          {/* Multiple Images for Slideshow */}
                          {(project.images || [project.image]).map((img: string, imgIndex: number) => (
                            <div
                              key={imgIndex}
                              className="absolute inset-0 transition-opacity duration-1000"
                              style={{
                                opacity: (currentImageIndex[index] || 0) === imgIndex ? 1 : 0,
                                zIndex: (currentImageIndex[index] || 0) === imgIndex ? 1 : 0,
                              }}
                            >
                              <ImageWithFallback
                                src={img}
                                alt={`${project.title} - ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          
                          {/* Vertical Line Stripe Effect - TV Opening Style - Bidirectional from Center */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10">
                            {[...Array(40)].map((_, i) => {
                              const isLeftSide = i < 20;
                              const stripeIndex = isLeftSide ? i : (39 - i);
                              const centerDistance = Math.abs(stripeIndex - 19.5);
                              
                              return (
                                <div
                                  key={i}
                                  className="absolute top-0 bottom-0 bg-black group-hover:[animation-play-state:running]"
                                  style={{
                                    left: `${(i / 40) * 100}%`,
                                    width: '2.5%',
                                    transformOrigin: 'center',
                                    transform: 'scaleX(0)',
                                    animation: `stripeReveal 0.5s ease-out ${centerDistance * 0.015}s forwards`,
                                    animationPlayState: 'paused',
                                  }}
                                />
                              );
                            })}
                          </div>
                        </div>

                        {/* Subtle Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
                        
                        {/* Central Magnet CTA - Appears on Hover with Neon Pulse */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                          <Magnet
                            padding={80}
                            magnetStrength={8}
                            wrapperClassName=""
                          >
                            <button
                              className="neon-pulse-btn px-8 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5 md:py-6 backdrop-blur-md bg-black/40 cursor-pointer"
                              onClick={() => {
                                // Add your navigation logic here
                                console.log('Navigate to project:', project.title);
                              }}
                            >
                              <p className="text-cyan-400 text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.15em] uppercase font-['Space_Grotesk',_sans-serif]">
                                View Project
                              </p>
                            </button>
                          </Magnet>
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

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaReact } from "react-icons/fa";
import { IconType } from "react-icons";
import DecryptedText from "../components/DecryptedText";
import Stack from "../components/Stack";
import { skills, techIcons } from "../constants/skillsData";

type SkillCard = {
  id: number;
  category: string;
  tech: string[];
  icon: IconType;
};

export function SkillsSection() {
  const ref = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardDimensions = useMemo(() => {
    const width = viewportWidth;
    if (width < 360) return { width: 220, height: 320 };
    if (width < 480) return { width: 260, height: 360 };
    if (width < 640) return { width: 300, height: 400 };
    if (width < 768) return { width: 360, height: 460 };
    if (width < 1024) return { width: 420, height: 540 };
    return { width: 560, height: 640 };
  }, [viewportWidth]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={ref}
      id="skills"
      className="min-h-screen bg-black text-white py-16 sm:py-24 md:py-32 overflow-hidden px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Parallax Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] bg-[size:100px_100px]" />
      </motion.div>

      {/* Rotating Geometric Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 border-2 border-white/10 pointer-events-none"
        style={{ rotate: bgRotate }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-32 h-32 border-2 border-white/10 pointer-events-none"
        style={{
          rotate: useTransform(scrollYProgress, [0, 1], [360, 0]),
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div 
            className="inline-block px-4 sm:px-6 py-2 mb-6 sm:mb-8 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]"
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
              text="TECHNICAL ARSENAL"
              animateOn="view"
              speed={30}
              maxIterations={15}
            />
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6">
            <DecryptedText
              text="SKILLS"
              animateOn="view"
              speed={40}
              maxIterations={12}
            />
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 tracking-wider">
            <DecryptedText
              text="DRAG TO EXPLORE"
              animateOn="view"
              speed={25}
              maxIterations={10}
            />
          </p>
        </motion.div>

        {/* Stack Container */}
        <div className="flex items-center justify-center min-h-[420px] sm:min-h-[560px] md:min-h-[700px]">
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={cardDimensions}
            cardsData={skills}
            animationConfig={{ stiffness: 260, damping: 20 }}
          >
            {(card) => {
              const skillCard = card as SkillCard;
              const CategoryIcon = skillCard.icon;
              return (
                <div className="w-full h-full border-4 border-white overflow-hidden bg-white text-black relative group transition-all duration-700 hover:border-black">
                  {/* Background that inverts on hover */}
                  <div className="absolute inset-0 bg-white group-hover:bg-black transition-all duration-700" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 group-hover:text-white transition-colors duration-700">
                    <div className="flex flex-col items-center flex-grow">
                      {/* Category Title with Icon */}
                      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
                        <div className="p-2 sm:p-3 md:p-4 border-2 border-black group-hover:border-white transition-colors duration-700 flex-shrink-0">
                          <CategoryIcon className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12" />
                        </div>
                        <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center break-words max-w-full tracking-tight">
                          {skillCard.category}
                        </h3>
                      </div>

                      {/* Tech Stack with Individual Icons */}
                      <div className="space-y-2 sm:space-y-3 md:space-y-4 w-full overflow-x-hidden overflow-y-auto pr-1 touch-auto">
                        {skillCard.tech.map((item: string) => {
                          const TechIcon = techIcons[item] || FaReact;
                          return (
                            <div
                              key={item}
                              className="flex items-center justify-start gap-2 sm:gap-3 md:gap-4 border-b border-black group-hover:border-white pb-2 sm:pb-3 transition-colors duration-700"
                            >
                              <TechIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" />
                              <span className="text-sm sm:text-base md:text-lg tracking-wide">
                                {item}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Stack>
        </div>
      </div>
    </section>
  );
}

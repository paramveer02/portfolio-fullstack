import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
        <div className="absolute inset-0 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:60px_60px]" />
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
              text="DRAG TO EXPLORE • HOVER TO INTERACT"
              animateOn="view"
              speed={25}
              maxIterations={10}
            />
          </p>
        </motion.div>

        {/* Stack Container */}
        <div className="flex items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={{
              width:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? 280
                  : typeof window !== "undefined" && window.innerWidth < 768
                    ? 380
                    : typeof window !== "undefined" && window.innerWidth < 1024
                      ? 480
                      : 650,
              height:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? 400
                  : typeof window !== "undefined" && window.innerWidth < 768
                    ? 480
                    : typeof window !== "undefined" && window.innerWidth < 1024
                      ? 560
                      : 650,
            }}
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
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 group-hover:text-white transition-colors duration-700">
                    {/* Top Section */}
                    <div className="flex flex-col items-center">
                      {/* Category Title with Icon */}
                      <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-8 md:mb-12">
                        <div className="p-3 sm:p-4 md:p-5 border-2 border-black group-hover:border-white transition-colors duration-700 flex-shrink-0">
                          <CategoryIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-center break-words max-w-full">
                          {skillCard.category}
                        </h3>
                      </div>
                    </div>

                    {/* Tech Stack with Individual Icons */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-5 w-full overflow-hidden">
                      {skillCard.tech.map((item: string) => {
                        const TechIcon = techIcons[item] || FaReact;
                        return (
                          <div
                            key={item}
                            className="flex items-center justify-start gap-3 sm:gap-4 md:gap-5 border-b border-black group-hover:border-white pb-3 sm:pb-4 transition-colors duration-700"
                          >
                            <TechIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" />
                            <span className="text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">
                              {item}
                            </span>
                          </div>
                        );
                      })}
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

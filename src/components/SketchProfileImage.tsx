import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import profileImage from '@/assets/profile-image.png';

export function SketchProfileImage({ className = '' }: { className?: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle 3D parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        className="relative w-full"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '2000px',
        }}
      >
        {/* Main Container with Glazing Border Effect */}
        <motion.div
          className="relative"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          whileHover={{
            scale: 1.03,
            rotateY: 3,
            rotateX: -2,
            transition: { duration: 0.5, ease: 'easeOut' },
          }}
        >
          {/* Animated Glazing Border Effect - Outer Glow */}
          <motion.div
            className="absolute -inset-2 rounded-lg pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, #ffffff, #000000, #ffffff, #000000)',
              backgroundSize: '300% 300%',
              filter: 'blur(8px)',
              opacity: 0.4,
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Sharp Border Frame - Thicker and More Prominent */}
          <motion.div
            className="absolute -inset-2 sm:-inset-3 md:-inset-4 border-4 sm:border-[6px] md:border-8 border-white pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Animated Corner Accents - Larger */}
            <motion.div
              className="absolute top-0 left-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-t-[6px] sm:border-t-8 md:border-t-[10px] border-l-[6px] sm:border-l-8 md:border-l-[10px] border-white"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-t-[6px] sm:border-t-8 md:border-t-[10px] border-r-[6px] sm:border-r-8 md:border-r-[10px] border-white"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-b-[6px] sm:border-b-8 md:border-b-[10px] border-r-[6px] sm:border-r-8 md:border-r-[10px] border-white"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-b-[6px] sm:border-b-8 md:border-b-[10px] border-l-[6px] sm:border-l-8 md:border-l-[10px] border-white"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5,
              }}
            />
          </motion.div>

          {/* Sleek Black Background */}
          <div 
            className="absolute inset-0 bg-black"
            style={{
              transform: 'translateZ(-5px)',
            }}
          />

          {/* Main Profile Image - Black & White with Modern Styling */}
          <motion.div 
            className="relative p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src={profileImage}
              alt="Param Marwah"
              className="w-full h-auto relative z-10 select-none"
              style={{
                filter: 'grayscale(100%) contrast(1.15) brightness(1.05) drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                transform: 'translateZ(10px)',
              }}
              draggable={false}
            />

            {/* Scanning Line Effect */}
            <motion.div
              className="absolute left-0 right-0 h-0.5 pointer-events-none z-20"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
              }}
              animate={{
                top: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 1,
              }}
            />
          </motion.div>

          {/* Grid Overlay for Tech Feel - Larger grid */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-10 z-5"
            style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '100px 100px',
            }}
            animate={{
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Minimal Stats Cards - Sleek Design */}
          <motion.div
            className="absolute -bottom-4 -right-4 bg-white text-black px-6 py-4 z-30"
            initial={{ opacity: 0, x: 30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: 'backOut' }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255,255,255,0.6)',
              transition: { duration: 0.3 }
            }}
            style={{
              transform: 'translateZ(40px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            <div className="text-3xl font-bold tracking-tight">4+</div>
            <div className="text-[9px] tracking-[0.25em] mt-0.5 opacity-70">YEARS</div>
          </motion.div>

          <motion.div
            className="absolute -top-4 -left-4 bg-white text-black px-6 py-4 z-30"
            initial={{ opacity: 0, x: -30, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: 'backOut' }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255,255,255,0.6)',
              transition: { duration: 0.3 }
            }}
            style={{
              transform: 'translateZ(40px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            <div className="text-3xl font-bold tracking-tight">50+</div>
            <div className="text-[9px] tracking-[0.25em] mt-0.5 opacity-70">PROJECTS</div>
          </motion.div>
        </motion.div>

        {/* Bottom Label - Sleek Modern Design */}
        <motion.div
          className="absolute -bottom-20 left-0 right-0 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div 
            className="inline-block bg-white text-black px-8 py-3 relative overflow-hidden"
            style={{
              boxShadow: '0 10px 30px rgba(255,255,255,0.3)',
            }}
          >
            <span className="tracking-[0.35em] text-xs font-bold relative z-10">FULL STACK DEVELOPER</span>
            
            {/* Animated Underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-black"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { Mail, MessageCircle, Github, Linkedin } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects for background
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.05, 0.1, 0.05],
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-white text-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Parallax Background Grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(black_1px,transparent_1px),linear-gradient(90deg,black_1px,transparent_1px)] bg-[size:80px_80px]" />
      </motion.div>

      {/* Floating Circles */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full border border-black/10 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full border border-black/10 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.8]),
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto"
      >
        {/* MOBILE LAYOUT */}
        <div className="md:hidden space-y-8">
          {/* Name First on Mobile - Two Lines */}
          <div className="w-full">
            <h1 
              className="w-full text-center leading-[0.85] font-light uppercase text-black"
              style={{
                fontSize: 'clamp(3rem, 15vw, 5rem)',
                letterSpacing: '0.05em',
                fontStretch: 'condensed'
              }}
            >
              PARAMVIR
              <br />
              MARWAH
            </h1>
          </div>

          {/* Tagline */}
          <div className="text-center px-4">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-gray-800 uppercase mb-3">
              Hire Different ™
            </h3>
            <p className="text-xs text-gray-700 max-w-xs mx-auto leading-relaxed">
              Full-stack developer with 4+ years of experience building production-ready web applications.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="mailto:paramvir.marwah@gmail.com"
              className="flex h-10 w-10 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://github.com/paramveer02"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/paramvirmarwah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* Contact Info - Simplified for Mobile */}
          <div className="space-y-4 text-center px-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-600 block mb-1">Email</span>
              <a href="mailto:paramvir.marwah@gmail.com" className="text-sm text-gray-900 hover:underline">
                paramvir.marwah@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-600 block mb-1">Location</span>
              <span className="text-sm text-gray-900">Strasbourg · France (EU)</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-600 block mb-1">Stack</span>
              <span className="text-sm text-gray-900">React, Next.js, Node.js, TypeScript</span>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:block">
          {/* TOP ROW: CENTERED BLOCK */}
          <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-12 md:items-start text-center">
            {/* LEFT: intro + icons */}
            <div className="md:col-span-4 space-y-4 sm:space-y-6 mx-auto">
              <h3 className="text-base sm:text-lg font-semibold tracking-[0.15em] sm:tracking-[0.18em] text-gray-800 uppercase">
                Hire Different ™
              </h3>

              <p className="text-sm sm:text-base text-gray-700 max-w-sm mx-auto">
                Full-stack developer with 4+ years of experience building bold,
                production-ready web applications with modern JavaScript, React,
                and Node.js.
              </p>

              {/* Quick contact icons */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
                <a
                  href="mailto:paramvir.marwah@gmail.com"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>

                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>

                <a
                  href="https://github.com/paramveer02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>

                <a
                  href="https://linkedin.com/in/paramvirmarwah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
              </div>
            </div>

          {/* RIGHT: CONTACT + INFO, CENTERED */}
          <div className="md:col-span-8 grid gap-8 sm:gap-10 sm:grid-cols-2 text-sm sm:text-base">
            {/* CONTACT COLUMN */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-800">
                Contact
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-gray-900">
                <li className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                    Email
                  </span>
                  <a
                    href="mailto:paramvir.marwah@gmail.com"
                    className="text-gray-900 hover:underline underline-offset-4 decoration-2 transition-all duration-300 break-all"
                  >
                    paramvir.marwah@gmail.com
                  </a>
                </li>

                <li className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                    WhatsApp
                  </span>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:underline underline-offset-4 decoration-2 transition-all duration-300"
                  >
                    Available for calls & chats
                  </a>
                </li>

                <li className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                    LinkedIn
                  </span>
                  <a
                    href="https://linkedin.com/in/paramvirmarwah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:underline underline-offset-4 decoration-2 transition-all duration-300"
                  >
                    /in/paramvirmarwah
                  </a>
                </li>

                <li className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                    GitHub
                  </span>
                  <a
                    href="https://github.com/paramveer02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:underline underline-offset-4 decoration-2 transition-all duration-300"
                  >
                    /paramveer02
                  </a>
                </li>
              </ul>
            </div>

            {/* INFO COLUMN */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-800">
                Info
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-gray-900">
                <li className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                    Location
                  </span>
                  <span>Strasbourg · France (EU)</span>
                </li>

                <li className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                    Experience
                  </span>
                  <span>4+ years · Full-stack development</span>
                </li>

                <li className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                    Availability
                  </span>
                  <span>Open to freelance & full-time roles</span>
                </li>

                <li className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                    Stack
                  </span>
                  <span>React, Next.js, Node.js, TypeScript</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

        {/* BIG NAME – Desktop Only, Single Line */}
        <div className="hidden md:block mt-12 sm:mt-16 md:mt-20 mb-6 sm:mb-8 w-full px-2">
          <h1 
            className="w-full text-center leading-none font-light uppercase text-black text-[12vw] sm:text-[11vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw]"
            style={{
              letterSpacing: '0.08em',
              fontStretch: 'condensed'
            }}
          >
            PARAMVIR MARWAH
          </h1>
        </div>
      </motion.div>
    </section>
  );
}

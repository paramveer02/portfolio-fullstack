import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { ContactForm } from "../components/contact/ContactForm";

const WHATSAPP_LINK =
  "https://wa.me/4917643835327?text=Hi%20Paramvir,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [showForm, setShowForm] = useState(false);

  // Close form on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showForm) {
        setShowForm(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showForm]);

  const SocialButtons = () => (
    <div className="social-circle-grid">
      <a
        href="mailto:service@monpro-ai.com"
        aria-label="Email"
        className="social-card tl email focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
      <a
        href="https://www.linkedin.com/in/paramveer-marwah/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="social-card tr linkedin focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
      <a
        href="https://github.com/paramveer02"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="social-card bl github focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <Github className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="social-card br whatsapp focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <SiWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );

  // Parallax effects for background
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.02]);

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
        <div className="absolute inset-0 bg-[linear-gradient(black_2px,transparent_2px),linear-gradient(90deg,black_2px,transparent_2px)] bg-[size:100px_100px]" />
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
          {/* Tagline */}
          <div className="text-center px-4">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-gray-800 uppercase mb-3">
              Let&apos;s Build Together
            </h3>
            <p className="text-xs text-gray-700 max-w-xs mx-auto leading-relaxed">
              Full-stack developer + AI automation consultant. Available for small
              business websites, dashboards, and automation systems.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center pt-2">
            <SocialButtons />
          </div>

          {/* Contact Info - Mobile */}
          <div className="space-y-4 text-center px-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-600 block mb-1">
                Outlook Email
              </span>
              <a
                href="mailto:service@monpro-ai.com"
                className="text-sm text-gray-900 hover:underline"
              >
                service@monpro-ai.com
              </a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-600 block mb-1">
                Phone &amp; WhatsApp
              </span>
              <span className="text-sm text-gray-900 block mb-2">
                +49 176 43835327
              </span>
              <div className="flex justify-center gap-6">
                <a
                  href="tel:+4917643835327"
                  className="text-xs text-gray-700 hover:underline"
                >
                  Call
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-700 hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-600 block mb-1">
                Location
              </span>
              <span className="text-sm text-gray-900">
                Leipzig · Germany (EU)
              </span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-600 block mb-1">
                Stack
              </span>
              <span className="text-sm text-gray-900">
                React, Next.js, Node.js, TypeScript
              </span>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-12 md:items-start text-center">
            {/* LEFT: intro + icons */}
            <div className="md:col-span-4 space-y-4 sm:space-y-6 mx-auto">
              <h3 className="text-base sm:text-lg font-semibold tracking-[0.15em] sm:tracking-[0.18em] text-gray-800 uppercase">
                Let&apos;s Build Together
              </h3>
              <p className="text-sm sm:text-base text-gray-700 max-w-sm mx-auto">
                Full-stack developer + AI automation consultant. I build modern
                web apps and automation systems for small businesses and startups.
              </p>
              <div className="flex items-center justify-center pt-2">
                <SocialButtons />
              </div>
            </div>

            {/* RIGHT: CONTACT + INFO */}
            <div className="md:col-span-8 grid gap-8 sm:gap-10 sm:grid-cols-2 text-sm sm:text-base">
              {/* Contact column */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-800">
                  Contact
                </h4>
                <ul className="space-y-3 sm:space-y-4 text-gray-900">
                  <li className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                      Outlook Email
                    </span>
                    <a
                      href="mailto:service@monpro-ai.com"
                      className="text-gray-900 hover:underline underline-offset-4 decoration-2 break-all"
                    >
                      service@monpro-ai.com
                    </a>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                      Phone &amp; WhatsApp
                    </span>
                    <span className="text-gray-900">
                      +49 176 43835327
                    </span>
                    {/* <div className="flex gap-6 mt-1">
                      <a
                        href="tel:+4917643835327"
                        className="text-xs text-gray-700 hover:underline underline-offset-4"
                      >
                        Call
                      </a>
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-700 hover:underline underline-offset-4"
                      >
                        WhatsApp
                      </a>
                    </div> */}
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                      LinkedIn
                    </span>
                    <a
                      href="https://www.linkedin.com/in/paramveer-marwah/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline underline-offset-4 decoration-2"
                    >
                      /in/paramveer-marwah
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
                      className="text-gray-900 hover:underline underline-offset-4 decoration-2"
                    >
                      /paramveer02
                    </a>
                  </li>
                </ul>
              </div>

              {/* Info column */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-800">
                  Info
                </h4>
                <ul className="space-y-3 sm:space-y-4 text-gray-900">
                  <li className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                      Location
                    </span>
                    <span>Leipzig · Germany (EU)</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                      Experience
                    </span>
                    <span>4 years · Full-stack development</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gray-600">
                      Availability
                    </span>
                    <span>Open to freelance & collaborations</span>
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

        {/* CTA above footer name */}
        <div className="w-full mt-10 sm:mt-12 md:mt-14 mb-6 sm:mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="animated-border-btn w-full text-center leading-none font-light uppercase text-black"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              letterSpacing: "0.08em",
            }}
            aria-label="Open contact form"
          >
            <span className="box">Let&apos;s Connect!</span>
          </button>
        </div>
      </motion.div>

      {/* Overlay contact form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowForm(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, y: 18 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl mx-4 rounded-2xl border border-white/15 bg-white/95 shadow-2xl"
          >
            <button
              onClick={() => setShowForm(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 grid place-items-center w-10 h-10 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white hover:scale-110 transition-all shadow-lg"
            >
              ✕
            </button>
            <div className="p-6">
              <ContactForm onClose={() => setShowForm(false)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

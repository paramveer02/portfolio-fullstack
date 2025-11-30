import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import BubbleMenu from "./BubbleMenu";
import { HeroSection } from "../sections/HeroSection";
import { AboutSection } from "../sections/AboutSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { SkillsSection } from "../sections/SkillsSection";
import { ContactSection } from "../sections/ContactSection";
import { menuItems, scrollToSection } from "../constants/menuItems";

export function Portfolio() {
  const containerRef = useRef(null);

  const [menuColors, setMenuColors] = useState({
    menuBg: "#ffffff",
    menuContentColor: "#000000",
    isOnWhiteSection: false
  });

  // Detect section background and update menu colors - Throttled scroll handler
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const aboutSection = document.getElementById("about");
        const contactSection = document.getElementById("contact");
        
        if (aboutSection && contactSection) {
          const aboutRect = aboutSection.getBoundingClientRect();
          const contactRect = contactSection.getBoundingClientRect();
          
          // Check if we're in a white section (about or contact)
          // Check both top of viewport (for menu button) and middle of viewport (for opened menu)
          const checkPosition = window.innerHeight / 2;
          if ((aboutRect.top < checkPosition && aboutRect.bottom > checkPosition) || 
              (contactRect.top < checkPosition && contactRect.bottom > checkPosition) ||
              (aboutRect.top < 100 && aboutRect.bottom > 100) || 
              (contactRect.top < 100 && contactRect.bottom > 100)) {
            setMenuColors({
              menuBg: "#000000",
              menuContentColor: "#ffffff",
              isOnWhiteSection: true
            });
          } else {
            setMenuColors({
              menuBg: "#ffffff",
              menuContentColor: "#000000",
              isOnWhiteSection: false
            });
          }
        }

        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Override link clicks to use smooth scroll - Attach once with cleanup
  useEffect(() => {
    const links = document.querySelectorAll(".pill-link");
    
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      const href = target.getAttribute("href");
      if (href) {
        scrollToSection(href);
      }
    };

    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });





  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
      className="relative bg-black text-white"
    >
      <BubbleMenu
        logo={null}
        items={menuItems}
        menuAriaLabel="Toggle navigation"
        menuBg={menuColors.menuBg}
        menuContentColor={menuColors.menuContentColor}
        isOnWhiteSection={menuColors.isOnWhiteSection}
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
      <HeroSection scrollProgress={scrollYProgress} />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </motion.div>
  );
}

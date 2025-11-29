import { motion, useScroll } from "motion/react";
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

  // Detect section background and update menu colors
  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Override link clicks to use smooth scroll
  const handleMenuMount = () => {
    setTimeout(() => {
      const links = document.querySelectorAll(".pill-link");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const href = link.getAttribute("href");
          if (href) {
            scrollToSection(href);
          }
        });
      });
    }, 100);
  };
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
      className="bg-black text-white"
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
        onMenuClick={handleMenuMount}
      />
      <HeroSection scrollProgress={scrollYProgress} />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </motion.div>
  );
}

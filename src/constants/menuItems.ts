export const menuItems = [
  {
    label: "home",
    href: "#hero",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
  {
    label: "skills",
    href: "#skills",
    ariaLabel: "Skills",
    rotation: 8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#000000", textColor: "#ffffff" },
  },
];

export const scrollToSection = (href: string) => {
  const sectionId = href.replace("#", "");
  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

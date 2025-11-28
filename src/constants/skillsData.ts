import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaPython,
  FaGitAlt,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiKubernetes,
  SiFirebase,
} from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { TbBrandReactNative } from "react-icons/tb";

// Tech icon mapping with react-icons
export const techIcons: Record<string, any> = {
  React: FaReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  "Node.js": FaNodeJs,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: DiMysql,
  Redis: SiRedis,
  GraphQL: SiGraphql,
  AWS: FaAws,
  Docker: FaDocker,
  Kubernetes: SiKubernetes,
  Git: FaGitAlt,
  Python: FaPython,
  "React Native": TbBrandReactNative,
  Firebase: SiFirebase,
  Figma: FaFigma,
};

export const skills = [
  {
    id: 1,
    category: "FRONTEND",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
    ],
    icon: FaReact,
  },
  {
    id: 2,
    category: "BACKEND",
    tech: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
    ],
    icon: FaNodeJs,
  },
  {
    id: 3,
    category: "DEVOPS",
    tech: ["AWS", "Docker", "Kubernetes", "Git", "Redis"],
    icon: FaAws,
  },
  {
    id: 4,
    category: "MOBILE",
    tech: [
      "React Native",
      "Firebase",
      "TypeScript",
      "Python",
      "Figma",
    ],
    icon: TbBrandReactNative,
  },
];

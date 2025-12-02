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
  FaDatabase,
  FaBrain,
  FaCogs,
  FaRobot,
  FaTools,
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
  SiPytorch,
  SiTensorflow,
  SiOpenai,
  SiExpo,
  SiSocketdotio,
  SiDjango,
  SiVercel,
  SiNetlify,
  SiRender,
  SiSupabase,
} from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { TbApi, TbBrandReactNative, TbTopologyStar3 } from "react-icons/tb";
import { IconType } from "react-icons";

// Tech icon mapping with react-icons
export const techIcons: Record<string, IconType> = {
  React: FaReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  "Node.js": FaNodeJs,
  Express: SiExpress,
  "REST APIs": TbApi,
  WebSockets: SiSocketdotio,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: DiMysql,
  Redis: SiRedis,
  GraphQL: SiGraphql,
  AWS: FaAws,
  Docker: FaDocker,
  Kubernetes: SiKubernetes,
  Git: FaGitAlt,
  "CI/CD": FaCogs,
  Python: FaPython,
  Django: SiDjango,
  "React Native": TbBrandReactNative,
  Expo: SiExpo,
  Firebase: SiFirebase,
  Figma: FaFigma,
  "PyTorch": SiPytorch,
  TensorFlow: SiTensorflow,
  "OpenAI API": SiOpenai,
  LangChain: TbTopologyStar3,
  Cursor: FaRobot,
  Copilot: FaRobot,
  "n8n": FaCogs,
  AgentKit: FaRobot,
  Sora: FaBrain,
  "Make.com": FaCogs,
  Render: SiRender,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Supabase: SiSupabase,
};

export type Skill = {
  id: number;
  category: string;
  tech: string[];
  icon: IconType;
};

export const skills: Skill[] = [
  {
    id: 1,
    category: "FRONTEND",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
    ],
    icon: FaReact,
  },
  {
    id: 2,
    category: "BACKEND",
    tech: [
      "Node.js",
      "Express",
      "REST APIs",
      "Python",
      "Django",
    ],
    icon: FaNodeJs,
  },
  {
    id: 3,
    category: "DATABASES",
    tech: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    icon: FaDatabase,
  },
  {
    id: 4,
    category: "DEVOPS & TOOLS",
    tech: ["Git", "Docker", "CI/CD", "AWS"],
    icon: FaTools,
  },
  {
    id: 5,
    category: "AI & AUTOMATION",
    tech: ["OpenAI API", "Cursor", "Copilot", "n8n", "AgentKit", "Sora", "Make.com"],
    icon: FaBrain,
  },
  {
    id: 6,
    category: "DEPLOYMENT",
    tech: ["Render", "Vercel", "Netlify", "Supabase", "Firebase"],
    icon: FaCogs,
  },
];

/**
 * Type Definitions
 * Centralized type definitions for the portfolio
 */

import { ReactNode } from "react";
import { MotionValue } from "motion/react";

// ============================================
// PROJECT TYPES
// ============================================

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  number: string;
  url?: string;
  github?: string;
}

// ============================================
// SKILL TYPES
// ============================================

export interface Skill {
  id: number;
  category: string;
  tech: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface TechIconMap {
  [key: string]: React.ComponentType<{ size?: number; className?: string }>;
}

// ============================================
// MENU TYPES
// ============================================

export interface MenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
}

// ============================================
// ANIMATION TYPES
// ============================================

export interface ScrollProgress {
  scrollYProgress: MotionValue<number>;
}

export interface ParallaxConfig {
  y?: MotionValue<number>;
  opacity?: MotionValue<number>;
  scale?: MotionValue<number>;
  rotate?: MotionValue<number>;
}

export interface AnimationConfig {
  stiffness: number;
  damping: number;
}

export interface ViewportConfig {
  once?: boolean;
  amount?: number;
  margin?: string;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface SectionProps {
  id?: string;
  className?: string;
}

export interface HeroSectionProps extends SectionProps {
  scrollProgress: MotionValue<number>;
}

export interface CardStackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cardDimensions: {
    width: number;
    height: number;
  };
  cardsData: Skill[];
  animationConfig?: AnimationConfig;
  children: (card: Skill, index: number) => ReactNode;
}

// ============================================
// UTILITY TYPES
// ============================================

export type DeviceType = "mobile" | "tablet" | "desktop";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveValue<T> {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}

export interface Dimensions {
  width: number;
  height: number;
}

// ============================================
// STAT TYPES
// ============================================

export interface Stat {
  number: string;
  label: string;
  delay: number;
}

// ============================================
// CONTACT TYPES
// ============================================

export interface SocialLink {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  location: string;
  experience: string;
  availability: string;
  stack: string;
}

// ============================================
// DECRYPTED TEXT TYPES
// ============================================

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover" | "both";
}

// ============================================
// PARTICLE TYPES
// ============================================

export interface Particle {
  left: string;
  top: string;
  delay: number;
  duration: number;
}

// ============================================
// HELPER TYPE UTILITIES
// ============================================

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

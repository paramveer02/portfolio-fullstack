/**
 * Animation Utilities
 * Common animation configurations and presets used across sections
 */

import type { Variants } from "framer-motion";

// Scroll offsets for section animations
export const scrollOffsets = {
  section: ["start start", "end start"] as [string, string],
  sectionFull: ["start start", "end end"] as [string, string],
  element: ["start end", "end start"] as [string, string],
};

// Common parallax ranges
export const parallaxRanges = {
  slow: [0, 100] as [number, number],
  medium: [0, 200] as [number, number],
  fast: [0, 300] as [number, number],
  reverse: [100, -100] as [number, number],
};

// Opacity fade presets
export const opacityPresets = {
  fadeOut: [1, 0.5, 0] as [number, number, number],
  fadeIn: [0, 0.5, 1] as [number, number, number],
  pulse: [0.05, 0.1, 0.05] as [number, number, number],
};

// Scale presets
export const scalePresets = {
  shrink: [1, 0.8] as [number, number],
  grow: [1, 1.2] as [number, number],
  bounce: [0.8, 1] as [number, number],
};

// Common viewport animation variants
export const viewportVariants: Record<string, Variants> = {
  fadeUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    initial: { opacity: 0, scale: 0.8, rotateZ: -5 },
    animate: { opacity: 1, scale: 1, rotateZ: 0 },
  },
};

// Transition presets
export const transitionPresets = {
  smooth: { duration: 0.8, ease: "easeOut" },
  fast: { duration: 0.5, ease: "easeOut" },
  slow: { duration: 1.2, ease: "easeOut" },
  spring: { type: "spring", stiffness: 100, damping: 15 },
  bounce: { type: "spring", stiffness: 260, damping: 20 },
};

// Hover animation presets
export const hoverPresets = {
  lift: { y: -10, scale: 1.02 },
  scale: { scale: 1.05 },
  rotate: { scale: 1.1, rotate: 5 },
  glow: { scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" },
};

// Stagger configurations
export const staggerConfigs = {
  list: {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  },
  listFast: {
    animate: {
      transition: { staggerChildren: 0.05 },
    },
  },
  listSlow: {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  },
};

// Infinite animation presets
export const infiniteAnimations = {
  pulse: {
    animate: {
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.5, 1],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  rotate: {
    animate: { rotate: 360 },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
  rotateReverse: {
    animate: { rotate: -360 },
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    },
  },
  float: {
    animate: { y: [0, 10, 0] },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Viewport observer options
export const viewportOptions = {
  once: { once: true, amount: 0.3 },
  oncePartial: { once: true, amount: 0.1 },
  repeat: { once: false, amount: 0.3 },
};

/**
 * Generate random particle positions
 */
export const generateParticles = (count: number) => {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));
};

/**
 * Create staggered delay
 */
export const getStaggerDelay = (index: number, baseDelay = 0, stagger = 0.1) => {
  return baseDelay + index * stagger;
};

import { Transition, Variants } from "framer-motion";

// Shared easing and transition presets for consistent, smooth motion across the app.
// Use a loose type for easing to satisfy framer-motion TypeScript definitions.
export const easing: any = [0.2, 0.85, 0.25, 0.95];

export const defaultTransition: Transition = {
  duration: 0.45,
  // framer-motion expects an Easing type; provide a tuple but keep any typing above
  ease: easing,
};

export const shortTransition: Transition = {
  duration: 0.28,
  ease: easing,
};

export const fadeInUp: any = {
  initial: { opacity: 0, y: 12, scale: 0.997 },
  animate: { opacity: 1, y: 0, scale: 1, transition: defaultTransition },
  exit: { opacity: 0, y: -8, transition: shortTransition },
};

export const staggerContainer: any = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};

export function prefersReducedMotion(): boolean {
  try {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

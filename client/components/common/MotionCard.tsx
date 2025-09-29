import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, prefersReducedMotion } from "@/lib/motion";

export default function MotionCard({ children, className = "", style = {} }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const reduce = prefersReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={fadeInUp} className={className} style={style}>
      {children}
    </motion.div>
  );
}

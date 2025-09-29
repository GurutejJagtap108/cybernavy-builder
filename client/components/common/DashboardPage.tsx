import { motion } from "framer-motion";
import { ReactNode } from "react";
import { pageTransition, dashboardStagger, prefersReducedMotion } from "@/lib/motion";

interface DashboardPageProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export function DashboardPage({ children, title, className = "" }: DashboardPageProps) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return (
      <div className={`space-y-6 ${className}`}>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h2 
        className="text-3xl font-bold mb-4"
        variants={pageTransition}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={dashboardStagger}
        initial="initial"
        animate="animate"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
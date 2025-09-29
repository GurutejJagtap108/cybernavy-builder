import { motion, AnimatePresence } from "framer-motion";

export function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : "page"}
        initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -32, filter: "blur(8px)" }}
        transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fadeInUp, shortTransition, defaultTransition, prefersReducedMotion } from "@/lib/motion";
import { useLocation } from "react-router-dom";

export function PageFade({ children }: { children: React.ReactNode }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  // When the location changes, show the overlay. We'll hide it when the new page's entrance animation completes.
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      setShowOverlay(true);
    }
  }, [location.pathname]);

  // Safety: hide overlay after a max time in case animation callbacks don't fire.
  useEffect(() => {
    if (!showOverlay) return;
    const t = setTimeout(() => setShowOverlay(false), 1000);
    return () => clearTimeout(t);
  }, [showOverlay]);

  return (
    <>
      {/* Overlay that covers the viewport on mount and fades out — uses CSS var for theme-aware color */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key={`page-overlay-${location.pathname}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: prefersReducedMotion() ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={shortTransition}
            onAnimationComplete={() => setShowOverlay(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              pointerEvents: "none",
              // compute a runtime-safe background that prefers dark theme when document has .dark
              background:
                (typeof document !== "undefined" && document.documentElement.classList.contains("dark"))
                  ? "hsl(217 33% 4%)"
                  : "hsl(var(--background))",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={typeof window !== "undefined" ? window.location.pathname : "page"}
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          exit={fadeInUp.exit}
          transition={defaultTransition}
          // Ensure the page wrapper has an explicit theme-aware background so it never shows transparent
          style={{
            minHeight: "100vh",
            background:
              (typeof document !== "undefined" && document.documentElement.classList.contains("dark"))
                ? "hsl(217 33% 4%)"
                : "hsl(var(--background))",
          }}
          onAnimationComplete={() => setShowOverlay(false)}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

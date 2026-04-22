import React from "react";
import { motion } from "framer-motion";

/*
  Reveal — smooth fade-in + slight upward motion on scroll
*/
export default function Reveal({
  children,
  delay = 0,
  y = 36,
  once = true,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
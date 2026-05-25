import { motion } from "motion/react";
import { ReactNode } from "react";

export function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, type: "spring", stiffness: 90, damping: 14 }}
      whileHover={{ y: -6, scale: 1.015 }}
      className={`group relative rounded-3xl p-6 md:p-7 glass-strong overflow-hidden transition-shadow hover:shadow-[0_0_40px_-10px_oklch(0.78_0.16_320/0.6)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.78 0.16 320 / 0.18), transparent 50%)",
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

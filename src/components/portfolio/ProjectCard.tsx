import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { ReactNode } from "react";

export function ProjectCard({
  title,
  tag,
  children,
  source,
  demo,
  accent = "pink",
}: {
  title: string;
  tag: string;
  children: ReactNode;
  source?: string;
  demo?: string;
  accent?: "pink" | "cyan";
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15 });
  const sy = useSpring(my, { stiffness: 150, damping: 15 });
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  return (
    <motion.div
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
    >
      <motion.div
        onPointerMove={(e) => {
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className={`relative rounded-3xl p-7 md:p-8 glass-strong overflow-hidden ${
          accent === "pink" ? "hover:glow-ring" : "hover:glow-ring-cyan"
        } transition-shadow`}
      >
        <div
          aria-hidden
          className="absolute -inset-[1px] rounded-3xl opacity-40 pointer-events-none"
          style={{
            background:
              accent === "pink"
                ? "radial-gradient(600px circle at 20% 0%, oklch(0.78 0.16 320 / 0.25), transparent 50%)"
                : "radial-gradient(600px circle at 80% 100%, oklch(0.74 0.14 220 / 0.25), transparent 50%)",
          }}
        />
        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{tag}</div>
          <h3 className="mt-2 font-display text-2xl md:text-3xl">{title}</h3>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{children}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {source && (
              <motion.a
                href={source}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> Source
              </motion.a>
            )}
            {demo && (
              <motion.a
                href={demo}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-primary-foreground"
                style={{ background: "var(--gradient-text)", boxShadow: "var(--shadow-glow)" }}
              >
                <ExternalLink className="h-4 w-4" /> Live demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

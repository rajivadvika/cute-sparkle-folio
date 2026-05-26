import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { Rocket, Code2, Trophy, Coffee } from "lucide-react";

const stats = [
  { icon: Rocket, label: "Projects shipped", value: 12, suffix: "+" },
  { icon: Code2, label: "LeetCode solved", value: 350, suffix: "+" },
  { icon: Trophy, label: "Hackathons", value: 6, suffix: "" },
  { icon: Coffee, label: "Cups of chai", value: 999, suffix: "+" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, to, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 110, damping: 16 }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 14 } }}
            className="relative overflow-hidden rounded-3xl glass-strong p-5 hover:glow-ring"
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl"
              style={{ background: "var(--gradient-text)" }}
            />
            <div
              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "var(--gradient-text)", color: "var(--primary-foreground)" }}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="mt-4 font-display text-3xl md:text-4xl tabular-nums text-gradient">
              <Counter to={s.value} />
              {s.suffix}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export function HeroBlob() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 15 });
  const sy = useSpring(my, { stiffness: 80, damping: 15 });
  const rotX = useTransform(sy, [-1, 1], [15, -15]);
  const rotY = useTransform(sx, [-1, 1], [-15, 15]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: 1000 }}>
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]"
      >
        {/* outer halo */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: "var(--gradient-text)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* main torus blob */}
        <motion.div
          className="absolute inset-6 rounded-full glass-strong glow-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg, oklch(0.78 0.16 320 / 0.6), oklch(0.74 0.14 220 / 0.6), oklch(0.82 0.14 100 / 0.5), oklch(0.78 0.16 320 / 0.6))",
          }}
        >
          <div className="absolute inset-[18%] rounded-full bg-background/70 backdrop-blur-2xl border border-white/10 flex items-center justify-center">
            <motion.span
              className="text-6xl md:text-8xl"
              animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦
            </motion.span>
          </div>
        </motion.div>
        {/* floating sparkles */}
        {[
          { x: "8%", y: "12%", d: 0 },
          { x: "82%", y: "18%", d: 0.6 },
          { x: "78%", y: "78%", d: 1.2 },
          { x: "10%", y: "72%", d: 1.8 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute h-3 w-3 rounded-full"
            style={{
              left: s.x,
              top: s.y,
              background: "var(--gradient-text)",
              boxShadow: "var(--shadow-glow)",
            }}
            animate={{ y: [0, -10, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "motion/react";

export function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t?.closest("a, button, [role=button], input, textarea, label"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%", background: "var(--gradient-text)" }}
        className="fixed left-0 right-0 top-0 z-[60] h-[3px]"
      />
      {visible && (
        <>
          <motion.div
            style={{ x: sx, y: sy }}
            className="pointer-events-none fixed left-0 top-0 z-[55] -ml-3 -mt-3 h-6 w-6 rounded-full mix-blend-screen"
            animate={{ scale: hovering ? 1.8 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{ background: "var(--gradient-text)", filter: "blur(8px)", opacity: 0.7 }}
            />
          </motion.div>
          <motion.div
            style={{ x: sx, y: sy }}
            className="pointer-events-none fixed left-0 top-0 z-[56] -ml-1 -mt-1 h-2 w-2 rounded-full bg-foreground"
            animate={{ scale: hovering ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </>
      )}
    </>
  );
}

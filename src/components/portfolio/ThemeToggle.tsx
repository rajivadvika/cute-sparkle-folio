import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as "dark" | "light" | null) ?? "dark";
    setTheme(stored);
    document.documentElement.classList.toggle("light", stored === "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08, rotate: theme === "dark" ? -8 : 8 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      aria-label="Toggle theme"
      className="fixed top-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full glass-strong hover:glow-ring overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

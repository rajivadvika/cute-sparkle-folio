import { motion } from "motion/react";
import { Briefcase, CalendarDays } from "lucide-react";

type Experience = {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "Serious Rooster IT Services",
    dates: "Summer 2025",
    bullets: [
      "Custom Software Development: Engineered and optimized custom software features to support business-critical applications.",
      "Quality & Testing: Collaborated with the engineering team to implement testing protocols, increasing code reliability and deployment stability.",
      "Agile Delivery: Operated within structured governance frameworks, participating in review cadences to ensure traceable decisions and continuous improvement.",
    ],
  },
];

export function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Vertical glowing line */}
      <div
        aria-hidden
        className="absolute left-4 md:left-6 top-2 bottom-2 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.78 0.16 320 / 0.6), oklch(0.74 0.14 220 / 0.6), transparent)",
        }}
      />

      <ol className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.li
            key={`${exp.company}-${i}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 90, damping: 14 }}
            className="relative pl-14 md:pl-20"
          >
            {/* Node */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="absolute left-0 md:left-1 top-2 grid h-9 w-9 md:h-11 md:w-11 place-items-center rounded-full glass-strong"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <Briefcase className="h-4 w-4 md:h-5 md:w-5" />
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative rounded-3xl p-6 md:p-7 glass-strong hover:glow-ring transition-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl md:text-2xl">{exp.role}</h3>
                  <div className="mt-1 text-sm md:text-base text-gradient font-medium">
                    {exp.company}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" /> {exp.dates}
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {exp.bullets.map((b, bi) => {
                  const [label, rest] = b.includes(":")
                    ? [b.slice(0, b.indexOf(":")), b.slice(b.indexOf(":") + 1).trim()]
                    : ["", b];
                  return (
                    <li key={bi} className="flex gap-3 text-sm md:text-[15px] leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--gradient-text)" }}
                      />
                      <span className="text-muted-foreground">
                        {label && <span className="text-foreground font-medium">{label}: </span>}
                        {rest}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

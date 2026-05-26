import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Github, Linkedin, ArrowDown, Sparkles, Code2, Database, Palette, MapPin, GraduationCap, Mic, Users, Briefcase } from "lucide-react";
import { HeroBlob } from "@/components/portfolio/HeroBlob";
import { BentoCard } from "@/components/portfolio/BentoCard";
import { TrackCard } from "@/components/portfolio/TrackCard";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { Navbar } from "@/components/portfolio/Navbar";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { StatsStrip } from "@/components/portfolio/StatsStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Advika — CSE @ CEC | Portfolio" },
      {
        name: "description",
        content:
          "Advika — Computer Engineering, Class of 2027 at CEC. Backend systems, algorithms, compiler design — built with an eye for design.",
      },
      { property: "og:title", content: "Advika — CSE @ CEC | Portfolio" },
      { property: "og:description", content: "Computer Engineering, Class of 2027. Building scalable backend systems with an eye for design." },
    ],
  }),
  component: Index,
});

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 md:px-8 ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 90, damping: 14 }}
      className="mb-10 md:mb-14"
    >
      <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{kicker}</div>
      <h2 className="mt-2 font-display text-3xl md:text-5xl text-gradient">{title}</h2>
    </motion.div>
  );
}

function Index() {
  return (
    <main className="min-h-screen pb-24">
      {/* HERO */}
      <Section className="pt-20 md:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 14 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
            >
              <Sparkles className="h-3.5 w-3.5" /> available for collabs & internships
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 80, damping: 14 }}
              className="mt-5 font-display text-5xl md:text-7xl leading-[1.05]"
            >
              Hi, I'm <span className="text-gradient">Advika.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Computer Engineering · Class of 2027 · Building scalable backend systems with an eye for design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="https://github.com/rajivadvika"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08, rotate: -4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                aria-label="GitHub"
                className="grid h-12 w-12 place-items-center rounded-full glass hover:glow-ring"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/advika-rajiv-299511298/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08, rotate: 4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                aria-label="LinkedIn"
                className="grid h-12 w-12 place-items-center rounded-full glass hover:glow-ring-cyan"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#work"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="ml-1 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground"
                style={{ background: "var(--gradient-text)", boxShadow: "var(--shadow-glow)" }}
              >
                View my work
                <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  <ArrowDown className="h-4 w-4" />
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
          <HeroBlob />
        </div>
      </Section>

      {/* ABOUT BENTO */}
      <Section className="pt-28 md:pt-40">
        <SectionTitle kicker="about · skills · vibe" title="A little about me" />
        <div className="grid gap-5 md:grid-cols-3 md:auto-rows-[200px]">
          <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" /> bio
              </div>
              <p className="mt-4 font-display text-2xl md:text-3xl leading-snug">
                Studying B.Tech at <span className="text-gradient">College of Engineering Chengannur</span> — obsessed with algorithmic analysis, compiler design, and clean backend architecture.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Off-screen, you'll find me chasing trains and chai across India — every place a new edge case for the city-side of life.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Chengannur, Kerala · roaming pan-India
            </div>
          </BentoCard>

          <BentoCard delay={0.05}>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" /> tech stack
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: "C++", icon: <Code2 className="h-3.5 w-3.5" /> },
                { label: "Python", icon: <Code2 className="h-3.5 w-3.5" /> },
                { label: "React", icon: <Code2 className="h-3.5 w-3.5" /> },
                { label: "Postgres", icon: <Database className="h-3.5 w-3.5" /> },
                { label: "Figma", icon: <Palette className="h-3.5 w-3.5" /> },
              ].map((s) => (
                <motion.span
                  key={s.label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs"
                >
                  {s.icon} {s.label}
                </motion.span>
              ))}
            </div>
          </BentoCard>

          <BentoCard delay={0.1}>
            <TrackCard />
          </BentoCard>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="work" className="pt-28 md:pt-40">
        <SectionTitle kicker="featured projects" title="Things I've built" />
        <div className="grid gap-6 md:grid-cols-2">
          <ProjectCard
            tag="systems · databases"
            title="NanoDB"
            accent="pink"
            source="https://github.com/rajivadvika"
            demo="#"
          >
            An embedded, lightweight database using B+ trees for indexed lookups and HNSW graphs for vector
            similarity search. Designed with a strict focus on time-complexity optimization end-to-end.
          </ProjectCard>
          <ProjectCard
            tag="ai · prompt engineering"
            title="AI Password Generator"
            accent="cyan"
            source="https://github.com/rajivadvika"
            demo="#"
          >
            A dynamic password-generator game built with advanced prompt engineering — the model riffs,
            you score. Memorable, secure, and weirdly fun.
          </ProjectCard>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section className="pt-28 md:pt-40">
        <SectionTitle kicker="experience" title="Where I've worked" />
        <ExperienceTimeline />
      </Section>

      {/* LEADERSHIP */}
      <Section className="pt-28 md:pt-40">
        <SectionTitle kicker="leadership · community" title="Beyond the code" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: <Briefcase className="h-4 w-4" />,
              role: "Placement Coordinator",
              blurb: "Strategic planning, recruiter relations, and helping classmates land their first roles.",
            },
            {
              icon: <Users className="h-4 w-4" />,
              role: "College Union — Lady Representative",
              blurb: "Community leadership and student advocacy — making sure every voice on campus lands somewhere it matters.",
            },
            {
              icon: <Mic className="h-4 w-4" />,
              role: "RJ at CEC FY",
              blurb: "On-air storytelling — communication, creativity, and the occasional terrible pun, live.",
            },
          ].map((r, i) => (
            <motion.div
              key={r.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 90, damping: 14 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl p-6 glass-strong hover:glow-ring transition-shadow"
            >
              <div
                className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-text)", color: "var(--primary-foreground)" }}
              >
                {r.icon}
              </div>
              <h3 className="mt-4 font-display text-lg">{r.role}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.blurb}</p>
              <div className="absolute right-5 top-5 text-xs text-muted-foreground tabular-nums">0{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section className="pt-28 md:pt-40">
        <SectionTitle kicker="get in touch" title="Say hi 👋" />
        <div className="rounded-3xl glass-strong p-6 md:p-10">
          <ContactForm />
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          Built with too much chai. © {new Date().getFullYear()} Advika.
        </p>
      </Section>
    </main>
  );
}

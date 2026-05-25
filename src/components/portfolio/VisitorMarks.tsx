import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

type Mark = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const schema = z.object({
  name: z.string().trim().min(1, "Add a name").max(40),
  message: z.string().trim().min(1, "Leave a little something").max(140),
});

const HUES = [320, 220, 100, 280, 350, 180];

function hashHue(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return HUES[Math.abs(h) % HUES.length];
}

export function VisitorMarks() {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("visitor_marks")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false })
        .limit(80);
      if (!cancelled && data) setMarks(data as Mark[]);
    })();

    const channel = supabase
      .channel("visitor_marks_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "visitor_marks" },
        (payload) => {
          setMarks((prev) => [payload.new as Mark, ...prev].slice(0, 80));
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the inputs");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("visitor_marks").insert(parsed.data);
    setLoading(false);
    if (error) {
      toast.error("Couldn't leave your mark — try again");
      return;
    }
    toast.success("Mark left ✨");
    setName("");
    setMessage("");
  };

  // pre-computed scattered positions for marks
  const positioned = useMemo(
    () =>
      marks.map((m, i) => {
        const hue = hashHue(m.id);
        const seed = (parseInt(m.id.replace(/[^0-9a-f]/g, "").slice(0, 6), 16) || i + 1) % 1000;
        const rot = ((seed % 11) - 5) * 1.4; // -7° .. +7°
        return { ...m, hue, rot };
      }),
    [marks],
  );

  const field =
    "w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-[oklch(0.78_0.16_320)] focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_oklch(0.78_0.16_320/0.18)]";

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
      {/* form */}
      <form onSubmit={onSubmit} className="rounded-3xl glass-strong p-6 md:p-7 self-start">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" /> leave your mark
        </div>
        <h3 className="mt-3 font-display text-2xl">Sign the wall ✨</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Drop a tiny note — it shows up live for everyone who visits.
        </p>
        <div className="mt-5 grid gap-3">
          <input
            className={field}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            required
          />
          <textarea
            className={`${field} min-h-[90px] resize-none`}
            placeholder="A short message (140 chars)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={140}
            required
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{message.length}/140</span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-70"
              style={{ background: "var(--gradient-text)", boxShadow: "var(--shadow-glow)" }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Leave a mark
            </motion.button>
          </div>
        </div>
      </form>

      {/* canvas */}
      <div className="relative min-h-[420px] rounded-3xl glass overflow-hidden p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(600px circle at 30% 20%, oklch(0.78 0.16 320 / 0.18), transparent 60%), radial-gradient(500px circle at 80% 80%, oklch(0.74 0.14 220 / 0.15), transparent 60%)",
          }}
        />
        {positioned.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
            be the first to leave a mark ✦
          </div>
        )}
        <div className="relative flex flex-wrap gap-3 p-2">
          <AnimatePresence initial={false}>
            {positioned.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: m.rot }}
                exit={{ opacity: 0, scale: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="max-w-[220px] rounded-2xl px-4 py-3 backdrop-blur-md border"
                style={{
                  background: `oklch(0.97 0.01 280 / 0.05)`,
                  borderColor: `oklch(0.78 0.12 ${m.hue} / 0.4)`,
                  boxShadow: `0 0 24px -8px oklch(0.78 0.16 ${m.hue} / 0.5)`,
                }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: `oklch(0.85 0.14 ${m.hue})` }}
                >
                  {m.name}
                </div>
                <div className="mt-1 text-sm leading-snug">{m.message}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contacts").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Couldn't send — please try again");
      return;
    }
    toast.success("Message sent! ✨ I'll get back to you soon", {
      description: "Thanks for reaching out 💌",
    });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const field =
    "w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-[oklch(0.78_0.16_320)] focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_oklch(0.78_0.16_320/0.18),0_0_30px_-5px_oklch(0.78_0.16_320/0.6)]";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <input
        className={field}
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        maxLength={100}
      />
      <input
        type="email"
        className={field}
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        maxLength={255}
      />
      <input
        className={`${field} md:col-span-2`}
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        maxLength={30}
      />
      <textarea
        className={`${field} md:col-span-2 min-h-[140px] resize-none`}
        placeholder="What's on your mind?"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        maxLength={2000}
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="md:col-span-2 group relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-medium text-primary-foreground disabled:opacity-70"
        style={{ background: "var(--gradient-text)", boxShadow: "var(--shadow-glow)" }}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            Send message
            <Sparkles className="h-4 w-4 opacity-80" />
          </>
        )}
      </motion.button>
    </form>
  );
}

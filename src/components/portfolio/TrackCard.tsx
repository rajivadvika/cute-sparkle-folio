import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Music, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Track = {
  song_title: string;
  artist: string;
  cover_url: string | null;
  spotify_link: string | null;
};

const FALLBACK: Track = {
  song_title: "Standing Next to You",
  artist: "Jungkook",
  cover_url: null,
  spotify_link: null,
};

export function TrackCard() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("track_of_the_day")
        .select("song_title, artist, cover_url, spotify_link")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (cancelled) return;
      setTrack(data ?? FALLBACK);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const t = track ?? FALLBACK;

  return (
    <div className="flex items-center gap-4">
      {/* spinning vinyl */}
      <motion.div
        className="relative h-20 w-20 shrink-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.16 0.02 280) 0 22%, oklch(0.21 0.025 280) 22% 24%, oklch(0.16 0.02 280) 24% 100%)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        {t.cover_url ? (
          <img
            src={t.cover_url}
            alt=""
            className="absolute inset-[28%] rounded-full object-cover"
          />
        ) : (
          <div className="absolute inset-[28%] rounded-full bg-gradient-to-br from-[oklch(0.78_0.16_320)] to-[oklch(0.74_0.14_220)]" />
        )}
        <div className="absolute inset-[44%] rounded-full bg-background border border-white/10" />
      </motion.div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Music className="h-3 w-3" /> RJ's Track of the Day
        </div>
        <div className={`mt-1 font-display text-lg leading-tight truncate ${loading ? "opacity-60" : ""}`}>
          {t.song_title}
        </div>
        <div className="text-sm text-muted-foreground truncate">{t.artist}</div>
        {/* sound bars */}
        <div className="mt-2 flex items-end gap-[3px] h-4">
          {[0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.45].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-[oklch(0.78_0.16_320)] to-[oklch(0.82_0.14_100)]"
              animate={{ scaleY: [h * 0.5, h, h * 0.5] }}
              transition={{ duration: 0.9 + i * 0.07, repeat: Infinity, ease: "easeInOut" }}
              style={{ height: "100%", originY: 1 }}
            />
          ))}
        </div>
      </div>

      {t.spotify_link && (
        <a
          href={t.spotify_link}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full p-2 glass hover:glow-ring transition-all"
          aria-label="Open in Spotify"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

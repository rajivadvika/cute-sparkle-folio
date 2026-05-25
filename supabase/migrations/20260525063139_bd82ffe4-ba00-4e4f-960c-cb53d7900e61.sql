
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contacts" ON public.contacts FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.track_of_the_day (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  song_title TEXT NOT NULL,
  artist TEXT NOT NULL,
  cover_url TEXT,
  spotify_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.track_of_the_day ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Track is publicly readable" ON public.track_of_the_day FOR SELECT TO anon, authenticated USING (true);

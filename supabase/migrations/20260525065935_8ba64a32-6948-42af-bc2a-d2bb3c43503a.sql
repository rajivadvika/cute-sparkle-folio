CREATE TABLE public.visitor_marks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.visitor_marks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Marks are publicly readable"
ON public.visitor_marks FOR SELECT
USING (true);

CREATE POLICY "Anyone can leave a valid mark"
ON public.visitor_marks FOR INSERT
WITH CHECK (
  length(name) >= 1 AND length(name) <= 40
  AND length(message) >= 1 AND length(message) <= 140
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_marks;
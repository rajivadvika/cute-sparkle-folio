
DROP POLICY "Anyone can submit contacts" ON public.contacts;
CREATE POLICY "Anyone can submit valid contacts" ON public.contacts FOR INSERT TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(message) BETWEEN 1 AND 2000
  AND (phone IS NULL OR length(phone) <= 30)
);

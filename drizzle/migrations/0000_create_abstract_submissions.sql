CREATE TABLE public.abstract_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  affiliation text,
  submission_type text NOT NULL,
  category text,
  title text NOT NULL,
  authors text,
  abstract_body text NOT NULL,
  keywords text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.abstract_submissions TO anon;
GRANT INSERT ON public.abstract_submissions TO authenticated;
GRANT ALL ON public.abstract_submissions TO service_role;

ALTER TABLE public.abstract_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an abstract"
ON public.abstract_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

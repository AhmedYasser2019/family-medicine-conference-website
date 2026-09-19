CREATE TABLE public.attendee_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  affiliation TEXT,
  category_id TEXT NOT NULL,
  category_label TEXT NOT NULL,
  rate_period TEXT NOT NULL,
  amount_sar INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'SAR',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  provider TEXT NOT NULL DEFAULT 'moyasar',
  provider_invoice_id TEXT,
  provider_payment_id TEXT,
  confirmation_email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_attendee_registrations_invoice ON public.attendee_registrations (provider_invoice_id);

GRANT ALL ON public.attendee_registrations TO service_role;

ALTER TABLE public.attendee_registrations ENABLE ROW LEVEL SECURITY;

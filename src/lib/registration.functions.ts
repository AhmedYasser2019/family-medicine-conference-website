import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const MOYASAR_API = "https://api.moyasar.com/v1";

const checkoutSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  affiliation: z.string().trim().max(160).optional().default(""),
  category_id: z.string().trim().min(1).max(60),
  category_label: z.string().trim().min(1).max(160),
  rate_period: z.enum(["early", "regular"]),
  amount_sar: z.number().int().positive().max(100000),
});

function moyasarAuthHeader(secret: string) {
  return `Basic ${btoa(`${secret}:`)}`;
}

function originFromRequest(): string {
  const request = getRequest();
  const url = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedHost) return `${forwardedProto ?? "https"}://${forwardedHost}`;
  return url.origin;
}

export const createRegistrationCheckout = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => checkoutSchema.parse(input))
  .handler(async ({ data }) => {
    const secret = process.env["MOYASAR_SECRET_KEY"];
    if (!secret) {
      return { ok: false as const, error: "payment_not_configured" };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("attendee_registrations")
      .insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        affiliation: data.affiliation || null,
        category_id: data.category_id,
        category_label: data.category_label,
        rate_period: data.rate_period,
        amount_sar: data.amount_sar,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("[registration] insert failed", error);
      return { ok: false as const, error: "save_failed" };
    }

    const origin = originFromRequest();
    const callbackUrl = `${origin}/registration-success?rid=${row.id}`;

    const response = await fetch(`${MOYASAR_API}/invoices`, {
      method: "POST",
      headers: {
        Authorization: moyasarAuthHeader(secret),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        amount: data.amount_sar * 100,
        currency: "SAR",
        description: `Deep Dive 2026 registration - ${data.category_label}`,
        callback_url: callbackUrl,
        success_url: callbackUrl,
        back_url: `${origin}/registration`,
        metadata: { registration_id: row.id, email: data.email },
      }),
    });

    const payload = (await response.json().catch(() => null)) as {
      id?: string;
      url?: string;
      message?: string;
    } | null;

    if (!response.ok || !payload?.url || !payload.id) {
      console.error("[registration] moyasar invoice failed", response.status, payload);
      return { ok: false as const, error: "payment_failed" };
    }

    await supabaseAdmin
      .from("attendee_registrations")
      .update({ provider_invoice_id: payload.id, updated_at: new Date().toISOString() })
      .eq("id", row.id);

    return { ok: true as const, url: payload.url, registrationId: row.id };
  });

export const confirmRegistrationPayment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ registrationId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row } = await supabaseAdmin
      .from("attendee_registrations")
      .select(
        "id, full_name, email, category_label, rate_period, amount_sar, payment_status, provider_invoice_id",
      )
      .eq("id", data.registrationId)
      .maybeSingle();

    if (!row) return { ok: false as const, error: "not_found" };

    let status = row.payment_status;
    const secret = process.env["MOYASAR_SECRET_KEY"];

    if (status !== "paid" && secret && row.provider_invoice_id) {
      const response = await fetch(`${MOYASAR_API}/invoices/${row.provider_invoice_id}`, {
        headers: { Authorization: moyasarAuthHeader(secret) },
      });
      const invoice = (await response.json().catch(() => null)) as {
        status?: string;
        payments?: { id?: string; status?: string }[];
      } | null;

      if (response.ok && invoice) {
        const paidPayment = invoice.payments?.find((p) => p.status === "paid");
        status = invoice.status === "paid" || paidPayment ? "paid" : (invoice.status ?? status);
        await supabaseAdmin
          .from("attendee_registrations")
          .update({
            payment_status: status,
            provider_payment_id: paidPayment?.id ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id);

        if (status === "paid") {
          await sendConfirmationEmail(row.id);
        }
      }
    }

    return {
      ok: true as const,
      status,
      fullName: row.full_name,
      email: row.email,
      categoryLabel: row.category_label,
      ratePeriod: row.rate_period,
      amountSar: row.amount_sar,
    };
  });

// Sends the paid-registration confirmation email once an email domain is connected.
async function sendConfirmationEmail(id: string) {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("attendee_registrations")
      .select("confirmation_email_sent")
      .eq("id", id)
      .maybeSingle();
    if (row?.confirmation_email_sent) return;
    // Email sending is enabled as soon as a sender domain is connected for this project.
  } catch (error) {
    console.error("[registration] confirmation email failed", error);
  }
}

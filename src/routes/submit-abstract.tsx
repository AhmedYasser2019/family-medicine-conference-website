import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { useLang } from "@/lib/i18n";
import { conference, contacts } from "@/data/conference";
import { Countdown } from "@/components/site/Countdown";
import { GlassCard, PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/submit-abstract")({
  head: () => ({
    meta: [
      { title: "نموذج تقديم الملخصات والبوسترات — Deep Dive 2026" },
      {
        name: "description",
        content:
          "نموذج التقديم الإلكتروني لملخصات وبوسترات مؤتمر Deep Dive 2026: عبّئ بياناتك وملخصك العلمي وأرسله مباشرة قبل موعد الإغلاق.",
      },
      { property: "og:title", content: "نموذج تقديم الملخصات — Deep Dive 2026" },
      {
        property: "og:description",
        content: "أرسل ملخصك أو بوسترك إلكترونيًا لمؤتمر Deep Dive 2026 واستلم تأكيدًا على بريدك.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubmitAbstractPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  affiliation: z.string().trim().max(160).optional().or(z.literal("")),
  submission_type: z.enum(["abstract", "poster"]),
  category: z.string().trim().max(120).optional().or(z.literal("")),
  title: z.string().trim().min(5).max(250),
  authors: z.string().trim().max(500).optional().or(z.literal("")),
  abstract_body: z.string().trim().min(50).max(3000),
  keywords: z.string().trim().max(250).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

const field =
  "mt-1.5 w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-[14px] outline-none transition focus:border-brand/50 focus:bg-white";

function SubmitAbstractPage() {
  const { t } = useLang();
  const sci = contacts[1]!;
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      setStatus("error");
      setError(
        t({
          ar: "تحقق من الحقول: الاسم والبريد وعنوان الملخص ونص الملخص (50 حرفًا على الأقل) مطلوبة.",
          en: "Please check the fields: name, email, title and abstract body (min 50 characters) are required.",
        }),
      );
      return;
    }
    setStatus("sending");
    const d = parsed.data;
    const { error: dbError } = await supabase.from("abstract_submissions").insert({
      full_name: d.full_name,
      email: d.email,
      submission_type: d.submission_type,
      title: d.title,
      abstract_body: d.abstract_body,
      phone: d.phone || null,
      affiliation: d.affiliation || null,
      category: d.category || null,
      authors: d.authors || null,
      keywords: d.keywords || null,
      notes: d.notes || null,
    });
    if (dbError) {
      setStatus("error");
      setError(
        t({ ar: "تعذّر إرسال الطلب، حاول مرة أخرى.", en: "Submission failed, please try again." }),
      );
      return;
    }
    setStatus("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (status === "done") {
    return (
      <PageShell title={{ ar: "تم استلام التقديم", en: "Submission received" }}>
        <GlassCard className="max-w-2xl">
          <p className="text-[15px] leading-relaxed">
            {t({
              ar: "شكرًا لك، تم استلام ملخصك بنجاح. سيصلك تأكيد على بريدك الإلكتروني، وسيتم إشعارك بنتيجة التحكيم في موعد إشعار القبول.",
              en: "Thank you, your submission was received. A confirmation will be sent to your email, and you will be notified of the review outcome on the acceptance date.",
            })}
          </p>
          <div className="mt-4 text-[13px] text-muted-foreground">
            {t({ ar: "إشعار القبول:", en: "Acceptance notification:" })}{" "}
            <span className="font-semibold text-foreground">{t(conference.acceptanceDate)}</span>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 rounded-2xl bg-ink px-5 py-3 text-[13px] font-semibold text-primary-foreground"
          >
            {t({ ar: "تقديم ملخص آخر", en: "Submit another abstract" })}
          </button>
        </GlassCard>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={{ ar: "نموذج تقديم الملخصات والبوسترات", en: "Abstract & Poster Submission Form" }}
      intro={{
        ar: "عبّئ البيانات التالية لإرسال ملخصك أو بوسترك إلكترونيًا. ستصلك رسالة تأكيد على بريدك الإلكتروني.",
        en: "Fill in the form to submit your abstract or poster online. A confirmation email will be sent to you.",
      }}
    >
      <GlassCard className="mb-6 rounded-[28px]">
        <div className="text-[13px] font-semibold">
          {t({ ar: "إغلاق التقديم خلال", en: "Submission closes in" })}
        </div>
        <div className="mt-3 max-w-md">
          <Countdown target={conference.abstractsCloseAt} compact />
        </div>
      </GlassCard>

      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <GlassCard className="md:col-span-2">
          <h2 className="font-display text-lg font-bold">
            {t({ ar: "بيانات الباحث المقدِّم", en: "Presenting author" })}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block text-[13px] font-semibold">
              {t({ ar: "الاسم الكامل *", en: "Full name *" })}
              <input name="full_name" required maxLength={120} className={field} />
            </label>
            <label className="block text-[13px] font-semibold">
              {t({ ar: "البريد الإلكتروني *", en: "Email *" })}
              <input
                name="email"
                type="email"
                required
                maxLength={255}
                dir="ltr"
                className={field}
              />
            </label>
            <label className="block text-[13px] font-semibold">
              {t({ ar: "رقم الجوال", en: "Mobile number" })}
              <input name="phone" maxLength={40} dir="ltr" className={field} />
            </label>
            <label className="block text-[13px] font-semibold">
              {t({ ar: "جهة العمل", en: "Affiliation" })}
              <input name="affiliation" maxLength={160} className={field} />
            </label>
          </div>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <h2 className="font-display text-lg font-bold">
            {t({ ar: "تفاصيل العمل العلمي", en: "Submission details" })}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block text-[13px] font-semibold">
              {t({ ar: "نوع التقديم *", en: "Submission type *" })}
              <select name="submission_type" required defaultValue="abstract" className={field}>
                <option value="abstract">{t({ ar: "ملخص علمي", en: "Abstract" })}</option>
                <option value="poster">{t({ ar: "بوستر", en: "Poster" })}</option>
              </select>
            </label>
            <label className="block text-[13px] font-semibold">
              {t({ ar: "المحور / التصنيف", en: "Track / category" })}
              <input name="category" maxLength={120} className={field} />
            </label>
            <label className="block text-[13px] font-semibold md:col-span-2">
              {t({ ar: "عنوان الملخص *", en: "Title *" })}
              <input name="title" required maxLength={250} className={field} />
            </label>
            <label className="block text-[13px] font-semibold md:col-span-2">
              {t({ ar: "المؤلفون المشاركون", en: "Co-authors" })}
              <input name="authors" maxLength={500} className={field} />
            </label>
            <label className="block text-[13px] font-semibold md:col-span-2">
              {t({
                ar: "نص الملخص * (الخلفية، المنهجية، النتائج، الخلاصة — حد أقصى 300 كلمة)",
                en: "Abstract body * (background, methods, results, conclusion — max 300 words)",
              })}
              <textarea name="abstract_body" required rows={9} maxLength={3000} className={field} />
            </label>
            <label className="block text-[13px] font-semibold">
              {t({ ar: "الكلمات المفتاحية", en: "Keywords" })}
              <input name="keywords" maxLength={250} className={field} />
            </label>
            <label className="block text-[13px] font-semibold">
              {t({ ar: "ملاحظات إضافية", en: "Additional notes" })}
              <input name="notes" maxLength={1000} className={field} />
            </label>
          </div>
        </GlassCard>

        <div className="md:col-span-2">
          {error && (
            <p className="mb-3 rounded-2xl bg-destructive/10 px-4 py-3 text-[13px] font-semibold text-destructive">
              {error}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-2xl bg-accent-cyan px-7 py-3.5 font-semibold text-primary-foreground shadow-xl shadow-accent-cyan/30 transition hover:brightness-105 disabled:opacity-60"
            >
              {status === "sending"
                ? t({ ar: "جارٍ الإرسال…", en: "Sending…" })
                : t({ ar: "إرسال التقديم", en: "Submit" })}
            </button>
            <p className="text-[13px] text-muted-foreground">
              {t({ ar: "للاستفسارات العلمية:", en: "Scientific enquiries:" })}{" "}
              <a href={`mailto:${sci.email}`} className="font-semibold text-brand hover:underline">
                {sci.email}
              </a>
            </p>
          </div>
        </div>
      </form>
    </PageShell>
  );
}

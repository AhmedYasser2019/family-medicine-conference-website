import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { useLang } from "@/lib/i18n";
import { conference, contacts, pricing } from "@/data/conference";
import { Countdown } from "@/components/site/Countdown";
import { GlassCard, PageShell } from "@/components/site/PageShell";
import { createRegistrationCheckout } from "@/lib/registration.functions";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "نموذج التسجيل والدفع — Deep Dive 2026" },
      {
        name: "description",
        content:
          "سجّل حضورك في مؤتمر Deep Dive 2026 لطب الأسرة وادفع الرسوم إلكترونيًا بالريال السعودي عبر بوابة دفع آمنة.",
      },
      { property: "og:title", content: "التسجيل والدفع — Deep Dive 2026" },
      {
        property: "og:description",
        content: "أكمل بيانات التسجيل وادفع رسوم الحضور إلكترونيًا واستلم تأكيد المشاركة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  affiliation: z.string().trim().max(160).optional().or(z.literal("")),
  category_id: z.string().trim().min(1),
});

const field =
  "mt-1.5 w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-[14px] outline-none transition focus:border-brand/50 focus:bg-white";

function RegisterPage() {
  const { t, lang } = useLang();
  const support = contacts[0]!;
  const isEarly = Date.now() < new Date(conference.earlyBirdEndsAt).getTime();
  const [categoryId, setCategoryId] = useState(pricing[0]!.id);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const startCheckout = useServerFn(createRegistrationCheckout);

  const selected = pricing.find((p) => p.id === categoryId) ?? pricing[0]!;
  const amount = isEarly ? selected.earlyAmount : selected.regularAmount;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      setStatus("error");
      setError(
        t({
          ar: "تحقق من الحقول: الاسم والبريد الإلكتروني وفئة التسجيل مطلوبة.",
          en: "Please check the fields: name, email and registration category are required.",
        }),
      );
      return;
    }
    setStatus("sending");
    const d = parsed.data;
    const category = pricing.find((p) => p.id === d.category_id) ?? pricing[0]!;
    try {
      const result = await startCheckout({
        data: {
          full_name: d.full_name,
          email: d.email,
          phone: d.phone ?? "",
          affiliation: d.affiliation ?? "",
          category_id: category.id,
          category_label: category.category.en,
          rate_period: isEarly ? ("early" as const) : ("regular" as const),
          amount_sar: isEarly ? category.earlyAmount : category.regularAmount,
        },
      });
      if (result.ok) {
        window.location.href = result.url;
        return;
      }
      setStatus("error");
      setError(
        result.error === "payment_not_configured"
          ? t({
              ar: "بوابة الدفع غير مفعّلة بعد. تواصل مع دعم التسجيل لإتمام تسجيلك.",
              en: "The payment gateway is not active yet. Please contact registration support.",
            })
          : t({
              ar: "تعذّر بدء عملية الدفع، حاول مرة أخرى.",
              en: "Could not start the payment, please try again.",
            }),
      );
    } catch {
      setStatus("error");
      setError(
        t({ ar: "حدث خطأ غير متوقع، حاول مرة أخرى.", en: "Unexpected error, please try again." }),
      );
    }
  }

  const fmt = (n: number) =>
    lang === "ar" ? `${n.toLocaleString("en-US")} ريال` : `SAR ${n.toLocaleString("en-US")}`;

  return (
    <PageShell
      title={{ ar: "التسجيل والدفع", en: "Registration & Payment" }}
      intro={{
        ar: "عبّئ بياناتك واختر فئة التسجيل، ثم أكمل الدفع إلكترونيًا بالريال السعودي عبر بوابة دفع آمنة.",
        en: "Fill in your details, choose your registration category, then pay securely online in Saudi Riyals.",
      }}
    >
      <GlassCard className="mb-6 rounded-[28px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[13px] font-semibold">
              {isEarly
                ? t({
                    ar: "فترة التسجيل المبكر سارية — تنتهي خلال",
                    en: "Early-bird period is open — closes in",
                  })
                : t({
                    ar: "انتهى التسجيل المبكر — سعر منتظم",
                    en: "Early-bird ended — regular rate",
                  })}
            </div>
            <div className="mt-1 text-[12px] text-muted-foreground">
              {t({
                ar: "التسجيل المبكر متاح حتى 15 أكتوبر 2026.",
                en: "Early-bird is available until 15 October 2026.",
              })}
            </div>
          </div>
          {isEarly && (
            <div className="max-w-md">
              <Countdown target={conference.earlyBirdEndsAt} compact />
            </div>
          )}
        </div>
      </GlassCard>

      <form onSubmit={onSubmit} className="grid gap-4">
        <GlassCard>
          <h2 className="font-display text-lg font-bold">
            {t({ ar: "بيانات الحاضر", en: "Attendee details" })}
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

        <GlassCard>
          <h2 className="font-display text-lg font-bold">
            {t({ ar: "فئة التسجيل والرسوم", en: "Registration category & fees" })}
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-white/40 text-start text-[11px] uppercase text-muted-foreground">
                  <th className="px-3 py-2 text-start font-semibold">
                    {t({ ar: "الفئة", en: "Category" })}
                  </th>
                  <th className="px-3 py-2 text-start font-semibold">
                    {t({ ar: "ما يشمله", en: "Includes" })}
                  </th>
                  <th className="px-3 py-2 text-start font-semibold">
                    {t({ ar: "التسجيل المبكر", en: "Early-bird" })}
                  </th>
                  <th className="px-3 py-2 text-start font-semibold">
                    {t({ ar: "السعر المنتظم", en: "Regular" })}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p) => {
                  const active = p.id === categoryId;
                  return (
                    <tr
                      key={p.id}
                      className={`cursor-pointer border-b border-white/20 transition ${
                        active ? "bg-accent-cyan/10" : "hover:bg-white/30"
                      }`}
                      onClick={() => setCategoryId(p.id)}
                    >
                      <td className="px-3 py-3">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="radio"
                            name="category_id"
                            value={p.id}
                            checked={active}
                            onChange={() => setCategoryId(p.id)}
                            className="accent-accent-cyan"
                          />
                          <span className="font-bold">{t(p.category)}</span>
                        </label>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{t(p.includes)}</td>
                      <td className="px-3 py-3 font-bold text-brand">{fmt(p.earlyAmount)}</td>
                      <td className="px-3 py-3 font-semibold">{fmt(p.regularAmount)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground">
            {isEarly
              ? t({
                  ar: "يُطبَّق سعر التسجيل المبكر حاليًا على جميع الفئات.",
                  en: "Early-bird pricing is currently applied to all categories.",
                })
              : t({
                  ar: "انتهى التسجيل المبكر — يُطبَّق السعر المنتظم.",
                  en: "Early-bird has ended — regular pricing is applied.",
                })}
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="font-display text-lg font-bold">
            {t({ ar: "طريقة الدفع", en: "Payment method" })}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {[
              { ar: "مدى", en: "mada" },
              { ar: "فيزا", en: "Visa" },
              { ar: "ماستركارد", en: "Mastercard" },
              { ar: "Apple Pay", en: "Apple Pay" },
            ].map((m) => (
              <span
                key={m.en}
                className="rounded-xl border border-white/50 bg-white/60 px-3 py-1.5 text-[12px] font-bold"
              >
                {lang === "ar" ? m.ar : m.en}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-muted-foreground">
            {t({
              ar: "يتم الدفع بالريال السعودي عبر بوابة ميسر الآمنة. بعد إتمام الدفع بنجاح ستظهر صفحة تأكيد وتُرسل رسالة تأكيد بالبريد الإلكتروني.",
              en: "Payment is in Saudi Riyals via the secure Moyasar gateway. After successful payment, a confirmation page appears and a confirmation email is sent.",
            })}
          </p>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[13px] text-muted-foreground">
                {t({ ar: "الإجمالي المستحق", en: "Total due" })} ·{" "}
                {isEarly
                  ? t({ ar: "سعر التسجيل المبكر", en: "Early-bird rate" })
                  : t({ ar: "السعر المنتظم", en: "Regular rate" })}
              </div>
              <div className="font-display text-2xl font-bold text-brand">{fmt(amount)}</div>
              <div className="mt-1 text-[12px] text-muted-foreground">
                {t({ ar: "الفئة المختارة:", en: "Selected category:" })} {t(selected.category)}
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-2xl bg-accent-cyan px-7 py-3.5 font-semibold text-primary-foreground shadow-xl shadow-accent-cyan/30 transition hover:brightness-105 disabled:opacity-60"
            >
              {status === "sending"
                ? t({ ar: "جارٍ التحويل للدفع…", en: "Redirecting to payment…" })
                : t({ ar: "المتابعة إلى الدفع", en: "Continue to payment" })}
            </button>
          </div>
          {error && (
            <p className="mt-4 rounded-2xl bg-destructive/10 px-4 py-3 text-[13px] font-semibold text-destructive">
              {error}
            </p>
          )}
          <p className="mt-4 text-[13px] text-muted-foreground">
            {t({ ar: "دعم التسجيل:", en: "Registration support:" })}{" "}
            <a
              href={`mailto:${support.email}`}
              className="font-semibold text-brand hover:underline"
            >
              {support.email}
            </a>
          </p>
        </GlassCard>
      </form>
    </PageShell>
  );
}

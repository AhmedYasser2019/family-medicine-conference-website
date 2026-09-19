import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { conference, pricing } from "@/data/conference";
import { Countdown } from "@/components/site/Countdown";
import { GlassCard, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/registration")({
  head: () => ({
    meta: [
      { title: "التسجيل والأسعار | Registration & Fees — Deep Dive 2026" },
      {
        name: "description",
        content:
          "فئات التسجيل وأسعار التسجيل المبكر والمنتظم في مؤتمر Deep Dive 2026 لطب الأسرة، وما يشمله التسجيل وسياسة الإلغاء.",
      },
      { property: "og:title", content: "التسجيل والأسعار — Deep Dive 2026" },
      {
        property: "og:description",
        content: "أسعار التسجيل المبكر والمنتظم لكل فئة، وما يشمله التسجيل وسياسة الاسترداد.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistrationPage,
});

function RegistrationPage() {
  const { t } = useLang();

  return (
    <PageShell
      title={{ ar: "التسجيل والأسعار", en: "Registration & Fees" }}
      intro={{
        ar: "التسجيل المبكر متاح حتى 15 أكتوبر 2026، ويليه التسجيل المنتظم حتى بداية المؤتمر أو اكتمال المقاعد.",
        en: "Early-bird registration is open until 15 October 2026, followed by regular registration until the conference opens or seats are full.",
      }}
    >
      <GlassCard className="rounded-[28px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-[13px] font-semibold">
            {t({ ar: "التسجيل المبكر ينتهي خلال", en: "Early-bird closes in" })}
          </div>
          <a
            href={conference.registerUrl}
            className="rounded-2xl bg-accent-cyan px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-accent-cyan/25"
          >
            {t({ ar: "التسجيل الآن", en: "Register now" })}
          </a>
        </div>
        <div className="mt-4 max-w-md">
          <Countdown target={conference.earlyBirdEndsAt} compact />
        </div>
      </GlassCard>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {pricing.map((p) => (
          <GlassCard key={p.category.en}>
            <h2 className="font-display text-lg font-bold">{t(p.category)}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="glass-soft rounded-2xl p-4">
                <div className="text-[11px] text-muted-foreground">
                  {t({ ar: "التسجيل المبكر", en: "Early bird" })}
                </div>
                <div className="font-display text-xl font-bold text-brand">{t(p.early)}</div>
              </div>
              <div className="glass-soft rounded-2xl p-4">
                <div className="text-[11px] text-muted-foreground">
                  {t({ ar: "التسجيل المنتظم", en: "Regular" })}
                </div>
                <div className="font-display text-xl font-bold">{t(p.regular)}</div>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground">{t(p.includes)}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-6">
        <h2 className="font-display text-lg font-bold">
          {t({ ar: "سياسة الإلغاء والاسترداد", en: "Cancellation & refund policy" })}
        </h2>
        <ul className="mt-3 list-disc space-y-2 ps-5 text-[14px] text-muted-foreground">
          <li>
            {t({
              ar: "الإلغاء قبل 30 يومًا من انعقاد المؤتمر: استرداد 100% من الرسوم.",
              en: "Cancellation 30+ days before the conference: 100% refund.",
            })}
          </li>
          <li>
            {t({
              ar: "الإلغاء قبل 14 يومًا: استرداد 50% من الرسوم.",
              en: "Cancellation 14+ days before: 50% refund.",
            })}
          </li>
          <li>
            {t({
              ar: "لا يوجد استرداد خلال آخر 14 يومًا، مع إمكانية نقل التسجيل لزميل آخر.",
              en: "No refund within the last 14 days; registration may be transferred to a colleague.",
            })}
          </li>
        </ul>
        <p className="mt-4 text-[13px] text-muted-foreground">
          {t({
            ar: "ملاحظة: الأسعار وسياسة الاسترداد مبدئية بانتظار الاعتماد النهائي، ويتم الدفع عبر نظام التسجيل المعتمد مع إظهار رسالة تأكيد نجاح العملية.",
            en: "Note: fees and refund policy are provisional pending final approval. Payment is handled by the approved registration system, which shows a success confirmation.",
          })}
        </p>
      </GlassCard>
    </PageShell>
  );
}

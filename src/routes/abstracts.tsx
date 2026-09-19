import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { conference, contacts } from "@/data/conference";
import { Countdown } from "@/components/site/Countdown";
import { GlassCard, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/abstracts")({
  head: () => ({
    meta: [
      { title: "Call for Abstracts & Poster Submission — Deep Dive 2026" },
      {
        name: "description",
        content:
          "تقديم الملخصات والبوسترات لمؤتمر Deep Dive 2026: موعد الإغلاق، إشعار القبول، شروط التقديم، وإرشادات إعداد الملخص.",
      },
      { property: "og:title", content: "الملخصات والبوسترات — Deep Dive 2026" },
      {
        property: "og:description",
        content: "قدّم ملخصك أو بوسترك قبل موعد الإغلاق، مع إرشادات وشروط التقديم المعتمدة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AbstractsPage,
});

function AbstractsPage() {
  const { t } = useLang();
  const sci = contacts[1]!;

  return (
    <PageShell
      title={{ ar: "الملخصات والبوسترات", en: "Abstracts & Posters" }}
      intro={{
        ar: "Call for Abstracts & Poster Submission — ندعو الباحثين والممارسين لتقديم ملخصاتهم العلمية وبوستراتهم.",
        en: "Call for Abstracts & Poster Submission — researchers and practitioners are invited to submit their work.",
      }}
    >
      <GlassCard className="rounded-[28px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-[13px] font-semibold">
            {t({ ar: "إغلاق التقديم خلال", en: "Submission closes in" })}
          </div>
          <Link
            to="/submit-abstract"
            className="rounded-2xl bg-ink px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-ink/20"
          >
            {t({ ar: "نموذج التقديم", en: "Submission form" })}
          </Link>
        </div>
        <div className="mt-4 max-w-md">
          <Countdown target={conference.abstractsCloseAt} compact />
        </div>
      </GlassCard>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <GlassCard>
          <div className="text-[11px] font-semibold text-muted-foreground">
            {t({ ar: "تاريخ إغلاق التقديم", en: "Submission deadline" })}
          </div>
          <div className="mt-1 font-display text-xl font-bold">
            {t({ ar: "1 نوفمبر 2026", en: "1 November 2026" })}
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-[11px] font-semibold text-muted-foreground">
            {t({ ar: "إشعار القبول", en: "Acceptance notification" })}
          </div>
          <div className="mt-1 font-display text-xl font-bold">{t(conference.acceptanceDate)}</div>
        </GlassCard>
        <GlassCard>
          <div className="text-[11px] font-semibold text-muted-foreground">
            {t({ ar: "الإرشادات والملفات", en: "Guidelines & files" })}
          </div>
          <a href="#" className="mt-1 block font-display text-xl font-bold text-brand">
            PDF ↧
          </a>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <GlassCard>
          <h2 className="font-display text-lg font-bold">
            {t({ ar: "شروط التقديم", en: "Submission requirements" })}
          </h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-[14px] text-muted-foreground">
            <li>
              {t({
                ar: "أن يكون العمل أصيلًا ولم يُنشر سابقًا.",
                en: "Work must be original and previously unpublished.",
              })}
            </li>
            <li>
              {t({
                ar: "تسجيل الباحث المقدِّم في المؤتمر شرط للعرض.",
                en: "The presenting author must be registered to present.",
              })}
            </li>
            <li>
              {t({
                ar: "يُقبل التقديم باللغة العربية أو الإنجليزية.",
                en: "Submissions are accepted in Arabic or English.",
              })}
            </li>
            <li>
              {t({
                ar: "يُسمح بتقديم حتى ملخصين لكل باحث.",
                en: "Up to two abstracts per author.",
              })}
            </li>
          </ul>
        </GlassCard>
        <GlassCard>
          <h2 className="font-display text-lg font-bold">
            {t({ ar: "إرشادات إعداد الملخص والبوستر", en: "Abstract & poster guidelines" })}
          </h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-[14px] text-muted-foreground">
            <li>{t({ ar: "حد أقصى 300 كلمة للملخص.", en: "Abstract limit: 300 words." })}</li>
            <li>
              {t({
                ar: "الهيكل: الخلفية، المنهجية، النتائج، الخلاصة.",
                en: "Structure: background, methods, results, conclusion.",
              })}
            </li>
            <li>
              {t({
                ar: "مقاس البوستر: 90 × 120 سم عمودي.",
                en: "Poster size: 90 × 120 cm, portrait.",
              })}
            </li>
            <li>{t({ ar: "يُرفع الملف بصيغة PDF.", en: "Upload the file in PDF format." })}</li>
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="mt-6">
        <h2 className="font-display text-lg font-bold">
          {t({ ar: "للاستفسارات العلمية", en: "Scientific enquiries" })}
        </h2>
        <p className="mt-2 text-[14px] text-muted-foreground">
          <a href={`mailto:${sci.email}`} className="font-semibold text-brand hover:underline">
            {sci.email}
          </a>{" "}
          · <span dir="ltr">{sci.phone}</span>
        </p>
      </GlassCard>
    </PageShell>
  );
}

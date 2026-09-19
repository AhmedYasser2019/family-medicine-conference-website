import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { conference, workshops } from "@/data/conference";
import { GlassCard, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "ورش العمل | Workshops — Deep Dive 2026" },
      {
        name: "description",
        content:
          "ورش عمل تطبيقية محدودة المقاعد في مؤتمر Deep Dive 2026: العنوان والتاريخ والمدرب والفئة المستهدفة والرسوم والتسجيل.",
      },
      { property: "og:title", content: "ورش العمل — Deep Dive 2026" },
      {
        property: "og:description",
        content: "أربع ورش عمل تطبيقية محدودة المقاعد لأطباء الأسرة والممارسين الصحيين.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  const { t } = useLang();

  return (
    <PageShell
      title={{ ar: "ورش العمل", en: "Workshops" }}
      intro={{
        ar: "ورش تطبيقية بمقاعد محدودة، ويُغلق التسجيل عند اكتمال العدد.",
        en: "Hands-on workshops with limited seats; registration closes once full.",
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {workshops.map((w) => (
          <GlassCard key={w.title.en}>
            <h2 className="font-display text-lg font-bold leading-snug">{t(w.title)}</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
              <div>
                <dt className="text-muted-foreground">{t({ ar: "التاريخ", en: "Date" })}</dt>
                <dd className="font-semibold">{t(w.date)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t({ ar: "الوقت", en: "Time" })}</dt>
                <dd className="font-semibold" dir="ltr">
                  {w.time}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t({ ar: "المدرب", en: "Trainer" })}</dt>
                <dd className="font-semibold">{t(w.trainer)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">
                  {t({ ar: "الفئة المستهدفة", en: "Audience" })}
                </dt>
                <dd className="font-semibold">{t(w.audience)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t({ ar: "المقاعد", en: "Seats" })}</dt>
                <dd className="font-semibold">{w.seats}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t({ ar: "الرسوم", en: "Fee" })}</dt>
                <dd className="font-semibold text-brand">{t(w.fee)}</dd>
              </div>
            </dl>
            <a
              href={conference.registerUrl}
              className="mt-5 inline-flex rounded-2xl bg-accent-cyan px-5 py-3 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-accent-cyan/25"
            >
              {t({ ar: "التسجيل في الورشة", en: "Register for workshop" })}
            </a>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}

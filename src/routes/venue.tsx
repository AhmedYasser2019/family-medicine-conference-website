import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { conference } from "@/data/conference";
import { GlassCard, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/venue")({
  head: () => ({
    meta: [
      { title: "موقع المؤتمر | Venue — Deep Dive 2026" },
      {
        name: "description",
        content:
          "مقر مؤتمر Deep Dive 2026 لطب الأسرة في مركز الرياض الدولي للمؤتمرات والمعارض، مع الخريطة وزر الحصول على الاتجاهات.",
      },
      { property: "og:title", content: "موقع المؤتمر — Deep Dive 2026" },
      {
        property: "og:description",
        content: "العنوان والخريطة التفاعلية وطريقة الوصول إلى مقر المؤتمر في الرياض.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VenuePage,
});

function VenuePage() {
  const { t } = useLang();

  return (
    <PageShell
      title={{ ar: "موقع المؤتمر", en: "Venue" }}
      intro={{ ar: t(conference.venue), en: t(conference.venue) }}
    >
      <GlassCard className="rounded-[28px] p-0 overflow-hidden">
        <iframe
          title="map"
          src={conference.mapEmbed}
          className="h-[380px] w-full border-0"
          loading="lazy"
        />
        <div className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <div className="font-display text-lg font-bold">{t(conference.venue)}</div>
            <div className="text-[13px] text-muted-foreground">{t(conference.address)}</div>
            <div className="mt-1 text-[13px] text-brand">{t(conference.datesLabel)}</div>
          </div>
          <a
            href={conference.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-accent-cyan px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-accent-cyan/25"
          >
            {t({ ar: "الحصول على الاتجاهات", en: "Get directions" })}
          </a>
        </div>
      </GlassCard>
    </PageShell>
  );
}

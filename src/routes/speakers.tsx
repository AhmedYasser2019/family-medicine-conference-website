import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { speakers } from "@/data/conference";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/speakers")({
  head: () => ({
    meta: [
      { title: "المتحدثون | Speakers — Deep Dive 2026" },
      {
        name: "description",
        content:
          "نخبة المتحدثين في مؤتمر Deep Dive 2026 لطب الأسرة: الاسم والتخصص والمسمى الوظيفي وجهة العمل ونبذة مختصرة.",
      },
      { property: "og:title", content: "المتحدثون — Deep Dive 2026" },
      {
        property: "og:description",
        content: "تعرّف على المتحدثين والخبراء المشاركين في مؤتمر طب الأسرة Deep Dive 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpeakersPage,
});

function SpeakersPage() {
  const { t } = useLang();

  return (
    <PageShell
      title={{ ar: "المتحدثون", en: "Speakers" }}
      intro={{
        ar: "نخبة من الاستشاريين والباحثين في طب الأسرة والرعاية الأولية.",
        en: "A select faculty of consultants and researchers in family medicine and primary care.",
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {speakers.map((s) => (
          <article
            key={s.name.en}
            className="overflow-hidden rounded-3xl glass shadow-lg shadow-brand/5"
          >
            <img
              src={s.photo}
              alt={t(s.name)}
              loading="lazy"
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
            />
            <div className="p-5">
              <h2 className="font-display text-lg font-bold">{t(s.name)}</h2>
              <div className="mt-1 text-[12px] font-semibold text-brand">{t(s.specialty)}</div>
              <div className="text-[12px] text-muted-foreground">
                {t(s.role)} · {t(s.org)}
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{t(s.bio)}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

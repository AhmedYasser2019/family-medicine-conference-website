import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { conference, contacts } from "@/data/conference";
import { GlassCard, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "التواصل | Contact — Deep Dive 2026" },
      {
        name: "description",
        content:
          "قنوات التواصل مع مؤتمر Deep Dive 2026: دعم التسجيل، الملخصات والبوسترات، الرعاية والمعرض، والاستفسارات العامة.",
      },
      { property: "og:title", content: "التواصل — Deep Dive 2026" },
      {
        property: "og:description",
        content: "تواصل مع فرق التسجيل والملخصات والرعاية والاستفسارات العامة للمؤتمر.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLang();

  return (
    <PageShell
      title={{ ar: "التواصل", en: "Contact" }}
      intro={{
        ar: "اختر القناة المناسبة لاستفسارك ليصلك الرد من الفريق المختص.",
        en: "Choose the right channel so the specialised team can reply to you.",
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {contacts.map((c) => (
          <GlassCard key={c.email}>
            <h2 className="font-display text-lg font-bold">{t(c.title)}</h2>
            <a
              href={`mailto:${c.email}`}
              className="mt-2 block font-semibold text-brand hover:underline"
            >
              {c.email}
            </a>
            <div className="text-[13px] text-muted-foreground" dir="ltr">
              {c.phone}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-6">
        <h2 className="font-display text-lg font-bold">{t({ ar: "مقر المؤتمر", en: "Venue" })}</h2>
        <p className="mt-2 text-[14px] text-muted-foreground">
          {t(conference.venue)} — {t(conference.address)}
        </p>
      </GlassCard>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { contacts, sponsors } from "@/data/conference";
import { GlassCard, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "الرعاة والشركاء | Sponsors — Deep Dive 2026" },
      {
        name: "description",
        content:
          "رعاة وشركاء مؤتمر Deep Dive 2026 لطب الأسرة مصنفون حسب فئات الرعاية، وفرص الرعاية والمعرض.",
      },
      { property: "og:title", content: "الرعاة والشركاء — Deep Dive 2026" },
      {
        property: "og:description",
        content: "فئات الرعاية والشركاء الداعمون لمؤتمر طب الأسرة Deep Dive 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SponsorsPage,
});

function SponsorsPage() {
  const { t } = useLang();
  const partner = contacts[2]!;

  return (
    <PageShell
      title={{ ar: "الرعاة والشركاء", en: "Sponsors & Partners" }}
      intro={{
        ar: "شركاء نجاح المؤتمر مصنفون حسب فئات الرعاية المعتمدة.",
        en: "Our partners, grouped by the approved sponsorship tiers.",
      }}
    >
      <div className="grid gap-4">
        {sponsors.map((tier) => (
          <GlassCard key={tier.tier.en}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              {t(tier.tier)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {tier.names.map((n) => (
                <div
                  key={n}
                  className="glass-soft grid h-20 place-items-center rounded-2xl font-display text-sm font-bold text-muted-foreground"
                >
                  {n}
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-6">
        <h2 className="font-display text-lg font-bold">
          {t({ ar: "كن راعيًا للمؤتمر", en: "Become a sponsor" })}
        </h2>
        <p className="mt-2 text-[14px] text-muted-foreground">
          {t({
            ar: "للاطلاع على باقات الرعاية ومساحات المعرض تواصل معنا:",
            en: "For sponsorship packages and exhibition space, contact us:",
          })}{" "}
          <a href={`mailto:${partner.email}`} className="font-semibold text-brand hover:underline">
            {partner.email}
          </a>
        </p>
      </GlassCard>
    </PageShell>
  );
}

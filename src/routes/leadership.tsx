import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { leadership } from "@/data/conference";
import { GlassCard, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "قيادة المؤتمر | Leadership — Deep Dive 2026" },
      {
        name: "description",
        content: "رئاسة مؤتمر Deep Dive 2026 لطب الأسرة واللجنة العلمية واللجنة المنظمة وأعضاؤها.",
      },
      { property: "og:title", content: "قيادة المؤتمر — Deep Dive 2026" },
      {
        property: "og:description",
        content: "رئيس المؤتمر واللجان العلمية والمنظمة لمؤتمر طب الأسرة Deep Dive 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  const { t } = useLang();

  return (
    <PageShell
      title={{ ar: "قيادة المؤتمر", en: "Conference Leadership" }}
      intro={{
        ar: "رئاسة المؤتمر واللجان العلمية والمنظمة.",
        en: "Conference chair, scientific and organizing committees.",
      }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {leadership.map((g) => (
          <GlassCard key={g.group.en}>
            <h2 className="font-display text-lg font-bold">{t(g.group)}</h2>
            <ul className="mt-4 space-y-3">
              {g.members.map((m) => (
                <li key={m.name.en} className="glass-soft rounded-2xl p-4">
                  <div className="font-semibold">{t(m.name)}</div>
                  <div className="text-[12px] text-muted-foreground">{t(m.role)}</div>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}

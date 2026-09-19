import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { program } from "@/data/conference";
import { GlassCard, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "البرنامج العلمي | Scientific Program — Deep Dive 2026" },
      {
        name: "description",
        content:
          "البرنامج العلمي الكامل لمؤتمر Deep Dive 2026 لطب الأسرة عبر ثلاثة أيام، مع إمكانية تحميل البرنامج بصيغة PDF.",
      },
      { property: "og:title", content: "البرنامج العلمي — Deep Dive 2026" },
      {
        property: "og:description",
        content: "جلسات ومحاضرات وورش عمل على مدى ثلاثة أيام في طب الأسرة والرعاية الأولية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramPage,
});

function ProgramPage() {
  const { t } = useLang();

  return (
    <PageShell
      title={{ ar: "البرنامج العلمي", en: "Scientific Program" }}
      intro={{
        ar: "البرنامج الكامل لأيام المؤتمر الثلاثة. الجدول قابل للتحديث حتى اعتماد النسخة النهائية.",
        en: "The full three-day program. The schedule may be updated until the final version is approved.",
      }}
    >
      <a
        href="#"
        className="inline-flex rounded-2xl bg-ink px-5 py-3 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-ink/20"
      >
        {t({ ar: "تحميل البرنامج PDF", en: "Download program PDF" })}
      </a>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {program.map((d) => (
          <GlassCard key={d.day.en}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              {t(d.day)} · {t(d.date)}
            </div>
            <ul className="mt-4 space-y-4">
              {d.sessions.map((s) => (
                <li key={s.title.en} className="glass-soft rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <span className="font-mono">{s.time}</span>
                    <span className="rounded-full bg-accent-cyan/15 px-2 py-0.5 font-semibold text-brand">
                      {t(s.type)}
                    </span>
                  </div>
                  <div className="mt-2 font-semibold leading-snug">{t(s.title)}</div>
                  <div className="mt-1 text-[13px] text-muted-foreground">{t(s.speaker)}</div>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}

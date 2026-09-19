import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { about, conference, program, speakers, stats } from "@/data/conference";
import { Countdown } from "@/components/site/Countdown";
import { GlassCard } from "@/components/site/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deep Dive 2026 — مؤتمر طب الأسرة | Family Medicine Conference" },
      {
        name: "description",
        content:
          "Deep Dive 2026: المؤتمر الدولي لطب الأسرة، 3-5 ديسمبر 2026 بالرياض، 18 ساعة CME، تسجيل وتقديم ملخصات وورش عمل.",
      },
      { property: "og:title", content: "Deep Dive 2026 — مؤتمر طب الأسرة" },
      {
        property: "og:description",
        content:
          "ثلاثة أيام من الجلسات العلمية وورش العمل في طب الأسرة والرعاية الأولية. الرياض، 3-5 ديسمبر 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();

  return (
    <main className="mx-auto max-w-7xl px-5 sm:px-8">
      <section className="grid items-center gap-8 pt-12 pb-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm">
            <span className="size-2 animate-pulse rounded-full bg-accent-cyan" />
            {t(conference.datesLabel)} · {t(conference.venue)}
          </div>
          <h1 className="mt-5 font-display text-[40px] font-bold leading-[1.28] sm:text-[62px] ltr:tracking-tight ltr:leading-[1.05]">
            {t({ ar: "المؤتمر الدولي", en: "The International" })}
            <br />
            <span className="text-gradient-brand">
              {t({ ar: "لطب الأسرة", en: "Family Medicine Conference" })}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            {t(conference.intro)}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={conference.registerUrl}
              className="rounded-2xl bg-accent-cyan px-6 py-3.5 font-semibold text-primary-foreground shadow-xl shadow-accent-cyan/30 transition hover:brightness-105"
            >
              {t({ ar: "التسجيل الآن", en: "Register now" })}
            </a>
            <Link
              to="/submit-abstract"
              className="rounded-2xl glass px-6 py-3.5 font-semibold transition hover:bg-white/80"
            >
              {t({ ar: "تقديم الملخصات والبوسترات", en: "Submit abstracts & posters" })}
            </Link>
            <Link
              to="/program"
              className="rounded-2xl px-4 py-3.5 font-semibold text-brand transition hover:bg-white/50"
            >
              {t({ ar: "البرنامج العلمي", en: "Scientific program" })}
            </Link>
            <Link
              to="/workshops"
              className="rounded-2xl px-4 py-3.5 font-semibold text-brand transition hover:bg-white/50"
            >
              {t({ ar: "ورش العمل", en: "Workshops" })}
            </Link>
          </div>
        </div>

        <GlassCard className="rounded-[28px] p-6 shadow-2xl shadow-brand/10 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[12px] font-semibold text-muted-foreground">
              {t({ ar: "العد التنازلي لانعقاد المؤتمر", en: "Conference opens in" })}
            </div>
            <span className="shrink-0 rounded-full bg-accent-cyan/15 px-2.5 py-1 text-[11px] font-bold text-brand">
              {t({ ar: "18 ساعة CME", en: "18 CME hours" })}
            </span>
          </div>
          <div className="mt-5">
            <Countdown target={conference.startsAt} />
          </div>
          <div className="mt-5 rounded-2xl border border-white/70 bg-gradient-to-l from-brand/10 to-brand-soft/10 p-4">
            <div className="text-[13px] font-semibold">
              {t({ ar: "التسجيل المبكر ينتهي خلال", en: "Early-bird closes in" })}
            </div>
            <div className="mt-3">
              <Countdown target={conference.earlyBirdEndsAt} compact />
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {stats.map((s) => (
          <GlassCard key={s.label.en} className="p-5">
            <div className="font-display text-4xl font-bold text-brand">{s.value}</div>
            <div className="mt-1 text-[13px] font-medium text-muted-foreground">{t(s.label)}</div>
          </GlassCard>
        ))}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[about.vision, about.mission, about.audience, about.why].map((b) => (
          <GlassCard key={b.title.en}>
            <h2 className="font-display text-lg font-bold">{t(b.title)}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{t(b.body)}</p>
          </GlassCard>
        ))}
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-bold">
            {t({ ar: "ملخص البرنامج العلمي", en: "Program at a glance" })}
          </h2>
          <Link to="/program" className="text-[13px] font-semibold text-brand hover:underline">
            {t({ ar: "البرنامج الكامل ←", en: "Full program →" })}
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {program.map((d) => (
            <GlassCard key={d.day.en}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                {t(d.day)} · {t(d.date)}
              </div>
              <ul className="mt-3 space-y-3">
                {d.sessions.map((s) => (
                  <li key={s.title.en} className="text-sm">
                    <span className="font-mono text-xs text-muted-foreground">{s.time}</span>
                    <div className="font-semibold leading-snug">{t(s.title)}</div>
                    <div className="text-xs text-muted-foreground">{t(s.speaker)}</div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[28px] glass p-6 shadow-xl shadow-brand/10 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold">
            Call for Abstracts &amp; Poster Submission
          </h2>
          <Link
            to="/submit-abstract"
            className="rounded-2xl bg-ink px-5 py-3 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-ink/20 transition hover:opacity-90"
          >
            {t({ ar: "نموذج التقديم", en: "Submission form" })}
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="glass-soft rounded-2xl p-5">
            <div className="text-[11px] font-semibold text-muted-foreground">
              {t({ ar: "إغلاق التقديم بعد", en: "Submission closes in" })}
            </div>
            <div className="mt-3">
              <Countdown target={conference.abstractsCloseAt} compact />
            </div>
          </div>
          <div className="glass-soft rounded-2xl p-5">
            <div className="text-[11px] font-semibold text-muted-foreground">
              {t({ ar: "إشعار القبول", en: "Acceptance notification" })}
            </div>
            <div className="mt-1 font-display text-xl font-bold">
              {t(conference.acceptanceDate)}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-bold">
            {t({ ar: "مختارات من المتحدثين", en: "Featured speakers" })}
          </h2>
          <Link to="/speakers" className="text-[13px] font-semibold text-brand hover:underline">
            {t({ ar: "عرض الكل ←", en: "View all →" })}
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((s) => (
            <div
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
              <div className="p-4">
                <div className="font-semibold">{t(s.name)}</div>
                <div className="text-[12px] text-muted-foreground">
                  {t(s.role)} · {t(s.org)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

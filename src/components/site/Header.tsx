import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { conference, nav } from "@/data/conference";

export function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/60">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-soft font-display text-xl font-bold text-primary-foreground shadow-lg shadow-brand/20">
            D
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-[15px] font-bold">{t(conference.name)}</div>
            <div className="truncate text-[11px] text-muted-foreground">
              {t(conference.subtitle)}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 text-[13px] font-medium xl:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-xl px-3 py-2 transition hover:bg-white/60"
              activeProps={{ className: "bg-white/70 text-brand" }}
            >
              {t(n.label)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center rounded-full border border-white/70 bg-white/50 p-0.5 text-[11px] font-semibold sm:flex">
            <button
              onClick={() => setLang("ar")}
              className={`rounded-full px-2.5 py-1 ${lang === "ar" ? "bg-ink text-primary-foreground" : "text-muted-foreground"}`}
            >
              عربي
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 ${lang === "en" ? "bg-ink text-primary-foreground" : "text-muted-foreground"}`}
            >
              EN
            </button>
          </div>
          <a
            href={conference.registerUrl}
            className="hidden rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-ink/20 transition hover:opacity-90 sm:inline-flex"
          >
            {t({ ar: "التسجيل الآن", en: "Register now" })}
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="menu"
            className="grid size-10 place-items-center rounded-xl border border-white/70 bg-white/50 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/60 bg-white/70 px-5 py-4 xl:hidden">
          <div className="grid gap-1 text-sm font-medium">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-white"
              >
                {t(n.label)}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setLang("ar")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${lang === "ar" ? "bg-ink text-primary-foreground" : "bg-white"}`}
            >
              عربي
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${lang === "en" ? "bg-ink text-primary-foreground" : "bg-white"}`}
            >
              EN
            </button>
            <a
              href={conference.registerUrl}
              className="ms-auto rounded-full bg-accent-cyan px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              {t({ ar: "التسجيل الآن", en: "Register now" })}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

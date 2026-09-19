import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { conference, contacts } from "@/data/conference";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-16 border-t border-white/60 glass">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {contacts.map((c) => (
            <div key={c.email}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                {t(c.title)}
              </div>
              <a
                href={`mailto:${c.email}`}
                className="mt-2 block text-sm font-semibold hover:text-brand"
              >
                {c.email}
              </a>
              <div className="text-xs text-muted-foreground" dir="ltr">
                {c.phone}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/60 pt-6 text-[12px] text-muted-foreground">
          <div className="font-display font-bold text-foreground">
            {t(conference.name)} · {t(conference.subtitle)}
          </div>
          <div className="flex flex-wrap gap-5">
            <Link to="/registration" className="hover:text-brand">
              {t({ ar: "التسجيل والأسعار", en: "Registration & fees" })}
            </Link>
            <Link to="/abstracts" className="hover:text-brand">
              {t({ ar: "الملخصات والبوسترات", en: "Abstracts & posters" })}
            </Link>
            <Link to="/sponsors" className="hover:text-brand">
              {t({ ar: "الرعاية والمعرض", en: "Sponsorship & expo" })}
            </Link>
            <Link to="/contact" className="hover:text-brand">
              {t({ ar: "الاستفسارات العامة", en: "General enquiries" })}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

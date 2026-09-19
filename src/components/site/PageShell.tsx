import type { ReactNode } from "react";
import { useLang, type T } from "@/lib/i18n";

export function PageShell({
  title,
  intro,
  children,
}: {
  title: T;
  intro?: T;
  children: ReactNode;
}) {
  const { t } = useLang();
  return (
    <main className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
      <h1 className="font-display text-[34px] font-bold leading-tight sm:text-[46px]">
        {t(title)}
      </h1>
      {intro && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {t(intro)}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </main>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-3xl p-6 shadow-lg shadow-brand/5 ${className}`}>{children}</div>
  );
}

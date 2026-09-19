import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const labels = {
  d: { ar: "يوم", en: "Days" },
  h: { ar: "ساعة", en: "Hours" },
  m: { ar: "دقيقة", en: "Min" },
  s: { ar: "ثانية", en: "Sec" },
};

function diff(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ target, compact = false }: { target: string; compact?: boolean }) {
  const { t } = useLang();
  const [left, setLeft] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setLeft(diff(target));
    const id = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { key: "d" as const, value: left?.d },
    { key: "h" as const, value: left?.h },
    { key: "m" as const, value: left?.m },
    { key: "s" as const, value: left?.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 text-center">
      {cells.map((c) => (
        <div key={c.key} className={`glass-soft rounded-2xl ${compact ? "py-3" : "py-4"}`}>
          <div
            className={`font-display font-bold text-brand tabular-nums ${compact ? "text-2xl" : "text-3xl"}`}
          >
            {c.value === undefined ? "—" : String(c.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">{t(labels[c.key])}</div>
        </div>
      ))}
    </div>
  );
}

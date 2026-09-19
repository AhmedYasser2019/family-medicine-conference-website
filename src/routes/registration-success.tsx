import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useLang } from "@/lib/i18n";
import { contacts } from "@/data/conference";
import { GlassCard, PageShell } from "@/components/site/PageShell";
import { confirmRegistrationPayment } from "@/lib/registration.functions";

type Search = { rid: string | undefined };

export const Route = createFileRoute("/registration-success")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    rid: typeof search["rid"] === "string" ? search["rid"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "تأكيد التسجيل — Deep Dive 2026" },
      {
        name: "description",
        content: "صفحة تأكيد حالة الدفع والتسجيل في مؤتمر Deep Dive 2026 لطب الأسرة.",
      },
      { property: "og:title", content: "تأكيد التسجيل — Deep Dive 2026" },
      {
        property: "og:description",
        content: "تحقق من حالة دفع رسوم تسجيلك في مؤتمر Deep Dive 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistrationSuccessPage,
});

type Result = Awaited<ReturnType<typeof confirmRegistrationPayment>>;

function RegistrationSuccessPage() {
  const { t, lang } = useLang();
  const { rid } = Route.useSearch();
  const support = contacts[0]!;
  const confirm = useServerFn(confirmRegistrationPayment);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!rid) {
      setLoading(false);
      return;
    }
    confirm({ data: { registrationId: rid } })
      .then((r) => {
        if (active) setResult(r);
      })
      .catch(() => {
        if (active) setResult(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [rid, confirm]);

  const paid = result?.ok && result.status === "paid";

  return (
    <PageShell title={{ ar: "تأكيد التسجيل", en: "Registration confirmation" }}>
      <GlassCard className="max-w-2xl">
        {loading ? (
          <p className="text-[15px]">
            {t({ ar: "جارٍ التحقق من الدفع…", en: "Verifying payment…" })}
          </p>
        ) : !result?.ok ? (
          <p className="text-[15px] leading-relaxed">
            {t({
              ar: "تعذّر العثور على بيانات التسجيل. إذا تم خصم المبلغ، تواصل مع دعم التسجيل وسنؤكد مشاركتك.",
              en: "We could not find your registration. If you were charged, contact registration support and we will confirm your place.",
            })}
          </p>
        ) : paid ? (
          <>
            <h2 className="font-display text-xl font-bold text-brand">
              {t({ ar: "تم تأكيد تسجيلك بنجاح", en: "Your registration is confirmed" })}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed">
              {t({
                ar: "تم استلام الدفع وحفظ بياناتك. ستصلك رسالة تأكيد على بريدك الإلكتروني بتفاصيل الحضور.",
                en: "Payment received and your details are saved. A confirmation email with attendance details will be sent to you.",
              })}
            </p>
            <div className="mt-5 grid gap-2 text-[14px]">
              <Row label={{ ar: "الاسم", en: "Name" }} value={result.fullName} />
              <Row label={{ ar: "البريد الإلكتروني", en: "Email" }} value={result.email} />
              <Row label={{ ar: "فئة التسجيل", en: "Category" }} value={result.categoryLabel} />
              <Row
                label={{ ar: "المبلغ المدفوع", en: "Amount paid" }}
                value={
                  lang === "ar"
                    ? `${result.amountSar.toLocaleString("en-US")} ريال`
                    : `SAR ${result.amountSar.toLocaleString("en-US")}`
                }
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="font-display text-xl font-bold">
              {t({ ar: "لم يكتمل الدفع بعد", en: "Payment not completed" })}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed">
              {t({
                ar: "حُفظت بياناتك لكن لم نستلم تأكيد الدفع. يمكنك إعادة المحاولة من صفحة التسجيل.",
                en: "Your details were saved but we have not received the payment confirmation. You can retry from the registration page.",
              })}
            </p>
            <a
              href="/register"
              className="mt-5 inline-block rounded-2xl bg-accent-cyan px-6 py-3 font-semibold text-primary-foreground"
            >
              {t({ ar: "إعادة المحاولة", en: "Try again" })}
            </a>
          </>
        )}
        <p className="mt-6 text-[13px] text-muted-foreground">
          {t({ ar: "دعم التسجيل:", en: "Registration support:" })}{" "}
          <a href={`mailto:${support.email}`} className="font-semibold text-brand hover:underline">
            {support.email}
          </a>
        </p>
      </GlassCard>
    </PageShell>
  );
}

function Row({ label, value }: { label: { ar: string; en: string }; value: string }) {
  const { t } = useLang();
  return (
    <div className="glass-soft flex items-center justify-between rounded-2xl px-4 py-3">
      <span className="text-muted-foreground">{t(label)}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

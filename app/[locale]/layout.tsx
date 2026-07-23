import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import LayoutWrapper from "@/components/LayoutWrapper";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = (
    await import(`@/messages/${locale}.json`)
  ).default;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <div
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={locale === "ar" ? "rtl" : "ltr"}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </div>
    </NextIntlClientProvider>
  );
}
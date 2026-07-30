import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
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
  const normalizedLocale = locale as Locale;

  if (!locales.includes(normalizedLocale)) {
    notFound();
  }

  const messages = (
    await import(`@/messages/${normalizedLocale}.json`)
  ).default;

  return (
    <NextIntlClientProvider
      locale={normalizedLocale}
      messages={messages}
    >
      <div
        lang={normalizedLocale}
        dir={normalizedLocale === "ar" ? "rtl" : "ltr"}
        className={normalizedLocale === "ar" ? "rtl" : "ltr"}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </div>
    </NextIntlClientProvider>
  );
}
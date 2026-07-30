import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "@/i18n";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale =
    locale && locales.includes(locale as Locale)
      ? (locale as Locale)
      : defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default,
  };
});
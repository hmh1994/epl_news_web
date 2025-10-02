// app/[locale]/_middleware.ts 또는 messages-config.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  const messages = (
    await import(`../../../../messages/${locale}.json`)
  ).default;

  return {
    locale,
    messages,
  };
});

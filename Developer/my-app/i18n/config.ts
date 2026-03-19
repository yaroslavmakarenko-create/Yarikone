export const i18nConfig = {
  locales: ['uk', 'en', 'ru'] as const,
  defaultLocale: 'uk' as const,
  localePrefix: 'always'
}

export type Locale = (typeof i18nConfig.locales)[number]

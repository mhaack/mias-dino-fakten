import { siteConfig } from '../config'
import type I18nKey from './i18nKey'
import { de } from './languages/de'
import { en } from './languages/en'

export type Translation = {
  [K in I18nKey]: string
}

const defaultTranslation = en

const map: { [key: string]: Translation } = {
  de: de,
  de_de: de,
  en: en,
  en_us: en,
  en_gb: en,
  en_au: en,
}

export function getTranslation(lang: string): Translation {
  return map[lang.toLowerCase()] || defaultTranslation
}

export function i18n(key: I18nKey): string {
  const lang = siteConfig.lang || 'en'
  return getTranslation(lang)[key]
}

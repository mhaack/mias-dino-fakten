import { LinkPreset, type NavBarLink } from '@/types/config'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
  [LinkPreset.Home]: {
    name: i18n(I18nKey.home),
    url: '/',
  },
  [LinkPreset.About]: {
    name: i18n(I18nKey.about),
    url: '/about/',
  },
  [LinkPreset.Tags]: {
    name: i18n(I18nKey.tags),
    url: '/tags/',
  },
  [LinkPreset.AllDinos]: {
    name: i18n(I18nKey.allDinos),
    url: '/dinos/',
  },
  [LinkPreset.DinoOfTheMonth]: {
    name: i18n(I18nKey.dinoOfTheMonth),
    url: '/dino-des-monats/',
  },
}
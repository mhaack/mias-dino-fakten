import type { NavBarConfig, ProfileConfig, SiteConfig } from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: `Mia's Dino-Fakten`,
  subtitle: `Mein kleines Dinosaurier-Lexikon mit allen Infos die Du schon immer über Dino's wissen wolltest.`,
  lang: "de",
  themeColor: {
    hue: 75
  },
  banner: {
    enable: true,
    src: "assets/images/hero-banner.jpg",
    position: "center",
    credit: {
      enable: true,
      text: "sebastien ecosse",
      url: "https://www.artstation.com/artwork/DLnDA",
    },
  },
  logo: "assets/images/logo.png",
  favicon: [],
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.AllDinos,
    LinkPreset.DinoOfTheMonth,
    LinkPreset.DinoMap,
    LinkPreset.About,
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/logo.png",
  name: `Mia's Dino-Fakten`,
  bio: "Mein kleines Dinosaurier-Lexikon mit allen Infos die Du schon immer über Dino's wissen wolltest.",
  links: [],
};

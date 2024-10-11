import type { NavBarConfig, ProfileConfig, SiteConfig } from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: `Mia's Dino-Fakten`,
  subtitle: `Mia's Dino-Fakten`,
  lang: "de",
  themeColor: {
    hue: 75,
    fixed: false, // Hide the theme color picker for visitors
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
    LinkPreset.About,
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/logo.png",
  name: `Mia's Dino-Fakten`,
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  links: [],
};

// tags
// omnivore <iconify-icon icon="mdi:cookie"></iconify-icon>
// herbivore <iconify-icon icon="mdi:plant-outline"></iconify-icon>
// carnivore <iconify-icon icon="mdi:meat"></iconify-icon>

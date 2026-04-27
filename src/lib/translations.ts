const translations = {
  en: {
    // Utility bar
    "util.language": "English",
    "util.darkMode": "Dark Mode",
    "util.lightMode": "Light Mode",
    "util.fontSize": "Font Size",
    "util.increase": "Increase",
    "util.decrease": "Decrease",
    "util.highContrast": "High Contrast",
    "util.search": "Search",
    "util.accessibility": "Accessibility",

    // Navigation
    "nav.services": "Services",
    "nav.traffic": "Traffic & Roads",
    "nav.news": "News & Advisories",
    "nav.about": "About MMDA",
    "nav.contact": "Contact",
    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.close": "Close menu",
    "nav.skipToContent": "Skip to main content",

    // Search
    "search.placeholder": "Search MMDA services, news, traffic...",
    "search.label": "Search the MMDA website",
    "search.submit": "Search",

    // Footer
    "footer.about": "About",
    "footer.aboutDesc":
      "The Metropolitan Manila Development Authority (MMDA) is responsible for delivery of metro-wide services in Metro Manila.",
    "footer.services": "Services",
    "footer.resources": "Resources",
    "footer.connect": "Connect",
    "footer.driversLicense": "Driver's License",
    "footer.vehicleRegistration": "Vehicle Registration",
    "footer.trafficViolations": "Traffic Violations",
    "footer.towingImpound": "Towing & Impound",
    "footer.reportConcern": "Report a Concern",
    "footer.trafficUpdates": "Traffic Updates",
    "footer.floodUpdates": "Flood Updates",
    "footer.numberCoding": "Number Coding",
    "footer.pressReleases": "Press Releases",
    "footer.careers": "Careers",
    "footer.hotline": "Hotline: 136",
    "footer.followX": "Follow us on X",
    "footer.followFacebook": "Follow us on Facebook",
    "footer.copyright": "© {year} Metropolitan Manila Development Authority. All rights reserved.",

    // Accessibility
    "a11y.opensNewTab": "opens in new tab",
    "a11y.mainNav": "Main navigation",
    "a11y.utilNav": "Utility navigation",
    "a11y.footerNav": "Footer navigation",
  },
  fil: {
    // Utility bar
    "util.language": "Filipino",
    "util.darkMode": "Dark Mode",
    "util.lightMode": "Light Mode",
    "util.fontSize": "Laki ng Letra",
    "util.increase": "Palakihin",
    "util.decrease": "Paliitin",
    "util.highContrast": "Mataas na Contrast",
    "util.search": "Maghanap",
    "util.accessibility": "Accessibility",

    // Navigation
    "nav.services": "Mga Serbisyo",
    "nav.traffic": "Trapiko at Kalsada",
    "nav.news": "Balita at Abiso",
    "nav.about": "Tungkol sa MMDA",
    "nav.contact": "Makipag-ugnayan",
    "nav.home": "Tahanan",
    "nav.menu": "Menu",
    "nav.close": "Isara ang menu",
    "nav.skipToContent": "Pumunta sa pangunahing nilalaman",

    // Search
    "search.placeholder": "Maghanap ng serbisyo, balita, trapiko...",
    "search.label": "Hanapin sa website ng MMDA",
    "search.submit": "Maghanap",

    // Footer
    "footer.about": "Tungkol",
    "footer.aboutDesc":
      "Ang Metropolitan Manila Development Authority (MMDA) ang responsable sa pagbibigay ng mga serbisyong metro-wide sa Metro Manila.",
    "footer.services": "Mga Serbisyo",
    "footer.resources": "Mga Mapagkukunan",
    "footer.connect": "Makipag-ugnayan",
    "footer.driversLicense": "Lisensya sa Pagmamaneho",
    "footer.vehicleRegistration": "Rehistrasyon ng Sasakyan",
    "footer.trafficViolations": "Paglabag sa Trapiko",
    "footer.towingImpound": "Towing at Impound",
    "footer.reportConcern": "Mag-ulat ng Problema",
    "footer.trafficUpdates": "Update sa Trapiko",
    "footer.floodUpdates": "Update sa Baha",
    "footer.numberCoding": "Number Coding",
    "footer.pressReleases": "Mga Pahayag sa Press",
    "footer.careers": "Trabaho",
    "footer.hotline": "Hotline: 136",
    "footer.followX": "Sundan kami sa X",
    "footer.followFacebook": "Sundan kami sa Facebook",
    "footer.copyright": "© {year} Metropolitan Manila Development Authority. Lahat ng karapatan ay nakalaan.",

    // Accessibility
    "a11y.opensNewTab": "magbubukas sa bagong tab",
    "a11y.mainNav": "Pangunahing nabigasyon",
    "a11y.utilNav": "Utility na nabigasyon",
    "a11y.footerNav": "Footer na nabigasyon",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(key: TranslationKey, lang: "en" | "fil"): string {
  return translations[lang][key] ?? translations.en[key] ?? key;
}

export default translations;

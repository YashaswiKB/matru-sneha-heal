import { lsGet, lsSet } from "./storage";

const LANG_KEY = "lang";
export type Lang = "en" | "kn";

export function getLang(): Lang {
  return lsGet<Lang>(LANG_KEY, "en");
}
export function setLang(l: Lang) {
  lsSet(LANG_KEY, l);
  window.dispatchEvent(new CustomEvent("matrusneh:lang", { detail: l }));
}

type Dict = Record<string, { en: string; kn: string }>;

export const t: Dict = {
  appName: { en: "Matru-Sneh Health", kn: "ಮಾತೃ-ಸ್ನೇಹ ಆರೋಗ್ಯ" },
  tagline: { en: "Your gentle companion through pregnancy", kn: "ಗರ್ಭಾವಸ್ಥೆಯಲ್ಲಿ ನಿಮ್ಮ ಮೃದು ಸಂಗಾತಿ" },
  home: { en: "Home", kn: "ಮುಖಪುಟ" },
  back: { en: "Back", kn: "ಹಿಂದೆ" },
  kickCounter: { en: "Kick Counter", kn: "ಒದೆತ ಎಣಿಕೆ" },
  kickDesc: { en: "Track baby's movements", kn: "ಮಗುವಿನ ಚಲನೆ ಗಮನಿಸಿ" },
  checkup: { en: "Check-up Countdown", kn: "ತಪಾಸಣೆ ಎಣಿಕೆ" },
  checkupDesc: { en: "Next visit reminders", kn: "ಮುಂದಿನ ಭೇಟಿ ಜ್ಞಾಪನೆ" },
  nutrition: { en: "Nutrition Plate", kn: "ಪೌಷ್ಟಿಕ ತಟ್ಟೆ" },
  nutritionDesc: { en: "Daily food checklist", kn: "ದೈನಂದಿನ ಆಹಾರ ಪಟ್ಟಿ" },
  danger: { en: "Danger Signs Alert", kn: "ಅಪಾಯ ಸೂಚನೆ" },
  dangerDesc: { en: "Check symptoms now", kn: "ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ" },
  guide: { en: "Weekly Baby Guide", kn: "ವಾರದ ಶಿಶು ಮಾರ್ಗದರ್ಶಿ" },
  guideDesc: { en: "Tips for each week", kn: "ಪ್ರತಿ ವಾರದ ಸಲಹೆಗಳು" },
  offline: { en: "Works offline", kn: "ಆಫ್‌ಲೈನ್ ಕೆಲಸ ಮಾಡುತ್ತದೆ" },
};

export function tr(key: keyof typeof t, lang: Lang) {
  return t[key]?.[lang] ?? key;
}

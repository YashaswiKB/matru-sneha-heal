import { useEffect, useState } from "react";
import { getLang, setLang, type Lang } from "./i18n";

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLocal] = useState<Lang>(() => getLang());
  useEffect(() => {
    const handler = (e: Event) => setLocal((e as CustomEvent).detail as Lang);
    window.addEventListener("matrusneh:lang", handler);
    return () => window.removeEventListener("matrusneh:lang", handler);
  }, []);
  return [lang, (l) => setLang(l)];
}

import { useTranslation as useNextTranslation } from "next-export-i18n";

import i18n from "../../i18n";
import { searchDeep } from "../utils/search-deep";

interface UseTranslationReturn {
  t: (input: string) => string | undefined;
}

export const useTranslation = (): UseTranslationReturn => {
  try {
    return useNextTranslation();
  } catch {
    return {
      t: (input: string) => {
        const txt = i18n.translations.en as Record<string, unknown>;
        return (txt[input] ?? searchDeep(txt, input)) as string | undefined;
      },
    };
  }
};

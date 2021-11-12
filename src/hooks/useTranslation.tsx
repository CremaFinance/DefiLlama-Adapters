import { useTranslation as useNextTranslation } from "next-export-i18n";

import i18n from "../../i18n";
import { searchDeep } from "../utils/search-deep";

export const useTranslation = () => {
  try {
    return useNextTranslation();
  } catch {
    return {
      t: (input: string) => {
        const txt = i18n.translations.en as Record<string, unknown>;
        return txt[input] ?? String(searchDeep(txt, input));
      },
    };
  }
};

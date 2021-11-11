import { useTranslation as useNextTranslation } from "next-export-i18n";

import i18n from "../../i18n";

export const useTranslation = () => {
  try {
    return useNextTranslation();
  } catch {
    return {
      t: (input: string) => {
        const txt = i18n.translations.en as unknown;
        return (txt as Record<string, unknown>)[input];
      },
    };
  }
};

import { useTranslation } from "next-export-i18n";

import { getNftImageForTwitter } from "services/marinade/getNftImageForTwitter";
import { getRandomNumber } from "utils/get-random-number";

const useShareOnTwitter = () => {
  const { t } = useTranslation();

  const messages = [t("mndePage.twitter-messages.message-one")];

  return async (index: number, tier: number) => {
    const messageIndex = getRandomNumber(0, messages.length - 1);
    const twitterData = await getNftImageForTwitter(index, tier);

    window.open(
      `https://twitter.com/intent/tweet?text=${messages[messageIndex]}&url=https://${twitterData.entities.media[0].display_url}`,
      "_blank"
    );
  };
};

export default useShareOnTwitter;

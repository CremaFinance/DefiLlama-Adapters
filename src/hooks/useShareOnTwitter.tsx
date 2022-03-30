import { useTranslation } from "next-export-i18n";

import { getNftImageForTwitter } from "services/marinade/getNftImageForTwitter";
import { getRandomNumber } from "utils/get-random-number";

import { useEditions } from "./useEditions";

const useShareOnTwitter = () => {
  const { t } = useTranslation();
  const { data } = useEditions() || [];

  const limitedMessages = [
    t("mndePage.twitter-messages.limited.message-one"),
    t("mndePage.twitter-messages.limited.message-two"),
  ];

  const regularMessages = [
    t("mndePage.twitter-messages.regular.message-one"),
    t("mndePage.twitter-messages.regular.message-two"),
    t("mndePage.twitter-messages.regular.message-three"),
  ];

  return async (index: number, tier: number, pid: string) => {
    const editionInfo = data?.find((x) => x !== undefined);
    const isLimited = !!editionInfo?.left;
    const messages: string[] = isLimited ? limitedMessages : regularMessages;
    const messageIndex = getRandomNumber(0, messages.length - 1);
    const twitterData = await getNftImageForTwitter(index, tier);
    window.open(
      `https://twitter.com/intent/tweet?text=${messages[messageIndex].replace(
        "{{left}}",
        isLimited ? editionInfo?.left.toString() : ""
      )}%0A%0Ahttps://marinade.finance/app/mnde/nft?pid=${pid}&url=https://${
        twitterData.entities.media[0].display_url
      }`,
      "_blank"
    );
  };
};

export default useShareOnTwitter;

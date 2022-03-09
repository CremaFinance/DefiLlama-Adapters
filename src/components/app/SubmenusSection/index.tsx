import { Flex, Text, IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import { MdInfoOutline } from "react-icons/md";

import MNDESubmenuCard from "components/molecules/MNDESubmenuCard";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import colors from "styles/customTheme/colors";

const SubmenusMndeSection = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Flex
      pt={["56px", "72px"]}
      pb={[12, 8]}
      aria-label="mnde-section"
      position="relative"
      flexDirection="column"
      width="100vw"
    >
      <Flex
        marginTop={{ base: "24px", lg: "40px" }}
        marginBottom={{ base: "24px", lg: "40px" }}
        marginX="8px"
        alignItems="center"
        flexDirection="column"
      >
        <Flex>
          <Text
            color={colors.black}
            textAlign="center"
            fontWeight="bold"
            fontSize={["22.5px", "43.95px"]}
            maxWidth="670px"
            mb="4px"
          >
            {t("appPage.mnde.header")}
          </Text>
          <TooltipWithContent tooltipText={t("appPage.mnde.description1")}>
            <IconButton
              _focus={{ boxShadow: "none" }}
              variant="link"
              aria-label="Info APY"
              marginBottom="5px"
              marginLeft="-5px"
              display={{ base: "flex", xl: "none" }}
              icon={<MdInfoOutline />}
            />
          </TooltipWithContent>
        </Flex>
        <Text
          color={colors.black}
          textAlign="center"
          fontSize={{ base: "14px", md: "18px" }}
          lineHeight={{ base: "20px", md: "27px" }}
          maxWidth={{ base: "288px", md: "670px" }}
          display={{ base: "none", xl: "flex" }}
        >
          {t("appPage.mnde.description1")}
        </Text>
        <Text
          color={colors.black}
          textAlign="center"
          fontSize={{ base: "14px", md: "18px" }}
          lineHeight={{ base: "20px", md: "27px" }}
          maxWidth={{ base: "288px", md: "670px" }}
        >
          {t("appPage.mnde.description2")}
        </Text>
      </Flex>
      <Flex
        flexDirection={["column", "row"]}
        zIndex={10}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        px={{ base: "24px", lg: "6vw" }}
      >
        <MNDESubmenuCard
          cardTitle={t("appPage.mnde.buy-mnde-card.title")}
          cardDescription={t("appPage.mnde.buy-mnde-card.description")}
          cardButtonText={t("appPage.mnde.buy-mnde-card.button")}
          cardIllustrationPath="/ilustrations/buy-mnde.svg"
          isExternal
          onClickCardButton={() =>
            window.open("https://jup.ag/swap/mSOL-MNDE", "_blank")
          }
        />
        <MNDESubmenuCard
          cardTitle={t("appPage.mnde.lock-card.title")}
          cardDescription={t("appPage.mnde.lock-card.description")}
          cardButtonText={t("appPage.mnde.lock-card.button")}
          cardIllustrationPath="/ilustrations/lock.svg"
          onClickCardButton={() => router.push("mnde/lock")}
        />
        <MNDESubmenuCard
          cardTitle={t("appPage.mnde.nft-vote-card.title")}
          cardDescription={t("appPage.mnde.nft-vote-card.description")}
          cardButtonText={t("appPage.mnde.nft-vote-card.button")}
          cardIllustrationPath="/ilustrations/vote.svg"
          isExternal
          onClickCardButton={() =>
            window.open("https://vote.marinade.finance/gov/mnde", "_blank")
          }
        />
        <MNDESubmenuCard
          cardTitle={t("appPage.mnde.earn-card.title")}
          cardDescription={t("appPage.mnde.earn-card.description")}
          cardButtonText={t("appPage.mnde.earn-card.button")}
          cardIllustrationPath="/ilustrations/earn.svg"
          cardButtonDisabled
        />
      </Flex>
    </Flex>
  );
};

export default SubmenusMndeSection;

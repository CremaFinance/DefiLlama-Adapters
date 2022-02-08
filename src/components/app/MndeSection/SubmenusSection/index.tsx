import { Flex, Text, IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { MdInfoOutline } from "react-icons/md";

import TooltipWithContent from "components/molecules/TooltipWithContent";
import colors from "styles/customTheme/colors";

import EarnMNDECard from "./EarnMNDECard";
import LockMNDECard from "./LockMNDECard";
import NFTVoteMNDECard from "./NFTVoteMNDECard";

const SubmenusMndeSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      pt={["100px", "72px"]}
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
        px={{ base: "4px", lg: "6vw" }}
      >
        <>
          <LockMNDECard />
          <NFTVoteMNDECard />
          <EarnMNDECard />
        </>
      </Flex>
    </Flex>
  );
};

export default SubmenusMndeSection;

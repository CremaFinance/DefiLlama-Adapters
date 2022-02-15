import { Flex, Divider, Text, Icon } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";

import NFTLevelsItem from "../NFTLevelsItem";
import colors from "styles/customTheme/colors";

const NFTLevels = () => {
  const { t } = useTranslation();

  const [selectedLevel, setSelectedLevel] = useState("none");

  return (
    <Flex
      pt={["100px", "72px"]}
      pb={[12, 8]}
      aria-label="mnde-section"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      width="100vw"
      zIndex={10}
      flexWrap="wrap"
      alignItems="center"
    >
      <Flex
        ml={{ base: "0px", md: "8px" }}
        mr={{ base: "0px", md: "8px" }}
        height={{ base: "425px", md: "250px" }}
        width={{ base: "70%", md: "485px" }}
        flexDirection={{ md: "row", base: "column" }}
        padding={{ base: "0px", md: "10px", lg: "32px" }}
        mb="16px"
        background="white"
        justifyContent="center"
        alignItems="center"
        zIndex={6}
      >
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier1.svg"
          title={t("appPage.mnde.nft-levels.level-one.title")}
          amount={t("appPage.mnde.nft-levels.level-one.amount")}
          onClick={() => {
            setSelectedLevel("tier1");
          }}
          selected={selectedLevel === "tier1"}
          limited
        />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier2.svg"
          title={t("appPage.mnde.nft-levels.level-two.title")}
          amount={t("appPage.mnde.nft-levels.level-two.amount")}
          onClick={() => {
            setSelectedLevel("tier2");
          }}
          selected={selectedLevel === "tier2"}
          limited
        />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier3.svg"
          title={t("appPage.mnde.nft-levels.level-three.title")}
          amount={t("appPage.mnde.nft-levels.level-three.amount")}
          onClick={() => {
            setSelectedLevel("tier3");
          }}
          selected={selectedLevel === "tier3"}
        />
        <Flex ml={{ base: "0px", md: "4px" }} mr={{ base: "0px", md: "4px" }}>
          <Divider
            borderColor="#E2E8F0"
            orientation="vertical"
            height="180px"
            opacity="1"
            mt="43px"
            display={{ base: "none", md: "flex" }}
          />
          <Divider
            mt="4px"
            mb="30px"
            borderColor="#E2E8F0"
            orientation="horizontal"
            width="256px"
            height="10px"
            opacity="1"
            display={{ base: "flex", md: "none" }}
          />
          <Text
            marginLeft={{ base: "2px", md: "9px" }}
            marginTop={{ base: "20px", md: "190px" }}
            position="absolute"
            fontWeight="bold"
            textAlign="left"
            fontSize="9.22px"
            cursor="pointer"
            lineHeight="13.83px"
            color={colors.marinadeGreen}
          >
            {t("appPage.mnde.nft-levels.buy-more")}
            <Icon
              as={FiExternalLink}
              width="10px"
              height="10px"
              cursor="pointer"
              marginLeft="2px"
              marginBottom="-1px"
            />
          </Text>
        </Flex>
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier4.svg"
          title={t("appPage.mnde.nft-levels.level-four.title")}
          amount={t("appPage.mnde.nft-levels.level-four.amount")}
          onClick={() => {
            setSelectedLevel("tier4");
          }}
          selected={selectedLevel === "tier4"}
          limited
          disabled
          mb="-9px"
        />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier5.svg"
          title={t("appPage.mnde.nft-levels.level-five.title")}
          amount={t("appPage.mnde.nft-levels.level-five.amount")}
          onClick={() => {
            setSelectedLevel("tier5");
          }}
          selected={selectedLevel === "tier5"}
          limited
          disabled
        />
      </Flex>
    </Flex>
  );
};
export default NFTLevels;

import { Flex, Divider, Text, Icon } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";

import NFTLevelsItem from "../NFTLevelsItem";
import colors from "styles/customTheme/colors";

const NFTLevels = () => {
  const { t } = useTranslation();

  const placeholder = "{{amountLeft}}";

  const [selectedLevel, setSelectedLevel] = useState("none");
  const [tierOneAmountLeft, setTierOneAmountLeft] = useState("0");
  const [tierTwoAmountLeft, setTierTwoAmountLeft] = useState("0");
  const [tierFourAmountLeft, setTierFourAmountLeft] = useState("0");
  const [tierFiveAmountLeft, setTierFiveAmountLeft] = useState("0");

  useEffect(() => {
    setTierOneAmountLeft("3,215");
    setTierTwoAmountLeft("13");
    setTierFourAmountLeft("213");
    setTierFiveAmountLeft("3");
  }, []);

  return (
    <Flex
      aria-label="mnde-section"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      zIndex={10}
      flexWrap="wrap"
      alignItems="center"
    >
      <Flex
        height={{ base: "425px", md: "180px" }}
        width="100%"
        flexDirection={{ md: "row", base: "column" }}
        mb={{ base: "0px", md: "26px" }}
        justifyContent="center"
        alignItems="center"
        zIndex={6}
      >
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier1.svg"
          title={t("appPage.mnde.nft-levels.level-one.title")}
          amount={t("appPage.mnde.nft-levels.level-one.amount")?.replace(
            placeholder,
            tierOneAmountLeft
          )}
          onClick={() => {
            setSelectedLevel("tier1");
          }}
          selected={selectedLevel === "tier1"}
          limited
        />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier2.svg"
          title={t("appPage.mnde.nft-levels.level-two.title")}
          amount={t("appPage.mnde.nft-levels.level-two.amount")?.replace(
            placeholder,
            tierTwoAmountLeft
          )}
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
        <Flex
          ml={{ base: "0px", md: "4px" }}
          mr={{ base: "0px", md: "4px" }}
          width={{ base: "100%", sm: "0" }}
        >
          <Divider
            borderColor="gray.200"
            orientation="vertical"
            height="180px"
            opacity="1"
            mt="43px"
            display={{ base: "none", md: "flex" }}
          />
          <Divider
            mt="4px"
            mb="30px"
            ml="2px"
            borderColor="gray.200"
            orientation="horizontal"
            width={{ base: "100%", sm: "340px" }}
            height="10px"
            opacity="1"
            display={{ base: "flex", md: "none" }}
          />
          <Text
            marginLeft={{ base: "5px", md: "9px" }}
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
          amount={t("appPage.mnde.nft-levels.level-four.amount")?.replace(
            placeholder,
            tierFourAmountLeft
          )}
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
          amount={t("appPage.mnde.nft-levels.level-five.amount")?.replace(
            placeholder,
            tierFiveAmountLeft
          )}
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

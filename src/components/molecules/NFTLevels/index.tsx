import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState, useEffect } from "react";

import LevelDivider from "../LevelDivider";
import NFTLevelsItem from "../NFTLevelsItem";

type NFTLevelsProps = {
  balance: number;
  input: string;
  onLevelClick: (value: string, changeInputAmount: boolean) => void;
};

const NFTLevels = ({ balance, input, onLevelClick }: NFTLevelsProps) => {
  const { t } = useTranslation();
  const placeholder = "{{amountLeft}}";

  const [selectedLevel, setSelectedLevel] = useState("none");
  const [levelOneAmountLeft, setLevelOneAmountLeft] = useState("0");
  const [levelTwoAmountLeft, setLevelTwoAmountLeft] = useState("0");
  const [levelThreeAmountLeft, setLevelThreeAmountLeft] = useState("0");
  const [levelFourAmountLeft, setLevelFourAmountLeft] = useState("0");
  const [levelFiveAmountLeft, setLevelFiveAmountLeft] = useState("0");

  useEffect(() => {
    setLevelOneAmountLeft("3,215");
    setLevelTwoAmountLeft("13");
    setLevelThreeAmountLeft("0");
    setLevelFourAmountLeft("213");
    setLevelFiveAmountLeft("3");
  }, []);

  useEffect(() => {
    const inputAmount = Number(input);
    if (inputAmount < 1000) {
      setSelectedLevel("-");
      onLevelClick("-", false);
    }
    if (inputAmount > 999 && inputAmount < 5000 && inputAmount <= balance) {
      setSelectedLevel("level1");
      onLevelClick("1", false);
    }
    if (inputAmount >= 5000 && inputAmount < 25000 && inputAmount <= balance) {
      setSelectedLevel("level2");
      onLevelClick("2", false);
    }
    if (
      inputAmount >= 25000 &&
      inputAmount < 100000 &&
      inputAmount <= balance
    ) {
      setSelectedLevel("level3");
      onLevelClick("3", false);
    }
    if (
      inputAmount >= 100000 &&
      inputAmount < 250000 &&
      inputAmount <= balance
    ) {
      setSelectedLevel("level4");
      onLevelClick("4", false);
    }
    if (inputAmount >= 250000 && inputAmount <= balance) {
      setSelectedLevel("level5");
      onLevelClick("5", false);
    }
  }, [balance, input, onLevelClick]);

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
        height={{ base: "400px", md: "200px" }}
        width="100%"
        flexDirection={{ md: "row", base: "column" }}
        mt={[2, 0]}
        mb={[0, 6]}
        justifyContent="center"
        alignItems="center"
        zIndex={6}
      >
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level1.svg"
          title={t("appPage.mnde.nft-levels.level-one.title")}
          amount={
            levelOneAmountLeft !== "0"
              ? t("appPage.mnde.nft-levels.level-one.amount.limited")?.replace(
                  placeholder,
                  levelOneAmountLeft
                )
              : t("appPage.mnde.nft-levels.level-one.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level1");
            if (balance >= 1000) onLevelClick("1", true);
          }}
          selected={selectedLevel === "level1"}
          disabled={balance < 1000}
          limited={levelOneAmountLeft !== "0"}
        />
        <LevelDivider min={1000} max={5000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level2.svg"
          title={t("appPage.mnde.nft-levels.level-two.title")}
          amount={
            levelTwoAmountLeft !== "0"
              ? t("appPage.mnde.nft-levels.level-two.amount.limited")?.replace(
                  placeholder,
                  levelTwoAmountLeft
                )
              : t("appPage.mnde.nft-levels.level-two.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level2");
            if (balance >= 5000) onLevelClick("2", true);
          }}
          selected={selectedLevel === "level2"}
          disabled={balance < 5000}
          limited={levelTwoAmountLeft !== "0"}
        />
        <LevelDivider min={5000} max={25000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level3.svg"
          title={t("appPage.mnde.nft-levels.level-three.title")}
          amount={
            levelThreeAmountLeft !== "0"
              ? t(
                  "appPage.mnde.nft-levels.level-three.amount.limited"
                )?.replace(placeholder, levelThreeAmountLeft)
              : t("appPage.mnde.nft-levels.level-three.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level3");
            if (balance >= 25000) onLevelClick("3", true);
          }}
          limited={levelThreeAmountLeft !== "0"}
          selected={selectedLevel === "level3"}
          disabled={balance < 25000}
        />
        <LevelDivider min={25000} max={100000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level4.svg"
          title={t("appPage.mnde.nft-levels.level-four.title")}
          amount={
            levelFourAmountLeft !== "0"
              ? t("appPage.mnde.nft-levels.level-four.amount.limited")?.replace(
                  placeholder,
                  levelFourAmountLeft
                )
              : t("appPage.mnde.nft-levels.level-four.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level4");
            if (balance >= 100000) onLevelClick("4", true);
          }}
          selected={selectedLevel === "level4"}
          limited={levelFourAmountLeft !== "0"}
          disabled={balance < 100000}
          mb="-9px"
        />
        <LevelDivider min={100000} max={250000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level5.svg"
          title={t("appPage.mnde.nft-levels.level-five.title")}
          amount={
            levelFiveAmountLeft !== "0"
              ? t("appPage.mnde.nft-levels.level-five.amount.limited")?.replace(
                  placeholder,
                  levelFiveAmountLeft
                )
              : t("appPage.mnde.nft-levels.level-five.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level5");
            if (balance >= 250000) onLevelClick("5", true);
          }}
          selected={selectedLevel === "level5"}
          limited={levelFiveAmountLeft !== "0"}
          disabled={balance < 250000}
        />
      </Flex>
    </Flex>
  );
};
export default NFTLevels;

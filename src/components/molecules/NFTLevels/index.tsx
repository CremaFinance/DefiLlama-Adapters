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

  useEffect(() => {
    const inputAmount = Number(input);
    if (inputAmount < 1000) {
      setSelectedLevel("-");
      onLevelClick("-", false);
    }
    if (inputAmount > 999 && inputAmount < 5000 && inputAmount <= balance) {
      setSelectedLevel("tier1");
      onLevelClick("1", false);
    }
    if (inputAmount > 4999 && inputAmount < 25000 && inputAmount <= balance) {
      setSelectedLevel("tier2");
      onLevelClick("2", false);
    }
    if (inputAmount > 24999 && inputAmount < 100000 && inputAmount <= balance) {
      setSelectedLevel("tier3");
      onLevelClick("3", false);
    }
    if (inputAmount > 99999 && inputAmount < 500000 && inputAmount <= balance) {
      setSelectedLevel("tier4");
      onLevelClick("4", false);
    }
    if (inputAmount > 499999 && inputAmount <= balance) {
      setSelectedLevel("tier5");
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
        width="100%"
        flexDirection={{ md: "row", base: "column" }}
        py={[2, 4]}
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
            if (balance >= 1000) onLevelClick("1", true);
          }}
          selected={selectedLevel === "tier1"}
          disabled={balance < 1000}
          limited
        />
        <LevelDivider min={1000} max={5000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier2.svg"
          title={t("appPage.mnde.nft-levels.level-two.title")}
          amount={t("appPage.mnde.nft-levels.level-two.amount")?.replace(
            placeholder,
            tierTwoAmountLeft
          )}
          onClick={() => {
            setSelectedLevel("tier2");
            if (balance >= 5000) onLevelClick("2", true);
          }}
          selected={selectedLevel === "tier2"}
          disabled={balance < 5000}
          limited
        />
        <LevelDivider min={5000} max={25000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier3.svg"
          title={t("appPage.mnde.nft-levels.level-three.title")}
          amount={t("appPage.mnde.nft-levels.level-three.amount")}
          onClick={() => {
            setSelectedLevel("tier3");
            if (balance >= 25000) onLevelClick("3", true);
          }}
          selected={selectedLevel === "tier3"}
          disabled={balance < 25000}
        />
        <LevelDivider min={25000} max={100000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier4.svg"
          title={t("appPage.mnde.nft-levels.level-four.title")}
          amount={t("appPage.mnde.nft-levels.level-four.amount")?.replace(
            placeholder,
            tierFourAmountLeft
          )}
          onClick={() => {
            setSelectedLevel("tier4");
            if (balance >= 100000) onLevelClick("4", true);
          }}
          selected={selectedLevel === "tier4"}
          limited
          disabled={balance < 100000}
          mb="-9px"
        />
        <LevelDivider min={100000} max={500000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-tier5.svg"
          title={t("appPage.mnde.nft-levels.level-five.title")}
          amount={t("appPage.mnde.nft-levels.level-five.amount")?.replace(
            placeholder,
            tierFiveAmountLeft
          )}
          onClick={() => {
            setSelectedLevel("tier5");
            if (balance >= 500000) onLevelClick("5", true);
          }}
          selected={selectedLevel === "tier5"}
          limited
          disabled={balance < 499999}
        />
      </Flex>
    </Flex>
  );
};
export default NFTLevels;

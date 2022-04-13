/* eslint-disable complexity */
/* eslint-disable sonarjs/cognitive-complexity */
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import LevelDivider from "../LevelDivider";
import NFTLevelsItem from "../NFTLevelsItem";
import { useTranslation } from "hooks/useTranslation";
import { numberToShortVersion } from "utils/number-to-short-version";

type NFTUpgradeLevelsProps = {
  limited: boolean;
  kind: string;
  balance: number;
  input: string;
  currentAmount: number;
  onLevelClick: (
    value: string,
    changeInputAmount: boolean,
    kind: string
  ) => void;
};

const NFTUpgradeLevels = ({
  balance,
  input,
  onLevelClick,
  currentAmount,
  limited,
  kind,
}: NFTUpgradeLevelsProps) => {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState("none");

  const currentLevel = t("appPage.mnde.nft-levels.current-level") ?? "";
  const lockMoreWithValue = t("appPage.mnde.nft-levels.lock-more-with-value");

  let secondLevelTitle = "";
  if (currentAmount < 25000 && currentAmount >= 5000) {
    secondLevelTitle = currentLevel;
  } else if (currentAmount < 5000) {
    secondLevelTitle =
      lockMoreWithValue?.replace(
        "{{value}}",
        numberToShortVersion(5000 - currentAmount)
      ) ?? "";
  }

  let thirdLevelTitle = "";
  if (currentAmount < 100000 && currentAmount >= 25000) {
    thirdLevelTitle = currentLevel;
  } else if (currentAmount < 25000) {
    thirdLevelTitle =
      lockMoreWithValue?.replace(
        "{{value}}",
        numberToShortVersion(25000 - currentAmount)
      ) ?? "";
  }

  let fourthLevelTitle = "";
  if (currentAmount < 250000 && currentAmount >= 100000) {
    fourthLevelTitle = currentLevel;
  } else if (currentAmount < 100000) {
    fourthLevelTitle =
      lockMoreWithValue?.replace(
        "{{value}}",
        numberToShortVersion(100000 - currentAmount)
      ) ?? "";
  }

  let fifthLevelTitle = "";
  if (currentAmount >= 250000) {
    fifthLevelTitle = currentLevel;
  } else if (currentAmount < 250000) {
    fifthLevelTitle =
      lockMoreWithValue?.replace(
        "{{value}}",
        numberToShortVersion(250000 - currentAmount)
      ) ?? "";
  }

  useEffect(() => {
    const inputAmount = Number(input);
    if (inputAmount < 1000) {
      setSelectedLevel("-");
      onLevelClick("-", false, "");
    }
    if (
      inputAmount >= 5000 - currentAmount &&
      inputAmount < 5000 &&
      inputAmount <= balance
    ) {
      setSelectedLevel("level2");
      onLevelClick("2", false, kind);
    }
    if (
      inputAmount >= 25000 - currentAmount &&
      inputAmount < 25000 &&
      inputAmount <= balance
    ) {
      setSelectedLevel("level3");
      onLevelClick("3", false, kind);
    }
    if (
      inputAmount >= 100000 - currentAmount &&
      inputAmount < 100000 &&
      inputAmount <= balance
    ) {
      setSelectedLevel("level4");
      onLevelClick("4", false, kind);
    }
    if (
      inputAmount >= 250000 - currentAmount &&
      inputAmount < 250000 &&
      inputAmount <= balance
    ) {
      setSelectedLevel("level4");
      onLevelClick("5", false, kind);
    }
    if (inputAmount >= 250000 && inputAmount <= balance) {
      setSelectedLevel("level5");
      onLevelClick("5", false, kind);
    }
  }, [balance, input, onLevelClick, kind, currentAmount, selectedLevel]);

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
        mt={[2, 2]}
        mb={[0, 2]}
        justifyContent="center"
        alignItems="flex-start"
        zIndex={6}
      >
        <NFTLevelsItem
          ilustration={
            limited
              ? "/ilustrations/nft-level1-le.svg"
              : "/ilustrations/nft-level1-re.svg"
          }
          title={currentAmount < 5000 ? currentLevel : ""}
          selected={selectedLevel === "level1"}
          disabled
        />
        <LevelDivider min={1000} max={5000} balance={currentAmount + balance} />
        <NFTLevelsItem
          ilustration={
            limited
              ? "/ilustrations/nft-level2-le.svg"
              : "/ilustrations/nft-level2-re.svg"
          }
          title={secondLevelTitle}
          onClick={() => {
            setSelectedLevel("level2");
            if (
              balance >= 5000 &&
              secondLevelTitle !== "" &&
              secondLevelTitle !== currentLevel
            )
              onLevelClick("2", true, kind);
          }}
          selected={selectedLevel === "level2"}
          disabled={
            balance < 5000 ||
            secondLevelTitle === "" ||
            secondLevelTitle.includes(currentLevel)
          }
        />
        <LevelDivider
          min={5000}
          max={25000}
          balance={currentAmount + balance}
        />
        <NFTLevelsItem
          ilustration={
            limited
              ? "/ilustrations/nft-level3-le.svg"
              : "/ilustrations/nft-level3-re.svg"
          }
          title={thirdLevelTitle}
          onClick={() => {
            setSelectedLevel("level3");
            if (
              balance >= 25000 &&
              thirdLevelTitle !== "" &&
              thirdLevelTitle !== currentLevel
            )
              onLevelClick("3", true, kind);
          }}
          selected={selectedLevel === "level3"}
          disabled={
            balance < 25000 ||
            thirdLevelTitle === "" ||
            thirdLevelTitle.includes(currentLevel)
          }
        />
        <LevelDivider
          min={25000}
          max={100000}
          balance={currentAmount + balance}
          last
        />
        <NFTLevelsItem
          ilustration={
            limited
              ? "/ilustrations/nft-level4-le.svg"
              : "/ilustrations/nft-level4-re.svg"
          }
          title={fourthLevelTitle}
          onClick={() => {
            setSelectedLevel("level4");
            if (
              balance >= 100000 &&
              fourthLevelTitle !== "" &&
              fourthLevelTitle !== currentLevel
            )
              onLevelClick("4", true, kind);
          }}
          selected={selectedLevel === "level4"}
          disabled={
            balance < 100000 ||
            fourthLevelTitle === "" ||
            fourthLevelTitle.includes(currentLevel)
          }
          imageHeight="56px"
          mb="-9px"
        />
        <LevelDivider
          min={100000}
          max={250000}
          balance={currentAmount + balance}
          last
        />
        <NFTLevelsItem
          ilustration={
            limited
              ? "/ilustrations/nft-level5-le.svg"
              : "/ilustrations/nft-level5-re.svg"
          }
          title={fifthLevelTitle}
          onClick={() => {
            setSelectedLevel("level5");
            if (balance >= 250000) onLevelClick("5", true, kind);
          }}
          selected={selectedLevel === "level5"}
          disabled={balance < 250000}
        />
      </Flex>
    </Flex>
  );
};
export default NFTUpgradeLevels;

/* eslint-disable complexity */
/* eslint-disable sonarjs/cognitive-complexity */
import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState, useEffect } from "react";

import LevelDivider from "../LevelDivider";
import NFTLevelsItem from "../NFTLevelsItem";
import { useEditions } from "hooks/useEditions";

type NFTLevelsProps = {
  balance: number;
  input: string;
  onLevelClick: (
    value: string,
    changeInputAmount: boolean,
    kind: string
  ) => void;
};

const NFTLevels = ({ balance, input, onLevelClick }: NFTLevelsProps) => {
  const { t } = useTranslation();
  const placeholder = "{{amountLeft}}";
  const { data: editionInfo, isRefetching } = useEditions();

  const [selectedLevel, setSelectedLevel] = useState("none");
  const [levelOneAmountLeft, setLevelOneAmountLeft] = useState(0);
  const [levelTwoAmountLeft, setLevelTwoAmountLeft] = useState(0);
  const [levelThreeAmountLeft, setLevelThreeAmountLeft] = useState(0);
  const [levelFourAmountLeft, setLevelFourAmountLeft] = useState(0);
  const [levelFiveAmountLeft, setLevelFiveAmountLeft] = useState(0);
  const [levelOneLimited, setlevelOneLimited] = useState(false);
  const [levelTwoLimited, setlevelTwoLimited] = useState(false);
  const [levelThreeLimited, setlevelThreeLimited] = useState(false);
  const [levelFourLimited, setlevelFourLimited] = useState(false);
  const [levelFiveLimited, setlevelFiveLimited] = useState(false);

  useEffect(() => {
    if (editionInfo) {
      setLevelOneAmountLeft(editionInfo[0].left);
      setlevelOneLimited(editionInfo[0].editions[0].current);
      setLevelTwoAmountLeft(editionInfo[1].left);
      setlevelTwoLimited(editionInfo[1].editions[0].current);
      setLevelThreeAmountLeft(editionInfo[2].left);
      setlevelThreeLimited(editionInfo[2].editions[0].current);
      setLevelFourAmountLeft(editionInfo[3].left);
      setlevelFourLimited(editionInfo[3].editions[0].current);
      setLevelFiveAmountLeft(editionInfo[4].left);
      setlevelFiveLimited(editionInfo[4].editions[0].current);
    }
  }, [editionInfo, isRefetching]);

  useEffect(() => {
    const inputAmount = Number(input);
    if (editionInfo) {
      if (inputAmount < 1000) {
        setSelectedLevel("-");
        onLevelClick("-", false, "");
      }
      if (inputAmount >= 1000 && inputAmount < 5000 && inputAmount <= balance) {
        setSelectedLevel("level1");
        onLevelClick(
          "1",
          false,
          editionInfo[0].editions[0].current
            ? editionInfo[0].editions[0].address
            : editionInfo[0].editions[1].address
        );
      }
      if (
        inputAmount >= 5000 &&
        inputAmount < 25000 &&
        inputAmount <= balance
      ) {
        setSelectedLevel("level2");
        onLevelClick(
          "2",
          false,
          editionInfo[0].editions[0].current
            ? editionInfo[0].editions[0].address
            : editionInfo[0].editions[1].address
        );
      }
      if (
        inputAmount >= 25000 &&
        inputAmount < 100000 &&
        inputAmount <= balance
      ) {
        setSelectedLevel("level3");
        onLevelClick(
          "3",
          false,
          editionInfo[2].editions[0].current
            ? editionInfo[0].editions[0].address
            : editionInfo[0].editions[1].address
        );
      }
      if (
        inputAmount >= 100000 &&
        inputAmount < 250000 &&
        inputAmount <= balance
      ) {
        setSelectedLevel("level4");
        onLevelClick(
          "4",
          false,
          editionInfo[3].editions[0].current
            ? editionInfo[0].editions[0].address
            : editionInfo[0].editions[1].address
        );
      }
      if (inputAmount >= 250000 && inputAmount <= balance) {
        setSelectedLevel("level5");
        onLevelClick(
          "5",
          false,
          editionInfo[0].editions[0].current
            ? editionInfo[0].editions[0].address
            : editionInfo[0].editions[1].address
        );
      }
    }
  }, [balance, input, onLevelClick, editionInfo]);

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
            levelOneAmountLeft !== 0
              ? t("appPage.mnde.nft-levels.level-one.amount.limited")?.replace(
                  placeholder,
                  levelOneAmountLeft
                )
              : t("appPage.mnde.nft-levels.level-one.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level1");
            if (balance >= 1000 && editionInfo)
              onLevelClick(
                "1",
                true,
                editionInfo[0].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          selected={selectedLevel === "level1"}
          disabled={balance < 1000}
          limited={levelOneLimited}
        />
        <LevelDivider min={1000} max={5000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level2.svg"
          title={t("appPage.mnde.nft-levels.level-two.title")}
          amount={
            levelTwoAmountLeft !== 0
              ? t("appPage.mnde.nft-levels.level-two.amount.limited")?.replace(
                  placeholder,
                  levelTwoAmountLeft
                )
              : t("appPage.mnde.nft-levels.level-two.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level2");
            if (balance >= 5000 && editionInfo)
              onLevelClick(
                "2",
                true,
                editionInfo[1].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          selected={selectedLevel === "level2"}
          disabled={balance < 5000}
          limited={levelTwoLimited}
        />
        <LevelDivider min={5000} max={25000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level3.svg"
          title={t("appPage.mnde.nft-levels.level-three.title")}
          amount={
            levelThreeAmountLeft !== 0
              ? t(
                  "appPage.mnde.nft-levels.level-three.amount.limited"
                )?.replace(placeholder, levelThreeAmountLeft)
              : t("appPage.mnde.nft-levels.level-three.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level3");
            if (balance >= 25000 && editionInfo)
              onLevelClick(
                "3",
                true,
                editionInfo[2].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          limited={levelThreeLimited}
          selected={selectedLevel === "level3"}
          disabled={balance < 25000}
        />
        <LevelDivider min={25000} max={100000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level4.svg"
          title={t("appPage.mnde.nft-levels.level-four.title")}
          amount={
            levelFourAmountLeft !== 0
              ? t("appPage.mnde.nft-levels.level-four.amount.limited")?.replace(
                  placeholder,
                  levelFourAmountLeft
                )
              : t("appPage.mnde.nft-levels.level-four.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level4");
            if (balance >= 100000 && editionInfo)
              onLevelClick(
                "4",
                true,
                editionInfo[3].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          selected={selectedLevel === "level4"}
          limited={levelFourLimited}
          disabled={balance < 100000}
          mb="-9px"
        />
        <LevelDivider min={100000} max={250000} balance={balance} />
        <NFTLevelsItem
          ilustration="/ilustrations/nft-level5.svg"
          title={t("appPage.mnde.nft-levels.level-five.title")}
          amount={
            levelFiveAmountLeft !== 0
              ? t("appPage.mnde.nft-levels.level-five.amount.limited")?.replace(
                  placeholder,
                  levelFiveAmountLeft
                )
              : t("appPage.mnde.nft-levels.level-five.amount.regular")
          }
          onClick={() => {
            setSelectedLevel("level5");
            if (balance >= 250000 && editionInfo)
              onLevelClick(
                "5",
                true,
                editionInfo[4].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          selected={selectedLevel === "level5"}
          limited={levelFiveLimited}
          disabled={balance < 250000}
        />
      </Flex>
    </Flex>
  );
};
export default NFTLevels;

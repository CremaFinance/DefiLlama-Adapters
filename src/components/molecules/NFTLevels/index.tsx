/* eslint-disable complexity */
/* eslint-disable sonarjs/cognitive-complexity */
import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState, useEffect } from "react";

import LevelDivider from "../LevelDivider";
import NFTLevelsItem from "../NFTLevelsItem";
import { useEditions } from "hooks/useEditions";
import colors from "styles/customTheme/colors";

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
  const [limitedAmountLeft, setLimitedAmountLeft] = useState(0);
  const [Limited, setLimited] = useState(false);

  useEffect(() => {
    if (editionInfo) {
      setLimitedAmountLeft(editionInfo[0].left);
      setLimited(editionInfo[0].editions[0].current);
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
          editionInfo[0].editions[0].current
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
          editionInfo[0].editions[0].current
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
      <Text
        alignSelf="start"
        opacity={balance < 1000 ? "40%" : "100%"}
        mt="16px"
        mb="8px"
        fontWeight="bold"
        textAlign={{ base: "right", md: "left" }}
        fontSize="11.52px"
        lineHeight="13.83px"
        color={Limited ? colors.marinadeOrange : "gray.500"}
      >
        {limitedAmountLeft !== 0
          ? t("appPage.mnde.nft-levels.level-one.amount.limited")?.replace(
              placeholder,
              limitedAmountLeft
            )
          : t("appPage.mnde.nft-levels.level-one.amount.regular")}
      </Text>
      <Flex
        width="100%"
        flexDirection={{ md: "row", base: "column" }}
        mt={[2, 0]}
        mb={[0, 6]}
        justifyContent="center"
        alignItems="flex-start"
        zIndex={6}
      >
        <NFTLevelsItem
          ilustration={
            Limited
              ? "/ilustrations/nft-level1-le.svg"
              : "/ilustrations/nft-level1-re.svg"
          }
          title={t("appPage.mnde.nft-levels.level-one.title")}
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
        />
        <LevelDivider min={1000} max={5000} balance={balance} />
        <NFTLevelsItem
          ilustration={
            Limited
              ? "/ilustrations/nft-level2-le.svg"
              : "/ilustrations/nft-level2-re.svg"
          }
          title={t("appPage.mnde.nft-levels.level-two.title")}
          onClick={() => {
            setSelectedLevel("level2");
            if (balance >= 5000 && editionInfo)
              onLevelClick(
                "2",
                true,
                editionInfo[0].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          selected={selectedLevel === "level2"}
          disabled={balance < 5000}
        />
        <LevelDivider min={5000} max={25000} balance={balance} />
        <NFTLevelsItem
          ilustration={
            Limited
              ? "/ilustrations/nft-level3-le.svg"
              : "/ilustrations/nft-level3-re.svg"
          }
          title={t("appPage.mnde.nft-levels.level-three.title")}
          onClick={() => {
            setSelectedLevel("level3");
            if (balance >= 25000 && editionInfo)
              onLevelClick(
                "3",
                true,
                editionInfo[0].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          selected={selectedLevel === "level3"}
          disabled={balance < 25000}
        />
        <LevelDivider min={25000} max={100000} balance={balance} last />
        <NFTLevelsItem
          ilustration={
            Limited
              ? "/ilustrations/nft-level4-le.svg"
              : "/ilustrations/nft-level4-re.svg"
          }
          title={t("appPage.mnde.nft-levels.level-four.title")}
          onClick={() => {
            setSelectedLevel("level4");
            if (balance >= 100000 && editionInfo)
              onLevelClick(
                "4",
                true,
                editionInfo[0].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          selected={selectedLevel === "level4"}
          disabled={balance < 100000}
          imageHeight="56px"
          mb="-9px"
        />
        <LevelDivider min={100000} max={250000} balance={balance} last />
        <NFTLevelsItem
          ilustration={
            Limited
              ? "/ilustrations/nft-level5-le.svg"
              : "/ilustrations/nft-level5-re.svg"
          }
          title={t("appPage.mnde.nft-levels.level-five.title")}
          onClick={() => {
            setSelectedLevel("level5");
            if (balance >= 250000 && editionInfo)
              onLevelClick(
                "5",
                true,
                editionInfo[0].editions[0].current
                  ? editionInfo[0].editions[0].address
                  : editionInfo[0].editions[1].address
              );
          }}
          selected={selectedLevel === "level5"}
          disabled={balance < 250000}
        />
      </Flex>
    </Flex>
  );
};
export default NFTLevels;

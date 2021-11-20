import { Flex, Image, Icon, Spinner } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { useTranslation } from "../../../hooks/useTranslation";
import { Action } from "../../../services/domain/pool";
import Button from "../../atoms/Button";
import Heading from "../../atoms/Heading";
import Text from "../../atoms/Text";
import ApyAndRewardTooltip from "../ApyAndRewardTooltip";

type PoolRowProps = {
  anualPercentageYield: {
    trading: number;
    emission: number;
    doubleDip: number;
  };
  rewardPerDay: {
    marinade: number;
    provider?: number;
  };
  totalLockedValue?: number;
  currencies: {
    left: {
      logo: string;
      shortName: string;
    };
    right?: {
      logo: string;
      shortName: string;
    };
  };
  provider: {
    logo: string;
    shortName: string;
  };
  actions: Action[];
};

const PoolRow: FunctionComponent<PoolRowProps> = ({
  anualPercentageYield,
  currencies: { left, right },
  totalLockedValue,
  rewardPerDay: rpd,
  provider,
  actions,
}) => {
  const { t } = useTranslation();
  const totalApy = Number(
    Number(
      anualPercentageYield.trading +
        anualPercentageYield.emission +
        anualPercentageYield.doubleDip
    ).toFixed(2)
  );
  const totalApyString = t("appPage.pool-row.total-apy").replace(
    "{{totalApy}}",
    totalApy
  );
  const pairString = right?.shortName
    ? `${left.shortName}-${right.shortName}`
    : left.shortName;
  const tvlString = t("appPage.pool-row.tvl").replace(
    "{{tvl}}",
    totalLockedValue?.toLocaleString()
  );

  return (
    <Flex
      bg="white"
      paddingX={{ base: "24px", lg: "1.5rem" }}
      paddingY={{ base: "24px", lg: "16px" }}
      borderRadius="8px"
      borderStyle="solid"
      borderWidth="1px"
      borderColor="gray.200"
      alignItems={{ base: "stretch", lg: "center" }}
      boxSizing="border-box"
      minWidth={{ base: "288px", lg: "900px" }}
      maxWidth={{ base: "320px", lg: "1100px" }}
      marginBottom={{ base: "15px", lg: "14px" }}
      flex={1}
      flexDirection={{ base: "column", lg: "row" }}
      marginX={{ base: "0", sm: "16px", lg: "0" }}
    >
      <Flex
        flex={1}
        maxWidth={{ base: undefined, lg: "208px" }}
        justifyContent={{ base: "space-between", lg: "flex-start" }}
      >
        <Flex>
          <Image src={`/pools/${left.logo}.png`} width="24px" height="24px" />
          {right && (
            <Image
              src={right?.logo ? `/pools/${right.logo}.png` : ""}
              width="24px"
              height="24px"
              marginLeft="4px"
            />
          )}
          <Text marginLeft="8px" lineHeight="21.6px" fontSize="14.4px">
            {pairString}
          </Text>
        </Flex>
        <Flex
          flex={{ base: undefined, lg: 1 }}
          maxWidth="193px"
          display={{ base: "flex", lg: "none" }}
        >
          <ProviderImage />
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        flex={{ base: undefined, lg: 1 }}
        maxWidth="230px"
      >
        {totalApy ? (
          <Heading lineHeight="140%" fontSize="18px">
            {totalApyString}
          </Heading>
        ) : (
          <Spinner size="xs" />
        )}
        <ApyAndRewardTooltip
          anualPercentageYield={anualPercentageYield}
          rewardPerDay={{ ...rpd, providerShortName: provider.shortName }}
        >
          <Button
            variant="link"
            _hover={{}}
            color="black"
            minWidth="16px"
            marginLeft="6px"
          >
            <Icon
              as={HiOutlineInformationCircle}
              width="16px"
              height="16px"
              color="green800"
            />
          </Button>
        </ApyAndRewardTooltip>
      </Flex>
      <Flex
        flex={1}
        fontSize="14.4px"
        lineHeight="21.6px"
        maxWidth="274px"
        paddingTop={{ base: "8px", lg: "0" }}
        // paddingLeft={{ base: "0", md: "1rem", lg: "0" }}
      >
        {totalLockedValue ? <Text>{tvlString}</Text> : <Spinner size="xs" />}
      </Flex>
      <Flex
        flex={{ base: undefined, lg: 1 }}
        maxWidth="193px"
        display={{ base: "none", lg: "flex" }}
      >
        <ProviderImage />
      </Flex>
      <Flex
        justifyContent={{ base: "stretch", lg: "flex-end" }}
        marginTop={{ base: "16px", lg: "0" }}
      >
        <Flex
          flexDir={{ base: "row-reverse", lg: "column" }}
          justifyContent={{ base: "stretch", lg: undefined }}
          width={{ base: undefined, lg: "145px" }}
          flex={1}
        >
          <Button
            variant="solid"
            marginBottom="8px"
            rightIcon={
              <Image src="/icons/external-link-white.svg" width="0.8rem" />
            }
            onClick={() => window.open(actions[0].url, "_blank")}
          >
            {actions[0].text}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(actions[1].url, "_blank")}
            rightIcon={
              <Image src="/icons/external-link-green.svg" width="0.8rem" />
            }
          >
            {actions[1].text}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PoolRow;

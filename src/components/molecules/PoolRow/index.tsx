import { Flex, Image, Icon } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { numberWithCommas } from "../../../utils";
import Button from "../../atoms/Button";
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
  totalLockedValue: number;
  currencies: {
    // If just left is supplied, then show "Supply" and "Borrow", else show "Add liquidity" and "Swap"
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
  onMainClick: () => Promise<void> | void;
  onSecondaryClick: () => Promise<void> | void;
};

const PoolRow: FunctionComponent<PoolRowProps> = ({
  anualPercentageYield,
  currencies: { left, right },
  totalLockedValue,
  rewardPerDay: rpd,
  provider,
  onMainClick,
  onSecondaryClick,
}) => {
  const totalApy = Number(
    anualPercentageYield.trading +
      anualPercentageYield.emission +
      anualPercentageYield.doubleDip
  ).toFixed(2);
  const totalApyString = `${totalApy} % APY`;
  const pairStrign = right
    ? `${left.shortName}-${right.shortName}`
    : left.shortName;
  const tvlString = `$${numberWithCommas(totalLockedValue)} TLV`;
  const mainButtonLabel = right ? "Add liquidity" : "Supply";
  const secondaryButtonLabel = right ? "Swap" : "Borrow";
  return (
    <Flex
      bg="white"
      paddingX="1.5rem"
      paddingY="1rem"
      height="7rem"
      borderRadius="8px"
      borderStyle="solid"
      borderWidth="1px"
      borderColor="gray.200"
      alignItems="center"
    >
      <Flex flex={1} direction="row" alignItems="center">
        <Flex flex={0.9}>
          <Image src={left.logo} width="1.5rem" height="1.5rem" />
          {right && (
            <Image
              src={right?.logo}
              width="1.5rem"
              height="1.5rem"
              marginLeft="8px"
            />
          )}
          <Text marginLeft="8px">{pairStrign}</Text>
        </Flex>
        <Flex flex={1} alignItems="center">
          <Text fontWeight="bold">{totalApyString}</Text>
          <ApyAndRewardTooltip
            anualPercentageYield={anualPercentageYield}
            rewardPerDay={{ ...rpd, providerShortName: provider.shortName }}
          >
            <Button variant="link" _hover={{}} color="black" width="1rem">
              <Icon
                as={HiOutlineInformationCircle}
                width="0.8rem"
                color="green800"
              />
            </Button>
          </ApyAndRewardTooltip>
        </Flex>
        <Flex flex={1}>{tvlString}</Flex>
        <Flex flex={1}>
          <Image
            src={provider.logo}
            marginLeft="4rem"
            width="4rem"
            height="4rem"
          />
        </Flex>
      </Flex>
      <Flex flexDir="column" width="10rem">
        <Button
          variant="solid"
          marginBottom="8px"
          rightIcon={
            <Image src="/icons/external-link-white.svg" width="0.8rem" />
          }
          onClick={onMainClick}
        >
          {mainButtonLabel}
        </Button>
        <Button
          variant="outline"
          onClick={onSecondaryClick}
          rightIcon={
            <Image src="/icons/external-link-green.svg" width="0.8rem" />
          }
        >
          {secondaryButtonLabel}
        </Button>
      </Flex>
    </Flex>
  );
};

export default PoolRow;

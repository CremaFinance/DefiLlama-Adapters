import { Flex, Image, Icon } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
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
  const pairStrign = right
    ? `${left.shortName}-${right.shortName}`
    : left.shortName;
  const tvlString = t("appPage.pool-row.tvl").replace(
    "{{tvl}}",
    numberWithCommas(totalLockedValue)
  );
  const mainButtonLabel = t(
    `appPage.pool-row.buttons.${right ? "addLiquidy" : "supply"}`
  );
  const secondaryButtonLabel = t(
    `appPage.pool-row.buttons.${right ? "swap" : "borrow"}`
  );
  return (
    <Flex
      bg="white"
      paddingX="1.5rem"
      paddingY="16px"
      borderRadius="8px"
      borderStyle="solid"
      borderWidth="1px"
      borderColor="gray.200"
      alignItems="center"
      boxSizing="border-box"
      maxWidth="1100px"
      flex={1}
    >
      <Flex flex={1} maxWidth="208px">
        <Image src={left.logo} width="24px" height="24px" />
        {right && (
          <Image
            src={right?.logo}
            width="24px"
            height="24px"
            marginLeft="4px"
          />
        )}
        <Text marginLeft="8px" lineHeight="21.6px" fontSize="14.4px">
          {pairStrign}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        flex={{ base: undefined, lg: 1 }}
        maxWidth="230px"
      >
        <Text fontWeight="bold" lineHeight="140%" fontSize="18px">
          {totalApyString}
        </Text>
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
        paddingLeft={{ base: "1rem", lg: "0" }}
      >
        {tvlString}
      </Flex>
      <Flex flex={{ base: undefined, lg: 1 }} maxWidth="193px">
        <Image
          src={provider.logo}
          marginLeft={{ base: "1rem", lg: "0" }}
          marginRight={{ base: "8px", xl: "1rem" }}
          width="4rem"
          height="4rem"
        />
      </Flex>
      <Flex justifyContent="flex-end">
        <Flex flexDir="column" width="145px">
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
    </Flex>
  );
};

export default PoolRow;

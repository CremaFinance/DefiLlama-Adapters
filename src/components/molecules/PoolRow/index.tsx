import { Flex, Image, Icon } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { useTranslation } from "../../../hooks/useTranslation";
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
  const pairString = right
    ? `${left.shortName}-${right.shortName}`
    : left.shortName;
  const tvlString = t("appPage.pool-row.tvl").replace(
    "{{tvl}}",
    totalLockedValue.toLocaleString()
  );
  const mainButtonLabel = t(
    `appPage.pool-row.buttons.${right ? "addLiquidy" : "supply"}`
  );
  const secondaryButtonLabel = t(
    `appPage.pool-row.buttons.${right ? "swap" : "borrow"}`
  );

  const ProviderImage = () => (
    <Image
      src={provider.logo}
      marginRight={{ base: "0", xl: "1rem" }}
      width={{ base: "2.5rem", lg: "4rem" }}
      height={{ base: "2.5rem", lg: "4rem" }}
    />
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
        paddingTop={{ base: "8px", lg: "0" }}
        // paddingLeft={{ base: "0", md: "1rem", lg: "0" }}
      >
        {tvlString}
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
          <Flex flex={{ base: 1.4, lg: 0 }}>
            <Button
              variant="solid"
              marginBottom={{ base: 0, lg: "8px" }}
              flex={1}
              rightIcon={
                <Image src="/icons/external-link-white.svg" width="0.8rem" />
              }
              onClick={onMainClick}
            >
              {mainButtonLabel}
            </Button>
          </Flex>
          <Flex flex={{ base: 1, lg: 0 }} marginRight={{ base: "8px", lg: 0 }}>
            <Button
              variant="outline"
              onClick={onSecondaryClick}
              flex={1}
              rightIcon={
                <Image src="/icons/external-link-green.svg" width="0.8rem" />
              }
            >
              {secondaryButtonLabel}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PoolRow;

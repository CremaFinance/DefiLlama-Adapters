import { Flex, Image, Icon, Spinner } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { FunctionComponent } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { Pool, PoolConfig } from "../../../services/domain/pool";
import { numberToShortVersion } from "../../../utils/number-to-short-version";
import Button from "../../atoms/Button";
import Heading from "../../atoms/Heading";
import Text from "../../atoms/Text";
import ApyAndRewardTooltip from "../ApyAndRewardTooltip";
import PoolRowActionsSection from "../PoolRowActionsSection";

type PoolRowProps = {
  pool: Pool | PoolConfig;
};

const PoolRow: FunctionComponent<PoolRowProps> = ({ pool }) => {
  const {
    apy,
    tradingApy,
    tokenA,
    tokenB,
    totalLockedValue,
    logoURI,
    rewards,
    actions,
    leverage,
  } = pool;
  const { t } = useTranslation();
  const totalApy = apy?.toFixed(2);

  const totalApyString = totalApy
    ? t("appPage.pool-row.total-apy")?.replace("{{totalApy}}", totalApy)
    : "";
  const pairString = tokenB ? `${tokenA}-${tokenB}` : tokenA;
  const tvlString = totalLockedValue
    ? t("appPage.pool-row.tvl")?.replace(
        "{{tvl}}",
        numberToShortVersion(totalLockedValue)
      )
    : "";

  const ProviderImage = () => (
    <Image
      src={logoURI}
      marginRight={{ base: "0", xl: "1rem" }}
      width={{ base: "2.5rem", lg: "4rem" }}
      height={{ base: "2.5rem", lg: "4rem" }}
    />
  );

  return (
    <>
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
            <Image
              src={`/pools/${tokenA.toLowerCase()}.png`}
              width="24px"
              height="24px"
            />
            {tokenB && (
              <Image
                src={tokenB ? `/pools/${tokenB.toLowerCase()}.png` : ""}
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
            rewards={rewards}
            tradingApy={tradingApy}
            leverage={leverage}
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
        >
          {totalLockedValue ? (
            <Heading lineHeight="140%" fontSize={{ base: "16px", lg: "18px" }}>
              {tvlString}
            </Heading>
          ) : (
            <Spinner size="xs" />
          )}
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
          <PoolRowActionsSection actions={actions} />
        </Flex>
      </Flex>
    </>
  );
};

export default PoolRow;

import { Flex, Image, Icon, Spinner, Tooltip, Divider } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";
import { memo } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

import type { Pool, PoolConfig } from "../../../services/domain/pool";
import colors from "../../../styles/customTheme/colors";
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
    provider,
    leverage,
    aprValue,
    componentAction,
    RowExtensionComponent,
  } = pool;
  const { t } = useTranslation();
  const totalApy = apy?.toFixed(2);
  const totalApr = aprValue?.toFixed(2);
  const totalApyString = totalApy
    ? t("appPage.pool-row.total-apy")?.replace("{{totalApy}}", totalApy)
    : "";
  const totalAprString = aprValue
    ? t("appPage.pool-row.total-apr")?.replace("{{totalApr}}", totalApr)
    : "";

  const pairString = tokenB ? `${tokenA}-${tokenB}` : tokenA;
  const tvlString = totalLockedValue
    ? t("appPage.pool-row.tvl")?.replace(
        "{{tvl}}",
        numberToShortVersion(totalLockedValue)
      )
    : "";

  return (
    <Flex
      bg="white"
      borderRadius="8px"
      borderStyle="solid"
      borderWidth="1px"
      borderColor="gray.200"
      boxSizing="border-box"
      minWidth={{ base: "288px", lg: "900px" }}
      maxWidth={{ base: "320px", lg: "1100px" }}
      marginBottom={{ base: "15px", lg: "14px" }}
      flex={1}
      marginX={{ base: "0", sm: "16px", lg: "0" }}
      flexDirection="column"
      paddingX={{ base: "24px", lg: "1.5rem" }}
      paddingY={{ base: "24px", lg: "16px" }}
    >
      <Flex
        flex={1}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "stretch", lg: "center" }}
        minHeight="70px"
      >
        <Flex
          flex={1}
          maxWidth={{ base: undefined, lg: "208px" }}
          justifyContent={{ base: "space-between", lg: "flex-start" }}
        >
          <Flex alignItems="center">
            <Image
              src={`/pools/${tokenA.toLowerCase()}.png`}
              width="40px"
              height="40px"
            />
            {tokenB && (
              <Image
                src={tokenB ? `/pools/${tokenB.toLowerCase()}.png` : ""}
                width="40px"
                height="40px"
                marginLeft="-8px"
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
            <Image
              src={logoURI}
              marginRight={{ base: "0", xl: "1rem" }}
              width={{ base: "2.5rem", lg: "4rem" }}
              height={{ base: "2.5rem", lg: "4rem" }}
            />
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          flex={{ base: undefined, lg: 1 }}
          maxWidth="230px"
        >
          {totalApy && (
            <Heading lineHeight="140%" fontSize="18px">
              {totalApyString}
            </Heading>
          )}

          {totalApr && (
            <Heading lineHeight="140%" fontSize="18px">
              {totalAprString}
            </Heading>
          )}

          {!totalApr && !totalApy && <Spinner size="xs" />}

          {!aprValue && (
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
                  color="gray.500"
                />
              </Button>
            </ApyAndRewardTooltip>
          )}
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
          <Tooltip
            hasArrow
            label={provider}
            bg={colors.marinadeEvenLighterGreen}
            color="black"
          >
            <Image
              src={logoURI}
              marginRight={{ base: "0", xl: "1rem" }}
              width="40px"
              height="40px"
            />
          </Tooltip>
        </Flex>
        <Flex
          justifyContent={{ base: "stretch", lg: "flex-end" }}
          marginTop={{ base: "16px", lg: "0" }}
        >
          <PoolRowActionsSection
            actions={actions}
            componentAction={componentAction || ""}
          />
        </Flex>
      </Flex>
      {RowExtensionComponent ? (
        <>
          <Divider mt={{ base: 6, lg: "unset" }} />
          <RowExtensionComponent />
          <Divider />
        </>
      ) : null}
    </Flex>
  );
};

const areEqual = (prevProps: PoolRowProps, nextProps: PoolRowProps) => {
  return (
    prevProps.pool.apy === nextProps.pool.apy &&
    prevProps.pool.totalLockedValue === nextProps.pool.totalLockedValue
  );
};
const MemoPoolRow = memo(PoolRow, areEqual);

export default MemoPoolRow;

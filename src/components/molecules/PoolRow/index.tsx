import {
  Flex,
  Image,
  Icon,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { FunctionComponent, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { Pool, PoolConfig } from "../../../services/domain/pool";
import { numberToShortVersion } from "../../../utils/number-to-short-version";
import Button from "../../atoms/Button";
import Heading from "../../atoms/Heading";
import Text from "../../atoms/Text";
import ApyAndRewardTooltip from "../ApyAndRewardTooltip";
import StakeInput, {
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import SwitchButtons from "components/molecules/SwitchButtons";
import colors from "styles/customTheme/colors";

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
  } = pool;
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const totalApy = apy?.toFixed(2);
  const [isAddLiquidityActive, setAddLiquidityActive] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [liquidityAmount, setLiquidityAmount] = useState<number>(0);
  // const [inputIcon, setInputIcon] = useState("solana-dark");

  // const handleSwitchButton = () => {
  //   setAddLiquidityActive(!isAddLiquidityActive);
  //   setInputIcon(isAddLiquidityActive ? "solana-dark" : "solana-lp");
  // };

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

  const liquidityButtonText = isAddLiquidityActive
    ? t("appPage.liquidity-modal.add-liquidity")
    : t("appPage.liquidity-modal.remove-liquidity");

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay w="100vw" />
        <ModalContent
          px={[4, 8]}
          pb={[4, 8]}
          w={["90vw", "480px"]}
          backgroundColor="white"
          overflow="auto"
        >
          <ModalHeader mb={[2, 0]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody p={0}>
            <Flex display="flex" justifyContent="center">
              <SwitchButtons
                leftText={t("appPage.liquidity-modal.add-liquidity")}
                rightText={t("appPage.liquidity-modal.remove-liquidity")}
                height={40}
                mb={8}
                width={["254px", "322px"]}
                buttonWidth={["121px", "155px"]}
                active={isAddLiquidityActive}
                font="text-lg"
                display="flex"
                handleSwitch={setAddLiquidityActive}
              />
            </Flex>
            <Flex mb={2}>
              <Image src="/pools/msol.png" width="24px" height="24px" />
              <Text marginLeft="8px" fontSize="14.4px">
                mSOL - SOL LP
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text lineHeight="21.6px" fontSize="14.4px">
                Balance
              </Text>
              <Text lineHeight="21.6px" fontSize="14.4px">
                0
              </Text>
            </Flex>
            <Flex width="100%" justifyContent="flex-end">
              <Text lineHeight="21.6px" fontSize="14.4px">
                = 0 SOL
              </Text>
            </Flex>
            <Flex mb={4} width="100%" justifyContent="flex-end">
              <Text lineHeight="21.6px" fontSize="14.4px">
                = $0.18
              </Text>
            </Flex>
            <StakeInput
              stakeInputType={StakeInputTypeEnum.Liquidity}
              onValueChange={setLiquidityAmount}
              tokenName="SOL"
              tokenIcon={
                isAddLiquidityActive
                  ? "/icons/solana-dark.png"
                  : "/icons/solana-lp.png"
              }
              tokenBalance={20}
              value={20}
              mb={4}
            />
            <Flex h="52px">
              {!isAddLiquidityActive ? (
                <Flex>
                  <Flex justifyContent="space-between">
                    <Text lineHeight="21.6px" fontSize="14.4px">
                      You will recive
                    </Text>
                    <Text lineHeight="21.6px" fontSize="14.4px">
                      0.0013 SOL
                    </Text>
                  </Flex>
                  <Flex mb={4} width="100%" justifyContent="flex-end">
                    <Text lineHeight="21.6px" fontSize="14.4px">
                      = 0 mSOL
                    </Text>
                  </Flex>
                </Flex>
              ) : null}
            </Flex>
            <Flex justifyContent="center">
              <Button
                font="text-xl"
                bg={colors.marinadeGreen}
                // isLoading={}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                height="48px"
                my={8}
                // onClick={liquidityHandler}
              >
                {liquidityButtonText}
              </Button>
            </Flex>
            <Text lineHeight="21.6px" fontSize="14.4px">
              You are adding liquidity only in SOL. When removing liquidity, you
              you will burn shares from the liquidity pool. You will receive SOL
              and mSOL from the pool according to the actual pool composition.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>

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
          <ApyAndRewardTooltip rewards={rewards} tradingApy={tradingApy}>
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
                onClick={() => window.open(actions[0].url, "_blank")}
              >
                {actions[0].text}
              </Button>
            </Flex>
            <Flex
              flex={{ base: 1, lg: 0 }}
              marginRight={{ base: "8px", lg: 0 }}
            >
              <Button
                variant="outline"
                onClick={() => onOpen()}
                // onClick={() => window.open(actions[1].url, "_blank")}
                flex={1}
                rightIcon={
                  <Image src="/icons/external-link-green.svg" width="0.8rem" />
                }
              >
                {actions[1].text}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default PoolRow;

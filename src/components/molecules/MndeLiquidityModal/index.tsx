import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Flex,
  Image,
  ModalHeader,
  Text,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";

import colors from "../../../styles/customTheme/colors";
import StakeInput, { StakeInputTypeEnum } from "../StakeInput";
import SwitchButtons from "../SwitchButtons";

interface MndeLiquidityModalProps {
  onClose: () => Promise<void> | void;
  isOpen: boolean;
}

const MndeLiquidityModal = ({
  onClose: onCloseProp,
  isOpen: isOpenProp,
}: MndeLiquidityModalProps) => {
  const { t } = useTranslation();

  const [isAddLiquidityActive, setAddLiquidityActive] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [liquidityAmount, setLiquidityAmount] = useState<string>("");

  // replace these with data from services
  const addLiqBalance = 0;
  const addLiqSolBalance = 0;
  const addLiqDollarBalance = 0.18;
  const removeLiqSolBalance = 0.0013;
  const removeLiqmSolBalance = 0.0023;

  const liquidityButtonText = isAddLiquidityActive
    ? t("appPage.liquidity-modal.add-liquidity")
    : t("appPage.liquidity-modal.remove-liquidity");

  return (
    <>
      <Modal isOpen={isOpenProp} onClose={onCloseProp}>
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
                {t("appPage.liquidity-modal.pool")}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text lineHeight="21.6px" fontSize="14.4px">
                {t("appPage.liquidity-modal.balance")}
              </Text>
              <Text lineHeight="21.6px" fontSize="14.4px">
                {addLiqBalance}
              </Text>
            </Flex>
            <Text align="end" lineHeight="21.6px" fontSize="14.4px">
              {`= ${addLiqSolBalance} SOL`}
            </Text>
            <Text align="end" mb={4} lineHeight="21.6px" fontSize="14.4px">
              {`= $ ${addLiqDollarBalance}`}
            </Text>
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
              value="20"
              mb={4}
            />
            <Flex h="52px">
              {!isAddLiquidityActive ? (
                <Flex flexDirection="column" flex={1}>
                  <Flex justifyContent="space-between">
                    <Text lineHeight="21.6px" fontSize="14.4px">
                      {t("appPage.liquidity-modal.conversion-explained")}
                    </Text>
                    <Text lineHeight="21.6px" fontSize="14.4px">
                      {`= $ ${removeLiqSolBalance} SOL`}
                    </Text>
                  </Flex>
                  <Text
                    mb={4}
                    align="end"
                    lineHeight="21.6px"
                    fontSize="14.4px"
                  >
                    {`= $ ${removeLiqmSolBalance} mSOL`}
                  </Text>
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
              {t(
                isAddLiquidityActive
                  ? "appPage.liquidity-modal.description-add-liqidity"
                  : "appPage.liquidity-modal.description-remove-liqidity"
              )}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MndeLiquidityModal;

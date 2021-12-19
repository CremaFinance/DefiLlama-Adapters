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

import StakeInput, { StakeInputTypeEnum } from "../StakeInput";
import SwitchButtons from "../SwitchButtons";
import colors from "styles/customTheme/colors";

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
              value="20"
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
    </>
  );
};

export default MndeLiquidityModal;

import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { IoCheckmarkCircle } from "react-icons/io5";

import { useWallet } from "../../../hooks/useWallet";
import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import { Wallet } from "../Wallet";
import colors from "styles/customTheme/colors";

const MNDEFarmCard = () => {
  const { t } = useTranslation();
  const { connected } = useWallet();

  const aprValue = 10.7;
  const mndePerWeek = 137922.1;
  const totalDeposit = 957922.93;
  const msolValue = 170;
  const totalDepositValue = totalDeposit * msolValue;
  const personalDepositValue = 0.000002;
  const claimableAmount = 0.00035;

  return (
    <Flex
      ml="auto"
      mr="auto"
      height={{ base: "466px", lg: "476px" }}
      width={{ base: "288px", lg: "360px" }}
      flexDirection="column"
      padding={{ base: "16px", lg: "32px" }}
      background="white"
      border="1px solid"
      borderColor={colors.lightGray}
      borderRadius="8px"
      justifyContent="space-between"
    >
      <Box>
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Image src="/icons/mSOL.svg" boxSize="24px" mr="4px" />
            <MText ml={1}>MSOL</MText>
          </Flex>
          <Image src="/icons/mnde.svg" boxSize="40px" />
        </Flex>
        <MHeading fontSize="22.5px" my="4px">
          {`${aprValue} % APR`}
        </MHeading>
        <MText>{`${totalDeposit} = $ ${totalDepositValue} TVL`}</MText>
        <Flex
          height="56px"
          width="100%"
          marginY="12px"
          borderY="1px solid"
          borderColor={colors.lightGray}
          alignItems="center"
        >
          <Icon
            as={IoCheckmarkCircle}
            color={colors.marinadeGreen}
            width="20px"
            height="20px"
            mr="10px"
          />
          <MText>{`${mndePerWeek} MNDE/week`}</MText>
        </Flex>
        <Flex
          justifyContent="space-between"
          display={connected ? "flex" : "none"}
        >
          <MText>{t("mndePage.your-deposit")}:</MText>
          <MText>{`${personalDepositValue} MSOL`}</MText>
        </Flex>
      </Box>

      {connected ? (
        <Flex
          height="60px"
          width="100%"
          marginTop="32px"
          borderBottom="1px solid #EDF2F7"
          borderTop="1px solid #EDF2F7"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            <Image src="/icons/mnde.svg" boxSize="24px" mr="4px" />
            <MText>{`${claimableAmount} MNDE`}</MText>
          </Flex>
          <MButton
            variant="outline"
            borderColor="gray"
            color="black"
            width={{ base: "70px", lg: "80px" }}
            fontWeight="500"
            fontSize="14.4px"
          >
            {t("mndePage.claim-action")}
          </MButton>
        </Flex>
      ) : (
        <Wallet />
      )}
    </Flex>
  );
};

export default MNDEFarmCard;

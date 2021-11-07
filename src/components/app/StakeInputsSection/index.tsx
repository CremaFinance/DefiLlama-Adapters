import { Flex, IconButton, Input, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

// eslint-disable-next-line complexity
const StakeInputsSection = () => {
  const { t } = useTranslation();
  const balanceLabel = t("appPage.balance");

  const [isStakeActive, setStakeActive] = useState(true);
  const [isUnstakeNowActive, setUnstakeNowActive] = useState(true);

  // TODO: Use actual values from services
  const mSOLvsSOLParity = 1.01002;
  const minUnstakeFee = 0.3;
  const maxUnstakeFee = 3;
  const sourceToken = "mSOL";
  const sourceTokenIcon = "/icons/mSOL.svg";
  const sourceTokenBalance = 123456;
  const targetToken = "SOL";
  // TODO: Replace with dark SOL logo
  const targetTokenIcon = "/icons/mSOL.svg";
  const targetTokenBalance = 0;

  return (
    <Flex
      aria-label="stake-inputs-section"
      pb={16}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Flex
        width={["288px", "480px"]}
        alignItems="center"
        flexDirection="column"
      >
        <MHeading type="heading-md" mt={4} mb={2}>
          {t("appPage.stake-inputs-title")}
        </MHeading>
        <MText type="text-xl">{t("appPage.stake-inputs-subtitle")}</MText>
        <Flex
          my={6}
          height="40px"
          width={218}
          rounded="3xl"
          bg="gray.100"
          justifyContent="center"
          alignItems="center"
        >
          <MButton
            font="text-xl"
            bg={isStakeActive ? colors.green : "gray.100"}
            color={isStakeActive ? colors.white : colors.black}
            fontWeight={isStakeActive ? "bold" : "normal"}
            rounded="3xl"
            width={103}
            height="36px"
            _hover={{}}
            mr={2}
            onClick={() => setStakeActive(true)}
          >
            {t("appPage.stake-action")}
          </MButton>
          <MButton
            font="text-xl"
            bg={isStakeActive ? "gray.100" : colors.green}
            color={isStakeActive ? colors.black : colors.white}
            fontWeight={isStakeActive ? "normal" : "bold"}
            rounded="3xl"
            width={103}
            height="36px"
            _hover={{}}
            onClick={() => setStakeActive(false)}
          >
            {t("appPage.unstake-action")}
          </MButton>
        </Flex>
        <Flex
          width={["288px", "480px"]}
          height={["483px", "510px"]}
          bg={colors.white}
          rounded="md"
          alignItems="center"
          flexDirection="column"
          boxShadow="md"
        >
          <Flex
            my={10}
            height="40px"
            width={322}
            rounded="3xl"
            bg="gray.100"
            justifyContent="center"
            alignItems="center"
            display={isStakeActive ? "none" : "flex"}
          >
            <MButton
              font="text-xl"
              bg={isUnstakeNowActive ? colors.green : "gray.100"}
              color={isUnstakeNowActive ? colors.white : colors.black}
              fontWeight={isUnstakeNowActive ? "bold" : "normal"}
              rounded="3xl"
              width={155}
              height="36px"
              _hover={{}}
              mr={2}
              onClick={() => setUnstakeNowActive(true)}
            >
              {t("appPage.unstake-now-action")}
            </MButton>
            <MButton
              font="text-xl"
              bg={isUnstakeNowActive ? "gray.100" : colors.green}
              color={isUnstakeNowActive ? colors.black : colors.white}
              fontWeight={isUnstakeNowActive ? "normal" : "bold"}
              rounded="3xl"
              width={155}
              height="36px"
              _hover={{}}
              onClick={() => setUnstakeNowActive(false)}
            >
              {t("appPage.delayed-unstake-action")}
            </MButton>
          </Flex>
          <Flex
            height="104px"
            width="400px"
            bg="gray.50"
            mb={2}
            border="1px"
            borderColor="gray.100"
            rounded="md"
            px={4}
            py={2}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex justifyContent="space-between">
              <Flex
                boxShadow="md"
                rounded="md"
                justifyContent="space-around"
                alignItems="center"
                width="103px"
                height="44px"
              >
                <Image
                  src={sourceTokenIcon}
                  alt="Source Token Logo"
                  width="30px"
                />
                <MText type="text-xl">{sourceToken}</MText>
              </Flex>
              <Input
                variant="unstyled"
                placeholder="0"
                flex={0.5}
                textAlign="right"
                fontSize="28.13px"
                fontWeight="bold"
              />
            </Flex>
            <MText
              type="text-sm"
              mb={2}
            >{`${balanceLabel}: ${sourceTokenBalance.toLocaleString()} ${sourceToken}`}</MText>
          </Flex>
          <Flex
            height="104px"
            width="400px"
            bg="gray.50"
            border="1px"
            borderColor="gray.100"
            rounded="md"
            px={4}
            py={2}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex justifyContent="space-between">
              <Flex
                boxShadow="md"
                rounded="md"
                justifyContent="space-around"
                alignItems="center"
                width="87px"
                height="44px"
              >
                <Image
                  src={targetTokenIcon}
                  alt="Target Token Logo"
                  width="30px"
                />
                <MText type="text-xl">{targetToken}</MText>
              </Flex>
              <Input
                variant="unstyled"
                placeholder="0"
                flex={0.5}
                textAlign="right"
                fontSize="28.13px"
                fontWeight="bold"
              />
            </Flex>
            <MText
              type="text-sm"
              mb={2}
            >{`${balanceLabel}: ${targetTokenBalance.toLocaleString()} ${targetToken}`}</MText>
          </Flex>
          <Flex width="400px" mt={3} justifyContent="space-between">
            <Flex>
              <MText type="text-md">
                {t("appPage.stake-inputs-exchange-rate")}
              </MText>
              <IconButton
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Flex>
            <MText type="text-md">{`1 mSOL ≈ ${mSOLvsSOLParity} SOL`}</MText>
          </Flex>
          <Flex width="400px" mt={2} mb={1} justifyContent="space-between">
            <Flex>
              <MText type="text-md">
                {t("appPage.stake-inputs-unstake-fee")}
              </MText>
              <IconButton
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Flex>
            <MText type="text-md">{`${minUnstakeFee}-${maxUnstakeFee}%`}</MText>
          </Flex>
          <MButton
            font="text-xl"
            bg={colors.green}
            _hover={{ bg: colors.green800 }}
            colorScheme={colors.green}
            rounded="md"
            width={190}
            height="48px"
            mx={4}
            mt={6}
          >
            {t("appPage.unstake-now-action")}
          </MButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StakeInputsSection;

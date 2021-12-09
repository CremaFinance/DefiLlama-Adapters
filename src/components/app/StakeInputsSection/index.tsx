import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdArrowDownward } from "react-icons/md";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import SwitchButtons from "components/molecules/SwitchButtons";
import colors from "styles/customTheme/colors";

import BasicStake from "./BasicStake";
import BasicUnstake from "./BasicUnstake";

const StakeInputsSection = () => {
  const { t } = useTranslation();

  const [isStakeActive, setStakeActive] = useState(true);

  return (
    <Flex
      aria-label="stake-inputs-section"
      pb={20}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Flex
        width={["90vw", "480px"]}
        alignItems="center"
        flexDirection="column"
      >
        <MHeading type="heading-md" mt={4} mb={2}>
          {t("appPage.stake-inputs-title")}
        </MHeading>
        <MText type="text-xl" textAlign="center">
          {t("appPage.stake-inputs-subtitle")}
        </MText>
        <SwitchButtons
          leftText={t("appPage.stake-action")}
          rightText={t("appPage.unstake-action")}
          my={[6]}
          height={40}
          width={["218px"]}
          buttonWidth={["103px"]}
          active={isStakeActive}
          handleSwitch={setStakeActive}
        />
        <Flex
          width={["90vw", "480px"]}
          bg={colors.white}
          rounded="md"
          alignItems="center"
          flexDirection="column"
          boxShadow="md"
          position="relative"
          p={[4, 10]}
        >
          <MButton
            top={isStakeActive ? ["109", "133px"] : ["182px", "205px"]}
            variant="ghost"
            position="absolute"
            aria-label="Swap direction"
            bg="gray.50"
            border="2px"
            borderColor={colors.white}
            p={0}
            height="30px"
            minWidth="30px"
            rounded="3xl"
            zIndex={10}
            onClick={() => setStakeActive(!isStakeActive)}
          >
            <MdArrowDownward color={colors.marinadeGreen} fontSize="24px" />
          </MButton>
          {isStakeActive ? <BasicStake /> : <BasicUnstake />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StakeInputsSection;

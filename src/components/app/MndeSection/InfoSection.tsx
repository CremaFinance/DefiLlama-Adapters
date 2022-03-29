import { Flex } from "@chakra-ui/react";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import { useTranslation } from "hooks/useTranslation";

const InfoSection = () => {
  const { t } = useTranslation();
  return (
    <Flex
      pt={["100px", "150px"]}
      pb={[12, 8]}
      aria-label="mnde-section"
      position="relative"
      flexDirection="column"
      width="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        px={{ base: 4, md: 10, lg: 330 }}
        textAlign="center"
      >
        <MText fontSize={{ base: "22px", md: "44px" }} fontWeight="bold">
          MNDE
        </MText>
        <MText type="text-2xl" fontWeight="bold" pt={2}>
          {t("mndePage.info-section.highlighted-text")}
        </MText>
        <MText type="text-xl" pt={4}>
          {t("mndePage.info-section.text")}
        </MText>
        <Flex pt={12} pb="65px">
          <MButton variant="big-solid" isDisabled>
            {" "}
            {t("mndePage.comming-soon")}
          </MButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InfoSection;

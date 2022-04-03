import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import { useTranslation } from "hooks/useTranslation";

const InfoSection = () => {
  const router = useRouter();
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
      zIndex={4}
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
        <MButton
          variant="big-solid"
          mt={12}
          mb="65px"
          onClick={() => router.push("/app/mnde")}
        >
          {t("mndePage.manage-mnde-button")}
        </MButton>
      </Flex>
    </Flex>
  );
};

export default InfoSection;

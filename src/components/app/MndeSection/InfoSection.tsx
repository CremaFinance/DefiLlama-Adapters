import { Flex, Image } from "@chakra-ui/react";

import MButton from "../../atoms/Button";
import Link from "../../atoms/Link";
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
        <MText type="text-xl" pt={4}>
          {t("mndePage.info-section.text")}
        </MText>
        <Flex pt={12} pb="65px" flexDirection="column">
          <MButton variant="big-solid" isDisabled mb="8px">
            {" "}
            4.4.2022
          </MButton>
          <Link
            target="_blank"
            rel="noreferrer noopener"
            _focus={{ boxShadow: "none" }}
            mr={4}
            href="https://discord.com/invite/6EtUf4Euu6"
            display="flex"
            justifyContent="center"
            fontWeight="bold"
            font="text-2xl"
          >
            Join Discord for more details
            <Image
              src="/icons/arrow-right.svg"
              width="16px"
              alt="Lock MNDE"
              ml={2}
            />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InfoSection;

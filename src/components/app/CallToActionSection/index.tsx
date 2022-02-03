import { Flex, Image, Link } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import Button from "../../atoms/Button";

const CallToActionSection = () => {
  const { t } = useTranslation();

  return (
    <Flex flex={1} justifyContent="center">
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        flexWrap="wrap"
        aria-label="call-to-action-section"
        justifyContent="center"
        alignContent="center"
        minWidth={{ base: "288px", lg: "900px" }}
        maxWidth={{ base: "320px", lg: "1100px" }}
        mt="12px"
      >
        <Button
          variant="solid"
          width={["300px", "350px"]}
          height="48px"
          fontSize="text-xl"
          backgroundColor="transparent"
          border="1px"
          borderColor="black"
          color="black"
          mx={5}
          _hover={{}}
          my={{ base: 0, lg: "8px" }}
          rightIcon={<Image src="/discord-black.svg" width="24px" />}
        >
          <Link
            as={Link}
            target="_blank"
            href="https://discord.com/invite/6EtUf4Euu6"
            _hover={{ textDecoration: "none" }}
            rel="noreferrer noopener"
            _focus={{ boxShadow: "none" }}
          >
            {t("appPage.cta-section.missing-integration")}
          </Link>
        </Button>
        <Button
          variant="solid"
          width={["300px", "350px"]}
          height="48px"
          fontSize="text-xl"
          backgroundColor="transparent"
          border="1px"
          borderColor="black"
          color="black"
          mx={5}
          _hover={{}}
          my={{ base: "24px", lg: "8px" }}
          rightIcon={<Image src="/github.svg" width="24px" />}
        >
          <Link
            as={Link}
            target="_blank"
            href="https://docs.marinade.finance/partnerships/list-on-marinades-defi-page"
            _hover={{ textDecoration: "none" }}
            rel="noreferrer noopener"
            _focus={{ boxShadow: "none" }}
          >
            {t("appPage.cta-section.list-your-integration")}
          </Link>
        </Button>
        <Button
          variant="solid"
          width={["300px", "350px"]}
          height="48px"
          fontSize="text-xl"
          backgroundColor="transparent"
          border="1px"
          borderColor="black"
          color="black"
          mx={5}
          _hover={{}}
          my={{ base: 0, lg: "8px" }}
          rightIcon={<Image src="/sdk.svg" width="24px" />}
        >
          <Link
            as={Link}
            target="_blank"
            href="https://docs.marinade.finance/partnerships/become-our-partner"
            _hover={{ textDecoration: "none" }}
            rel="noreferrer noopener"
            _focus={{ boxShadow: "none" }}
          >
            {t("appPage.cta-section.integrate-with-marinade")}
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default CallToActionSection;

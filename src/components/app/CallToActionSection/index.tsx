import { Flex, Image, Link } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import Button from "../../atoms/Button";

const CallToActionSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      flexDirection={["column", "row"]}
      aria-label="call-to-action-section"
      justifyContent={["center", "space-between"]}
      alignContent="center"
      mx={{ base: "65px", xl: "170px" }}
      mt="12px"
      minWidth={{ base: "288px", lg: "900px" }}
      maxWidth={{ base: "unset", lg: "1100px" }}
    >
      <Button
        variant="solid"
        flex={[1, 0.33]}
        height="48px"
        fontSize="text-xl"
        backgroundColor="transparent"
        border="1px"
        borderColor="black"
        color="black"
        _hover={{}}
        rightIcon={<Image fill="black" src="/discord.svg" width="24px" />}
      >
        <Link
          as={Link}
          target="_blank"
          href="https://docs.marinade.finance/partnerships/list-on-marinades-defi-page"
          _hover={{ textDecoration: "none" }}
          rel="noreferrer noopener"
          _focus={{ boxShadow: "none" }}
        >
          {t("appPage.cta-section.missing-integration")}
        </Link>
      </Button>
      <Button
        variant="solid"
        flex={[1, 0.33]}
        height="48px"
        fontSize="text-xl"
        backgroundColor="transparent"
        border="1px"
        borderColor="black"
        color="black"
        _hover={{}}
        my={{ base: "24px", lg: "16px" }}
        rightIcon={<Image fill="black" src="/github.svg" width="24px" />}
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
        flex={[1, 0.33]}
        height="48px"
        fontSize="text-xl"
        backgroundColor="transparent"
        border="1px"
        borderColor="black"
        color="black"
        _hover={{}}
        rightIcon={<Image fill="black" src="/discord.svg" width="24px" />}
      >
        <Link
          as={Link}
          target="_blank"
          href="https://docs.marinade.finance/partnerships/list-on-marinades-defi-page"
          _hover={{ textDecoration: "none" }}
          rel="noreferrer noopener"
          _focus={{ boxShadow: "none" }}
        >
          {t("appPage.cta-section.integrate-with-marinade")}
        </Link>
      </Button>
    </Flex>
  );
};

export default CallToActionSection;

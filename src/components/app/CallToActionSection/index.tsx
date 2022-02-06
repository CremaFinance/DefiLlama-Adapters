import { Flex, Image, Link } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import Button from "../../atoms/Button";

const CallToActionSection = () => {
  const { t } = useTranslation();

  return (
    <Flex width="100%" justifyContent="center">
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        flexWrap="wrap"
        aria-label="call-to-action-section"
        justifyContent="center"
        alignContent="center"
        paddingY={{ base: "24px", lg: "16px" }}
        alignItems={{ base: "stretch", lg: "center" }}
        minWidth={{ base: "288px", lg: "900px" }}
        maxWidth={{ base: "320px", lg: "1100px" }}
        marginBottom={{ base: "15px", lg: "14px" }}
        flex={1}
        marginX={{ base: "0", sm: "16px", lg: "0" }}
      >
        <Flex flex={1}>
          <Button
            variant="solid"
            width="100%"
            height="48px"
            fontSize="text-xl"
            backgroundColor="transparent"
            border="1px"
            borderColor="black"
            color="black"
            mx="4px"
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
        </Flex>

        <Flex flex={1}>
          <Button
            variant="solid"
            width="100%"
            height="48px"
            fontSize="text-xl"
            backgroundColor="transparent"
            border="1px"
            borderColor="black"
            color="black"
            mx="4px"
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
        </Flex>

        <Flex flex={1}>
          <Button
            variant="solid"
            width="100%"
            height="48px"
            fontSize="text-xl"
            backgroundColor="transparent"
            border="1px"
            borderColor="black"
            color="black"
            mx="4px"
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
    </Flex>
  );
};

export default CallToActionSection;

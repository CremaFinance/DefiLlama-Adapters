import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      aria-label="faq-section"
      pb={16}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Image
        src="/ilustrations/how-it-works1.svg"
        width={["257px", "428px"]}
        height={["154px", "257px"]}
        mb={4}
        ml={[0, -8]}
      />
      <Flex width={["288px", "480px"]} flexDirection="column">
        <MHeading type="heading-sm" mt={8} mb={[5, 6]}>
          {t("appPage.faq-title")}
        </MHeading>
        <Accordion mt={[0, 1]}>
          {[0, 1, 2].map((index) => (
            <AccordionItem
              key={`faq-item-${index}`}
              bg={colors.white}
              rounded="xl"
              mb={4}
            >
              <AccordionButton pl={[4, 8]} py={[3, 6]} pr={[4, 6]} _focus={{}}>
                <MText
                  flex="1"
                  type="text-xl"
                  fontWeight="bold"
                  textAlign="left"
                >
                  {t(`appPage.faq-items.${index}.question`)}
                </MText>
                <AccordionIcon fontSize="2em" />
              </AccordionButton>
              <AccordionPanel pb={4} pl={[4, 8]} pr={[4, 6]}>
                <MText type="text-md" lineHeight="170%">
                  {t(`appPage.faq-items.${index}.response`)}
                </MText>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default FAQSection;

import { Box, Heading, Text, Image, Square } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface IconWithTextBelowProps {
  title: string;
  subtitle?: string;
  icon: string;
}
const IconWithTextBelow = ({
  title,
  subtitle,
  icon,
}: IconWithTextBelowProps) => {
  return (
    <Square
      display="flex"
      flexDirection="column"
      flex="1"
      marginLeft="5"
      marginRight="5"
      justifyContent="flex-start"
    >
      <Image src={icon} maxW="sm" objectFit="contain" alt={`${title} Logo`} />
      <Heading size="md" color="white" marginBottom="5" marginTop="5">
        {title}
      </Heading>
      <Text color="white">{subtitle}</Text>
    </Square>
  );
};

export default function WhySection() {
  const { t } = useTranslation("index");

  return (
    <Box
      paddingTop="16"
      paddingBottom="16"
      bg="#242731"
      as="section"
      aria-label="why-section"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading
        width="xs"
        textAlign="center"
        marginBottom={4}
        color="white"
        fontWeight="bold"
      >
        {t("why-section-title")}
      </Heading>
      <Heading
        size="lg"
        textAlign="center"
        marginBottom="20"
        marginTop="10"
        color="white"
        fontWeight="300"
      >
        {t("why-section-subtitle")}
      </Heading>
      <Box display="flex" flexDirection="row" maxW="3xl" flexWrap="wrap">
        {[0, 1, 2].map((index) => (
          <IconWithTextBelow
            icon={`/icons/why-section-icon${index + 1}.svg`}
            title={t(`why-section-items.${index}.title`)}
            subtitle={t(`why-section-items.${index}.subtitle`)}
          />
        ))}
      </Box>
    </Box>
  );
}

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Image,
  Flex,
} from "@chakra-ui/react";
import type { PropsWithChildren, FunctionComponent } from "react";

import { useTranslation } from "../../../hooks/useTranslation";
import colors from "../../../styles/customTheme/colors";
import MLink from "../../atoms/Link";
import Text from "../../atoms/Text";

type TooltipWithContentpProps = PropsWithChildren<{
  tooltipText: string;
  link?: string;
  linkText?: string;
}>;

const TooltipWithContent: FunctionComponent<TooltipWithContentpProps> = ({
  tooltipText,
  link,
  linkText,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <Popover
      placement="bottom"
      trigger="hover"
      arrowSize={11}
      arrowPadding={100}
      arrowShadowColor="transparent"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent borderWidth="0">
        <PopoverArrow
          backgroundColor="marinadeEvenLighterGreen"
          borderWidth="0"
        />
        <PopoverBody
          padding="8px"
          backgroundColor="marinadeEvenLighterGreen"
          borderRadius="4px"
        >
          <Text fontSize="14px" pb={1}>
            {tooltipText}
          </Text>
          {link ? (
            <Flex justifyContent="center">
              <MLink
                font="text-md"
                variant="link"
                as="a"
                color={colors.marinadeGreen}
                href={link}
                target="_blank"
                _hover={{ textDecoration: "none" }}
                rel="noreferrer noopener"
                _focus={{ boxShadow: "none" }}
                display="flex"
                alignItems="center"
              >
                {linkText ?? t("appPage.tooltip-time-to-unstake-read-more")}
                <Image
                  src="/icons/external-link-green.svg"
                  width="1rem"
                  ml={2}
                />
              </MLink>
            </Flex>
          ) : null}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default TooltipWithContent;

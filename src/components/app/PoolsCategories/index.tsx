import { Flex } from "@chakra-ui/layout";
import {
  Button,
  Image,
  MenuButton,
  Menu,
  IconButton,
  MenuList,
  MenuItemOption,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { MdInfoOutline } from "react-icons/md";

import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import { useTranslation } from "hooks/useTranslation";
import type { PoolCategories } from "services/domain/poolsCategories";
import { poolCategories } from "services/domain/poolsCategories";
import colors from "styles/customTheme/colors";

interface PoolsCategoriesProps {
  setCategory: (cat: PoolCategories) => void;
}

const PoolsCategories: FunctionComponent<PoolsCategoriesProps> = ({
  setCategory,
}) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<PoolCategories>(
    poolCategories.STAKING
  );
  const [showMore, setShowMore] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const marginVariant = useBreakpointValue({ base: "unset", md: "0 auto" });

  useEffect(() => {
    setCategory(activeCategory);
  }, [activeCategory, setCategory]);

  const categoryItems = Object.keys(poolCategories).map((cat) => {
    return {
      title: t(
        `defiPage.pool-categories.${
          poolCategories[cat as keyof typeof poolCategories]
        }.button`
      ),
      category: poolCategories[cat as keyof typeof poolCategories],
    };
  });

  return (
    <Flex width="100%" direction="column">
      <Flex
        minWidth={{ base: "unset", lg: "900px" }}
        maxWidth={{ base: "unset", lg: "1100px" }}
        width="100%"
        margin={marginVariant}
        mb={4}
        alignItems="center"
      >
        {" "}
        <MHeading>{t("defiPage.pool-categories.heading")}</MHeading>{" "}
        <TooltipWithContent tooltipText={t("appPage.info-epoch-tooltip") || ""}>
          <IconButton
            _focus={{ boxShadow: "none" }}
            variant="link"
            aria-label="Info epoch"
            size="lg"
            icon={<MdInfoOutline />}
          />
        </TooltipWithContent>
      </Flex>
      <Flex
        minWidth={{ base: "288px", lg: "900px" }}
        maxWidth={{ base: "320px", lg: "1100px" }}
        width="100%"
        margin="0 auto"
        direction={{ base: "column", md: "row" }}
        display={{ base: "none", lg: "flex" }}
        mb={4}
      >
        {categoryItems.map((item, index) => (
          <Button
            key={item.category}
            size="sm"
            transition="0.1s ease"
            ml={index !== 0 ? 2 : 0}
            isActive={activeCategory === item.category}
            onClick={() => setActiveCategory(item.category)}
            borderRadius="6px"
            _hover={{ backgroundColor: colors.marinadeLighterGreen }}
            _focus={{ boxShadow: "none" }}
            _active={{
              backgroundColor: colors.marinadeLighterGreen,
              border: "1px solid",
              borderColor: colors.marinadeBorderGreen,
              fontWeight: "bold",
            }}
            fontWeight="normal"
            rightIcon={
              <Image
                display={
                  activeCategory === item.category ? "inline-block" : "none"
                }
                transition="display 0.1s ease"
                transitionDelay="0.2"
                src="/icons/checkmark-filled-green.svg"
              />
            }
          >
            {item.title}
          </Button>
        ))}
      </Flex>
      <Flex
        minWidth={{ base: "unset", lg: "900px" }}
        maxWidth={{ base: "unset", lg: "1100px" }}
        width="100%"
        margin={marginVariant}
        mb={4}
      >
        <MText>{t(`defiPage.pool-categories.${activeCategory}.text`)}</MText>
      </Flex>
      <Flex
        minWidth={{ base: "288px", lg: "900px" }}
        maxWidth={{ base: "320px", lg: "1100px" }}
        width="100%"
        margin="0 auto"
        direction={{ base: "column", md: "row" }}
        mb={4}
      >
        <Button
          variant="link"
          color={colors.black}
          _focus={{ boxShadow: "none" }}
          onClick={() => setShowMore(!showMore)}
          display={{
            base: "none",
            lg: activeCategory === poolCategories.STAKING ? "none" : "flex",
          }}
          rightIcon={
            <Image
              src={
                !showMore
                  ? "/icons/arrow-down-black.svg"
                  : "/icons/arrow-up-black.svg"
              }
            />
          }
        >
          {t("defiPage.pool-categories.learn-more")}
        </Button>
      </Flex>
      <Flex
        minWidth={{ base: "288px", lg: "900px" }}
        maxWidth={{ base: "unset", lg: "1100px" }}
        width="100%"
        direction={{ base: "row", md: "row" }}
        display={{ base: "flex", lg: "none" }}
        mb={4}
        zIndex={mobileMenuOpen ? 8 : 7}
      >
        <Menu
          onOpen={() => setMobileMenuOpen(true)}
          onClose={() => setMobileMenuOpen(false)}
          matchWidth
        >
          <MenuButton
            as={Button}
            flex={1}
            bg={colors.white}
            borderRadius="6px"
            border="1px solid #E2E8F0"
            _focus={{ boxShadow: "none" }}
            rightIcon={<BsChevronDown />}
          >
            <MText>
              {t(`defiPage.pool-categories.${activeCategory}.button`)}
            </MText>
          </MenuButton>
          <MenuList>
            {categoryItems.map((item) => {
              return (
                <MenuItemOption
                  key={item.category}
                  onClick={() => setActiveCategory(item.category)}
                  bg={item.category === activeCategory ? "gray.100" : "white"}
                  _hover={{}}
                  _active={{}}
                  isFocusable={false}
                  isChecked={item.category === activeCategory}
                >
                  {item.title}
                </MenuItemOption>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>
      <Flex
        minWidth={{ base: "288px", lg: "900px" }}
        maxWidth={{ base: "320px", lg: "1100px" }}
        width="100%"
        margin="0 auto"
        direction={{ base: "column", md: "row" }}
        display={{ base: "none", lg: "flex" }}
        mb="56px"
      >
        {showMore && (
          <MText style={{ whiteSpace: "pre-line" }}>
            {t(`defiPage.pool-categories.${activeCategory}.learn-more`)}
          </MText>
        )}
      </Flex>
    </Flex>
  );
};

export default PoolsCategories;

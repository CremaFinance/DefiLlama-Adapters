import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useTranslation } from "hooks/useTranslation";

export const useHeaderConfig = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const linkProps = {
    icon: "/icons/external-link-black.svg",
    props: {
      as: Link,
      target: "_blank",
      outline: "none",
      _focus: { outline: "none", textDecoration: "none", boxShadow: "none" },
      _hover: {
        outline: "none",
        textDecoration: "none",
        boxShadow: "none",
        backgroundColor: { base: "transparent", md: "gray.100" },
      },
      _active: { outline: "none", boxShadow: "none" },
      rel: "noreferrer noopener",
    },
  };

  const appPageLinkProps = {
    _hover: {
      background: { base: "transparent", md: "gray.100" },
      textDecoration: { base: "underline", md: "none" },
    },
  };

  return [
    {
      title: t("indexPage.header-menu.community.text"),
      items: [
        {
          title: t("indexPage.header-menu.community.items.0.text"),
          icon: linkProps.icon,
          props: {
            href: "https://twitter.com/MarinadeFinance",
            ...linkProps.props,
          },
        },
        {
          title: t("indexPage.header-menu.community.items.1.text"),
          icon: linkProps.icon,
          props: {
            href: "https://discord.com/invite/6EtUf4Euu6",
            ...linkProps.props,
          },
        },
        {
          title: t("indexPage.header-menu.community.items.2.text"),
          icon: linkProps.icon,
          props: {
            href: "https://forum.marinade.finance/",
            ...linkProps.props,
          },
        },
      ],
    },
    {
      title: t("indexPage.header-menu.tokens.text"),
      items: [
        {
          title: t("indexPage.header-menu.tokens.items.0.text"),
          icon: "",

          props: {
            onClick: () => router.push("/tokens/mnde"),
            ...appPageLinkProps,
          },
        },
      ],
    },
    {
      title: t("indexPage.header-menu.learn.text"),
      items: [
        {
          title: t("indexPage.header-menu.learn.items.0.text"),
          icon: linkProps.icon,
          props: {
            href: "https://medium.com/marinade-finance/msol-101-how-to-get-started-with-liquid-staking-on-solana-ea8d1e6c7f2a",
            ...linkProps.props,
          },
        },
        {
          title: t("indexPage.header-menu.learn.items.1.text"),
          icon: linkProps.icon,
          props: {
            href: "https://docs.marinade.finance/",
            ...linkProps.props,
          },
        },
        {
          title: t("indexPage.header-menu.learn.items.2.text"),
          icon: linkProps.icon,
          props: {
            href: "https://docs.marinade.finance/faq/faq",
            ...linkProps.props,
          },
        },
        {
          title: t("indexPage.header-menu.learn.items.3.text"),
          icon: linkProps.icon,
          props: {
            href: "https://medium.com/marinade-finance/marinade-a-validators-guide-1a3a4922b093",
            ...linkProps.props,
          },
        },
      ],
    },
    {
      title: t("indexPage.header-menu.about.text"),
      items: [
        {
          title: t("indexPage.header-menu.about.items.0.text"),
          icon: linkProps.icon,
          props: {
            href: "https://docs.marinade.finance/partnerships/marinade-press-kit",
            ...linkProps.props,
          },
        },
        {
          title: t("indexPage.header-menu.about.items.1.text"),
          icon: linkProps.icon,
          props: {
            href: "https://github.com/marinade-finance",
            ...linkProps.props,
          },
        },
        {
          title: t("indexPage.header-menu.about.items.2.text"),
          icon: linkProps.icon,
          props: {
            href: "https://docs.marinade.finance/marinade-protocol/security",
            ...linkProps.props,
          },
        },
      ],
    },
  ];
};

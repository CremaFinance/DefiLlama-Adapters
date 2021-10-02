/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "marinade.finance",
  titleTemplate: "%s | marinade",
  defaultTitle: "marinade.finance",
  description: "marinade.finance",
  canonical: "https://marinade.finance",
  openGraph: {
    url: "https://marinade.finance",
    title: "marinade.finance",
    description: "marinade.finance",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextchakra-starter**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "nextchakra-starter.sznm.dev og-image",
      },
    ],
    site_name: "marinade-finance",
  },
  twitter: {
    handle: "@MarinadeFinance",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;

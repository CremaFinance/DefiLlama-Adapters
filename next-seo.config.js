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
    images: [
      {
        url: "https://marinade.finance/marinade-meta.png",
        alt: "marinade.finance og-image",
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

import { ChakraProvider, ColorModeScript, LightMode } from "@chakra-ui/react";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
import "@fontsource/maven-pro/400.css";
import "@fontsource/maven-pro/700.css";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import defaultSEOConfig from "../../next-seo.config";
import { AccountsContextProvider } from "../contexts/AccountsContext";
import { AnchorProvider } from "../contexts/AnchorContext";
import { ConnectionProvider } from "../contexts/ConnectionProvider";
import { MarinadeProvider } from "../contexts/MarinadeContext";
import { QuarryProvider } from "../contexts/QuaryContext";
import { StatsProvider } from "../contexts/StatsContext";
import { UserBalanceProvider } from "../contexts/UserBalanceContext";
import Layout from "components/layout";
import Agreement from "components/molecules/Aggrement.tsx";
import createEmotionCache from "styles/createEmotionCache";
import customTheme from "styles/customTheme";
import "styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const BrowserWalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../contexts/WalletConnectionProvider").then(
      ({ WalletConnectionProvider }) => WalletConnectionProvider
    ),
  {
    ssr: false,
  }
);

const gtmId = "GTM-TTZLQF7";

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  useEffect(() => {
    localStorage.removeItem("chakra-ui-color-mode");
  }, []);

  const queryClient = new QueryClient();

  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
          }}
        />
        {/* https://chakra-ui.com/docs/features/color-mode#for-nextjs */}
        <ColorModeScript
          initialColorMode={customTheme.config.initialColorMode}
        />

        <DefaultSeo {...defaultSEOConfig} />

        <QueryClientProvider client={queryClient}>
          <AccountsContextProvider>
            <BrowserWalletConnectionProvider>
              <ConnectionProvider>
                <Agreement />
                <AnchorProvider>
                  <MarinadeProvider>
                    <QuarryProvider>
                      <StatsProvider>
                        <UserBalanceProvider>
                          <LightMode>
                            <Layout>
                              <Component {...pageProps} />
                            </Layout>
                          </LightMode>
                        </UserBalanceProvider>
                      </StatsProvider>
                    </QuarryProvider>
                  </MarinadeProvider>
                </AnchorProvider>
              </ConnectionProvider>
            </BrowserWalletConnectionProvider>
          </AccountsContextProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;

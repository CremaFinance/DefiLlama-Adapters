import { ChakraProvider } from "@chakra-ui/react";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import "@fontsource/maven-pro/400.css";
import "@fontsource/maven-pro/700.css";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import defaultSEOConfig from "../../next-seo.config";
import { AccountsContextProvider } from "../contexts/AccountsContext";
import { AnchorProvider } from "../contexts/AnchorContext";
import { ConnectionProvider } from "../contexts/ConnectionProvider";
import { MarinadeProvider } from "../contexts/MarinadeContext";
import { StatsProvider } from "../contexts/StatsContext";
import Layout from "components/layout";
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

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
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
        <DefaultSeo {...defaultSEOConfig} />
        <QueryClientProvider client={queryClient}>
          <AccountsContextProvider>
            <BrowserWalletConnectionProvider>
              <ConnectionProvider>
                <AnchorProvider>
                  <MarinadeProvider>
                    <StatsProvider>
                      <Layout>
                        <Component {...pageProps} />
                      </Layout>
                    </StatsProvider>
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

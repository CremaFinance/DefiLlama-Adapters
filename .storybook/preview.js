import "@fontsource/maven-pro/400.css";
import "../src/styles/globals.css";
import customTheme from '../src/styles/customTheme';
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import { WalletConnectionProvider } from "../src/contexts/WalletConnectionProvider";

import createEmotionCache from "../src/styles/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {theme: customTheme},
  
} 

export const decorators = [
  (Story) => (
    <CacheProvider value={clientSideEmotionCache}>
    <ChakraProvider theme={customTheme}> 
    <WalletConnectionProvider>
      <Story />
    </WalletConnectionProvider>
   </ChakraProvider>
   </CacheProvider>
),
];
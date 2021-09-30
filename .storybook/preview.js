import "@fontsource/maven-pro/400.css";
import "../src/styles/globals.css";
import customTheme from '../src/styles/customTheme';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {theme: customTheme}
} 
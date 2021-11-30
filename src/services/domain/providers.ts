import { orca } from "../pools/orca";
import { port } from "../pools/port";
import { raydium } from "../pools/raydium";

export const providerKeys = {
  ORCA: "orca",
  PORT: "port",
  RAYDIUM: "ray",
} as const;

export const providers = {
  [providerKeys.ORCA]: orca,
  [providerKeys.PORT]: port,
  [providerKeys.RAYDIUM]: raydium,
};

export type Providers = typeof providerKeys[keyof typeof providerKeys];

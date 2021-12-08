import { atrix } from "../pools/atrix";
import { francium } from "../pools/francium";
import { larix } from "../pools/larix";
import { orca } from "../pools/orca";
import { port } from "../pools/port";
import { raydium } from "../pools/raydium";

export const providerKeys = {
  ORCA: "orca",
  PORT: "port",
  RAYDIUM: "ray",
  LARIX: "larix",
  ATRIX: "atrix",
  FRANCIUM: "francium",
} as const;

export const providers = {
  [providerKeys.ORCA]: orca,
  [providerKeys.PORT]: port,
  [providerKeys.RAYDIUM]: raydium,
  [providerKeys.LARIX]: larix,
  [providerKeys.ATRIX]: atrix,
  [providerKeys.FRANCIUM]: francium,
};

export type Providers = typeof providerKeys[keyof typeof providerKeys];

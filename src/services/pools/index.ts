import { Providers } from "../domain/providers";

import { atrix } from "./atrix";
import { francium } from "./francium";
import { larix } from "./larix";
import { orca } from "./orca";
import { port } from "./port";
import { raydium } from "./raydium";

export const providerKeys = {
  ORCA: "orca",
  PORT: "port",
  RAYDIUM: "ray",
  LARIX: "larix",
  ATRIX: "atrix",
  FRANCIUM: "francium",
  MNDE: "marinade",
} as const;
export type ProviderKeys = typeof providerKeys[keyof typeof providerKeys];

export const providers: Providers<ProviderKeys> = {
  [providerKeys.ORCA]: orca,
  [providerKeys.PORT]: port,
  [providerKeys.RAYDIUM]: raydium,
  [providerKeys.LARIX]: larix,
  [providerKeys.ATRIX]: atrix,
  [providerKeys.FRANCIUM]: francium,
};

export type ProviderOptions = Record<string, Record<string, unknown>>;

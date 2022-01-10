import { Providers } from "../domain/providers";

import { aldrin } from "./aldrin";
import { atrix } from "./atrix";
import { francium } from "./francium";
import { larix } from "./larix";
import { marinade } from "./marinade";
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
  ALDRIN: "aldrin",
} as const;
export type ProviderKeys = typeof providerKeys[keyof typeof providerKeys];

export const providers: Providers<ProviderKeys> = {
  [providerKeys.ORCA]: orca,
  [providerKeys.PORT]: port,
  [providerKeys.RAYDIUM]: raydium,
  [providerKeys.LARIX]: larix,
  [providerKeys.ATRIX]: atrix,
  [providerKeys.FRANCIUM]: francium,
  [providerKeys.MNDE]: marinade,
  [providerKeys.ALDRIN]: aldrin,
};

export type ProviderOptions = Record<string, Record<string, unknown>>;

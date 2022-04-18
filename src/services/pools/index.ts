import type { Providers } from "../domain/providers";

import { aldrin } from "./aldrin";
import { atrix } from "./atrix";
import { francium } from "./francium";
import { larix } from "./larix";
import { marinade } from "./marinade";
import { orca } from "./orca";
import { port } from "./port";
import { raydium } from "./raydium";
import { saber } from "./saber";
import { solend } from "./solend";
import { synthetify } from "./synthetify";
import { crema } from "./crema";

export const providerKeys = {
  ORCA: "orca",
  PORT: "port",
  RAYDIUM: "ray",
  LARIX: "larix",
  ATRIX: "atrix",
  FRANCIUM: "francium",
  MNDE: "marinade",
  ALDRIN: "aldrin",
  SABER: "saber",
  SOLEND: "solend",
  SYNTHETIFY: "synthetify",
  CREMA:"crema"
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
  [providerKeys.SABER]: saber,
  [providerKeys.SOLEND]: solend,
  [providerKeys.SYNTHETIFY]: synthetify,
  [providerKeys.CREMA]: crema,
};

export type ProviderOptions = Record<string, Record<string, unknown>>;

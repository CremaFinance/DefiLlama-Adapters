import { orca } from "../pools/orca";

export const providerKeys = {
  ORCA: "orca",
  PORT: "port",
} as const;

export const providers = {
  [providerKeys.ORCA]: orca,
};

export type Providers = typeof providerKeys[keyof typeof providerKeys];

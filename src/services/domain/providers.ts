import { orca } from "../pools/orca";
import { port } from "../pools/port";

export const providerKeys = {
  ORCA: "orca",
  PORT: "port",
} as const;

export const providers = {
  [providerKeys.ORCA]: orca,
  [providerKeys.PORT]: port,
};

export type Providers = typeof providerKeys[keyof typeof providerKeys];

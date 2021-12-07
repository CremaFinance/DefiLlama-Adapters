import { TokenExtensions } from "./tokenExtensions";

export interface Token {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly extensions?: TokenExtensions;
}

export type TokenRecord<K extends string> = Record<K, Token & { address: K }>;

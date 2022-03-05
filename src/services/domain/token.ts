import type { TokenExtensions } from "./tokenExtensions";

/** based on https://github.com/solana-labs/token-list/blob/main/src/lib/tokenlist.ts#L43 */
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

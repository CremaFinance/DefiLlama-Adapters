/** based on https://github.com/solana-labs/token-list/blob/main/src/lib/tokenlist.ts#L24
 * - added binanceId
 */
export interface TokenExtensions {
  readonly website?: string;
  readonly bridgeContract?: string;
  readonly assetContract?: string;
  readonly address?: string;
  readonly explorer?: string;
  readonly twitter?: string;
  readonly github?: string;
  readonly medium?: string;
  readonly tgann?: string;
  readonly tggroup?: string;
  readonly discord?: string;
  readonly coingeckoId?: string;
  readonly binanceId?: string;
  readonly imageUrl?: string;
  readonly description?: string;
  readonly telegram?: string;

  readonly serumV3Usdt?: string;
  readonly serumV3Usdc?: string;
}

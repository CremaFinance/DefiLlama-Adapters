import * as quarry from "@quarryprotocol/quarry-sdk";
import { SolanaProvider } from "@saberhq/solana-contrib";
import * as st from "@saberhq/token-utils";
import { Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";

import { DummyWalletAdapter } from "../wallet-adapters/dummy";
import { Prices } from "services/domain/coinSymbols";
import { coinTokens } from "services/domain/coinTokens";
import { Pool } from "services/domain/pool";

import { DEFAULT_ENDPOINT } from "./web3/endpoints";

const connection = new Connection(DEFAULT_ENDPOINT.endpoint, "recent");

async function quarryRewardApy(
  tokenAddress: string,
  tokenPrice: number,
  price: number,
  decimals: number,
  quarryKey: string
): Promise<{ key: string; apy: number; dailyAmount: number }> {
  const sdk = quarry.QuarrySDK.load({
    provider: SolanaProvider.init({
      connection,
      wallet: new DummyWalletAdapter(),
    }),
  });
  const token = st.Token.fromMint(tokenAddress, decimals);
  const rewardQuarry = await quarry.QuarryWrapper.load({
    sdk,
    token,
    key: new PublicKey(quarryKey),
  });
  const annualRewards = rewardQuarry.quarryData.annualRewardsRate
    .div(new BN(10 ** decimals))
    .toNumber();
  const dayRewards = Math.round(annualRewards / 365);
  const tokensDeposited = rewardQuarry.quarryData.totalTokensDeposited
    .div(new BN(10 ** 9))
    .toNumber();

  const apr = (annualRewards * tokenPrice) / (tokensDeposited * price);
  const apy = ((1 + apr / 365) ** 365 - 1) * 100;
  return { key: quarryKey, dailyAmount: dayRewards, apy };
}

export const updatePoolQuarryRewards = async (
  poolToUpdate: Pool,
  prices: Prices
) => {
  const pool = poolToUpdate;
  if (pool.rewards) {
    const requests: Promise<{
      key: string;
      apy: number;
      dailyAmount: number;
    }>[] = [];
    Object.entries(pool.rewards).forEach((entry) => {
      const [key, reward] = entry;
      const rewardPrice = prices[key]?.usd;
      const tokenPrice = prices[pool.tokenA]?.usd;
      const token = coinTokens[key];
      if (
        rewardPrice &&
        tokenPrice &&
        reward &&
        pool.providerId &&
        reward.quarry
      ) {
        requests.push(
          quarryRewardApy(
            pool.providerId,
            rewardPrice,
            tokenPrice,
            token.decimals,
            reward.quarry
          )
        );
      }
    });
    const results = await Promise.all(requests);
    Object.values(pool.rewards).forEach((rewardToUpdate) => {
      const reward = rewardToUpdate;
      const result = results.find((r) => r.key === reward.quarry);
      reward.apy = result?.apy ?? 0;
      reward.dailyRate = result?.dailyAmount ?? 0;
      pool.apy += reward.apy;
    });
  }
  return pool;
};

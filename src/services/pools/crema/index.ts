import type { Prices } from "../../domain/coinSymbols";
import type { Pool } from "../../domain/pool";

import type { CremaPoolsResponse } from "./cremaPool";
import { cremaPools } from "./config";

export async function fetchCremaPools(): Promise<CremaPoolsResponse> {
  const response:any = await fetch(
    `https://api.crema.finance/config?name=swap-pairs`
  );
  const responseTvl = await fetch(
    `https://api.crema.finance/farm/tvl`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  if (!responseTvl.ok) {
    throw new Error(response.statusText);
  }
  let dataInfo:any = {}
  if(response){
    response.forEach((ele:any) => {
      if(ele.name=='mSOL-SOL'){
        dataInfo = ele
      }
    });
  }
  if(responseTvl){
    response.forEach((ele:any) => {
      if(ele.swapKey=='mSOL-SOL'){
        const tvlInfo = ele
        dataInfo = {
          ...dataInfo,
          tvlInfo
        }
      }
    });
  }
  return dataInfo.json();
}

export const mapCremaPoolsResponse = (
  cremaResults:any
) => {
  const poolsArray = Object.entries(cremaPools).map(([poolkey, incoming]) => {
    const pool = incoming;
    
    pool.liq = cremaResults.effectiveLiquity
    pool.totalLockedValue = cremaResults.
    pool.tradingApy = 0
    pool.apy = cremaResults.apr
    pool.rewards = cremaResults.rewardShare
    // if (pool.providerId) {
    //   const result = cremaResults.find(
    //     (cremaResult:any) => cremaResult.providerId === pool.providerId
    //   );

    //   if (result && prices) {
    //     const { tvlUSD, tradingAPY, famingAPY, rewards } = result;
    //     pool.liq = Number.isNaN(tvlUSD) ? undefined : tvlUSD;
    //     pool.totalLockedValue = Number.isNaN(tvlUSD) ? undefined : tvlUSD;
    //     pool.tradingApy = tradingAPY;
    //     pool.apy = tradingAPY + famingAPY;
    //     pool.rewards = rewards;
    //   }
    // }
    return { [poolkey]: pool as Pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {});
};

export const getCrema = async () => {
  const results = await fetchCremaPools();
  return mapCremaPoolsResponse(results);
};

export const crema = {
  fetchPools: getCrema,
  pools: cremaPools,
};

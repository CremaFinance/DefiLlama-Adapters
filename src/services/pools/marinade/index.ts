// import { updatePoolRewards } from "../../../utils/update-pool-rewards";
// import { Prices } from "../../domain/coinSymbols";
// import { Pool } from "../../domain/pool";
// import { useStats } from "contexts/StatsContext";

// import { marinadePools } from "./config";
// import { MarinadePool } from "./marinadePool";

// export async function fetchMarinadePools(): Promise<MarinadePool> {
//   const response = await fetch(`https://api.atrix.finance/api/tvl`);
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response.json();
// }

// export const mapMarinadePoolsResponse = (
//   marinadeResults: MarinadePool,
//   prices: Prices
// ) => {
//   const { liqPoolBalance } = useStats();
//   const poolsArray = Object.entries(marinadePools).map(
//     ([poolkey, incoming]) => {
//       let pool = incoming;

//       if (pool.providerId) {
//         const result = marinadeResults;

//         if (result) {
//           const { value } = result;
//           pool.liq = Number.isNaN(value) ? undefined : value;
//           pool.totalLockedValue = Number.isNaN(tvl) ? undefined : tvl;
//           pool.tradingApy = Number(apy);
//           pool.apy = pool.tradingApy;
//           pool = updatePoolRewards(pool as Pool, prices);
//         }
//       }
//       return { [poolkey]: pool as Pool };
//     }
//   );

//   // convert to map
//   return poolsArray.reduce((acc, pool) => {
//     return { ...acc, ...pool };
//   }, {});
// };

// export const getMarinade = async (prices: Prices) => {
//   const results = await fetchMarinadePools();
//   return mapMarinadePoolsResponse(results, prices);
// };

// export const marinade = {
//   fetchPools: getMarinade,
//   pools: marinadePools,
// };

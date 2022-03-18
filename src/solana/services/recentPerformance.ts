import { Connection } from "@solana/web3.js";

export async function getRecentPerformance(): Promise<number> {
  const connection = new Connection("https://marinade.rpcpool.com/");

  try {
    const response = await connection.getRecentPerformanceSamples(3);
    const totalSecs = response.reduce((a, b) => a + b.samplePeriodSecs, 0);
    const totalTransactions = response.reduce(
      (a, b) => a + b.numTransactions,
      0
    );
    return totalTransactions / totalSecs;
  } catch (error) {
    return 0;
  }
}

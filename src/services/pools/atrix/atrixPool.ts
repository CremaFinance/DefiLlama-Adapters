export interface AtrixPool {
  key: string;
  tvl: number;
  apy: number;
}

export type AtrixPoolsResponse = {
  farms: AtrixPool[];
};

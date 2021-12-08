export interface FranciumPool {
  id: string;
  apy: string;
  liquidityLocked: number;
  available: number;
}

export type FranciumPoolsResponse = {
  data: {
    lend: FranciumPool[];
  };
};

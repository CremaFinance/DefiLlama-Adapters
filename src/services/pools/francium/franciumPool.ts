export interface FranciumPool {
  id: string;
  apy: number;
  borrowApr: number;
  liquidityLocked: number;
  available: number;
}

export type FranciumPoolsResponse = {
  data: {
    lend: FranciumPool[];
  };
};

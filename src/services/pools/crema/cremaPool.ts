export interface CremaPool {
  name: string;
  fee:string;
  swap_account:string;
  apr:string;
  tvl:string;
}

export type CremaPoolsResponse = CremaPool[];

import type { LendingLarixPoolIds } from "./lendingLarixPoolIds";

export interface LarixPool {
  mint_name: LendingLarixPoolIds;
  mint_id: string;
  mint_price: number;
  available_value: number;
  borrow_value: number;
  supply_value: number;
  borrow_apy: number;
  borrow_distribution_apy: number;
  supply_apy: number;
  supply_distribution_apy: number;
}

export type LarixPoolsResponse = {
  detail: LarixPool[];
};

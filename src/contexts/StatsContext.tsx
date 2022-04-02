/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import { fetchStakeAPY } from "../services/marinade/stakeAPY";
import { fetchTotalTLV } from "../services/marinade/totalTLV";
import { isError } from "../utils/is-error";

import { useConnection } from "./ConnectionProvider";
import { useMarinadeState } from "./MarinadeContext";
import { useQuarryProvider } from "./QuaryContext";

export interface Stats {
  /**
   * The total amount of SOL staked by Marinade in Lamports
   */
  totalStaked: null | number | undefined;

  /**
   * The total amount of SOL staked in the mSOL-SOL Pool in Lamports
   */
  liqPoolBalance: null | number;

  /**
   * The total amount of mSOL staked in the mSOL-SOL Pool in Lamports
   */
  liqPoolMSolAmount: null | number;

  /**
   * The total supply of the mSOL-SOL LP token in Lamports
   */
  lpTokenSupply: null | number | undefined;

  /**
   * The ratio of mSOL to SOL
   */
  mSOLvsSOLParity: null | number;

  /**
   * APY on stake
   */
  stakeAPY: null | number;

  /**
   * Total TLV
   */
  totalTLV: null | number;

  unstakeFee: null | number;
  totalValidatorsCount: null | number;
}

const StatsContext = createContext<Stats>({
  totalStaked: null,
  liqPoolBalance: null,
  liqPoolMSolAmount: null,
  lpTokenSupply: null,
  mSOLvsSOLParity: null,
  stakeAPY: null,
  totalTLV: null,
  unstakeFee: null,
  totalValidatorsCount: null,
});

type StatsProviderProps = { children: ReactNode };
export function StatsProvider({ children }: StatsProviderProps) {
  const connection = useConnection();
  const marinadeState = useMarinadeState();

  const state = marinadeState ? marinadeState.state : null;

  const mSOLvsSOLParity =
    (state && state?.st_sol_price.toNumber() / 0x1_0000_0000) ?? null;

  const totalStaked = useMemo(() => {
    if (marinadeState === null || marinadeState === undefined) {
      return null;
    }
    return (
      state?.validator_system?.total_active_balance
        ?.add(state?.stake_system.total_cooling_down)
        ?.add(state?.available_reserve_balance)
        // ?.sub(state?.circulating_ticket_balance)
        ?.toNumber()
    );
  }, [
    marinadeState,
    state?.available_reserve_balance,
    state?.stake_system.total_cooling_down,
    state?.validator_system?.total_active_balance,
  ]);

  const [liqPoolBalance, setLiqPoolBalance] = useState<number | null>(null);

  const liqPoolSolAccountPDA = marinadeState?.liqPoolSolAccountPDA;
  const liqPoolMSolLeg = marinadeState?.state?.liq_pool?.st_sol_leg?.value;
  const lpTokenSupply = marinadeState?.state?.liq_pool?.lp_supply?.toNumber();
  const rentExempt =
    marinadeState?.state?.rent_exempt_for_token_acc?.toNumber();

  useEffect(() => {
    setLiqPoolBalance(null);
    if (
      liqPoolSolAccountPDA === null ||
      liqPoolSolAccountPDA === undefined ||
      rentExempt === null ||
      rentExempt === undefined
    ) {
      return;
    }
    let isUpdated = false;
    const subscription = connection.onAccountChange(
      liqPoolSolAccountPDA,
      (acc) => {
        setLiqPoolBalance(acc.lamports - rentExempt);
        isUpdated = true;
      }
    );
    // set initial value
    let process = true;
    (async () => {
      while (process && !isUpdated) {
        try {
          const value =
            (await connection.getBalance(liqPoolSolAccountPDA)) - rentExempt;
          if (process && !isUpdated) {
            setLiqPoolBalance(value);
          }
          break;
        } catch (e) {
          // console.log(e);
          await new Promise((r) => setTimeout(r, 2000)); // sleep
        }
      }
    })();
    return () => {
      process = false;
      connection.removeAccountChangeListener(subscription);
    };
  }, [connection, liqPoolSolAccountPDA, rentExempt]);

  const [liqPoolMSolAmount, setLiqPoolMSolAmount] = useState<number | null>(
    null
  );

  useEffect(() => {
    setLiqPoolMSolAmount(null);
    if (liqPoolMSolLeg === null || liqPoolMSolLeg === undefined) {
      return;
    }
    let process = true;
    let isUpdated = false;
    const subscription = connection.onAccountChange(liqPoolMSolLeg, (_acc) => {
      (async () => {
        const balance = await connection.getTokenAccountBalance(liqPoolMSolLeg);
        if (process) {
          setLiqPoolMSolAmount(Number(balance.value.amount));
          isUpdated = true;
        }
      })();
    });
    // set initial value
    (async () => {
      while (process && !isUpdated) {
        try {
          const balance = await connection.getTokenAccountBalance(
            liqPoolMSolLeg
          );
          if (process && !isUpdated) {
            setLiqPoolMSolAmount(Number(balance.value.amount));
          }

          break;
        } catch (e) {
          if (isError(e) && e.message.endsWith("could not find account")) {
            setLiqPoolMSolAmount(0);
            return;
          }
          // console.log(e);
          await new Promise((r) => setTimeout(r, 2000)); // sleep
        }
      }
    })();

    return () => {
      process = false;
      connection.removeAccountChangeListener(subscription);
    };
  }, [liqPoolMSolLeg, connection]);

  const unstakeFee = useMemo(() => {
    if (
      state === null ||
      state === undefined ||
      liqPoolBalance === null ||
      liqPoolBalance === undefined
    ) {
      return null;
    }
    if (liqPoolBalance >= state?.liq_pool.lp_liquidity_target.toNumber()) {
      return state?.liq_pool.lp_min_fee.basis_points;
    }
    const delta =
      state?.liq_pool.lp_max_fee.basis_points -
      state?.liq_pool.lp_min_fee.basis_points;
    return (
      state?.liq_pool.lp_max_fee.basis_points -
      (delta * liqPoolBalance) / state?.liq_pool.lp_liquidity_target.toNumber()
    );
  }, [liqPoolBalance, state]);

  const [totalValidatorsCount, settotalValidatorsCount] = useState<
    number | null
  >(null);

  const fetchData = async (): Promise<{
    count: number;
  }> => {
    const res = await fetch(
      `https://marinade-dashboard-api-temp.herokuapp.com/validators/count`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  };

  const { data }: UseQueryResult<{ count: number }, Error> = useQuery<
    { count: number },
    Error
  >(`total_validators_count`, fetchData, {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      settotalValidatorsCount(data.count);
    }
  }, [data]);

  const stakeAPY = useQuery<number, Error>("stakeAPY", () => fetchStakeAPY());
  const totalTLV = useQuery<number, Error>("totalTLV", () => fetchTotalTLV());

  return (
    <StatsContext.Provider
      value={{
        totalStaked,
        liqPoolBalance,
        liqPoolMSolAmount,
        lpTokenSupply,
        mSOLvsSOLParity,
        stakeAPY: stakeAPY.data ?? 0,
        totalTLV: totalTLV.data ?? 0,
        unstakeFee,
        totalValidatorsCount,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats(): Stats {
  return useContext(StatsContext);
}

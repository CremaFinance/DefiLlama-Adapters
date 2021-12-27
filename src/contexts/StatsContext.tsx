/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { isError } from "../utils/is-error";

import { useConnection } from "./ConnectionProvider";
import { useMarinadeState } from "./MarinadeContext";

export interface Stats {
  totalStaked: null | number | undefined;
  liqPoolBalance: null | number;
  liqPoolMSolAmount: null | number;
  lpTokenSupply: null | number | undefined;
  lpTokenPrice: null | number;
  unstakeFee: null | number;
}

const StatsContext = createContext<Stats>({
  totalStaked: null,
  liqPoolBalance: null,
  liqPoolMSolAmount: null,
  lpTokenSupply: null,
  lpTokenPrice: null,
  unstakeFee: null,
});

type StatsProviderProps = { children: ReactNode };
export function StatsProvider({ children }: StatsProviderProps) {
  const connection = useConnection();
  const marinadeState = useMarinadeState();

  const state = marinadeState ? marinadeState.state : null;

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

  const mSOLPriceFixed = marinadeState?.state?.st_sol_price?.toNumber();

  const lpTokenPrice = useMemo(() => {
    if (lpTokenSupply === 0) {
      return 1;
    }
    if (
      liqPoolBalance !== null &&
      liqPoolBalance !== undefined &&
      liqPoolMSolAmount !== null &&
      liqPoolMSolAmount !== undefined &&
      lpTokenSupply !== null &&
      lpTokenSupply !== undefined &&
      mSOLPriceFixed !== null &&
      mSOLPriceFixed !== undefined
    ) {
      return (
        (liqPoolBalance +
          (liqPoolMSolAmount * mSOLPriceFixed) / 0x1_0000_0000) /
        lpTokenSupply
      );
    }
    return null;
  }, [liqPoolBalance, liqPoolMSolAmount, lpTokenSupply, mSOLPriceFixed]);

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

  return (
    <StatsContext.Provider
      value={{
        totalStaked,
        liqPoolBalance,
        liqPoolMSolAmount,
        lpTokenSupply,
        lpTokenPrice,
        unstakeFee,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats(): Stats {
  return useContext(StatsContext);
}
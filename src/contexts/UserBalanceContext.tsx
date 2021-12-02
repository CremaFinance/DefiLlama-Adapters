/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
import { PublicKey } from "@solana/web3.js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useWallet } from "../hooks/useWallet";
import { isError } from "../utils/is-error";

import { useConnection } from "./ConnectionProvider";
import { useMarinade } from "./MarinadeContext";
import { useStats } from "./StatsContext";

export interface UserBalance {
  nativeSOLBalance: null | number;
  stSOLBalance: null | number;
  liqSOLBalance: null | number;
  liquiditySOLPart: null | number;
  liquidityMSolPart: null | number;
}

const UserBalanceContext = createContext<UserBalance>({
  nativeSOLBalance: null,
  stSOLBalance: null,
  liqSOLBalance: null,
  liquiditySOLPart: null,
  liquidityMSolPart: null,
});

type UserBalanceProviderProps = { children: ReactNode };
export function UserBalanceProvider({ children }: UserBalanceProviderProps) {
  const connection = useConnection();
  const { publicKey: walletPubKey, connected: walletConnected } = useWallet();
  const { userStSOLAccountAddress, userLiqSOLAccountAddress } = useMarinade();
  const { liqPoolBalance, liqPoolMSolAmount, lpTokenSupply } = useStats();

  const [nativeSOLBalance, setNativeSOLBalance] = useState<number | null>(null);
  const [stSOLBalance, setStSOLBalance] = useState<number | null>(null);
  const [liqSOLBalance, setLiqSOLBalance] = useState<number | null>(null);

  useEffect(() => {
    setNativeSOLBalance(null);
    if (!walletConnected) {
      return;
    }

    let isUpdated = false;
    const subscription = connection.onAccountChange(
      walletPubKey as PublicKey,
      (acc) => {
        setNativeSOLBalance(acc.lamports);
        isUpdated = true;
      }
    );
    // set initial value
    let process = true;
    (async () => {
      while (process && !isUpdated) {
        try {
          const value = await connection.getBalance(walletPubKey as PublicKey);
          if (process && !isUpdated) {
            setNativeSOLBalance(value);
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
  }, [walletConnected, connection, walletPubKey]);

  useEffect(() => {
    setStSOLBalance(null);
    if (
      userStSOLAccountAddress === null ||
      userStSOLAccountAddress === undefined
    ) {
      return;
    }
    let process = true;
    let isUpdated = false;
    const subscription = connection.onAccountChange(
      userStSOLAccountAddress,
      () => {
        (async () => {
          const balance = await connection.getTokenAccountBalance(
            userStSOLAccountAddress
          );
          if (process) {
            setStSOLBalance(balance.value.uiAmount);
            isUpdated = true;
          }
        })();
      }
    );
    // set initial value
    (async () => {
      while (process && !isUpdated) {
        try {
          const balance = await connection.getTokenAccountBalance(
            userStSOLAccountAddress
          );
          if (process && !isUpdated) {
            setStSOLBalance(balance.value.uiAmount);
          }

          break;
        } catch (e) {
          if (isError(e) && e.message.endsWith("could not find account")) {
            setStSOLBalance(0);
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
  }, [connection, userStSOLAccountAddress]);

  useEffect(() => {
    setLiqSOLBalance(null);
    if (
      userLiqSOLAccountAddress === null ||
      userLiqSOLAccountAddress === undefined
    ) {
      return;
    }
    let process = true;
    const isUpdated = false;
    const subscription = connection.onAccountChange(
      userLiqSOLAccountAddress,
      () => {
        (async () => {
          const balance = await connection.getTokenAccountBalance(
            userLiqSOLAccountAddress
          );
          if (process) {
            setLiqSOLBalance(balance.value.uiAmount);
          }
        })();
      }
    );
    // set initial value
    (async () => {
      while (process && !isUpdated) {
        try {
          const balance = await connection.getTokenAccountBalance(
            userLiqSOLAccountAddress
          );
          if (process && !isUpdated) {
            setLiqSOLBalance(balance.value.uiAmount);
          }

          break;
        } catch (e) {
          if (isError(e) && e.message.endsWith("could not find account")) {
            setLiqSOLBalance(0);
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
  }, [connection, userLiqSOLAccountAddress]);

  const liquiditySOLPart = useMemo(() => {
    if (lpTokenSupply === 0) {
      return 0;
    }
    if (
      liqSOLBalance !== null &&
      liqSOLBalance !== undefined &&
      liqPoolBalance !== null &&
      liqPoolBalance !== undefined &&
      lpTokenSupply !== null &&
      lpTokenSupply !== undefined
    ) {
      return (liqSOLBalance * liqPoolBalance) / lpTokenSupply;
    }
    return null;
  }, [liqSOLBalance, liqPoolBalance, lpTokenSupply]);

  const liquidityMSolPart = useMemo(() => {
    if (lpTokenSupply === 0) {
      return 0;
    }
    if (
      liqSOLBalance !== null &&
      liqSOLBalance !== undefined &&
      liqPoolMSolAmount !== null &&
      liqPoolMSolAmount !== undefined &&
      lpTokenSupply !== null &&
      lpTokenSupply !== undefined
    ) {
      return (liqSOLBalance * liqPoolMSolAmount) / lpTokenSupply;
    }
    return null;
  }, [liqSOLBalance, liqPoolMSolAmount, lpTokenSupply]);

  return (
    <UserBalanceContext.Provider
      value={{
        nativeSOLBalance,
        stSOLBalance,
        liqSOLBalance,
        liquiditySOLPart,
        liquidityMSolPart,
      }}
    >
      {children}
    </UserBalanceContext.Provider>
  );
}

export function useUserBalance(): UserBalance {
  return useContext(UserBalanceContext);
}

import { PublicKey } from "@solana/web3.js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

  const nativeAccSubRef = useRef<undefined | number>();

  useEffect(() => {
    setNativeSOLBalance(0);
    if (walletConnected) {
      const fetchBalance = async () => {
        const balance = await connection.getBalance(walletPubKey as PublicKey);
        setNativeSOLBalance(balance);
      };
      fetchBalance();
      if (!nativeAccSubRef.current) {
        nativeAccSubRef.current = connection.onAccountChange(
          walletPubKey as PublicKey,
          (acc) => {
            setNativeSOLBalance(acc.lamports);
          }
        );
      }
    }
  }, [walletConnected, connection, walletPubKey]);

  const stSolSubscriptionRef = useRef<undefined | number>();

  useEffect(() => {
    setStSOLBalance(0);
    if (walletConnected && userStSOLAccountAddress) {
      const fetchBalance = async () => {
        try {
          const balance = await connection.getTokenAccountBalance(
            userStSOLAccountAddress
          );
          setStSOLBalance(balance.value.uiAmount);
        } catch (e) {
          if (isError(e) && e.message.endsWith("could not find account")) {
            setStSOLBalance(0);
          }
        }
      };
      fetchBalance();
      if (!stSolSubscriptionRef.current) {
        nativeAccSubRef.current = connection.onAccountChange(
          userStSOLAccountAddress,
          () => {
            fetchBalance();
          }
        );
      }
    }
  }, [connection, userStSOLAccountAddress, walletConnected]);

  const liqSOLSubscriptionRef = useRef<undefined | number>();

  useEffect(() => {
    setLiqSOLBalance(0);
    if (walletConnected && userLiqSOLAccountAddress) {
      const fetchBalance = async () => {
        try {
          const balance = await connection.getTokenAccountBalance(
            userLiqSOLAccountAddress
          );
          setLiqSOLBalance(balance.value.uiAmount);
        } catch (e) {
          if (isError(e) && e.message.endsWith("could not find account")) {
            setLiqSOLBalance(0);
          }
        }
      };
      fetchBalance();
      if (!liqSOLSubscriptionRef.current) {
        nativeAccSubRef.current = connection.onAccountChange(
          userLiqSOLAccountAddress,
          () => {
            fetchBalance();
          }
        );
      }
    }
  }, [connection, userLiqSOLAccountAddress, walletConnected]);

  const liquiditySOLPart = useMemo(() => {
    if (lpTokenSupply === 0) {
      return 0;
    }
    if (liqSOLBalance && liqPoolBalance && lpTokenSupply) {
      return (liqSOLBalance * liqPoolBalance) / lpTokenSupply;
    }
    return null;
  }, [liqSOLBalance, liqPoolBalance, lpTokenSupply]);

  const liquidityMSolPart = useMemo(() => {
    if (lpTokenSupply === 0) {
      return 0;
    }
    if (liqSOLBalance && liqPoolMSolAmount && lpTokenSupply) {
      return (liqSOLBalance * liqPoolMSolAmount) / lpTokenSupply;
    }
    return null;
  }, [liqSOLBalance, liqPoolMSolAmount, lpTokenSupply]);

  const userBalanceValue = useMemo(() => {
    return {
      nativeSOLBalance,
      stSOLBalance,
      liqSOLBalance,
      liquiditySOLPart,
      liquidityMSolPart,
    };
  }, [
    nativeSOLBalance,
    stSOLBalance,
    liqSOLBalance,
    liquiditySOLPart,
    liquidityMSolPart,
  ]);

  return (
    <UserBalanceContext.Provider value={userBalanceValue}>
      {children}
    </UserBalanceContext.Provider>
  );
}

export function useUserBalance(): UserBalance {
  return useContext(UserBalanceContext);
}

import * as anchor from "@project-serum/anchor";
import { useEffect, useState } from "react";

import { useConnection } from "../contexts/ConnectionProvider";
import { useMarinadeState } from "../contexts/MarinadeContext";
import { SaberPoolResponse } from "../services/pools/saber/config";

export const useSaber = () => {
  const state = useMarinadeState();
  const connection = useConnection();

  const [saber, setSaber] = useState<undefined | SaberPoolResponse>();

  useEffect(() => {
    const getBalances = async () => {
      const fetchMsol = connection.getTokenAccountBalance(
        new anchor.web3.PublicKey(
          "9DgFSWkPDGijNKcLGbr3p5xoJbHsPgXUTr6QvGBJ5vGN"
        )
      );
      const fetchSol = connection.getTokenAccountBalance(
        new anchor.web3.PublicKey(
          "2hNHZg7XBhuhHVZ3JDEi4buq2fPQwuWBdQ9xkH7t1GQX"
        )
      );
      const [mSolBalance, solBalance] = await Promise.all([
        fetchMsol,
        fetchSol,
      ]);

      if (mSolBalance.value.uiAmount && solBalance.value.uiAmount) {
        setSaber({
          mSolBalance: mSolBalance.value.uiAmount,
          solBalance: solBalance.value.uiAmount,
        });
      }
    };
    getBalances();
  }, [connection, state]);
  return saber;
};

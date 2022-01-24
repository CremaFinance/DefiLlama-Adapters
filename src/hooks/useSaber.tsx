import * as anchor from "@project-serum/anchor";
import { useEffect, useState } from "react";

import { useConnection } from "../contexts/ConnectionProvider";
import { SaberPoolResponse } from "../services/pools/saber/config";

export const useSaber = () => {
  const connection = useConnection();

  const [saber, setSaber] = useState<undefined | SaberPoolResponse>();

  useEffect(() => {
    // todo get from config + devnet keys
    const saberMSolKey = new anchor.web3.PublicKey(
      "9DgFSWkPDGijNKcLGbr3p5xoJbHsPgXUTr6QvGBJ5vGN"
    );
    const saberSolKey = new anchor.web3.PublicKey(
      "2hNHZg7XBhuhHVZ3JDEi4buq2fPQwuWBdQ9xkH7t1GQX"
    );
    const getBalances = async () => {
      const fetchMSol = connection.getTokenAccountBalance(saberMSolKey);
      const fetchSol = connection.getTokenAccountBalance(saberSolKey);

      try {
        const [mSolBalance, solBalance] = await Promise.all([
          fetchMSol,
          fetchSol,
        ]);

        if (mSolBalance.value.uiAmount && solBalance.value.uiAmount) {
          setSaber({
            mSolBalance: mSolBalance.value.uiAmount,
            solBalance: solBalance.value.uiAmount,
          });
        }
      } catch {
        // probably on devnet
      }
    };

    getBalances();
  }, [connection]);
  return saber;
};

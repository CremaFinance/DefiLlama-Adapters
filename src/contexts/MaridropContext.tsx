/* eslint-disable @typescript-eslint/no-shadow */
import * as anchor from "@project-serum/anchor";
import * as token from "@solana/spl-token";
import { Transaction, TransactionSignature } from "@solana/web3.js";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useWallet } from "../hooks/useWallet";
import * as maridropIDL from "../solana/maridrop.json";
import { DEFAULT_PUBLIC_KEY } from "../utils/web3/ids";

import { useAnchorProvider } from "./AnchorContext";
import { useConnection } from "./ConnectionProvider";

export interface Maridrop {
  program: anchor.Program;
  treasury?: MaridropTreasury;
  promise?: MaridropPromise | null;

  claim(): Promise<TransactionSignature>;
}

const MaridropContext = createContext<Maridrop | undefined>(undefined);

const MARIDROP_PROGRAM_ID = new anchor.web3.PublicKey(
  "mrdpo5HyUm6ajvGJzBDjLTsNM41cb9hXzZq5L5WXy9z"
);
const MARIDROP_TREASURY = new anchor.web3.PublicKey(
  "mdtr26HyFdL7kPd884gaNHqcUX5FsiUaEKFaPXWyDFQ"
);
const MNDE_MINT = new anchor.web3.PublicKey(
  "MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey"
);

export interface MaridropTreasury {
  adminAuthority: anchor.web3.PublicKey;
  tokenStore: anchor.web3.PublicKey;
  totalPromised: anchor.BN;
  totalNonClaimed: anchor.BN;
  promiseCount: anchor.BN;
  startTime: anchor.BN;
  tokenAuthorityBump: number;
}

export interface MaridropPromise {
  treasuryAccount: anchor.web3.PublicKey;
  targetAuthority: anchor.web3.PublicKey;
  totalAmount: anchor.BN;
  nonClaimedAmount: anchor.BN;
}

export const MaridropProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const anchorProvider = useAnchorProvider();
  const { publicKey, connected } = useWallet();

  const program = useMemo(
    () =>
      new anchor.Program(
        maridropIDL as anchor.Idl,
        MARIDROP_PROGRAM_ID,
        anchorProvider
      ),
    [anchorProvider]
  );
  const connection = useConnection();

  const [treasury, setTreasury] = useState<MaridropTreasury | undefined>();
  useEffect(() => {
    (async () => {
      const treasury = await program.account.treasury.fetch(MARIDROP_TREASURY);
      setTreasury(treasury as MaridropTreasury);
    })();
  }, [program]);

  const [promise, setPromise] = useState<MaridropPromise | undefined | null>();
  useEffect(() => {
    if (connected) {
      (async () => {
        const [promiseAddress] = await anchor.web3.PublicKey.findProgramAddress(
          [
            new TextEncoder().encode("promise"),
            MARIDROP_TREASURY.toBytes(),
            (publicKey ?? DEFAULT_PUBLIC_KEY).toBytes(),
          ],
          program.programId
        );

        try {
          const promise = await program.account.promise.fetch(promiseAddress);
          setPromise(promise as MaridropPromise);
        } catch (e) {
          // TODO: differentiate no account from network error
          setPromise(null);
        }
      })();
    } else {
      setPromise(undefined);
    }
  }, [program, connected, publicKey]);

  const claim = useCallback(async () => {
    if (!connected) {
      throw new Error("Please connect wallet");
    }

    if (!treasury) {
      throw new Error("Treasury is not loaded");
    }

    const [promiseAddress] = await anchor.web3.PublicKey.findProgramAddress(
      [
        new TextEncoder().encode("promise"),
        MARIDROP_TREASURY.toBytes(),
        (publicKey ?? DEFAULT_PUBLIC_KEY).toBytes(),
      ],
      program.programId
    );
    const [tokenStoreAuthority] =
      await anchor.web3.PublicKey.findProgramAddress(
        [new TextEncoder().encode("treasury"), MARIDROP_TREASURY.toBytes()],
        program.programId
      );

    const transaction = new Transaction({ feePayer: publicKey });
    const userMndeAccount = await token.Token.getAssociatedTokenAddress(
      token.ASSOCIATED_TOKEN_PROGRAM_ID,
      token.TOKEN_PROGRAM_ID,
      MNDE_MINT,
      publicKey ?? DEFAULT_PUBLIC_KEY
    );
    if (!(await connection.getAccountInfo(userMndeAccount))) {
      transaction.add(
        token.Token.createAssociatedTokenAccountInstruction(
          token.ASSOCIATED_TOKEN_PROGRAM_ID,
          token.TOKEN_PROGRAM_ID,
          MNDE_MINT,
          userMndeAccount,
          publicKey ?? DEFAULT_PUBLIC_KEY,
          publicKey ?? DEFAULT_PUBLIC_KEY
        )
      );
    }
    transaction.add(
      program.instruction.claim({
        accounts: {
          promiseAccount: promiseAddress,
          treasuryAccount: MARIDROP_TREASURY,
          targetAuthority: publicKey ?? DEFAULT_PUBLIC_KEY,
          tokenAuthority: tokenStoreAuthority,
          tokenStore: treasury.tokenStore,
          transferTokenTo: userMndeAccount,
          tokenProgram: token.TOKEN_PROGRAM_ID,
        },
      })
    );
    const signature = await program.provider.send(transaction);

    try {
      const promise = await program.account.promise.fetch(promiseAddress);
      setPromise(promise as MaridropPromise);
    } catch (e) {
      // TODO: differentiate no account from network error
    }
    return signature;
  }, [program, treasury, connected, publicKey, setPromise, connection]);

  return (
    <MaridropContext.Provider
      value={{
        program,
        treasury,
        promise,
        claim,
      }}
    >
      {children}
    </MaridropContext.Provider>
  );
};

export function useMaridrop(): Maridrop | undefined {
  return useContext(MaridropContext);
}

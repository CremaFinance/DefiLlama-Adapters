/* eslint-disable consistent-return */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import * as anchor from "@project-serum/anchor";
import * as quarry from "@quarryprotocol/quarry-sdk";
import { SolanaProvider, TransactionEnvelope } from "@saberhq/solana-contrib";
import * as st from "@saberhq/token-utils";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Farm } from "../services/domain/farm";
import { TokadaptState } from "../services/domain/tokadaptState";
import * as tokadaptIDL from "../solana/tokadapt.json";
import { findAssociatedTokenAddress } from "../utils/web3/find-associated-token-address";
import { useWallet } from "hooks/useWallet";

import { defaultAnchorProvider, useAnchorProvider } from "./AnchorContext";
import { useChain } from "./ConnectionProvider";
import { useMarinadeState } from "./MarinadeContext";

export interface QuarryProviderProps {
  sdk?: quarry.QuarrySDK;
  mndeRewarder?: quarry.RewarderWrapper;
  sbrRewarder?: quarry.RewarderWrapper;
  mndeTokadapt?: anchor.Program;
  mndeTokadaptState?: TokadaptState;
  farms: Record<string, Farm>;
}

const MNDE_REWARDER = new PublicKey(
  "J829VB5Fi7DMoMLK7bsVGFM82cRU61BKtiPz9PNFdL7b"
);
const SBR_REWARDER = new PublicKey(
  "rXhAofQCT7NN9TUqigyEAUzV1uLL4boeD8CRkNBSkYk"
);
const SBR_MSOL_SOL_LP = new PublicKey(
  "SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz"
);
const TOKADAPT_PROGRAM_ID = new PublicKey(
  "tokdh9ZbWPxkFzqsKqeAwLDk6J6a8NBZtQanVuuENxa"
);
const TOKADAPT_STATE_ID = new PublicKey(
  "taspunvVUXLG82PrsCCtQeknWrGHNHWcZmVQYNcQBDg"
);
const MNDE_MINT = new PublicKey("MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey");

function loadFarm({
  connected,
  rewarder,
  tokadapt,
  tokadaptState,
  stakeToken,
  setFarm,
}: {
  connected: boolean;
  rewarder?: quarry.RewarderWrapper;
  tokadapt?: anchor.Program;
  tokadaptState?: TokadaptState;
  stakeToken?: PublicKey;
  setFarm: (farm?: Farm) => void;
}) {
  if (rewarder && stakeToken) {
    (async () => {
      const token = st.Token.fromMint(stakeToken, 9, {
        // TODO: chainId:
      });
      const quarry = await rewarder.getQuarry(token);
      let miner: quarry.MinerWrapper | undefined;
      let minerData;
      if (connected) {
        miner = await quarry.getMinerActions();
        try {
          minerData = await miner.fetchData();
        } catch (e) {
          // Do noting here because it is hard to differentiate absense of miner from error
        }
      }

      const stake = async (uiAmount: string) => {
        let tx = new TransactionEnvelope(rewarder.sdk.provider, []);
        if (miner && !(await quarry.provider.getAccountInfo(miner.minerKey))) {
          const { miner: minerKey, tx: createMinerTx } =
            await quarry.createMiner({});
          tx = createMinerTx;
        }

        if (miner) {
          tx = tx.combine(miner.stake(st.TokenAmount.parse(token, uiAmount)));
        }

        const { signature } = await tx.confirm();
        // reload minerdata
        loadFarm({
          connected,
          rewarder,
          tokadapt,
          tokadaptState,
          stakeToken,
          setFarm,
        });
        return signature;
      };

      const withdraw = async (uiAmount: string) => {
        let tx = new TransactionEnvelope(rewarder.sdk.provider, []);

        if (miner && !(await quarry.provider.getAccountInfo(miner.minerKey))) {
          const { miner: minerKey, tx: createMinerTx } =
            await quarry.createMiner({});
          tx = createMinerTx;
        }

        if (
          miner &&
          !(await quarry.provider.getAccountInfo(miner?.stakedTokenATA))
        ) {
          const { instruction: createAtaInstruction } = await st.getOrCreateATA(
            {
              provider: rewarder.sdk.provider,
              mint: miner?.quarry.quarryData.tokenMintKey,
              owner: rewarder.sdk.provider.wallet.publicKey,
              payer: rewarder.sdk.provider.wallet.publicKey,
            }
          );
          if (createAtaInstruction) {
            tx.instructions.push(createAtaInstruction);
          }
        }

        if (miner) {
          tx = tx.combine(
            miner.withdraw(st.TokenAmount.parse(token, uiAmount))
          );
        }

        const { signature } = await tx.confirm();
        // reload minerdata
        loadFarm({
          connected,
          rewarder,
          tokadapt,
          tokadaptState,
          stakeToken,
          setFarm,
        });
        return signature;
      };

      const claim = async () => {
        if (miner && !(await quarry.provider.getAccountInfo(miner.minerKey))) {
          throw Error("Claim record was not found");
        }
        const tx = await miner?.claim();
        if (tokadapt && tx) {
          if (!tokadaptState) {
            throw new Error("Token adapter was not loaded. Try again later");
          }
          const { address: mndeAccount, instruction: createAtaInstruction } =
            await st.getOrCreateATA({
              provider: rewarder.sdk.provider,
              mint: MNDE_MINT,
              owner: rewarder.sdk.provider.wallet.publicKey,
              payer: rewarder.sdk.provider.wallet.publicKey,
            });
          if (createAtaInstruction) {
            tx.instructions.push(createAtaInstruction);
          }
          const pointAccount = await findAssociatedTokenAddress(
            rewarder.sdk.provider.wallet.publicKey,
            quarry.rewarderData.rewardsTokenMint
          );
          tx.instructions.push(
            tokadapt.instruction.swap(new anchor.BN("18446744073709551615"), {
              accounts: {
                state: TOKADAPT_STATE_ID,
                input: pointAccount,
                inputAuthority: rewarder.sdk.provider.wallet.publicKey,
                inputMint: quarry.rewarderData.rewardsTokenMint,
                outputStorage: tokadaptState.outputStorage,
                outputStorageAuthority: (
                  await PublicKey.findProgramAddress(
                    [
                      new TextEncoder().encode("storage"),
                      TOKADAPT_STATE_ID.toBytes(),
                    ],
                    TOKADAPT_PROGRAM_ID
                  )
                )[0],
                target: mndeAccount,
                tokenProgram: TOKEN_PROGRAM_ID,
              },
            })
          );
          tx.instructions.push(
            Token.createCloseAccountInstruction(
              TOKEN_PROGRAM_ID,
              pointAccount,
              rewarder.sdk.provider.wallet.publicKey,
              rewarder.sdk.provider.wallet.publicKey,
              []
            )
          );
        }

        if (tx) {
          const { signature } = await tx.confirm();
          // reload minerdata
          loadFarm({
            connected,
            rewarder,
            tokadapt,
            tokadaptState,
            stakeToken,
            setFarm,
          });
          return signature;
        }
        return "";
      };

      setFarm({
        token,
        quarry,
        miner,
        minerData,
        stake,
        withdraw,
        claim,
      });
    })();
  } else {
    setFarm();
  }
}

const QuarryContext = createContext<QuarryProviderProps>({
  farms: {},
});

export const QuarryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const anchorProvider = useAnchorProvider();
  const marinade = useMarinadeState();
  const { connected } = useWallet();
  const { name: chainName } = useChain();

  const sdk = useMemo(
    () =>
      quarry.QuarrySDK.load({
        provider: SolanaProvider.load({
          connection: anchorProvider.connection,
          sendConnection: anchorProvider.connection,
          wallet: anchorProvider.wallet,
          opts: anchorProvider.opts,
        }),
      }),
    [anchorProvider]
  );

  const [mndeRewarder, setMndeRewarder] = useState<
    quarry.RewarderWrapper | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const mndeRewarder = await sdk.mine.loadRewarderWrapper(MNDE_REWARDER);
      setMndeRewarder(mndeRewarder);
    })();
  }, [sdk]);

  const [sbrRewarder, setSbrRewarder] = useState<
    quarry.RewarderWrapper | undefined
  >(undefined);

  useEffect(() => {
    if (chainName === "mainnet-beta") {
      (async () => {
        const sbrRewarder = await sdk.mine.loadRewarderWrapper(SBR_REWARDER);
        setSbrRewarder(sbrRewarder);
      })();
    } else {
      setSbrRewarder(undefined);
    }
  }, [chainName, sdk]);

  const mndeTokadapt = useMemo(
    () =>
      new anchor.Program(
        tokadaptIDL as anchor.Idl,
        TOKADAPT_PROGRAM_ID,
        defaultAnchorProvider()
      ),
    []
  ); // TODO change networks

  const [mndeTokadaptState, setMndeTokadaptState] = useState<
    TokadaptState | undefined
  >();
  useEffect(() => {
    (async () => {
      const mndeTokadaptState = await mndeTokadapt.account.state.fetch(
        TOKADAPT_STATE_ID
      );
      setMndeTokadaptState(mndeTokadaptState as TokadaptState);
    })();
  }, [mndeTokadapt]);

  const [mSOLFarm, setMSOLFarm] = useState<Farm | undefined>();
  useEffect(() => {
    loadFarm({
      connected,
      rewarder: mndeRewarder,
      tokadapt: mndeTokadapt,
      tokadaptState: mndeTokadaptState,
      stakeToken: marinade?.state?.st_sol_mint?.value,
      setFarm: setMSOLFarm,
    });
    const timeoutId = setInterval(() => {
      loadFarm({
        connected,
        rewarder: mndeRewarder,
        tokadapt: mndeTokadapt,
        tokadaptState: mndeTokadaptState,
        stakeToken: marinade?.state?.st_sol_mint?.value,
        setFarm: setMSOLFarm,
      });
    }, 20000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    connected,
    marinade?.state?.st_sol_mint?.value,
    mndeRewarder,
    mndeTokadapt,
    mndeTokadaptState,
    setMSOLFarm,
  ]);

  const [mLPFarm, setMLPFarm] = useState<Farm>();
  useEffect(() => {
    loadFarm({
      connected,
      rewarder: mndeRewarder,
      tokadapt: mndeTokadapt,
      tokadaptState: mndeTokadaptState,
      stakeToken: marinade?.state?.liq_pool?.lp_mint?.value,
      setFarm: setMLPFarm,
    });
    const timeoutId = setInterval(() => {
      loadFarm({
        connected,
        rewarder: mndeRewarder,
        tokadapt: mndeTokadapt,
        tokadaptState: mndeTokadaptState,
        stakeToken: marinade?.state?.liq_pool?.lp_mint?.value,
        setFarm: setMLPFarm,
      });
    }, 20000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    connected,
    marinade?.state?.liq_pool?.lp_mint?.value,
    mndeRewarder,
    mndeTokadapt,
    mndeTokadaptState,
    setMLPFarm,
  ]);

  const [sbrMSOLSOLFarm, setSbrMSOLSOLFarm] = useState<Farm | undefined>();
  useEffect(() => {
    if (chainName === "mainnet-beta") {
      loadFarm({
        connected,
        rewarder: sbrRewarder,
        stakeToken: SBR_MSOL_SOL_LP,
        setFarm: setSbrMSOLSOLFarm,
      });
      const timeoutId = setInterval(() => {
        loadFarm({
          connected,
          rewarder: sbrRewarder,
          stakeToken: SBR_MSOL_SOL_LP,
          setFarm: setSbrMSOLSOLFarm,
        });
      }, 20000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    setSbrMSOLSOLFarm(undefined);
  }, [chainName, connected, sbrRewarder, setSbrMSOLSOLFarm]);

  const farms = {};
  if (mSOLFarm) Object.assign(farms, { mSOL: mSOLFarm });
  if (mLPFarm) Object.assign(farms, { mLP: mLPFarm });
  if (sbrMSOLSOLFarm) Object.assign(farms, { sbrMSOLSOL: sbrMSOLSOLFarm });

  return (
    <QuarryContext.Provider
      value={{
        sdk,
        mndeRewarder,
        sbrRewarder,
        farms,
        mndeTokadapt,
        mndeTokadaptState,
      }}
    >
      {children}
    </QuarryContext.Provider>
  );
};

export function useQuarryProvider(): QuarryProviderProps {
  return useContext(QuarryContext);
}

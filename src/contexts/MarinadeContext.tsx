/* eslint-disable no-plusplus */
/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as anchor from "@project-serum/anchor";
import { Address, BN } from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  AccountInfo,
  Keypair,
  PublicKey,
  StakeProgram,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { deserializeUnchecked } from "borsh";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { useWallet } from "../hooks/useWallet";
import { StakeAccount } from "../solana/domain/stake-account";
import * as marinade from "../solana/marinade-anchor/marinade-finance-schema";
import * as MarinadeProgramJSON from "../solana/marinade-anchor/marinade_finance.json";
import { findAssociatedTokenAddress } from "../utils/web3/find-associated-token-address";

import { useAnchorProvider } from "./AnchorContext";
import { useConnection, useKeys } from "./ConnectionProvider";

// import JSON IDL (ts can import JSON files)

export interface MarinadeState {
  state: marinade.State;
  reservePDA: PublicKey;
  liqPoolSolAccountPDA: PublicKey;
  liqPoolStSolAuth: PublicKey;
  liqPoolStSolMintAuth: PublicKey;
  liqMintAuthority: PublicKey;
  liqSolLegAccountPDA: PublicKey;
  transactionFee: number;
}

export interface Marinade {
  marinadeState: null | MarinadeState;
  program: null | anchor.Program;
  userStSOLAccountAddress: null | PublicKey;
  userLiqSOLAccountAddress: null | PublicKey;

  runStake(amount: number): Promise<TransactionSignature>;

  runUnstake(amount: number): Promise<TransactionSignature>;

  runAddLiquidity(amount: number): Promise<TransactionSignature>;

  runRemoveLiquidity(amount: number): Promise<TransactionSignature>;

  runOrderUnstake(stSolAmount: number): Promise<TransactionSignature>;

  runClaim(ticket: PublicKey): Promise<TransactionSignature>;

  runDepositStakeAccount(
    stakeAccount: StakeAccount
  ): Promise<TransactionSignature>;
}

const RESERVE_PDA_SEED = "reserve";
const LIQ_POOL_SOL_ACCOUNT_SEED = "liq_sol";
const LIQ_POOL_ST_SOL_AUTH_SEED = "liq_st_sol_authority";
const LIQ_POOL_ST_SOL_MINT_AUTH_SEED = "st_mint";
const LIQ_POOL_MINT_AUTHORITY_SEED = "liq_mint";
const LIQ_POOL_SOL_LEG_PDA_SEED = "liq_sol";

const MarinadeContext = createContext<Marinade>({
  marinadeState: null,
  program: null,
  userStSOLAccountAddress: null,
  userLiqSOLAccountAddress: null,

  runStake(_amount: number) {
    throw Error("Not initialized");
  },
  runUnstake(_amount: number) {
    throw Error("Not initialized");
  },
  runAddLiquidity(_amount: number) {
    throw Error("Not initialized");
  },
  runRemoveLiquidity(_amount: number) {
    throw Error("Not initialized");
  },
  runOrderUnstake(_stSolAmount: number) {
    throw Error("Not initialized");
  },
  runClaim(_ticket: PublicKey) {
    throw Error("Not initialized");
  },
  runDepositStakeAccount(_stakeAccount: StakeAccount) {
    throw Error("Not initialized");
  },
});
type MarinadeProviderProps = { children: ReactNode };
export function MarinadeProvider({ children }: MarinadeProviderProps) {
  const [marinadeState, setMarinadeState] = useState<MarinadeState | null>(
    null
  );

  const connection = useConnection();
  const keys = useKeys();
  const {
    wallet,
    connected: walletConnected,
    publicKey: walletPubKey,
  } = useWallet();

  useEffect(() => {
    setMarinadeState(null);

    let process = true;
    const readState = async () => {
      let stateAccount: AccountInfo<Buffer> | null;
      while (process) {
        try {
          stateAccount = await connection.getAccountInfo(keys.marinadeStateId);
          if (!stateAccount) throw Error("stateAccount is null/undefined");
          break;
        } catch (e) {
          // console.log(e);
          await new Promise((r) => setTimeout(r, 20000)); // sleep
        }
      }

      const getPDA = async (
        seed: string,
        nonce: number
      ): Promise<PublicKey> => {
        const SEED_AS_BYTES = new TextEncoder().encode(seed);
        return PublicKey.createProgramAddress(
          [
            keys.marinadeStateId.toBytes(),
            SEED_AS_BYTES,
            new Uint8Array([nonce]),
          ],
          keys.marinadeProgramId
        );
      };

      if (process) {
        const state: marinade.State = deserializeUnchecked(
          marinade.MARINADE_BORSH_SCHEMA,
          marinade.State,
          stateAccount!.data.slice(8)
        );
        if (!state) {
          throw new Error("Can not parse state");
        }
        setMarinadeState({
          state,
          reservePDA: await getPDA(RESERVE_PDA_SEED, state.reserve_bump_seed),
          liqPoolSolAccountPDA: await getPDA(
            LIQ_POOL_SOL_ACCOUNT_SEED,
            state.liq_pool.sol_leg_bump_seed
          ),
          liqPoolStSolAuth: await getPDA(
            LIQ_POOL_ST_SOL_AUTH_SEED,
            state.liq_pool.st_sol_leg_authority_bump_seed
          ),
          liqPoolStSolMintAuth: await getPDA(
            LIQ_POOL_ST_SOL_MINT_AUTH_SEED,
            state.st_mint_authority_bump_seed
          ),
          liqMintAuthority: await getPDA(
            LIQ_POOL_MINT_AUTHORITY_SEED,
            state.liq_pool.lp_mint_authority_bump_seed
          ),
          liqSolLegAccountPDA: await getPDA(
            LIQ_POOL_SOL_LEG_PDA_SEED,
            state.liq_pool.sol_leg_bump_seed
          ),
          transactionFee: (await connection.getRecentBlockhash()).feeCalculator
            .lamportsPerSignature,
        });
      }
    };

    let updateHandler: any;
    readState().then(() => {
      if (process) {
        updateHandler = setInterval(readState, 60000);
      }
    });

    return () => {
      process = false;
      clearInterval(updateHandler);
    };
  }, [connection, keys]);

  const [userStSOLAccountAddress, setUserStSOLAccountAddressss] =
    useState<PublicKey | null>(null);

  const stSolMint = marinadeState
    ? marinadeState?.state.st_sol_mint.value
    : null;
  useEffect(() => {
    setUserStSOLAccountAddressss(null);
    if (walletConnected && stSolMint !== null) {
      let process = true;
      (async () => {
        const address = await findAssociatedTokenAddress(
          walletPubKey as PublicKey,
          stSolMint
        );
        if (process) {
          setUserStSOLAccountAddressss(address);
        }
      })();

      return () => {
        process = false;
      };
    }
  }, [walletConnected, walletPubKey?.toBase58(), stSolMint?.toBase58()]);

  const [userLiqSOLAccountAddress, setUserLiqSOLAccountAddress] =
    useState<PublicKey | null>(null);

  const liqSolMint = marinadeState
    ? marinadeState?.state.liq_pool.lp_mint.value
    : null;
  useEffect(() => {
    setUserLiqSOLAccountAddress(null);
    if (walletConnected && liqSolMint !== null) {
      let process = true;
      (async () => {
        const address = await findAssociatedTokenAddress(
          walletPubKey as PublicKey,
          liqSolMint
        );
        if (process) {
          setUserLiqSOLAccountAddress(address);
        }
      })();

      return () => {
        process = false;
      };
    }
  }, [walletConnected, walletPubKey?.toBase58(), liqSolMint?.toBase58()]);

  const anchorProvider = useAnchorProvider();
  const program = useMemo(
    () =>
      new anchor.Program(
        MarinadeProgramJSON as anchor.Idl,
        keys.marinadeProgramId,
        anchorProvider
      ),
    [anchorProvider]
  );

  // anchorProvider and walletPubKey must be set if program is set
  // const ready = marinadeState !== null && program !== null
  //  && userStSOLAccountAddress !== null && userLiqSOLAccountAddress !== null;

  // const runAdvancedStake = useCallback(
  //   async (amountLamports: number) =>{
  //     findStakeAccountsByOwner
  //   }
  // )

  const runStake = useCallback(
    async (amountLamports: number) => {
      const accountInfo = await connection.getAccountInfo(
        userStSOLAccountAddress!,
        "confirmed"
      );

      const tx = new Transaction();

      if (!accountInfo) {
        tx.add(
          await Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            marinadeState?.state.st_sol_mint.value as PublicKey,
            userStSOLAccountAddress as PublicKey,
            walletPubKey as PublicKey,
            walletPubKey as PublicKey
          )
        );
      }

      // Anchor will parse the accounts we pass as parameters and compose the tx
      tx.add(
        program?.instruction.deposit(new anchor.BN(amountLamports), {
          accounts: {
            state: keys.marinadeStateId,
            stSolMint: marinadeState?.state.st_sol_mint.value as Address,
            liqPoolSolLegPda: marinadeState?.liqPoolSolAccountPDA as Address,
            liqPoolStSolLeg: marinadeState?.state.liq_pool.st_sol_leg
              .value as Address,
            liqPoolStSolLegAuthority:
              marinadeState?.liqPoolStSolAuth as Address,
            reservePda: marinadeState?.reservePDA as Address,
            transferFrom: walletPubKey as Address,
            mintTo: userStSOLAccountAddress as Address,
            stSolMintAuthority: marinadeState?.liqPoolStSolMintAuth as Address,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        })
      );

      const transactionSignature = await anchorProvider.send(tx);

      // console.log("tx:", transactionSignature);

      return transactionSignature;
    },
    [
      marinadeState,
      anchorProvider,
      program,
      walletPubKey?.toBase58(),
      keys,
      userStSOLAccountAddress?.toBase58(),
    ]
  );

  const runUnstake = useCallback(
    async (amountStLamports: number) => {
      const tx = new Transaction();

      // Anchor will parse the accounts we pass as parameters and compose the tx
      tx.add(
        await program?.instruction.liquidUnstake(
          new anchor.BN(amountStLamports),
          {
            accounts: {
              state: keys.marinadeStateId,
              stSolMint: marinadeState?.state.st_sol_mint.value as Address,

              liqPoolSolLegPda: marinadeState?.liqPoolSolAccountPDA as Address,

              liqPoolStSolLeg: marinadeState?.state.liq_pool.st_sol_leg
                .value as Address,

              treasuryMsolAccount: marinadeState?.state.treasury_msol_account
                .value as Address,

              getStSolFrom: userStSOLAccountAddress as Address,
              getStSolFromAuthority: walletPubKey as Address,

              transferSolTo: walletPubKey as Address,

              systemProgram: anchor.web3.SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
            },
          }
        )
      );

      const transactionSignature = await anchorProvider.send(tx);

      // console.log("tx:", transactionSignature);

      return transactionSignature;
    },
    [
      marinadeState,
      anchorProvider,
      program,
      walletPubKey?.toBase58(),
      keys,
      userStSOLAccountAddress?.toBase58(),
    ]
  );

  const runAddLiquidity = useCallback(
    async (amountLamports: number) => {
      const tx = new Transaction();

      const accountInfo = await connection.getAccountInfo(
        userLiqSOLAccountAddress as PublicKey,
        "confirmed"
      );
      if (!accountInfo) {
        tx.add(
          await Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            marinadeState?.state.liq_pool.lp_mint.value as PublicKey,
            userLiqSOLAccountAddress as PublicKey,
            walletPubKey as PublicKey,
            walletPubKey as PublicKey
          )
        );
      }

      // Anchor will parse the accounts we pass as parameters and compose the tx
      tx.add(
        await program?.instruction.addLiquidity(new anchor.BN(amountLamports), {
          accounts: {
            state: keys.marinadeStateId,
            lpMint: marinadeState?.state.liq_pool.lp_mint.value as Address,
            lpMintAuthority: marinadeState?.liqMintAuthority as Address,

            liqPoolStSolLeg: marinadeState?.state.liq_pool.st_sol_leg
              .value as Address,
            liqPoolSolLegPda: marinadeState?.liqPoolSolAccountPDA as Address,

            transferFrom: walletPubKey as Address,

            mintTo: userLiqSOLAccountAddress as Address,

            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        })
      );

      const transactionSignature = await anchorProvider.send(tx);

      // console.log("tx:", transactionSignature);

      return transactionSignature;
    },
    [
      marinadeState,
      anchorProvider,
      program,
      walletPubKey?.toBase58(),
      keys,
      userLiqSOLAccountAddress?.toBase58(),
    ]
  );

  const runRemoveLiquidity = useCallback(
    async (amountLamports: number) => {
      const tx = new Transaction();

      // compute user's associated (default, canonical) token account
      const smartLpAccountInfo = await connection.getAccountInfo(
        userLiqSOLAccountAddress as PublicKey,
        "confirmed"
      );
      if (!smartLpAccountInfo) {
        throw Error("$SMART-LP associated token account not found");
      }

      const stSolAccountInfo = await connection.getAccountInfo(
        userStSOLAccountAddress as PublicKey,
        "confirmed"
      );
      if (!stSolAccountInfo) {
        tx.add(
          await Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            marinadeState?.state.st_sol_mint.value as PublicKey,
            userStSOLAccountAddress as PublicKey,
            walletPubKey as PublicKey,
            walletPubKey as PublicKey
          )
        );
      }

      // Anchor will parse the accounts we pass as parameters and compose the tx
      tx.add(
        await program?.instruction.removeLiquidity(
          new anchor.BN(amountLamports),
          {
            accounts: {
              state: keys.marinadeStateId,
              lpMint: marinadeState?.state.liq_pool.lp_mint.value as Address,

              burnFrom: userLiqSOLAccountAddress as Address,
              burnFromAuthority: walletPubKey as Address,

              transferSolTo: walletPubKey as Address,
              transferStSolTo: userStSOLAccountAddress as Address,

              liqPoolSolLegPda: marinadeState?.liqPoolSolAccountPDA as Address,
              liqPoolStSolLeg: marinadeState?.state.liq_pool.st_sol_leg
                .value as Address,
              liqPoolStSolLegAuthority:
                marinadeState?.liqPoolStSolAuth as Address,

              systemProgram: anchor.web3.SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
            },
          }
        )
      );

      const transactionSignature = await anchorProvider.send(tx);

      // console.log("tx:", transactionSignature);

      return transactionSignature;
    },
    [
      marinadeState,
      anchorProvider,
      program,
      walletPubKey?.toBase58(),
      keys,
      userLiqSOLAccountAddress?.toBase58(),
    ]
  );

  const runOrderUnstake = useCallback(
    async (stSolAmountLamports: number) => {
      const tx = new Transaction();
      // new random keypair
      const newTicketAccount = new Keypair();
      const ticketAccountSize = 8 + 32 + 32 + 8 + 8;

      tx.add(
        SystemProgram.createAccount({
          fromPubkey: walletPubKey as PublicKey,
          newAccountPubkey: newTicketAccount.publicKey,
          lamports: await connection.getMinimumBalanceForRentExemption(
            ticketAccountSize
          ),
          space: ticketAccountSize,
          programId: keys.marinadeProgramId,
        })
      );

      tx.add(
        await program?.instruction.orderUnstake(
          new anchor.BN(stSolAmountLamports),
          {
            accounts: {
              state: keys.marinadeStateId,
              stSolMint: marinadeState?.state.st_sol_mint.value as Address,

              burnStSolFrom: userStSOLAccountAddress as Address,
              burnStSolAuthority: walletPubKey as Address,

              newTicketAccount: newTicketAccount.publicKey,

              clock: SYSVAR_CLOCK_PUBKEY,
              rent: SYSVAR_RENT_PUBKEY,
              tokenProgram: TOKEN_PROGRAM_ID,
            },
          }
        )
      );
      const transactionSignature = await anchorProvider.send(tx, [
        newTicketAccount,
      ]);

      // console.log("tx:", transactionSignature);

      return transactionSignature;
    },
    [
      marinadeState,
      anchorProvider,
      program,
      walletPubKey?.toBase58(),
      keys,
      userStSOLAccountAddress?.toBase58(),
    ]
  );

  const runClaim = useCallback(
    async (ticket: PublicKey) => {
      const tx = new Transaction();
      tx.add(
        await program?.instruction.claim({
          accounts: {
            state: keys.marinadeStateId,
            reservePda: marinadeState?.reservePDA as Address,

            ticketAccount: ticket,
            transferSolTo: walletPubKey as Address,

            clock: SYSVAR_CLOCK_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
          },
        })
      );

      const transactionSignature = await anchorProvider.send(tx);

      // console.log("tx:", transactionSignature);

      return transactionSignature;
    },
    [
      marinadeState,
      anchorProvider,
      program,
      walletPubKey?.toBase58(),
      keys,
      userStSOLAccountAddress?.toBase58(),
    ]
  );

  const runDepositStakeAccount = useCallback(
    async (stakeAccount: StakeAccount) => {
      const stSolAccountInfo = await connection.getAccountInfo(
        userStSOLAccountAddress!,
        "confirmed"
      );

      const validatorListInfo = await connection.getAccountInfo(
        marinadeState?.state.validator_system.validator_list.account
          .value as PublicKey,
        "confirmed"
      );
      const validatorRecordSize =
        marinadeState?.state.validator_system.validator_list.item_size;
      const stakeValidator = new PublicKey(
        stakeAccount.account.data.parsed.info.stake.delegation.voter
      );

      let validatorIndex =
        marinadeState?.state.validator_system.validator_list.count;
      const validatorCount =
        marinadeState?.state.validator_system.validator_list.count;
      if (validatorCount) {
        for (let i = 0; i < validatorCount; i++) {
          const validator: marinade.ValidatorRecord | undefined =
            validatorRecordSize
              ? deserializeUnchecked(
                  marinade.MARINADE_BORSH_SCHEMA,
                  marinade.ValidatorRecord,
                  validatorListInfo!.data.slice(
                    8 + i * validatorRecordSize,
                    8 + (i + 1) * validatorRecordSize
                  )
                )
              : undefined;
          if (validator?.validator_account.value.equals(stakeValidator)) {
            validatorIndex = i;
            break;
          }
        }
      }

      const tx = new Transaction();

      if (!stSolAccountInfo) {
        tx.add(
          await Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            marinadeState?.state.st_sol_mint.value as PublicKey,
            userStSOLAccountAddress as PublicKey,
            walletPubKey as PublicKey,
            walletPubKey as PublicKey
          )
        );
      }

      const extraLamports = new BN(stakeAccount.account.lamports).sub(
        new BN(
          stakeAccount.account?.data?.parsed?.info?.stake?.delegation?.stake
        ).add(
          new BN(
            stakeAccount.account?.data?.parsed?.info.meta.rentExemptReserve
          )
        )
      );

      if (!extraLamports.isZero() && walletPubKey !== null) {
        const withdrawTx = StakeProgram.withdraw({
          authorizedPubkey: walletPubKey,
          lamports: extraLamports.toNumber(),
          stakePubkey: stakeAccount.pubkey,
          toPubkey: walletPubKey,
        });

        tx.add(withdrawTx);
      }

      const duplicationFlagSeeds = new TextEncoder().encode("unique_validator");

      // Anchor will parse the accounts we pass as parameters and compose the tx
      tx.add(
        await program?.instruction.depositStakeAccount(validatorIndex, {
          accounts: {
            state: keys.marinadeStateId,
            validatorList: marinadeState?.state.validator_system.validator_list
              .account.value as Address,
            stakeList: marinadeState?.state.stake_system.stake_list.account
              .value as Address,
            stakeAccount: new PublicKey(stakeAccount.pubkey),
            stakeAuthority: new PublicKey(
              stakeAccount.account.data.parsed.info.meta.authorized.withdrawer
            ),
            duplicationFlag: (
              await PublicKey.findProgramAddress(
                [
                  keys.marinadeStateId.toBytes(),
                  duplicationFlagSeeds,
                  stakeValidator.toBytes(),
                ],
                keys.marinadeProgramId
              )
            )[0],
            rentPayer: walletPubKey as Address,
            stSolMint: marinadeState?.state.st_sol_mint.value as Address,
            mintTo: userStSOLAccountAddress as Address,
            stSolMintAuthority: marinadeState?.liqPoolStSolMintAuth as Address,
            clock: SYSVAR_CLOCK_PUBKEY,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            stakeProgram: anchor.web3.StakeProgram.programId,
          },
        })
      );

      const transactionSignature = await anchorProvider.send(tx);

      // console.log("tx:", transactionSignature);

      return transactionSignature;
    },
    [
      marinadeState,
      anchorProvider,
      program,
      walletPubKey?.toBase58(),
      keys,
      userStSOLAccountAddress?.toBase58(),
    ]
  );

  return (
    <MarinadeContext.Provider
      value={{
        marinadeState,
        program,
        userStSOLAccountAddress,
        userLiqSOLAccountAddress,
        runStake,
        runUnstake,
        runAddLiquidity,
        runRemoveLiquidity,
        runOrderUnstake,
        runClaim,
        runDepositStakeAccount,
      }}
    >
      {children}
    </MarinadeContext.Provider>
  );
}

export function useMarinade(): Marinade {
  return useContext(MarinadeContext);
}

export function useMarinadeState(): null | MarinadeState {
  return useMarinade().marinadeState;
}

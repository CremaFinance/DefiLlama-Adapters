/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useToast } from "@chakra-ui/react";
import {
  EscrowWrapper,
  SimpleNftKindWrapper,
} from "@marinade.finance/escrow-relocker-sdk";
import {
  GaugemeisterWrapper,
  GaugeVoterWrapper,
  GaugeVoteWrapper,
} from "@marinade.finance/escrow-relocker-sdk/gauges";
import { tokenAccountMint } from "@marinade.finance/escrow-relocker-sdk/utils";
import { TransactionEnvelope } from "@saberhq/solana-contrib";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import axios from "axios";
import axiosRetry from "axios-retry";
import BN from "bn.js";
import { createContext } from "react";
import type { ReactNode } from "react";
import { useQueryClient } from "react-query";

import { useEscrow } from "hooks/useEscrow";
import type { NFTType } from "services/domain/nftType";
import { checkNativeSOLBalance } from "utils/check-native-sol-balance";

import { useMarinade } from "./MarinadeContext";
import { useUserBalance } from "./UserBalanceContext";

export type Action =
  | {
      type: "NFTS";
      payload: NFTType[];
    }
  | {
      type: "FETCH_NFTS";
      payload: boolean;
    }
  | {
      type: "LOCKED_MNDE";
      payload: number;
    };

export enum ActionTypes {
  NFTS = "NFTS",
  FETCH_NFTS = "FETCH_NFTS",
  LOCKED_MNDE = "LOCKED_MNDE",
}

const GovernanceContext = createContext({
  startUnlocking: async (_nftMint: PublicKey): Promise<boolean> => {
    return true;
  },
  claimMNDE: async (_nftMint: PublicKey): Promise<boolean> => {
    return true;
  },
  cancelUnlocking: async (_nftMint: PublicKey): Promise<boolean> => {
    return true;
  },
  lockMNDE: async (_amount: string, _kind: string): Promise<string> => {
    return "";
  },
  addMore: async (_amount: string, _nftToken?: PublicKey): Promise<string> => {
    return "";
  },
});

function GovernanceContextProvider(props: {
  children: ReactNode;
}): JSX.Element {
  const toast = useToast();
  const marinade = useMarinade();
  const { nativeSOLBalance } = useUserBalance();
  const queryClient = useQueryClient();

  const sdk = useEscrow();

  async function lockMNDE(amount: string, kind: string): Promise<string> {
    const fundsNeeded = marinade.marinadeState?.transactionFee;
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded ?? 0
    );
    if (checkBalanceErrors) {
      toast(checkBalanceErrors);
      return "";
    }
    const nftKind = new PublicKey(kind);
    const nftKindWrapper = new SimpleNftKindWrapper(sdk, nftKind);

    const payFrom = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      await nftKindWrapper.govMint(),
      sdk.provider.wallet.publicKey
    );
    const { tx, wrapper: escrowWrapper } = await EscrowWrapper.init({
      nftMint: new Keypair(),
      nftKind: nftKindWrapper,
      govAmount: new BN(Number(amount) * LAMPORTS_PER_SOL),
      payFrom,
      payFromAuthority: undefined,
      rentPayer: undefined,
    });
    let response = "";
    await tx.confirm().then(async (txId) => {
      await queryClient.invalidateQueries("nfts").then((res) => {
        response = txId.signature;
      });
    });
    return response;
  }

  async function addMore(amount: string, nftMint?: PublicKey): Promise<string> {
    let response = "H";
    if (nftMint) {
      const escrow = await EscrowWrapper.address(sdk, nftMint);
      const escrowWrapper = new EscrowWrapper(sdk, escrow);
      const payFrom = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        (
          await (await escrowWrapper.realm()).data()
        ).govMint,
        sdk.provider.wallet.publicKey
      );

      const tx = await escrowWrapper.addMore({
        amount: new BN(Number(amount) * LAMPORTS_PER_SOL),
        payFrom,
      });
      await tx.confirm().then(async (txId) => {
        await queryClient.invalidateQueries("nfts").then((res) => {
          response = txId.signature;
        });
      });
    }
    return response;
  }

  async function closeGaugeVoter(nftMint: PublicKey, gaugemeister: PublicKey) {
    const escrow = await EscrowWrapper.address(sdk, nftMint);
    const escrowWrapper = new EscrowWrapper(sdk, escrow);
    const escrowData = await escrowWrapper.data();

    const nftToken = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      escrowData.nftMint,
      sdk.provider.wallet.publicKey,
      true
    );

    const gaugeVoterWrapper = await GaugeVoterWrapper.new(
      new GaugemeisterWrapper(sdk, gaugemeister),
      escrowWrapper
    );

    let tx = new TransactionEnvelope(sdk.provider, []);
    if (!(await gaugeVoterWrapper.data()).voteCount.isZero()) {
      const gauges = await gaugeVoterWrapper.gaugemeister.loadGauges();
      for (const gauge of gauges) {
        const gaugeVoteWrapper = await GaugeVoteWrapper.new(
          gaugeVoterWrapper,
          gauge
        );
        const gaugeVoteData = await gaugeVoteWrapper.tryData();
        if (gaugeVoteData) {
          tx = tx.combine(
            await gaugeVoteWrapper.close({
              nftToken,
              resetWeight: !gaugeVoteData.weight.isZero(),
            })
          );
          if (tx.instructions.length >= 10) {
            const result = await tx.confirm();
            tx = new TransactionEnvelope(sdk.provider, []);
          }
        }
      }
    }

    tx = tx.combine(
      await gaugeVoterWrapper.close({
        nftToken,
      })
    );
    const result = await tx.confirm();
  }

  async function startUnlocking(nftMint: PublicKey): Promise<boolean> {
    const escrow = await EscrowWrapper.address(sdk, nftMint);

    const escrowWrapper = new EscrowWrapper(sdk, escrow);
    const escrowData = await escrowWrapper.data();

    const nftToken = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      escrowData.nftMint,
      sdk.provider.wallet.publicKey,
      true
    );

    for (const gaugeVoterWrapper of await escrowWrapper.gaugeVoters()) {
      await closeGaugeVoter(nftMint, gaugeVoterWrapper.gaugemeister.address);
    }
    const tx = await escrowWrapper.startUnlocking({
      nftToken,
    });
    let response = false;
    await tx.confirm().then(async () => {
      await queryClient.invalidateQueries("nfts").then(() => {
        response = true;
      });
    });
    return response;
  }

  async function claimMNDE(nftMint: PublicKey): Promise<boolean> {
    const escrow = await EscrowWrapper.address(sdk, nftMint);

    const escrowWrapper = new EscrowWrapper(sdk, escrow);
    const escrowData = await escrowWrapper.data();

    const nftToken = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      escrowData.nftMint,
      sdk.provider.wallet.publicKey,
      true
    );

    const tx = await escrowWrapper.exitEscrow({
      nftToken,
    });
    let response = false;
    await tx.confirm().then(async () => {
      await queryClient.invalidateQueries("nfts").then(() => {
        response = true;
      });
    });
    return response;
  }
  async function cancelUnlocking(nftMint: PublicKey) {
    const escrow = await EscrowWrapper.address(sdk, nftMint);

    const escrowWrapper = new EscrowWrapper(sdk, escrow);
    const escrowData = await escrowWrapper.data();

    const nftToken = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      escrowData.nftMint,
      sdk.provider.wallet.publicKey,
      true
    );

    const tx = await escrowWrapper.cancelUnlocking({
      nftToken,
    });
    let response = false;
    await tx.confirm().then(async () => {
      await queryClient.invalidateQueries("nfts");
      response = true;
    });
    return response;
  }

  return (
    <GovernanceContext.Provider
      value={{
        startUnlocking,
        claimMNDE,
        cancelUnlocking,
        lockMNDE,
        addMore,
      }}
      {...props}
    />
  );
}

export { GovernanceContext, GovernanceContextProvider };
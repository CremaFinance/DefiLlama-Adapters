/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useToast } from "@chakra-ui/react";
import {
  EscrowRelockerSDK,
  EscrowWrapper,
  SimpleNftKindWrapper,
} from "@marinade-finance/escrow-relocker-sdk";
import {
  GaugemeisterWrapper,
  GaugeVoterWrapper,
  GaugeVoteWrapper,
} from "@marinade-finance/escrow-relocker-sdk/gauges";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { SolanaProvider, TransactionEnvelope } from "@saberhq/solana-contrib";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import type { Connection } from "@solana/web3.js";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";
import BN from "bn.js";
import { createContext, useReducer } from "react";
import type { ReactNode } from "react";

import type {
  NftAccount,
  NftMetadata,
} from "components/app/LockMNDESection/types";
import type { NFTType } from "components/molecules/NFTTable";
import { checkNativeSOLBalance } from "utils/check-native-sol-balance";

import { useAnchorProvider } from "./AnchorContext";
import { useMarinade } from "./MarinadeContext";
import { useUserBalance } from "./UserBalanceContext";

interface State {
  nfts: NFTType[];
  fetchNftsLoading: boolean;
  lockedMnde: number;
}

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

const initialState: State = {
  nfts: [] as NFTType[],
  fetchNftsLoading: true,
  lockedMnde: 0,
};

export enum ActionTypes {
  NFTS = "NFTS",
  FETCH_NFTS = "FETCH_NFTS",
  LOCKED_MNDE = "LOCKED_MNDE",
}

const GovernanceContext = createContext({
  fetchNftsLoading: false,
  fetchNftsLoadingAction: (_boolean: boolean) => {},
  startUnlocking: (_nftMint: PublicKey) => {},
  claimMNDE: (_nftMint: PublicKey) => {},
  cancelUnlocking: (_nftMint: PublicKey) => {},
  lockMNDE: async (_amount: string): Promise<boolean> => {
    return true;
  },
  resetNftsAction: () => {},
  nfts: [] as NFTType[],
  getNftsAction: (_walletConnected: boolean, _isForced: boolean) => {},
  lockedMnde: 0,
});

function governanceContext(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.NFTS:
      return {
        ...state,
        nfts: action.payload,
      };
    case ActionTypes.FETCH_NFTS:
      return {
        ...state,
        fetchNftsLoading: action.payload,
      };
    case ActionTypes.LOCKED_MNDE:
      return {
        ...state,
        lockedMnde: action.payload,
      };
    default:
      return state;
  }
}

function GovernanceContextProvider(props: {
  children: ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(governanceContext, initialState);
  const NFT_KIND = "AxFYMzasysofqoWFhEcNJQ5caWWsWUdMTwto2cP33L5C";
  const NFT_CREATOR = "4eopmn89uciMvKzGYwkFBMXVpLCjnGda7uWo5uZqQCFF";
  const anchorProvider = useAnchorProvider();
  const toast = useToast();
  const marinade = useMarinade();
  const { nativeSOLBalance } = useUserBalance();

  const prov = SolanaProvider.init({
    connection: anchorProvider.connection,
    wallet: anchorProvider.wallet,
  });

  const sdk = new EscrowRelockerSDK(prov);

  function resetNftsAction() {
    dispatch({
      type: ActionTypes.NFTS,
      payload: [],
    });
    dispatch({
      type: ActionTypes.LOCKED_MNDE,
      payload: 0,
    });
  }

  async function fetchNftMetadataByAccount(
    account: NftAccount
  ): Promise<NftMetadata | undefined> {
    const response = await axios.get(account.data.uri);
    return response.data as NftMetadata;
  }

  async function getUsersVotingNftsByWallet(
    walletPublicKey: PublicKey,
    connection: Connection,
    creators: string[]
  ): Promise<NftAccount[]> {
    try {
      const unfilteredNftAccounts = await getParsedNftAccountsByOwner({
        publicAddress: walletPublicKey.toString(),
        connection,
      });

      return unfilteredNftAccounts.filter((acc) => {
        const nftCreators = acc.data.creators;
        const nftCreatorAddresses: string[] = nftCreators.map((c) => c.address);
        const containsCreators = creators.every((c) =>
          nftCreatorAddresses.includes(c)
        );
        if (containsCreators) {
          return creators.every(
            (c) =>
              nftCreators.find((nftCreator) => nftCreator.address === c)
                .verified === 1
          );
        }
        return false;
      });
    } catch {
      return [];
    }
  }

  const fetchNFTs = async () => {
    const tempNFTs: NFTType[] = [];
    let total = 0;
    const nfts = await getUsersVotingNftsByWallet(
      sdk.provider.wallet.publicKey,
      sdk.provider.connection,
      [NFT_CREATOR]
    );

    for (const nft of nfts) {
      const escrow = await EscrowWrapper.address(sdk, new PublicKey(nft.mint));
      const escrowWrap = new EscrowWrapper(sdk, escrow);
      const metadata = await fetchNftMetadataByAccount(nft);
      if (escrowWrap) {
        const escrowData = await escrowWrap.data();
        const amounts = escrowData.amount.toNumber() / LAMPORTS_PER_SOL;
        const nftItem = {
          address: new PublicKey(nft.mint),
          lockedMNDE: amounts,
          id: escrowData.index.toString(),
          thumbnailURL: metadata?.image,
          lockEndDate: (await escrowWrap.isLocked())
            ? undefined
            : new Date(escrowData.claimTime.toNumber() * 1000),
        } as NFTType;
        tempNFTs.push(nftItem);
        total += nftItem.lockedMNDE;
      }
    }
    state.nfts = tempNFTs;
    state.lockedMnde = total;
  };

  function fetchNftsLoadingAction(loading: boolean) {
    dispatch({
      type: ActionTypes.FETCH_NFTS,
      payload: loading,
    });
  }

  function getNftsAction(walletConnected: boolean, isForced: boolean) {
    if (walletConnected && isForced) {
      dispatch({
        type: ActionTypes.FETCH_NFTS,
        payload: true,
      });
      fetchNFTs().then(() => {
        dispatch({
          type: ActionTypes.NFTS,
          payload: state.nfts,
        });
        dispatch({
          type: ActionTypes.LOCKED_MNDE,
          payload: state.lockedMnde,
        });
      });
    }
  }

  // eslint-disable-next-line consistent-return
  async function lockMNDE(amount: string): Promise<boolean> {
    const fundsNeeded = marinade.marinadeState?.transactionFee;
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded ?? 0
    );
    if (checkBalanceErrors) {
      toast(checkBalanceErrors);
      return false;
    }

    const nftKind = new PublicKey(NFT_KIND);
    const nftKindWrapper = new SimpleNftKindWrapper(sdk, nftKind);
    const realm = await nftKindWrapper.realm();
    const escrowWrapper = await EscrowWrapper.fromRealm(realm);

    const payFrom = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      await nftKindWrapper.govMint(),
      sdk.provider.wallet.publicKey
    );
    const tx = await escrowWrapper.init({
      nftKind: nftKindWrapper,
      nftOwner: sdk.provider.wallet.publicKey,
      govAmount: new BN(Number(amount) * LAMPORTS_PER_SOL),
      payFrom,
      payFromAuthority: undefined,
      rentPayer: undefined,
    });
    await tx.confirm().then(() => {
      setTimeout(() => {
        getNftsAction(true, true);
      }, 1000);
    });
    return true;
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

  async function startUnlocking(nftMint: PublicKey) {
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
    await tx.confirm().then(() => {
      getNftsAction(true, true);
    });
  }

  async function claimMNDE(nftMint: PublicKey) {
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
      withdrawTo: await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        await escrowWrapper.govMint(),
        sdk.provider.wallet.publicKey
      ),
    });
    await tx.confirm().then(() => {
      getNftsAction(true, true);
    });
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
    await tx.confirm().then(() => {
      getNftsAction(true, true);
    });
  }

  return (
    <GovernanceContext.Provider
      value={{
        nfts: state.nfts,
        getNftsAction,
        startUnlocking,
        claimMNDE,
        cancelUnlocking,
        fetchNftsLoadingAction,
        lockMNDE,
        resetNftsAction,
        fetchNftsLoading: state.fetchNftsLoading,
        lockedMnde: state.lockedMnde,
      }}
      {...props}
    />
  );
}

export { GovernanceContext, GovernanceContextProvider };

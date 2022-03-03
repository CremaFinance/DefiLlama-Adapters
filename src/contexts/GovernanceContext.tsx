/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useToast } from "@chakra-ui/react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { SolanaProvider } from "@saberhq/solana-contrib";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import type { Connection } from "@solana/web3.js";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";
import BN from "bn.js";
import {
  EscrowRelockerSDK,
  EscrowWrapper,
  SimpleNftKindWrapper,
} from "escrow-relocker-sdk";
import { createContext, useReducer } from "react";
import type { ReactNode } from "react";

import type {
  NftAccount,
  NftMetadata,
} from "components/app/LockMNDESection/types";
import type { NFTType } from "components/molecules/NFTTable";
import { checkMNDEBalance } from "utils/check-mnde-balance";

import { useAnchorProvider } from "./AnchorContext";

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
  lockMNDE: async (_amount: string, _balance: string): Promise<boolean> => {
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
  async function lockMNDE(amount: string, balance: string): Promise<boolean> {
    const checkBalance = checkMNDEBalance(Number(balance), Number(amount));
    if (checkBalance) {
      toast(checkBalance);
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
      getNftsAction(true, true);
    });
    return true;
  }

  return (
    <GovernanceContext.Provider
      value={{
        nfts: state.nfts,
        getNftsAction,
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

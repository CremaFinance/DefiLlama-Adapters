import type { EscrowRelockerSDK } from "@marinade.finance/escrow-relocker-sdk";
import { EscrowWrapper } from "@marinade.finance/escrow-relocker-sdk";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import type { Connection } from "@solana/web3.js";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import axios from "axios";
import axiosRetry from "axios-retry";

import type {
  NftAccount,
  NftMetadata,
} from "components/app/LockMNDESection/types";
import type { NFTType } from "services/domain/nftType";

const NFT_CREATOR = "7yQGDJ6Ymcpy13zXZVvQA1gYxB6YnKeQEsGUGJTSptrM";

async function fetchNftMetadataByAccount(
  account: NftAccount
): Promise<NftMetadata | undefined> {
  axiosRetry(axios, {
    retries: 5,
    retryDelay: (retryCount) => {
      return retryCount * 2000;
    },
    retryCondition: (error) => {
      return error?.response?.status === 400;
    },
  });

  const response = await axios.get(account.data.uri);
  return response.data as NftMetadata;
}

const getUsersVotingNftsByWallet = async (
  walletPublicKey: PublicKey,
  connection: Connection,
  creators: string[]
): Promise<NftAccount[]> => {
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
};

export const fetchGovernanceData = async (sdk: EscrowRelockerSDK) => {
  const walletNfts = await getUsersVotingNftsByWallet(
    sdk.provider.wallet.publicKey,
    sdk.provider.connection,
    [NFT_CREATOR]
  );

  const nftTypePromises = walletNfts.map(async (nft) => {
    const escrow = await EscrowWrapper.address(sdk, new PublicKey(nft.mint));
    const escrowWrap = new EscrowWrapper(sdk, escrow);
    const metadata = await fetchNftMetadataByAccount(nft);

    if (escrowWrap) {
      const escrowData = await escrowWrap.data();
      const amounts = escrowData.amount.toNumber() / LAMPORTS_PER_SOL;
      return {
        address: new PublicKey(nft.mint),
        lockedMNDE: amounts,
        id: escrowData.index.toString(),
        dataUri: nft.data.uri,
        thumbnailURL: metadata?.image,
        lockEndDate: (await escrowWrap.isLocked())
          ? undefined
          : new Date(escrowData.claimTime.toNumber() * 1000),
      } as NFTType;
    }
    return null;
  });
  const nfts = (await Promise.all(nftTypePromises))
    .filter((nfttype) => nfttype !== null)
    .sort(
      (a, b) => parseFloat((b as NFTType).id) - parseFloat((a as NFTType).id)
    ) as NFTType[];

  const lockedMnde = nfts.reduce((acc, curr) => acc + curr.lockedMNDE, 0);
  return { nfts, lockedMnde };
};

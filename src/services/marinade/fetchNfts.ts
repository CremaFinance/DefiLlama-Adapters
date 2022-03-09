import type { EscrowRelockerSDK } from "@marinade-finance/escrow-relocker-sdk";
import { EscrowWrapper } from "@marinade-finance/escrow-relocker-sdk";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import type { Connection } from "@solana/web3.js";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import type {
  NftAccount,
  NftMetadata,
} from "components/app/LockMNDESection/types";
import type { NFTType } from "services/domain/nftType";

const NFT_CREATOR = "4eopmn89uciMvKzGYwkFBMXVpLCjnGda7uWo5uZqQCFF";

const fetchNftMetadataByAccount = async (
  account: NftAccount
): Promise<NftMetadata | undefined> => {
  const response = fetch(account.data.uri);
  return (await response).json();
};

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

export const fetchNFTs = async (sdk: EscrowRelockerSDK) => {
  const nfts = await getUsersVotingNftsByWallet(
    sdk.provider.wallet.publicKey,
    sdk.provider.connection,
    [NFT_CREATOR]
  );

  const nftTypePromises = nfts.map(async (nft) => {
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
  const parsedNfts = (await Promise.all(nftTypePromises)).filter(
    (nfttype) => nfttype !== null
  ) as NFTType[];

  const lockedMnde = parsedNfts.reduce((acc, curr) => acc + curr.lockedMNDE, 0);
  return { parsedNfts, lockedMnde };
};

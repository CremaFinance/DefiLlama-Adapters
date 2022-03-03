interface NftAccount {
  mint: string;
  updateAuthority: string;
  data: {
    creators: {
      address: string;
      verified: number;
    }[];
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
  };
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
  masterEdition?: string;
  edition?: string;
}

interface NftMetadata {
  name: string;
  symbol: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export type { NftAccount, NftMetadata };

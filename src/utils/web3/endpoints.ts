import { PublicKey } from "@solana/web3.js";

export type ENV = "mainnet-beta" | "testnet" | "devnet" | "localnet";

export const ENDPOINTS = [
  {
    name: "devnet" as ENV,
    endpoint: "https://api.devnet.solana.com/",
    airdropEndpoint: "https://api.devnet.solana.com/",
    maxAirdrop: 10,
    keys: {
      marinadeProgramId: new PublicKey(
        "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
      ),
      // Address of main state (instance)
      marinadeStateId: new PublicKey(
        "8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC"
      ),
    },
    slotTimeAvg1h: 378,
  },
  {
    name: "mainnet-beta" as ENV,
    // endpoint: 'https://solana-api.projectserum.com/',
    endpoint: "https://marinade.rpcpool.com/",
    airdropEndpoint: null,
    keys: {
      marinadeProgramId: new PublicKey(
        "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
      ),
      // Address of main state (instance)
      marinadeStateId: new PublicKey(
        "8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC"
      ),
    },
    slotTimeAvg1h: 521,
  },
  {
    name: "testnet" as ENV,
    endpoint: "https://api.testnet.solana.com",
    airdropEndpoint: "https://api.testnet.solana.com",
    maxAirdrop: 1,
    keys: {
      marinadeProgramId: new PublicKey(
        "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
      ),
      // Address of main state (instance)
      marinadeStateId: new PublicKey(
        "8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC"
      ),
    },
    slotTimeAvg1h: 536,
  },
  {
    name: "localnet" as ENV,
    endpoint: "http://127.0.0.1:8899",
    airdropEndpoint: "http://127.0.0.1:8899",
    keys: {
      marinadeProgramId: new PublicKey(
        "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
      ),
      // Address of main state (instance)
      marinadeStateId: new PublicKey(
        "8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC"
      ),
    },
    slotTimeAvg1h: 378,
  },
];

// TODO get from env var on build?
// TODO change to 1=mainnet for production
/// 0=devnet, 1=mainnet, 2=testnet
export const DEFAULT_ENDPOINT = ENDPOINTS[1];

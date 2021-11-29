import { PublicKey } from "@solana/web3.js";

export interface StakeAccount {
  isStakable?: boolean;
  account: {
    // Stake program address
    owner: PublicKey;
    // Staked + unstaked lamports
    lamports: number;
    // always false
    executable: boolean;
    data: {
      // Always "stake"
      program: string;
      space: number;
      parsed: {
        info: {
          // Initialized or delegated
          type: string;
          meta: {
            rentExemptReserve: number;
            // Authorities (real owners of the account)
            authorized: {
              staker: string;
              withdrawer: string;
            };
            lockup: {
              custodian: string;
              epoch: number;
              unixTimestamp: number;
            };
          };
          // null if account is only initialized
          stake: {
            // Profit
            creditsObserved: number;
            delegation: {
              activationEpoch: string;
              deactivationEpoch: string;
              // Always shows
              stake: string;
              voter: string;
              warmupCooldownRate: number;
            };
          };
        };
      };
    };
  };
  // Stake address
  pubkey: PublicKey;
}

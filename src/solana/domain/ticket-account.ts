import { PublicKey } from "@solana/web3.js";

import { TicketAccountData } from "../marinade-anchor/marinade-finance-schema";

export interface TicketAccount {
  ticketDueDateTime?: Date;
  ticketDue?: boolean;
  key: PublicKey;
  data: TicketAccountData;
}

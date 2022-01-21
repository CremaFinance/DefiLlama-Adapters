/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, PublicKey } from "@solana/web3.js";
import React, { createContext, ReactNode, useReducer } from "react";

import { Keys } from "../solana/domain/keys";
import { StakeAccount } from "../solana/domain/stake-account";
import { TicketAccount } from "../solana/domain/ticket-account";
import { getUserStakeAccounts } from "../solana/get-user-stake-accounts";
import { getUserTicketAccounts } from "../solana/get-user-ticket-accounts";

interface State {
  stakeAccounts: StakeAccount[];
  ticketAccounts: TicketAccount[];
  fetchStakesLoading: boolean;
  fetchTicketsLoading: boolean;
  walletPubKeyContext: PublicKey | any;
}

export type Action =
  | {
      type: "STAKE_ACCOUNTS";
      payload: StakeAccount[];
    }
  | {
      type: "TICKET_ACCOUNTS";
      payload: TicketAccount[];
    }
  | {
      type: "FETCH_STAKES_LOADING" | "FETCH_TICKETS_LOADING";
      payload: boolean;
    }
  | {
      type: "WALLET_PUBKEY";
      payload: PublicKey | any;
    };

const initialState: State = {
  stakeAccounts: [],
  ticketAccounts: [],
  fetchStakesLoading: true,
  fetchTicketsLoading: true,
  walletPubKeyContext: null,
};

export enum ActionTypes {
  TICKET_ACCOUNTS = "TICKET_ACCOUNTS",
  STAKE_ACCOUNTS = "STAKE_ACCOUNTS",
  FETCH_STAKES_LOADING = "FETCH_STAKES_LOADING",
  FETCH_TICKETS_LOADING = "FETCH_TICKETS_LOADING",
  WALLET_PUBKEY = "WALLET_PUBKEY",
}

const AccountsContext = createContext({
  fetchStakesLoading: false,
  fetchTicketsLoading: false,
  fetchTicketsLoadingAction: (_boolean: boolean) => {},
  fetchStakesLoadingAction: (_boolean: boolean) => {},
  resetAccountsAction: () => {},
  ticketAccounts: [] as TicketAccount[],
  walletPubKeyContext: {} as PublicKey,
  getTicketAccountsAction: (
    _keys: any,
    _walletConnected: boolean,
    _connection: Connection,
    _walletPubKey: PublicKey,
    _isForce: boolean
  ) => {},
  stakeAccounts: [] as StakeAccount[],
  getStakeAccountsAction: (
    _walletConnected: boolean,
    _connection: Connection,
    _walletPubKey: PublicKey,
    _isForce: boolean
  ) => {},
});

function accountsContext(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.STAKE_ACCOUNTS:
      return {
        ...state,
        stakeAccounts: action.payload,
      };
    case ActionTypes.TICKET_ACCOUNTS:
      return {
        ...state,
        ticketAccounts: action.payload,
      };
    case ActionTypes.WALLET_PUBKEY:
      return {
        ...state,
        walletPubKeyContext: action.payload,
      };
    case ActionTypes.FETCH_STAKES_LOADING:
      return {
        ...state,
        fetchStakesLoading: action.payload,
      };
    case ActionTypes.FETCH_TICKETS_LOADING:
      return {
        ...state,
        fetchTicketsLoading: action.payload,
      };
    default:
      return state;
  }
}

function AccountsContextProvider(props: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(accountsContext, initialState);

  function getStakeAccountsAction(
    walletConnected: boolean,
    connection: any,
    walletPubKey: PublicKey,
    isForce: boolean
  ) {
    if (walletConnected && isForce) {
      dispatch({
        type: ActionTypes.WALLET_PUBKEY,
        payload: walletPubKey,
      });
      dispatch({
        type: ActionTypes.FETCH_STAKES_LOADING,
        payload: true,
      });
      getUserStakeAccounts(connection, walletPubKey)
        .then((res: any) => {
          dispatch({
            type: ActionTypes.STAKE_ACCOUNTS,
            payload: res,
          });
        })
        .then(() => {
          dispatch({
            type: ActionTypes.FETCH_STAKES_LOADING,
            payload: false,
          });
        });
    }
  }

  function resetAccountsAction() {
    dispatch({
      type: ActionTypes.STAKE_ACCOUNTS,
      payload: [],
    });
    dispatch({
      type: ActionTypes.TICKET_ACCOUNTS,
      payload: [],
    });
    dispatch({
      type: ActionTypes.WALLET_PUBKEY,
      payload: undefined,
    });
  }

  function fetchTicketsLoadingAction(loading: boolean) {
    dispatch({
      type: ActionTypes.FETCH_TICKETS_LOADING,
      payload: loading,
    });
  }

  function fetchStakesLoadingAction(loading: boolean) {
    dispatch({
      type: ActionTypes.FETCH_STAKES_LOADING,
      payload: loading,
    });
  }

  function getTicketAccountsAction(
    keys: Keys,
    walletConnected: boolean,
    connection: any,
    walletPubKey: PublicKey,
    isForce: boolean
  ) {
    if (walletConnected && isForce) {
      dispatch({
        type: ActionTypes.WALLET_PUBKEY,
        payload: walletPubKey,
      });
      dispatch({
        type: ActionTypes.FETCH_TICKETS_LOADING,
        payload: true,
      });
      getUserTicketAccounts(keys, walletConnected, connection, walletPubKey)
        .then((res: any) => {
          dispatch({
            type: ActionTypes.TICKET_ACCOUNTS,
            payload: res,
          });
        })
        .then(() => {
          dispatch({
            type: ActionTypes.FETCH_TICKETS_LOADING,
            payload: false,
          });
        });
    }
  }

  return (
    <AccountsContext.Provider
      value={{
        stakeAccounts: state.stakeAccounts,
        getStakeAccountsAction,
        ticketAccounts: state.ticketAccounts,
        getTicketAccountsAction,
        fetchStakesLoading: state.fetchStakesLoading,
        fetchTicketsLoadingAction,
        fetchStakesLoadingAction,
        resetAccountsAction,
        fetchTicketsLoading: state.fetchTicketsLoading,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        walletPubKeyContext: state.walletPubKeyContext!, // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
      }}
      {...props}
    />
  );
}

export { AccountsContext, AccountsContextProvider };
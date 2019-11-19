import { createActionWithPayload, IAction, makeConstants } from "@mollycule/redux-operation";
import Transaction from "shared/models/Transaction";
import currencyData from "shared/currencyData";

const SET_WALLET_POCKET_AMOUNT = "SET_WALLET_POCKET_AMOUNT";
const ADD_TRANSACTION = "ADD_TRANSACTION";
export const TransactionConstants = makeConstants([SET_WALLET_POCKET_AMOUNT, ADD_TRANSACTION]);

export const setWalletPocketAmount = createActionWithPayload<symbol, { code: string; amount: number }>(
  TransactionConstants.get(SET_WALLET_POCKET_AMOUNT) as symbol
);

export const addTransaction = createActionWithPayload<symbol, Transaction>(
  TransactionConstants.get(ADD_TRANSACTION) as symbol
);

export const performExchange = createActionWithPayload<string, Transaction>("PERFORM_EXCHANGE");

export const constructWalletInitState = (walletValues: Array<{ code: string; amount: number }>) => {
  return walletValues.map(({ code, amount }) => ({
    code,
    amount,
    symbol: currencyData[code] && currencyData[code].symbol,
    name: currencyData[code] && currencyData[code].name
  }));
};

export const initialState = {
  wallet: constructWalletInitState([
    {
      code: "GBP",
      amount: 58.33
    },
    {
      code: "USD",
      amount: 25.51
    },
    {
      code: "INR",
      amount: 116.12
    }
  ]),
  transactions: [] as Transaction[]
};

const transactionReducer = (state = initialState, { type, payload }: IAction<symbol, any>) => {
  switch (type) {
    case TransactionConstants.get(SET_WALLET_POCKET_AMOUNT): {
      const newWalletArr = [...state.wallet];
      const { code, amount } = payload as { code: string; amount: number };
      const idx = newWalletArr.findIndex(wallet => wallet.code === code);
      if (idx) {
        newWalletArr[idx] = { ...newWalletArr[idx], amount };
        return { ...state, wallet: newWalletArr };
      }
      return state;
    }

    case TransactionConstants.get(ADD_TRANSACTION): {
      return { ...state, transactions: [...state.transactions, payload as Transaction] };
    }

    default:
      return state;
  }
};

export type TransactionsState = typeof initialState;

export default transactionReducer;

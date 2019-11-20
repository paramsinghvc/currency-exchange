import transactionReducer, {
  TransactionConstants,
  setWalletPocketAmount,
  addTransaction,
  performExchange,
  constructWalletInitState,
  initialState
} from "../transaction.redux";
import Transaction from "shared/models/Transaction";

const TData = { from: { code: "GBP", amount: 200 }, to: { code: "INR", amount: 200 }, timestamp: "30" };
const t = Transaction.create(TData);

describe("should test the redux assets well", () => {
  it("should test all the actions", () => {
    expect(addTransaction(t)).toEqual({
      type: TransactionConstants.get("ADD_TRANSACTION"),
      payload: t
    });

    expect(setWalletPocketAmount({ code: "GBP", amount: 12 })).toEqual({
      type: TransactionConstants.get("SET_WALLET_POCKET_AMOUNT"),
      payload: { code: "GBP", amount: 12 }
    });
  });

  it("should test the reducer well", () => {
    const initState = {
      ...initialState,
      currencyData: { payload: [], failure: false, pending: false, success: false, errors: null }
    };
    const newState = transactionReducer(initState, { type: Symbol("BLANK") });
    expect(newState).toEqual(initState);

    const newState1 = transactionReducer(initState, addTransaction(t));
    expect(newState1).toEqual({ ...initState, transactions: [t] });

    const newState2 = transactionReducer(initState, setWalletPocketAmount({ code: "INR", amount: 12 }));
    expect(newState2).toEqual({
      ...initState,
      wallet: [
        initState.wallet[0],
        initState.wallet[1],
        { code: "INR", amount: 12, name: "India Rupee", symbol: "&#8377;" }
      ]
    });
  });

  it("should test contruct init state", () => {
    expect(
      constructWalletInitState([
        {
          code: "GBP",
          amount: 58.33
        }
      ])
    ).toEqual([
      {
        code: "GBP",
        amount: 58.33,
        symbol: "&#163;",
        name: "United Kingdom Pound"
      }
    ]);
  });
});

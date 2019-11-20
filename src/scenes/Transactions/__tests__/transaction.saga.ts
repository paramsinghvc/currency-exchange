import { put, takeLatest, select } from "redux-saga/effects";

import Transaction from "shared/models/Transaction";
import { watchPerformExchange, performExchange } from "../transaction.saga";
import { addTransaction, setWalletPocketAmount } from "../transaction.redux";

const TData = { from: { code: "GBP", amount: 200 }, to: { code: "INR", amount: 200 }, timestamp: "30" };
const t = Transaction.create(TData);

describe("should test the transactions saga", () => {
  it("should test performExchange generator function", () => {
    const iter = performExchange({ type: "", payload: t });
    expect(iter.next().value).toEqual(put(addTransaction(t)));
  });
});

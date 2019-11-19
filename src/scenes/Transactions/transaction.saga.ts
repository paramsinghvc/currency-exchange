import { put, takeLatest, select } from "redux-saga/effects";

import { addTransaction, setWalletPocketAmount } from "./transaction.redux";
import { IAction } from "@mollycule/redux-operation";
import Transaction from "shared/models/Transaction";
import { IRootState } from "shared/types";

export function* performExchange({ payload }: IAction<string, Transaction>) {
  yield put(addTransaction(payload));
  const wallet: IRootState["transactions"]["wallet"] = yield select((state: IRootState) => state.transactions.wallet);
  const { from, to } = payload as Transaction;
  const fromPocket = wallet.find(pocket => pocket.code === from.currency.code);
  if (fromPocket) {
    const finalFromAmount = fromPocket.amount - from.amount;
    yield put(setWalletPocketAmount({ code: from.currency.code, amount: finalFromAmount }));
  }

  const toPocket = wallet.find(pocket => pocket.code === to.currency.code);
  if (toPocket) {
    const finalToAmount = toPocket.amount + to.amount;
    yield put(setWalletPocketAmount({ code: to.currency.code, amount: finalToAmount }));
  }
}

export function* watchPerformExchange() {
  yield takeLatest("PERFORM_EXCHANGE", performExchange);
}

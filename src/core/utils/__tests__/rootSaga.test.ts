import { configureSaga } from "../rootSaga";
import { fork, all } from "redux-saga/effects";
import { watchExchangeRateData } from "scenes/Home/home.saga";
import { watchPerformExchange } from "scenes/Transactions/transaction.saga";

it("should return a saga function", () => {
  const result = configureSaga();
  expect(result).toBeInstanceOf(Function);
  const iterator = result();
  expect(iterator).toBeDefined();
  expect(iterator.next().value).toEqual(all([fork(watchExchangeRateData), fork(watchPerformExchange)]));
});

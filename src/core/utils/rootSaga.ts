import { fork, all } from "redux-saga/effects";
import { watchExchangeRateData } from "scenes/Home/home.saga";
import { watchPerformExchange } from "scenes/Transactions/transaction.saga";

export const configureSaga = () =>
  function* sagas() {
    yield all([fork(watchExchangeRateData), fork(watchPerformExchange)]);
  };

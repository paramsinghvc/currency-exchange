import { fork, all } from "redux-saga/effects";
import { watchExchangeRateData } from "scenes/Home/home.saga";

export const configureSaga = () =>
  function* sagas() {
    yield all([fork(watchExchangeRateData)]);
  };

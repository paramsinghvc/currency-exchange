import { fork, all } from "redux-saga/effects";

export const configureSaga = () =>
  function* sagas() {
    yield all([]);
  };

import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import { configureSaga } from "./rootSaga";
import logger from "./loggerMiddleware";

export function getPreviousState() {
  const store = localStorage.getItem("store");
  if (store) {
    try {
      const parsedStore = JSON.parse(store);
      return parsedStore;
    } catch (e) {
      return undefined;
    }
  }
  return undefined;
}

export default (preloadedState = getPreviousState()) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [logger<any>(), sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, preloadedState, middlewareEnhancer);
  sagaMiddleware.run(configureSaga());
  window.onbeforeunload = function() {
    localStorage.setItem("store", JSON.stringify(store.getState()));
  };
  return store;
};

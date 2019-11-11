import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import { configureSaga } from "./rootSaga";

import logger from "./loggerMiddleware";

export default (preloadedState?: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [logger<any>(), sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, preloadedState, middlewareEnhancer);
  sagaMiddleware.run(configureSaga());
  return store;
};

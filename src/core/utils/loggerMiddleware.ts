/* eslint-disable no-console */
import { Middleware, MiddlewareAPI, Dispatch } from "redux";

const logger = <S>(): Middleware<{}, S, Dispatch> => {
  const loggerMiddleware: Middleware<{}, S, Dispatch> = ({ getState }: MiddlewareAPI<Dispatch, S>) => (
    next: Dispatch
  ) => action => {
    const previousState: S = getState();
    const result = next(action);
    const nextState: S = getState();
    if (!process.env.JEST_WORKER_ID) {
      console.groupCollapsed(`%c${action.type.toString()}`, "font-weight:bold;font-size:14;color:rgb(23, 162, 184)");
      console.log("%cPrevious state: ", "font-weight:bold", previousState);
      console.log("%cAction: ", "font-weight:bold", action);
      console.log("%cNext state: ", "font-weight:bold", nextState);
      console.groupEnd();
    }

    return result;
  };

  return loggerMiddleware;
};

export default logger;

import { combineReducers } from "redux";

import { IRootState } from "shared/types";
import homeReducer from "scenes/Home/home.redux";
import transactionReducer from "scenes/Transactions/transaction.redux";

const rootReducer = combineReducers<IRootState>({
  home: homeReducer,
  transactions: transactionReducer
});

export default rootReducer;

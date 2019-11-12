import { combineReducers } from "redux";

import { IRootState } from "shared/types";
import homeReducer from "scenes/Home/home.redux";

const rootReducer = combineReducers<IRootState>({
  home: homeReducer
});

export default rootReducer;

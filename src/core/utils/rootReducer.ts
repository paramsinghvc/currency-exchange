import { combineReducers } from "redux";

import { IRootState } from "shared/types";
// import { appReducer } from "core/App/app.redux";

const rootReducer = combineReducers<IRootState>({
  home: () => {}
});

export default rootReducer;

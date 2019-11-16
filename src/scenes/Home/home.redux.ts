import {
  createActionWithPayload,
  IAction,
  makeConstants,
  createReduxOperation,
  augmentReducer,
  IReduxOperations
} from "@mollycule/redux-operation";
import { Currency } from "shared/models/Currency";

const SET_CURRENCY_MODAL_STATUS = "SET_CURRENCY_MODAL_STATUS";
export const HomeConstants = makeConstants([SET_CURRENCY_MODAL_STATUS]);

const {
  actions: [fetchCurrencyDataRequest, fetchCurrencyDataSuccess, fetchCurrencyDataFailure],
  constants: fetchCurrencyDataConstants,
  reducer: fetchCurrencyDataReducer
} = createReduxOperation("FETCH_CURRENCY_DATA");

export const fetchExchangeRateSaga = createActionWithPayload("FETCH_EXCHANGE_RATE_DATA");

export const setCurrencyModalStatus = createActionWithPayload<symbol, boolean>(
  HomeConstants.get(SET_CURRENCY_MODAL_STATUS) as symbol
);

export const initialState = {
  currencyModalStatus: false
};

const homeReducer = (state = initialState, { type, payload }: IAction<symbol, string>) => {
  switch (type) {
    case HomeConstants.get(SET_CURRENCY_MODAL_STATUS):
      return { ...state, currencyModalStatus: payload };
    default:
      return state;
  }
};

export type HomeState = typeof initialState & { currencyData: IReduxOperations<Currency[]> };

export default augmentReducer<HomeState, IAction<symbol, any>>(homeReducer)({
  currencyData: fetchCurrencyDataReducer
});

export { fetchCurrencyDataRequest, fetchCurrencyDataSuccess, fetchCurrencyDataFailure, fetchCurrencyDataConstants };

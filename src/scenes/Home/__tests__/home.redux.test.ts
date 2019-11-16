import homeReducer, {
  fetchCurrencyDataRequest,
  fetchCurrencyDataSuccess,
  fetchCurrencyDataFailure,
  fetchCurrencyDataConstants,
  initialState,
  HomeConstants,
  fetchExchangeRateSaga,
  setCurrencyModalStatus
} from "../home.redux";

describe("should test the redux assets well", () => {
  it("should test all the actions", () => {
    expect(fetchCurrencyDataRequest()).toEqual({
      type: fetchCurrencyDataConstants.get("REQUEST")
    });

    expect(fetchCurrencyDataFailure("Error fetching the resource")).toEqual({
      type: fetchCurrencyDataConstants.get("FAILURE"),
      payload: "Error fetching the resource"
    });

    const payload = { foo: "bar" };
    expect(fetchCurrencyDataSuccess(payload)).toEqual({
      type: fetchCurrencyDataConstants.get("SUCCESS"),
      payload: payload
    });

    expect(fetchExchangeRateSaga()).toEqual({
      type: "FETCH_EXCHANGE_RATE_DATA"
    });

    expect(setCurrencyModalStatus(false)).toEqual({
      type: HomeConstants.get("SET_CURRENCY_MODAL_STATUS"),
      payload: false
    });
  });

  it("should test the reducer well", () => {
    const initState = {
      ...initialState,
      currencyData: { payload: [], failure: false, pending: false, success: false, errors: null }
    };
    const newState = homeReducer(initState, { type: Symbol("BLANK") });
    expect(newState).toEqual(initState);

    const newState1 = homeReducer(initState, setCurrencyModalStatus(true));
    expect(newState1).toEqual({ ...initState, currencyModalStatus: true });

    const newState2 = homeReducer(initState, fetchCurrencyDataRequest());
    expect(newState2).toEqual({ ...initState, currencyData: { ...initState.currencyData, pending: true } });

    const newState3 = homeReducer(initState, fetchCurrencyDataSuccess({ foo: "bar" }));
    expect(newState3).toEqual({
      ...initState,
      currencyData: { ...initState.currencyData, success: true, payload: { foo: "bar" } }
    });

    const newState4 = homeReducer(initState, fetchCurrencyDataFailure("Error"));
    expect(newState4).toEqual({
      ...initState,
      currencyData: { ...initState.currencyData, failure: true, errors: "Error" }
    });
  });
});

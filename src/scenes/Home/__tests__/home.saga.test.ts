import { fetchExchangeRateData } from "../home.saga";
import { put, call } from "redux-saga/effects";
import { fetchCurrencyDataRequest } from "../home.redux";

describe("should test the sagas well", () => {
  it("should test fetchExchangeRateData Saga", () => {
    const iterator = fetchExchangeRateData();
    expect(iterator.next().value).toEqual(put(fetchCurrencyDataRequest()));
    expect(iterator.next().value).toEqual(
      call(fetch, "https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml")
    );
  });
});

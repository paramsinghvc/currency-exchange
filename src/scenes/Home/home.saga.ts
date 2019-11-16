import { xml2js } from "xml-js";
import { put, delay, takeLatest, call } from "redux-saga/effects";

import safeGet from "shared/utils/safeGet";
import { Currency, XMLAttributeData } from "shared/models/Currency";
import { fetchCurrencyDataRequest, fetchCurrencyDataSuccess, fetchCurrencyDataFailure } from "./home.redux";

export function* fetchExchangeRateData() {
  try {
    yield put(fetchCurrencyDataRequest());
    const xmlResponse = yield call(
      fetch,
      "https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
    );
    const xmlText = yield xmlResponse.text();
    const jsData = xml2js(xmlText, {
      compact: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreComment: true,
      ignoreCdata: true,
      ignoreDoctype: true,
      ignoreText: true
    });
    const xmlAttributeData = safeGet<XMLAttributeData[]>(jsData, "gesmes:Envelope.Cube.Cube.Cube", []);
    const currencyData: Currency[] = Currency.createFromXMLData(xmlAttributeData);
    yield put(fetchCurrencyDataSuccess(currencyData));
  } catch (e) {
    yield put(fetchCurrencyDataFailure(e));
  }
}

export function* watchExchangeRateData() {
  yield takeLatest("FETCH_EXCHANGE_RATE_DATA", function* pollFetchExchangeRateApi() {
    while (true) {
      yield call(fetchExchangeRateData);
      yield delay(20000);
    }
  });
}

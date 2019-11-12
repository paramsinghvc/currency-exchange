import React, { FC, useState, useEffect, useCallback, ChangeEvent, FormEvent, useMemo } from "react";
import useRedux from "@mollycule/redux-hook";

import safeGet from "shared/utils/safeGet";
import CurrencyChooser from "./components/CurrencyChooser";
import theme from "shared/theme";
import CoinImg from "assets/Coin.svg";
import {
  Holder,
  ActiveExchangeRate,
  Exchanger,
  ExchangeSection,
  CurrencyDropdown,
  CurrencyAbbr,
  CurrencyText,
  StyledCurrencyInput,
  Separator,
  CoinIcon,
  ButtonSection,
  ExchangeButton
} from "./styles";
import { fetchExchangeRateSaga, setCurrencyModalStatus } from "./home.redux";
import { IRootState } from "shared/types";
import { IActionFactory, IReduxOperations } from "@mollycule/redux-operation";
import { Currency } from "shared/models/Currency";

const Home: FC = () => {
  const {
    currencyData,
    currencyModalStatus,
    setCurrencyModalStatus: setCurrencyModalStatusAction,
    fetchExchangeRateSaga: fetchExchangeRateSagaAction
  } = useRedux<
    IRootState,
    { currencyModalStatus: boolean; currencyData: IReduxOperations<Currency[]> },
    {
      setCurrencyModalStatus: IActionFactory<symbol, boolean>;
      fetchExchangeRateSaga: IActionFactory<string, unknown>;
    }
  >(
    state => ({
      currencyModalStatus: state.home.currencyModalStatus,
      currencyData: state.home.currencyData
    }),
    { setCurrencyModalStatus, fetchExchangeRateSaga }
  );

  useEffect(() => {
    fetchExchangeRateSagaAction();
  }, [fetchExchangeRateSagaAction]);

  const closeCurrencyChooser = useCallback(() => {
    setCurrencyModalStatusAction(false);
  }, [setCurrencyModalStatusAction]);

  const [currencyChooserData, setCurrencyChooserData] = useState(currencyData);
  const [selectedCurrencies, setSelectedCurrencies] = useState<Array<Currency>>([]);
  const [currencyAmounts, setCurrencyAmounts] = useState<Array<string>>(["15.34", "19.73"]);
  const [selectedSection, setSelectedSection] = useState(0);

  const findCurrencyWithCode = (currencies: Currency[], code: string) =>
    currencies.find((val: Currency) => val.code === code);

  useEffect(() => {
    if (currencyData.payload) {
      const firstDefaultCurrency = findCurrencyWithCode(currencyData.payload, "GBP");
      const secondDefaultCurrency = findCurrencyWithCode(currencyData.payload, "USD");
      if (firstDefaultCurrency && secondDefaultCurrency)
        setSelectedCurrencies([firstDefaultCurrency, secondDefaultCurrency]);
    }
  }, [currencyData]);

  const handleCurrencyClick = useCallback(
    (sectionIndex: number) => () => {
      setCurrencyChooserData({
        ...currencyData,
        payload: currencyData.payload.filter(datum => datum.code !== selectedCurrencies[sectionIndex].code)
      });
      setCurrencyModalStatusAction(true);
      setSelectedSection(sectionIndex);
    },
    [setCurrencyModalStatusAction, currencyData, selectedCurrencies]
  );

  const roundVal = (val: number) => Math.round(val * 100) / 100;

  type GetUpdatedAmountsOptions = {
    sectionIndex: number;
    sectionValue?: string;
    selectedCurrencies: Currency[];
  };

  const getUpdatedCurrencyAmounts = useCallback(
    ({ sectionIndex, sectionValue, selectedCurrencies }: GetUpdatedAmountsOptions) => {
      const result = [...currencyAmounts];
      const otherSectionIndex = sectionIndex ^ 1;
      if (sectionValue !== undefined) result[sectionIndex] = sectionValue;

      const otherCurrencyAmount =
        (+result[sectionIndex] / selectedCurrencies[sectionIndex].rate) * selectedCurrencies[otherSectionIndex].rate;

      result[otherSectionIndex] = "" + roundVal(otherCurrencyAmount);

      return result;
    },
    [currencyAmounts]
  );

  const updateCurrencyAmount = useCallback(
    (sectionIndex: number) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const result = getUpdatedCurrencyAmounts({ sectionIndex, sectionValue: e.target.value, selectedCurrencies });
      setCurrencyAmounts(result);
    },
    [setCurrencyAmounts, getUpdatedCurrencyAmounts, selectedCurrencies]
  );

  const activeExchangeRateString = useMemo(() => {
    const firstActiveCurrency = selectedCurrencies[0];
    const secondActiveCurrency = selectedCurrencies[1];
    if (firstActiveCurrency && secondActiveCurrency) {
      const convertedSecondVal = roundVal(secondActiveCurrency.rate / firstActiveCurrency.rate);
      return {
        __html: `${firstActiveCurrency.symbol}1 = ${secondActiveCurrency.symbol}${convertedSecondVal}`
      };
    }
    return { __html: "£1 = $1.28" };
  }, [selectedCurrencies]);

  const handleSelectedCurrencyChange = useCallback(
    (currency: Currency) => {
      const result = [...selectedCurrencies];
      result[selectedSection] = currency;
      setSelectedCurrencies(result);

      const updatedCurrencyAmounts = getUpdatedCurrencyAmounts({
        sectionIndex: selectedSection,
        selectedCurrencies: result
      });
      setCurrencyAmounts(updatedCurrencyAmounts);
    },
    [selectedCurrencies, selectedSection, getUpdatedCurrencyAmounts, setCurrencyAmounts]
  );

  return (
    <>
      <Holder>
        <ActiveExchangeRate dangerouslySetInnerHTML={activeExchangeRateString} />
        <Exchanger>
          <ExchangeSection>
            <StyledCurrencyInput
              paddingsize="large"
              fullWidth={false}
              value={currencyAmounts[0]}
              onChange={updateCurrencyAmount(0)}
            />
            <CurrencyDropdown onClick={handleCurrencyClick(0)}>
              <CurrencyAbbr>{safeGet(selectedCurrencies, "0.code", "")}</CurrencyAbbr>
              <CurrencyText>{safeGet(selectedCurrencies, "0.name", "")}</CurrencyText>
            </CurrencyDropdown>
          </ExchangeSection>
          <Separator>
            <CoinIcon src={CoinImg} />
          </Separator>
          <ExchangeSection>
            <StyledCurrencyInput
              paddingsize="large"
              fullWidth={false}
              value={currencyAmounts[1]}
              onChange={updateCurrencyAmount(1)}
            />
            <CurrencyDropdown onClick={handleCurrencyClick(1)}>
              <CurrencyAbbr>{safeGet(selectedCurrencies, "1.code", "")}</CurrencyAbbr>
              <CurrencyText>{safeGet(selectedCurrencies, "1.name", "")}</CurrencyText>
            </CurrencyDropdown>
          </ExchangeSection>
        </Exchanger>
        <ButtonSection>
          <ExchangeButton
            onClick={() => {}}
            label="EXCHANGE"
            color={theme.primaryColor}
            highlightColor={theme.highlightColor}
            fullWidth={false}
            rounded
            size="x-large"
          />
        </ButtonSection>
      </Holder>
      <CurrencyChooser
        open={currencyModalStatus}
        onClose={closeCurrencyChooser}
        currencyData={currencyChooserData}
        onChange={handleSelectedCurrencyChange}
      />
    </>
  );
};

export default Home;

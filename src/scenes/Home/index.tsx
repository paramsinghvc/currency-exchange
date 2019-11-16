import React, { FC, useState, useEffect, useCallback, ChangeEvent, FormEvent, useMemo } from "react";
import useRedux from "@mollycule/redux-hook";
import Anime from "shared/components/Anime";
import animejs from "animejs";

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
  ExchangeButton,
  ActiveExchangeRateHolder,
  Toast,
  StyledCurrencyInputHolder
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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  }, []);

  const [showToast, setShowToast] = useState(false);
  const handleExchange = useCallback(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }, []);

  return (
    <>
      <Holder>
        <ActiveExchangeRateHolder>
          <Anime
            open={!currencyData.pending && currencyData.success}
            duration={1000}
            onEntering={{ translateY: [-20, 0], opacity: [0, 1] }}
          >
            <ActiveExchangeRate dangerouslySetInnerHTML={activeExchangeRateString} />
          </Anime>
        </ActiveExchangeRateHolder>
        <Exchanger>
          <ExchangeSection>
            <Anime
              open={!currencyData.pending && currencyData.success}
              duration={1000}
              onEntering={{ translateX: ["-100%", 0], opacity: [0, 1], delay: animejs.stagger(100) }}
            >
              <StyledCurrencyInputHolder>
                <StyledCurrencyInput
                  paddingsize="large"
                  fullWidth={false}
                  value={currencyAmounts[0]}
                  onChange={updateCurrencyAmount(0)}
                />
              </StyledCurrencyInputHolder>
              <CurrencyDropdown onClick={handleCurrencyClick(0)}>
                <CurrencyAbbr>{safeGet(selectedCurrencies, "0.code", "")}</CurrencyAbbr>
                <CurrencyText>{safeGet(selectedCurrencies, "0.name", "")}</CurrencyText>
              </CurrencyDropdown>
            </Anime>
          </ExchangeSection>
          <Separator>
            <Anime
              open={currencyData.pending}
              duration={500}
              unmountOnExit={false}
              direction="alternate"
              initProps={{ translateY: -29 }}
              onEntering={{ scale: [1, 1.2], loop: true }}
              onExiting={{ loop: false }}
              easing="linear"
            >
              <CoinIcon src={CoinImg} />
            </Anime>
          </Separator>
          <ExchangeSection>
            <Anime
              open={!currencyData.pending && currencyData.success}
              duration={1000}
              onEntering={{ translateX: ["100%", 0], opacity: [0, 1], delay: animejs.stagger(150) }}
            >
              <StyledCurrencyInputHolder>
                <StyledCurrencyInput
                  paddingsize="large"
                  fullWidth={false}
                  value={currencyAmounts[1]}
                  onChange={updateCurrencyAmount(1)}
                />
              </StyledCurrencyInputHolder>
              <CurrencyDropdown onClick={handleCurrencyClick(1)}>
                <CurrencyAbbr>{safeGet(selectedCurrencies, "1.code", "")}</CurrencyAbbr>
                <CurrencyText>{safeGet(selectedCurrencies, "1.name", "")}</CurrencyText>
              </CurrencyDropdown>
            </Anime>
          </ExchangeSection>
        </Exchanger>
        <ButtonSection>
          <ExchangeButton
            onClick={handleExchange}
            label="EXCHANGE"
            color={theme.primaryColor}
            highlightColor={theme.highlightColor}
            fullWidth={false}
            rounded
            size="x-large"
            disabled={currencyData.pending || !currencyData.success}
          />
        </ButtonSection>
      </Holder>
      <CurrencyChooser
        open={currencyModalStatus}
        onClose={closeCurrencyChooser}
        currencyData={currencyChooserData}
        onChange={handleSelectedCurrencyChange}
      />
      <Anime
        open={showToast}
        duration={500}
        onEntering={{ translateY: ["-100%", 0], opacity: [0, 1] }}
        onExiting={{ translateY: "-100%", opacity: 0 }}
      >
        <Toast>Currency Exchanged successfully</Toast>
      </Anime>
    </>
  );
};

export default Home;

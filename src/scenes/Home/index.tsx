import React, { FC, useState, useEffect, useCallback, ChangeEvent, useMemo } from "react";
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
import { performExchange } from "scenes/Transactions/transaction.redux";
import { IRootState } from "shared/types";
import { IActionFactory, IReduxOperations } from "@mollycule/redux-operation";
import { Currency } from "shared/models/Currency";
import Shell from "core/App/components/Shell";
import Transaction from "shared/models/Transaction";

const Home: FC = () => {
  const {
    currencyData,
    currencyModalStatus,
    wallet,
    setCurrencyModalStatus: setCurrencyModalStatusAction,
    fetchExchangeRateSaga: fetchExchangeRateSagaAction,
    performExchange: performExchangeAction
  } = useRedux<
    IRootState,
    {
      currencyModalStatus: boolean;
      currencyData: IReduxOperations<Currency[]>;
      wallet: IRootState["transactions"]["wallet"];
    },
    {
      setCurrencyModalStatus: IActionFactory<symbol, boolean>;
      fetchExchangeRateSaga: IActionFactory<string, unknown>;
      performExchange: IActionFactory<string, Transaction>;
    }
  >(
    state => ({
      currencyModalStatus: state.home.currencyModalStatus,
      currencyData: state.home.currencyData,
      wallet: state.transactions.wallet
    }),
    { setCurrencyModalStatus, fetchExchangeRateSaga, performExchange }
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

  const findCurrencyWithCode = (currencies: Currency[], code: string) => {
    const result = currencies.find((val: Currency) => val.code === code);
    if (result) {
      const existingPocket = wallet.find(w => w.code === result.code);
      result.amount = safeGet(existingPocket, "amount", 0);
    }
    return result;
  };

  useEffect(() => {
    if (currencyData.payload) {
      const firstDefaultCurrency = findCurrencyWithCode(
        currencyData.payload,
        safeGet(selectedCurrencies, "0.code", "GBP")
      );
      const secondDefaultCurrency = findCurrencyWithCode(
        currencyData.payload,
        safeGet(selectedCurrencies, "1.code", "USD")
      );
      if (firstDefaultCurrency && secondDefaultCurrency)
        setSelectedCurrencies([firstDefaultCurrency, secondDefaultCurrency]);
    }
  }, [currencyData]);

  const handleCurrencyClick = useCallback(
    (sectionIndex: number) => () => {
      setCurrencyChooserData(
        sectionIndex === 0
          ? {
              ...currencyData,
              payload: currencyData.payload.filter(datum => wallet.find(wallet => wallet.code === datum.code))
            }
          : {
              ...currencyData,
              payload: currencyData.payload.filter(datum => datum.code !== selectedCurrencies[sectionIndex].code)
            }
      );
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
        (+result[sectionIndex] / (selectedCurrencies[sectionIndex].rate || 1)) *
        (selectedCurrencies[otherSectionIndex].rate || 1);

      result[otherSectionIndex] = "" + roundVal(otherCurrencyAmount);

      return result;
    },
    [currencyAmounts]
  );

  const updateCurrencyAmount = useCallback(
    (sectionIndex: number) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (sectionIndex === 0 && +e.target.value > safeGet(selectedCurrencies, "0.amount")) {
        return;
      }
      const result = getUpdatedCurrencyAmounts({ sectionIndex, sectionValue: e.target.value, selectedCurrencies });
      setCurrencyAmounts(result);
    },
    [setCurrencyAmounts, getUpdatedCurrencyAmounts, selectedCurrencies]
  );

  const activeExchangeRateString = useMemo(() => {
    const firstActiveCurrency = selectedCurrencies[0];
    const secondActiveCurrency = selectedCurrencies[1];
    if (firstActiveCurrency && secondActiveCurrency && firstActiveCurrency.rate && secondActiveCurrency.rate) {
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

  const [showToast, setShowToast] = useState(false);
  const handleExchange = useCallback(() => {
    const [fromCurrency, toCurrency] = selectedCurrencies;
    performExchangeAction(
      Transaction.create({
        from: { code: fromCurrency.code, amount: +currencyAmounts[0] },
        to: { code: toCurrency.code, amount: +currencyAmounts[1] },
        timestamp: new Date().toISOString()
      })
    );
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }, [selectedCurrencies, currencyAmounts]);

  return (
    <Shell showBackButton>
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
                {safeGet(selectedCurrencies, "0.amount") !== undefined && (
                  <CurrencyText
                    dangerouslySetInnerHTML={{
                      __html: `You have ${safeGet(selectedCurrencies, "0.symbol")}${safeGet(
                        selectedCurrencies,
                        "0.amount"
                      )}`
                    }}
                  />
                )}
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
                {safeGet(selectedCurrencies, "1.amount") !== undefined && (
                  <CurrencyText
                    dangerouslySetInnerHTML={{
                      __html: `You have ${safeGet(selectedCurrencies, "1.symbol")}${safeGet(
                        selectedCurrencies,
                        "1.amount"
                      )}`
                    }}
                  />
                )}
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
    </Shell>
  );
};

export default Home;

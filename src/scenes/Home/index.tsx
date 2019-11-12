import React, { FC, useState, useEffect, useCallback } from "react";
import useRedux from "@mollycule/redux-hook";

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
  StyledTextField,
  Separator,
  CoinIcon,
  ButtonSection,
  ExchangeButton
} from "./styles";
import { fetchExchangeRateSaga, setCurrencyModalStatus } from "./home.redux";
import { IRootState } from "shared/types";
import { IActionFactory } from "@mollycule/redux-operation";

const Home: FC = () => {
  const {
    currencyData,
    currencyModalStatus,
    setCurrencyModalStatus: setCurrencyModalStatusAction,
    fetchExchangeRateSaga: fetchExchangeRateSagaAction
  } = useRedux<
    IRootState,
    IRootState["home"],
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

  const handleCurrencyClick = useCallback(() => {
    setCurrencyModalStatusAction(true);
  }, [setCurrencyModalStatusAction]);

  const closeCurrencyChooser = useCallback(() => {
    setCurrencyModalStatusAction(false);
  }, [setCurrencyModalStatusAction]);

  return (
    <>
      <Holder>
        <ActiveExchangeRate>£1 = $1.28</ActiveExchangeRate>
        <Exchanger>
          <ExchangeSection>
            <StyledTextField paddingsize="large" fullWidth={false} value="12.34" onChange={() => {}} />
            <CurrencyDropdown onClick={handleCurrencyClick}>
              <CurrencyAbbr>GBP</CurrencyAbbr>
              <CurrencyText>Pound Sterling</CurrencyText>
            </CurrencyDropdown>
          </ExchangeSection>
          <Separator>
            <CoinIcon src={CoinImg} />
          </Separator>
          <ExchangeSection>
            <StyledTextField paddingsize="large" fullWidth={false} value="15.76" onChange={() => {}} />
            <CurrencyDropdown onClick={handleCurrencyClick}>
              <CurrencyAbbr>USD</CurrencyAbbr>
              <CurrencyText>United States Dollar</CurrencyText>
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
      <CurrencyChooser open={currencyModalStatus} onClose={closeCurrencyChooser} currencyData={currencyData} />
    </>
  );
};

export default Home;

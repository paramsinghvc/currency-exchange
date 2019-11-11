import React, { FC, useState, useEffect } from "react";

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
import { fetchExchangeRateData } from "./home.saga";

const Home: FC = () => {
  const [isCurrencyChooserOpen, setIsCurrencyChooserOpen] = useState(false);

  useEffect(() => {
    fetchExchangeRateData();
  }, []);
  return (
    <>
      <Holder>
        <ActiveExchangeRate>£1 = $1.28</ActiveExchangeRate>
        <Exchanger>
          <ExchangeSection>
            <StyledTextField paddingsize="large" fullWidth={false} value="12.34" onChange={() => {}} />
            <CurrencyDropdown>
              <CurrencyAbbr>GBP</CurrencyAbbr>
              <CurrencyText>Pound Sterling</CurrencyText>
            </CurrencyDropdown>
          </ExchangeSection>
          <Separator>
            <CoinIcon src={CoinImg} />
          </Separator>
          <ExchangeSection>
            <StyledTextField paddingsize="large" fullWidth={false} value="15.76" onChange={() => {}} />
            <CurrencyDropdown>
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
      <CurrencyChooser />
    </>
  );
};

export default Home;

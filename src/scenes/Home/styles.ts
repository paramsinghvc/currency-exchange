import styled from "@emotion/styled";

import CurrencyInput from "./components/CurrencyInput";
import Button from "shared/components/Button";
import theme from "shared/theme";

export const Holder = styled.main`
  display: grid;
  grid-template-rows: minmax(140px, auto) minmax(180px, auto) 170px;
  justify-content: stretch;
`;

export const ActiveExchangeRateHolder = styled.section`
  align-self: center;
  justify-self: center;
`;

export const ActiveExchangeRate = styled.section`
  background: #f2f2f2;
  color: #646464;
  font-size: 12px;
  padding: 15px 20px;
  border-radius: 5px;
  width: fit-content;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
`;

export const Exchanger = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const ExchangeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CurrencyDropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const CurrencyAbbr = styled.p`
  color: ${theme.primaryColor};
  font-size: 38px;
  text-transform: uppercase;
  margin: 12px auto 12px auto;
`;

export const CurrencyText = styled.p`
  color: ${theme.subTextColor};
  font-size: 9px;
`;

export const StyledCurrencyInputHolder = styled.section`
  min-width: 80px;
  width: auto;
  max-width: 110px;
  text-align: center;
`;

export const StyledCurrencyInput = styled(CurrencyInput)`
  width: 100%;
  font-size: 18px;
  max-width: 110px;
  text-align: center;
`;

export const Separator = styled.div`
  height: 100%;
  width: 1px;
  background: ${theme.borderColor};
  position: relative;
`;

export const CoinIcon = styled.img`
  position: absolute;
  top: 50%;
  left: -29px;
  transform: translateY(-29px);
`;

export const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExchangeButton = styled(Button)`
  font-weight: 500;
  font-size: 12px;
  outline: none;
`;

export const Toast = styled.main<{ type: string }>`
  padding: 10px 20px;
  background: ${({ type }) => (type === "error" ? "#ff6b6b" : "rgba(186, 220, 88, 0.9)")};
  color: ${theme.darkGrayTextColor};
  font-size: 14px;
  text-align: center;
  position: absolute;
  z-index: 2;
  top: 60px;
  left: 50%;
  margin-left: -125px;
  color: white;
  border-radius: ${theme.borderRadius};
`;

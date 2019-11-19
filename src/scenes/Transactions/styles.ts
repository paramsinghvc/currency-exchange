import styled from "@emotion/styled";

import Button from "shared/components/Button";
import theme from "shared/theme";

export const Holder = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wallet = styled.section`
  display: grid;
  padding: 30px 50px 50px 50px;
  grid-template-areas:
    "primary primary secondary"
    "primary primary tertiary";
  justify-items: start;
  width: 100%;
  align-items: center;
  grid-template-rows: 150px 150px;
`;
// export const WalletItem = styled.section<{primary?: boolean; secondary?: boolean; tertiary?: boolean}>`
export const WalletItem = styled.section<{ level: "primary" | "secondary" | "tertiary" }>`
  display: flex;
  flex-direction: column;
  ${({ level }) => `grid-area: ${level}`};
  opacity: ${({ level }) => (level !== "primary" ? 0.7 : 1)};
  transform: ${({ level }) => (level !== "primary" ? "scale(0.6)" : "none")};
  justify-self: ${({ level }) => (level === "primary" ? "center" : "inherit")};
  cursor: pointer;
  &:hover {
    transform: scale(1);
    transition: all 0.2s;
  }
`;

export const Amount = styled.h3`
  font-weight: normal;
  font-size: 30px;
  color: ${theme.primaryColor};
`;

export const CurrencySubText = styled.p`
  font-size: 12px;
  color: ${theme.subTextColor};
`;

export const ExchangeButton = styled(Button)`
  font-weight: bold;
  font-size: 12px;
  outline: none;
  display: flex;
  align-items: center;
  > img {
    margin-right: 10px;
  }
`;
export const Transactions = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 45px;
  list-style: none;
`;
export const TransactionItem = styled.li`
  display: grid;
  grid-template-areas:
    "icon heading heading to"
    "icon subtext subtext from";
  grid-template-columns: minmax(auto, 80px) auto auto auto;
  margin-bottom: 38px;
  align-items: center;
  justify-content: stretch;
  justify-items: flex-start;
`;
export const TIcon = styled.img`
  /* display: flex; */
  grid-area: icon;
  width: 40px;
`;

export const THeading = styled.section`
  display: flex;
  grid-area: heading;
  color: ${theme.darkGrayTextColor};
  font-size: 14px;
`;

export const TTimestamp = styled.section`
  display: flex;
  grid-area: subtext;
  color: ${theme.subTextColor};
  font-size: 12px;
  align-self: start;
`;

export const TTo = styled.section`
  display: flex;
  grid-area: to;
  color: ${theme.darkGrayTextColor};
  justify-self: end;
  font-size: 18px;
`;

export const TFrom = styled.section`
  display: flex;
  grid-area: from;
  color: ${theme.subTextColor};
  font-size: 14px;
  justify-self: end;
  align-self: start;
`;

export const TSection = styled.section`
  margin-top: 44px;
  width: 100%;
  padding: 20px;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.borderColor};
  position: relative;
`;

export const HeadingText = styled.article`
  color: ${theme.darkGrayTextColor};
  background: white;
  padding: 0 15px;
  font-size: 12px;
  position: absolute;
  left: 50%;
  top: -7px;
  text-transform: uppercase;
  margin-left: -60px;
`;

export const EmptyTransactions = styled.h3`
  color: ${theme.lightGray};
  font-size: 14px;
  text-align: center;
  padding: 30px;
  font-weight: lighter;
`;

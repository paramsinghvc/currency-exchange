import React, { FC, useState, useCallback } from "react";
import useRedux from "@mollycule/redux-hook";
import { useHistory } from "react-router-dom";

import ExchangeIcon from "assets/ExchangeIcon.png";
import ExchangeWhite from "assets/ExchangeWhite.svg";
import theme from "shared/theme";
import { IRootState } from "shared/types";
import { IActionFactory, IReduxOperations } from "@mollycule/redux-operation";
import { setWalletPocketAmount, addTransaction } from "./transaction.redux";
import {
  Holder,
  Wallet,
  WalletItem,
  Amount,
  CurrencySubText,
  ExchangeButton,
  Transactions,
  TransactionItem,
  TIcon,
  THeading,
  TTimestamp,
  TFrom,
  TTo,
  TSection,
  Separator,
  HeadingText
} from "./styles";
import Transaction from "shared/models/Transaction";
import Shell from "core/App/components/Shell";

type MapDispatchProps = {
  setWalletPocketAmount: IActionFactory<
    symbol,
    {
      code: string;
      amount: number;
    }
  >;
  addTransaction: IActionFactory<symbol, Transaction>;
};

const TransactionsComp: FC = () => {
  const history = useHistory();
  const {
    wallet,
    transactions,
    setWalletPocketAmount: setWalletPocketAmountAction,
    addTransaction: addTransactionAction
  } = useRedux<IRootState, IRootState["transactions"], MapDispatchProps>(
    state => ({
      wallet: state.transactions.wallet,
      transactions: state.transactions.transactions
    }),
    { setWalletPocketAmount, addTransaction }
  );

  const [activePocketMap, setActivePocketMap] = useState(["primary", "secondary", "tertiary"]);

  const handlePocketClick = useCallback(
    (index: number) => () => {
      const newActivePocketMap = [...activePocketMap];
      newActivePocketMap[index] = "primary";
      const len = newActivePocketMap.length;
      newActivePocketMap[index + 1 > len - 1 ? 0 : index + 1] = "secondary";
      newActivePocketMap[index - 1 < 0 ? len - 1 : index - 1] = "tertiary";
      setActivePocketMap(newActivePocketMap);
    },
    [activePocketMap]
  );

  const handleExchangeClick = useCallback(() => {
    history.push("/exchange");
  }, []);

  return (
    <Shell>
      <Holder>
        <Wallet>
          {wallet.map((pocket, index) => (
            <WalletItem
              key={pocket.code}
              level={activePocketMap[index] as "primary" | "secondary" | "tertiary"}
              onClick={handlePocketClick(index)}
            >
              <Amount dangerouslySetInnerHTML={{ __html: `${pocket.symbol}${pocket.amount}` }} />
              <CurrencySubText>
                {pocket.code} - {pocket.name}
              </CurrencySubText>
            </WalletItem>
          ))}
        </Wallet>
        <ExchangeButton
          onClick={handleExchangeClick}
          color={theme.primaryColor}
          highlightColor={theme.highlightColor}
          fullWidth={false}
          rounded
          size="x-large"
        >
          <img src={ExchangeWhite} /> EXCHANGE
        </ExchangeButton>
        <TSection>
          <Separator>
            <HeadingText>Transactions</HeadingText>
          </Separator>
          <Transactions>
            {transactions.map(transaction => (
              <TransactionItem>
                <TIcon src={ExchangeIcon} />
                <THeading>
                  Exchanged from {transaction.from.currency.code} to {transaction.to.currency.code}
                </THeading>
                <TTimestamp>{transaction.timestamp} </TTimestamp>
                <TTo
                  dangerouslySetInnerHTML={{ __html: `+${transaction.to.currency.symbol}${transaction.to.amount}` }}
                />
                <TFrom
                  dangerouslySetInnerHTML={{ __html: `-${transaction.from.currency.symbol}${transaction.from.amount}` }}
                />
              </TransactionItem>
            ))}

            <TransactionItem>
              <TIcon src={ExchangeIcon} />
              <THeading>Exchanged from GBP to INR</THeading>
              <TTimestamp>18th Nov - 2:00 pm </TTimestamp>
              <TTo>£40</TTo>
              <TFrom>+$7.45</TFrom>
            </TransactionItem>
          </Transactions>
        </TSection>
      </Holder>
    </Shell>
  );
};

export default TransactionsComp;
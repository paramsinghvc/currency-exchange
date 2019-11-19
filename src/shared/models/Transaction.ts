import currencyData from "shared/currencyData";
import safeGet from "shared/utils/safeGet";
import { Currency } from "./Currency";

export type TransactionItem = {
  currency: Currency;
  amount: number;
};

export interface ITransaction {
  from: TransactionItem;
  to: TransactionItem;
  timestamp: string;
}

export type TransactionInputOption = {
  code: string;
  amount: number;
};

export type TransactionOptions = {
  from: TransactionInputOption;
  to: TransactionInputOption;
  timestamp: string;
};

export default class Transaction implements ITransaction {
  from: TransactionItem;
  to: TransactionItem;
  timestamp: string;

  static create(options: TransactionOptions) {
    return new Transaction(options);
  }

  constructor({ from, to, timestamp }: TransactionOptions) {
    this.from = {
      currency: Currency.create({ currency: from.code }),
      amount: from.amount
    };

    this.to = {
      currency: Currency.create({ currency: to.code }),
      amount: to.amount
    };

    this.timestamp = timestamp;
  }
}

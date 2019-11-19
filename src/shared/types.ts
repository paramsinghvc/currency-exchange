import { HomeState } from "scenes/Home/home.redux";
import { TransactionsState } from "scenes/Transactions/transaction.redux";

export interface IRootState {
  home: HomeState;
  transactions: TransactionsState;
}

export interface IObject<T = any> {
  [k: string]: T;
}

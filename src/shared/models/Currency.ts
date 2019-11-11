import { IObject } from "shared/types";
import currencyData from "shared/currencyData";
import safeGet from "shared/utils/safeGet";

export interface ICurrency {
  name: string;
  symbol: string;
  code: string;
  rate: number;
}

export class Currency implements ICurrency {
  name: string;
  symbol: string;
  code: string;
  rate: number;

  static create(options: IObject<string>) {
    return new Currency(options);
  }

  constructor(options: IObject<string>) {
    this.code = options.currency;
    this.rate = +options.rate;
    this.symbol = safeGet(currencyData, `[${this.code}].symbol`);
    this.name = safeGet(currencyData, `[${this.code}].name`);
  }
}

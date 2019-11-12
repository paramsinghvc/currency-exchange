import { IObject } from "shared/types";
import currencyData from "shared/currencyData";
import safeGet from "shared/utils/safeGet";

export interface ICurrency {
  name: string;
  symbol: string;
  code: string;
  rate: number;
}

export type XMLAttributeData = {
  _attributes: {
    currency: string;
    rate: string;
  };
};

export class Currency implements ICurrency {
  name: string;
  symbol: string;
  code: string;
  rate: number;

  static create(options: { currency: string; rate: string }) {
    return new Currency(options);
  }

  static createFromXMLData(xmlData: Array<XMLAttributeData>) {
    return xmlData.map(({ _attributes: { currency, rate } }) => Currency.create({ currency, rate }));
  }

  constructor(options: { currency: string; rate: string }) {
    this.code = options.currency;
    this.rate = +options.rate;
    this.symbol = safeGet(currencyData, `[${this.code}].symbol`);
    this.name = safeGet(currencyData, `[${this.code}].name`);
  }
}

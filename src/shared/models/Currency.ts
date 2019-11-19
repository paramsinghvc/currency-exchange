import currencyData from "shared/currencyData";
import safeGet from "shared/utils/safeGet";

export interface ICurrency {
  name: string;
  symbol: string;
  code: string;
  rate?: number;
  amount?: number;
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
  rate?: number;
  amount?: number;

  static create(options: { currency: string; rate?: string }) {
    return new Currency(options);
  }

  static createFromXMLData(xmlData: Array<XMLAttributeData>) {
    return xmlData.map(({ _attributes: { currency, rate } }) => Currency.create({ currency, rate }));
  }

  constructor(options: { currency: string; rate?: string; amount?: number }) {
    this.code = options.currency;
    this.rate = options.rate ? +options.rate : undefined;
    this.symbol = safeGet(currencyData, `[${this.code}].symbol`);
    this.name = safeGet(currencyData, `[${this.code}].name`);
    this.amount = options.amount;
  }
}

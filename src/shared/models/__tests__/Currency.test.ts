import { Currency } from "../Currency";
import currencyData from "shared/currencyData";

describe("Should create Currency Model", () => {
  it("should create the Currency instance", () => {
    const currencyInstance = new Currency({ currency: "INR", rate: "78.34" });
    expect(currencyInstance).toBeInstanceOf(Currency);
    expect(currencyInstance.code).toEqual("INR");
    expect(currencyInstance.name).toEqual(currencyData["INR"].name);
    expect(currencyInstance.rate).toEqual(78.34);
    expect(currencyInstance.symbol).toEqual(currencyData["INR"].symbol);
  });

  it("should create instance by using factory method", () => {
    const currencyInstance = Currency.create({ currency: "INR", rate: "78.34" });
    expect(currencyInstance).toBeInstanceOf(Currency);
    expect(currencyInstance.code).toEqual("INR");
    expect(currencyInstance.name).toEqual(currencyData["INR"].name);
    expect(currencyInstance.rate).toEqual(78.34);
    expect(currencyInstance.symbol).toEqual(currencyData["INR"].symbol);
  });

  it("should create instance from XML Data", () => {
    const result = Currency.createFromXMLData([
      { _attributes: { currency: "INR", rate: "78.34" } },
      { _attributes: { currency: "USD", rate: "1.1" } }
    ]);

    expect(result.length).toBe(2);
    expect(result[0]).toEqual(Currency.create({ currency: "INR", rate: "78.34" }));
    expect(result[1]).toEqual(Currency.create({ currency: "USD", rate: "1.1" }));
  });
});

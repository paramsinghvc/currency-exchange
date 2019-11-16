import React from "react";
import CurrencyInput from "../CurrencyInput";
import renderer from "react-test-renderer";
import TextField from "shared/components/TextField";

describe("Should render CurrencyInput properly", () => {
  it("should render TextField when open is true", () => {
    const currencyInput = renderer.create(<CurrencyInput value={12.34} onChange={() => {}} />);
    expect(currencyInput.root.findByType(TextField)).toBeDefined();
    expect(currencyInput.toJSON()).toMatchSnapshot();
  });
});

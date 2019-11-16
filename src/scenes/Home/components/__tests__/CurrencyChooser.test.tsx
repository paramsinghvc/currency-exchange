import React from "react";
import CurrencyChooser from "../CurrencyChooser";
import renderer from "react-test-renderer";

describe("Should render CurrencyChooser properly", () => {
  it("should return null open is false", () => {
    const currencyChooser = renderer.create(
      <CurrencyChooser
        open={false}
        onClose={() => {}}
        onChange={() => {}}
        currencyData={{ payload: [], failure: false, pending: false, success: true, errors: null }}
      />
    );
    expect(currencyChooser.toJSON()).toMatchSnapshot();
  });
});

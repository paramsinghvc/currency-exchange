import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";

import {
  Holder,
  ActiveExchangeRate,
  Exchanger,
  ExchangeSection,
  CurrencyDropdown,
  CurrencyAbbr,
  CurrencyText,
  StyledCurrencyInput,
  Separator,
  CoinIcon,
  ButtonSection,
  ExchangeButton,
  ActiveExchangeRateHolder
} from "../styles";

expect.addSnapshotSerializer(serializer);

it("renders holder correctly", () => {
  const tree = renderer.create(<Holder>hello world</Holder>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders holder correctly", () => {
  const tree = renderer.create(<Holder>hello world</Holder>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders ActiveExchangeRate correctly", () => {
  const tree = renderer.create(<ActiveExchangeRate>Loerm Ipsum</ActiveExchangeRate>);
  expect(tree).toMatchSnapshot();
});

it("renders Exchanger correctly", () => {
  const tree = renderer.create(<Exchanger>Loerm Ipsum</Exchanger>);
  expect(tree).toMatchSnapshot();
});

it("renders ExchangeSection correctly", () => {
  const tree = renderer.create(<ExchangeSection>Loerm Ipsum</ExchangeSection>);
  expect(tree).toMatchSnapshot();
});

it("renders CurrencyDropdown correctly", () => {
  const tree = renderer.create(<CurrencyDropdown>Loerm Ipsum</CurrencyDropdown>);
  expect(tree).toMatchSnapshot();
});

it("renders CurrencyAbbr correctly", () => {
  const tree = renderer.create(<CurrencyAbbr>Loerm Ipsum</CurrencyAbbr>);
  expect(tree).toMatchSnapshot();
});

it("renders CurrencyText correctly", () => {
  const tree = renderer.create(<CurrencyText>Loerm Ipsum</CurrencyText>);
  expect(tree).toMatchSnapshot();
});

it("renders StyledCurrencyInput correctly", () => {
  const tree = renderer.create(<StyledCurrencyInput>Loerm Ipsum</StyledCurrencyInput>);
  expect(tree).toMatchSnapshot();
});

it("renders Separator correctly", () => {
  const tree = renderer.create(<Separator>Loerm Ipsum</Separator>);
  expect(tree).toMatchSnapshot();
});

it("renders CoinIcon correctly", () => {
  const tree = renderer.create(<CoinIcon />);
  expect(tree).toMatchSnapshot();
});

it("renders ButtonSection correctly", () => {
  const tree = renderer.create(<ButtonSection>Loerm Ipsum</ButtonSection>);
  expect(tree).toMatchSnapshot();
});

it("renders ExchangeButton correctly", () => {
  const tree = renderer.create(<ExchangeButton>Loerm Ipsum</ExchangeButton>);
  expect(tree).toMatchSnapshot();
});

it("renders ActiveExchangeRateHolder correctly", () => {
  const tree = renderer.create(<ActiveExchangeRateHolder>Loerm Ipsum</ActiveExchangeRateHolder>);
  expect(tree).toMatchSnapshot();
});

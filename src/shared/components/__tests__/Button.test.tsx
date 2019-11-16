import React from "react";
import Button from "../Button";
import renderer from "react-test-renderer";

describe("Should render Button component properly", () => {
  it("should render a flat button", () => {
    const flatButton = renderer.create(
      <Button onClick={() => {}} label="EXCHANGE" fullWidth={false} variant="flat" rounded size="x-large" />
    );
    expect(flatButton.toJSON()).toMatchSnapshot();
  });

  it("should render a outlined button", () => {
    const button = renderer.create(<Button onClick={() => {}} label="EXCHANGE" fullWidth={false} variant="outlined" />);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it("should render a full-width button", () => {
    const button = renderer.create(<Button onClick={() => {}} label="EXCHANGE" fullWidth />);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it("should render a rounded button", () => {
    const button = renderer.create(<Button onClick={() => {}} label="EXCHANGE" rounded />);
    expect(button.toJSON()).toMatchSnapshot();
  });

  it("should render a x-large button", () => {
    const button = renderer.create(<Button onClick={() => {}} label="EXCHANGE" size="x-large" />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});

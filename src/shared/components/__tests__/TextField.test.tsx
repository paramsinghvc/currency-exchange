import React from "react";
import TextField from "../TextField";
import renderer from "react-test-renderer";

describe("Should render Button component properly", () => {
  it("should render a text field", () => {
    const textField = renderer.create(<TextField value={"City of stars"} onChange={() => {}} />);
    expect(textField.toJSON()).toMatchSnapshot();
  });

  it("should render a full width text field", () => {
    const textField = renderer.create(<TextField value={"City of stars"} onChange={() => {}} fullWidth />);
    expect(textField.toJSON()).toMatchSnapshot();
  });

  it("should render a text field with adornment", () => {
    const textField = renderer.create(
      <TextField
        value={"City of stars"}
        onChange={() => {}}
        leftAdornment={<span>$</span>}
        rightAdornment={<span>Kg</span>}
      />
    );
    expect(textField.toJSON()).toMatchSnapshot();
  });
});

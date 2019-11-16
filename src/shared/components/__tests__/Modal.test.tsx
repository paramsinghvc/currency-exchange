import React from "react";
import Modal from "../Modal";
import renderer from "react-test-renderer";

describe("Should render Modal properly", () => {
  it("should return null open is false", () => {
    const modal = renderer.create(<Modal onClose={() => {}} headerText="EXCHANGE" open={false} />);
    expect(modal.toJSON()).toMatchSnapshot();
  });
});

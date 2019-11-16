import React from "react";
import Navbar from "../Navbar";
import renderer from "react-test-renderer";

const tree = renderer.create(<Navbar />);

it("should render the component", () => {
  expect(tree.toJSON()).toMatchSnapshot();
});
